# Runbook — Deploy da Fase P1-A (produção: 167.172.19.62)

Ordem obrigatória: **backend → frontend → nginx → prewarm → medição**.
Todos os comandos são executados no servidor, salvo indicação.

## 0. Pré-requisito (máquina local)

Commitar e enviar as mudanças dos dois repositórios:

```bash
# Frontend (j:/Centrion/projetos/CasaBonitaEletros)
git add app/ nuxt.config.ts package.json scripts/ ARQUITETURA_PIPELINE_IMAGENS.md
git commit -m "perf: Fase P1-A - hero WebP + preload, lazy, vitrine, SWR, cache IPX"
git push origin main

# Backend (J:/Centrion/projetos/Laravel/backendCasaBonitaEletros)
git add app/Http/Controllers/ProdutoController.php app/Services/ProdutoService.php routes/api.php
git commit -m "feat: endpoint /produtos-vitrine-home (12 itens, campos minimos, cache 600s)"
git push origin main
```

> Atenção (frontend): há alterações pendentes NÃO relacionadas à P1-A no
> working tree (orçamentos: CartItem.vue, carrinho.vue, admin/orcamentos/*,
> solicitar-orcamento.vue, orcamentos.js, carrinho.js, sidebarItems.ts).
> O `git add` acima as incluiria — separar em outro commit se ainda não
> estiverem prontas para produção.

## 1. Backend

```bash
cd /caminho/do/backend        # ajustar
git pull origin main
php artisan route:clear && php artisan config:clear && php artisan cache:clear
# teste:
curl -s https://backend.casabonitaeletros.com.br/api/produtos-vitrine-home | head -c 300
# esperado: JSON com 12 produtos e campos reduzidos
```

## 2. Frontend

```bash
cd /caminho/do/frontend       # ajustar
git pull origin main
npm ci
npm run build                 # build NO SERVIDOR (binários sharp linux-x64)
# reiniciar o serviço Node (ajustar ao gestor usado):
pm2 restart casabonita || systemctl restart casabonita-front
# teste:
curl -s http://127.0.0.1:3000/ | grep -o 'rel="preload" as="image"' | wc -l   # esperado: 2
```

## 3. nginx (cache do IPX)

Seguir `scripts/nginx-ipx-cache.conf` (o arquivo contém o bloco completo):

```bash
sudo mkdir -p /var/cache/nginx/ipx && sudo chown www-data:www-data /var/cache/nginx/ipx
# 1) adicionar o proxy_cache_path no http {} (ex.: /etc/nginx/conf.d/ipx-cache.conf)
# 2) adicionar o location /_ipx/ no server {} do site (conferir a porta do proxy_pass!)
sudo nginx -t                       # valida sem aplicar
sudo systemctl reload nginx         # sem downtime
```

Rollback: remover os blocos adicionados → `nginx -t` → `reload`.

## 4. Prewarm

```bash
cd /caminho/do/frontend
npm run prewarm:hero
# 2ª execução deve mostrar cache=HIT em todas as variantes
```

## 5. Validação (pode ser da máquina local)

```bash
# TTFB quente (esperado < 150 ms):
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\n" https://casabonitaeletros.com.br/

# Cache do IPX (esperado: X-Cache-Status: HIT):
curl -sI "https://casabonitaeletros.com.br/_ipx/w_600&f_webp/https://backend.casabonitaeletros.com.br/storage/banners/1783690731564_cel.jpg" | grep -i x-cache-status

# PageSpeed Insights mobile + desktop:
# https://pagespeed.web.dev/analysis?url=https://casabonitaeletros.com.br
```

Critérios: LCP mobile < 4 s, TTFB quente < 300 ms (meta < 150 ms), preload
presente, imagens lazy, HIT no IPX. Com isso confirmado, P1-B está liberada.
