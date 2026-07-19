#!/usr/bin/env node
/**
 * Pré-aquecimento das variantes IPX do banner hero.
 *
 * Busca os banners ativos na API e requisita as variantes WebP críticas do
 * hero no site, para que o cache (nginx proxy_cache em /_ipx/) já esteja
 * quente antes do primeiro visitante.
 *
 * Uso:
 *   node scripts/prewarm-hero.mjs
 *   SITE_URL=https://casabonitaeletros.com.br node scripts/prewarm-hero.mjs
 *
 * Quando executar:
 *   - após cada deploy do frontend;
 *   - após trocar/cadastrar banner no admin;
 *   - opcionalmente via cron (ex.: a cada hora) como garantia.
 */

const SITE_URL = process.env.SITE_URL || "https://casabonitaeletros.com.br";
const API_URL =
  process.env.API_URL || "https://backend.casabonitaeletros.com.br/api";

// Espelha as larguras usadas nos <source>/preload da home (app/pages/index.vue)
const MOBILE_WIDTHS = [400, 600];
const DESKTOP_WIDTHS = [1024, 1280, 1920];
const FORMAT = "webp";

function ipxUrl(src, width, format) {
  return `${SITE_URL}/_ipx/w_${width}&f_${format}/${src}`;
}

async function warm(url) {
  const started = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow" });
    // Consome o corpo para o nginx gravar a resposta completa no cache
    await res.arrayBuffer();
    const ms = Date.now() - started;
    const cache = res.headers.get("x-cache-status") || "-";
    console.log(
      `${res.ok ? "OK " : "ERRO"} ${res.status} ${ms}ms cache=${cache} ${url}`
    );
    return res.ok;
  } catch (err) {
    console.error(`FALHA ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Pré-aquecendo hero de ${SITE_URL}\n`);

  const res = await fetch(`${API_URL}/banners-site`);
  if (!res.ok) {
    console.error(`Erro ao buscar banners: HTTP ${res.status}`);
    process.exit(1);
  }
  const banners = await res.json();
  const heroes = (Array.isArray(banners) ? banners : []).filter(
    (b) => b.categoria === "hero"
  );

  if (!heroes.length) {
    console.warn("Nenhum banner hero encontrado — nada a aquecer.");
    return;
  }

  const urls = [];
  for (const banner of heroes) {
    if (banner.imagem_cel) {
      for (const w of MOBILE_WIDTHS) urls.push(ipxUrl(banner.imagem_cel, w, FORMAT));
    }
    if (banner.imagem) {
      for (const w of DESKTOP_WIDTHS) urls.push(ipxUrl(banner.imagem, w, FORMAT));
    }
  }

  let ok = 0;
  // Sequencial de propósito: evita disparar várias codificações pesadas ao
  // mesmo tempo no servidor (o proxy_cache_lock também protege, mas não custa)
  for (const url of urls) {
    if (await warm(url)) ok++;
  }

  console.log(`\n${ok}/${urls.length} variantes aquecidas.`);
  if (ok < urls.length) process.exit(1);
}

main();
