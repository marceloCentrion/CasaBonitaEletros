# Arquitetura do Pipeline de Imagens — Padrão da Plataforma

> Padrão oficial de entrega de imagens dos projetos Centrion, consolidado na
> Fase P1-A do Casa Bonita Eletros. Aplicável a qualquer frontend Nuxt +
> backend Laravel da plataforma.

## 1. Visão geral

```
Upload (admin) ──► Laravel (storage/ + thumbs)
                        │
                        ▼
        Nuxt SSR monta <picture> + preload apontando para /_ipx/
                        │
Navegador ──► nginx ──► [proxy_cache /_ipx/]  HIT ──► resposta ~1ms
                        │ MISS
                        ▼
                  Nuxt/IPX (sharp): redimensiona + converte (WebP)
                        │ busca origem
                        ▼
              backend.../storage/... (imagem original)
```

Camadas de cache, da mais próxima ao usuário para a mais distante:

| Camada | O quê | TTL | Onde configurar |
|---|---|---|---|
| Navegador | `Cache-Control: public, max-age=31536000, immutable` em `/_ipx/**` | 1 ano | `nuxt.config.ts` → `nitro.routeRules` |
| nginx `proxy_cache` | Resposta binária de cada variante `/_ipx/` | 30 dias (inactive 30d, max 2 GB) | `scripts/nginx-ipx-cache.conf` |
| Nitro SWR | HTML da home renderizado | 600 s | `nuxt.config.ts` → `routeRules["/"]` |
| Laravel Cache | JSON dos endpoints da home | 600 s | Controllers (`Cache::remember`) |

## 2. Fluxo de upload

1. O admin envia a imagem pelo painel; o Laravel grava o arquivo original em
   `storage/app/public/...` (ex.: `banners/`, `thumbs/`, `grupos/`).
2. Para produtos, o backend gera `imagem_thumb` (Intervention Image) no upload.
3. O backend expõe URLs absolutas (`asset('storage/...')`) nas APIs.
4. **Nenhuma variante responsiva é gerada no upload** — o IPX gera sob demanda
   na primeira requisição e o nginx congela o resultado no cache.
5. Após trocar um **banner hero**, rodar `npm run prewarm:hero` (ver §6).

Recomendações de upload (orientar quem cadastra):
- Banner desktop: JPG/PNG com ~1920px de largura, proporção 3.31:1.
- Banner mobile (`imagem_cel`): ~800px de largura, proporção 1.34:1.
- Evitar arquivos acima de ~500 KB no original (o IPX processa mais rápido).

## 3. Perfis de imagem (frontend)

Todos os tamanhos vêm de `nuxt.config.ts` → `image.screens`
(320/640/768/1024/1280/1920). Perfis em uso:

| Perfil | Onde | Variantes | Formato | Prioridade |
|---|---|---|---|---|
| Hero mobile | 1º slide, `imagem_cel` | 400w, 600w (`sizes=100vw`) | **WebP** | `fetchpriority=high`, eager, **preload** |
| Hero desktop | 1º slide, `imagem` | 1024w, 1280w, 1920w (`sizes=100vw`) | **WebP** | idem |
| Hero (slides 2+) | carrossel | idem | WebP | lazy, sem prioridade |
| Thumb de produto | ProdutoCard | original do thumb | original | lazy |
| Categorias/grupos, banner destaque, combo, newsletter, marcas, rodapé | seções abaixo da dobra | original | original | lazy |

### Regra de ouro do LCP

- **Exatamente uma** imagem com `fetchpriority="high"` + `loading="eager"`:
  o primeiro banner visível.
- O preload no `<head>` (gerado no SSR em `app/pages/index.vue`) usa
  `imagesrcset`/`imagesizes` **idênticos** aos `<source>` do `<picture>` e
  media queries espelhadas (`max-width: 600px` / `min-width: 601px`) — o
  navegador seleciona a mesma URL nas duas vias, sem download duplicado.
- Todas as demais imagens: `loading="lazy"`, sem prioridade.

### Formatos

- **WebP** é o formato padrão de entrega de imagens dinâmicas.
- **AVIF está proibido no caminho crítico do LCP**: a codificação on-the-fly
  media ~2,5 s por requisição (medição de 2026-07-19). Pode ser reavaliado
  para o hero somente com cache nginx comprovado (HIT via `X-Cache-Status`)
  **e** pré-aquecimento cobrindo todas as variantes.
- SVG (logos) passa pelo IPX sem conversão (`/_ipx/_/`).

## 4. Política de cache

### 4.1 nginx proxy_cache (`/_ipx/`)

Arquivo: [`scripts/nginx-ipx-cache.conf`](scripts/nginx-ipx-cache.conf)
(contém o bloco completo, aplicação, teste e rollback).

Pontos de projeto:
- `proxy_cache_key "$request_uri"` — URI + query string.
- Somente respostas `200` são cacheadas (30 dias).
- `proxy_cache_lock on` — uma única codificação por variante; requisições
  concorrentes aguardam em vez de disparar N processos sharp.
- `proxy_cache_use_stale` — serve versão antiga se o Nuxt reiniciar.
- `add_header X-Cache-Status` — diagnóstico HIT/MISS/EXPIRED.
- Bypass de depuração: header `X-IPX-Bypass: 1`.

Invalidação: as URLs do IPX embutem os modificadores (`w_600&f_webp`) e o
caminho do arquivo original. Arquivos novos ganham nomes novos (timestamp),
então **não há necessidade de purge** — a variante antiga expira sozinha por
`inactive=30d`. Se um arquivo for substituído mantendo o mesmo nome, apagar o
diretório de cache (`rm -rf /var/cache/nginx/ipx/*`) e rodar o prewarm.

### 4.2 SWR do HTML (`/`)

- `routeRules["/"] = { swr: 600 }` — o primeiro acesso renderiza e cacheia;
  os demais recebem o HTML em ~3 ms; após 600 s a regeneração acontece em
  segundo plano (stale-while-revalidate).
- **Pré-condição verificada**: o HTML da home é 100% público. Login, carrinho
  e favoritos são persistidos em `localStorage` (plugin client-only do Pinia)
  e hidratados apenas no navegador. **Nunca renderizar dado de usuário no SSR
  de páginas com SWR.**
- Com SWR, o Nuxt externaliza o payload de hidratação para `/_payload.json`
  (carregado assíncrono, não bloqueia a renderização). Comportamento esperado,
  não é bug.

### 4.3 Cache de dados (Laravel)

Endpoints da home usam `Cache::remember(..., 600)`:
`produtos-home`, `produtos-ativos`, `produtos-vitrine-home`, `parcelamentos`.
O TTL do SWR (600 s) foi alinhado propositalmente ao TTL do backend.

## 5. Payload SSR

- A home consome `GET /produtos-vitrine-home`: **12 produtos**, somente os
  campos que o card usa (`id, nome, urn, ref, preco, preco_pix,
  preco_desconto, parcelas, preco_parcela, marca, imagem.imagem_thumb`).
  Redução medida: 95,7 KB → 4,5 KB (−96%).
- Fallback automático para `/produtos-ativos` se a vitrine não responder
  (desacopla deploys de frontend e backend).
- Padrão para novas seções: criar endpoint dedicado com limite explícito e
  campos mínimos em vez de reutilizar endpoints "completos".

## 6. Pré-aquecimento

Script: [`scripts/prewarm-hero.mjs`](scripts/prewarm-hero.mjs)
(`npm run prewarm:hero`).

- Lê `GET /api/banners-site`, filtra `categoria === "hero"` e requisita as
  variantes WebP críticas: mobile 400/600 e desktop 1024/1280/1920.
- Execução sequencial de propósito (não sobrecarregar o sharp).
- `SITE_URL`/`API_URL` sobrescrevem os padrões por variável de ambiente.

**Quando rodar** (o primeiro visitante nunca deve pagar a codificação):
1. Após cada deploy do frontend (o cache nginx sobrevive a deploys, mas rodar
   é barato e garante).
2. Após cadastrar/trocar banner no admin.
3. Opcional: cron horário como rede de segurança.

## 7. Operação

### Ordem de deploy desta arquitetura

1. **Backend**: `git pull` + `php artisan route:clear && php artisan cache:clear`
   (publica `/produtos-vitrine-home`).
2. **Frontend**: build **no servidor Linux** (binários sharp são específicos
   de arquitetura) → `npm ci && npm run build` → reiniciar o serviço Node.
3. **nginx**: aplicar `scripts/nginx-ipx-cache.conf` → `nginx -t` →
   `systemctl reload nginx`.
4. **Prewarm**: `npm run prewarm:hero`.

### Monitoramento

- `curl -sI https://<site>/_ipx/... | grep -i x-cache-status` → esperado
  `HIT` após o prewarm.
- TTFB da home quente: < 150 ms (`curl -o /dev/null -w "%{time_starttransfer}"`).
- PageSpeed Insights após qualquer mudança no hero ou no pipeline.
- Espaço do cache: `du -sh /var/cache/nginx/ipx` (limite 2 GB, autolimpante).

### Rollback

| Mudança | Rollback |
|---|---|
| nginx proxy_cache | Remover o `location /_ipx/` e o `proxy_cache_path`, `nginx -t`, `reload` (procedimento completo no .conf) |
| SWR da home | Remover `"/": { swr: 600 }` do `nuxt.config.ts` e rebuildar |
| Vitrine | O frontend cai sozinho no fallback `/produtos-ativos`; ou reverter o commit |
| Hero WebP/preload | Reverter `app/pages/index.vue` |

## 8. Checklist para adotar em outro projeto da plataforma

- [ ] `@nuxt/image` com `domains` do backend e `screens` padrão.
- [ ] `Cache-Control immutable` em `/_ipx/**` (routeRules).
- [ ] Hero com `<picture>` WebP, art direction, `sizes`, preload espelhado.
- [ ] Uma única imagem `fetchpriority=high`; todo o resto lazy.
- [ ] Endpoint de vitrine dedicado (limite + campos mínimos + cache 600 s).
- [ ] SWR no HTML público (somente após confirmar ausência de personalização).
- [ ] nginx proxy_cache em `/_ipx/` com `proxy_cache_lock` e `X-Cache-Status`.
- [ ] Prewarm das variantes do hero no deploy e na troca de banner.
- [ ] Medição PSI mobile/desktop antes e depois.

---

*Histórico: baseline 2026-07-19 (PSI mobile): Performance 56, FCP 4,4 s,
LCP 12,7 s, SI 8,8 s, TBT 160 ms, CLS 0.033. Causas-raiz: AVIF on-the-fly
sem cache (~2,5 s/req), 50 imagens eager, payload SSR de 168 KB, TTFB 1,2 s
sem cache de HTML.*
