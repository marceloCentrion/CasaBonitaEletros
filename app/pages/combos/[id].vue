<template>
  <main id="page_combo" aria-labelledby="combo_heading">
    <div class="prod_container">
      <template v-if="combo && !isLoading.isLoading">
        <nav class="breadcrumb" aria-label="Navegação estrutural">
          <ol>
            <li>
              <NuxtLink to="/">
                <i class="bi bi-house-door" aria-hidden="true"></i>
                Página inicial
              </NuxtLink>
            </li>
            <li aria-hidden="true" class="breadcrumb_sep">›</li>
            <li>
              <NuxtLink to="/produtos">Combos</NuxtLink>
            </li>
            <li aria-hidden="true" class="breadcrumb_sep">›</li>
            <li aria-current="page">{{ combo.descricao }}</li>
          </ol>
        </nav>

        <div class="prod_layout">
          <div class="prod_galeria" aria-label="Galeria de imagens do combo">
            <div class="prod_thumbs_wrap">
              <button
                :disabled="thumbOffset === 0"
                class="prod_thumb_nav"
                @click="scrollThumbs(-1)"
              >
                <i class="bi bi-chevron-up"></i>
              </button>
              <div class="prod_thumbs" role="tablist">
                <button
                  v-for="(img, i) in imagensVisiveis"
                  :key="thumbOffset + i"
                  class="prod_thumb"
                  :class="{
                    'prod_thumb--active': imagemAtiva === thumbOffset + i,
                  }"
                  @click="imagemAtiva = thumbOffset + i"
                  role="tab"
                >
                  <img :src="img" :alt="'Imagem ' + (thumbOffset + i + 1)" />
                </button>
              </div>
              <button
                :disabled="thumbOffset + THUMBS_VISIVEIS >= imagensUrls.length"
                class="prod_thumb_nav"
                @click="scrollThumbs(1)"
              >
                <i class="bi bi-chevron-down"></i>
              </button>
            </div>
            <div class="prod_img_main_wrap">
              <img
                :src="imagensUrls[imagemAtiva] ?? '/placeholder-default.png'"
                class="prod_img_main"
                alt="Imagem do combo"
                @error="(e) => (e.target.src = '/placeholder-default.png')"
              />
            </div>
          </div>

          <div class="prod_painel">
            <span class="combo_badge">
              <i class="bi bi-bag-check"></i> COMBO ESPECIAL
            </span>

            <h1 class="prod_nome" id="combo_heading">{{ combo.descricao }}</h1>

            <div class="prod_preco_wrap">
              <p class="prod_preco">{{ formatPreco(combo.valor_total) }}</p>
              <p class="prod_parcelas">
                {{ combo.parcelas }}x de {{ formatPreco(combo.valor_parcela) }}
              </p>
              <p class="prod_preco_pix">
                <i class="bi bi-lightning-fill"></i> Frete Grátis
              </p>
            </div>

            <div class="combo_itens">
              <div
                v-for="(p, i) in [combo.produto1, combo.produto2]"
                :key="p.id"
                class="combo_item"
              >
                <span class="combo_item_num">{{ i + 1 }}</span>
                <img
                  :src="p.imagens?.[0]?.imagem ?? '/placeholder-default.png'"
                  :alt="p.nome"
                  class="combo_item_img"
                />
                <div>
                  <p class="combo_item_nome">{{ p.nome }}</p>
                  <p class="combo_item_preco">{{ formatPreco(p.preco) }}</p>
                </div>
              </div>
            </div>

            <div class="prod_actions">
              <SecButton class="prod_btn_comprar" @click="comprar">
                Comprar Combo
              </SecButton>
              <OutlineButton class="prod_btn_whatsapp" @click="abrirWhatsApp">
                <i class="bi bi-whatsapp"></i> Compre pelo WhatsApp
              </OutlineButton>
            </div>
          </div>
        </div>

        <div class="prod_abas_wrap">
          <nav class="prod_abas" role="tablist">
            <button
              v-for="aba in abas"
              :key="aba.id"
              class="prod_aba"
              :class="{ 'prod_aba--active': abaAtiva === aba.id }"
              @click="abaAtiva = aba.id"
              role="tab"
            >
              {{ aba.label }}
            </button>
          </nav>

          <div class="prod_aba_conteudo">
            <template v-if="abaAtiva === 'descricao'">
              <div
                v-for="(p, i) in [combo.produto1, combo.produto2]"
                :key="p.id"
              >
                <h3 class="combo_desc_titulo">
                  <NuxtLink :to="`/produto/${p.urn}`">{{ p.nome }}</NuxtLink>
                </h3>
                <div
                  class="prod_desc_texto"
                  v-html="produtosDetalhes[i]?.descricao || 'Carregando...'"
                />
                <hr v-if="i === 0" class="combo_desc_sep" />
              </div>
            </template>

            <template v-if="abaAtiva === 'tecnico'">
              <div
                v-for="(p, i) in [combo.produto1, combo.produto2]"
                :key="p.id"
              >
                <h3 class="combo_desc_titulo">{{ p.nome }}</h3>
                <table class="prod_tabela_tecnica">
                  <tbody>
                    <tr
                      v-for="(attr, j) in produtosDetalhes[i]?.atributos ?? []"
                      :key="j"
                    >
                      <th>{{ attr.nome }}</th>
                      <td>{{ attr.valor }}</td>
                    </tr>
                    <tr v-if="produtosDetalhes[i]?.peso">
                      <th>Peso</th>
                      <td>{{ produtosDetalhes[i].peso }} kg</td>
                    </tr>
                  </tbody>
                </table>
                <hr v-if="i === 0" class="combo_desc_sep" />
              </div>
            </template>
          </div>
        </div>
      </template>
      <div v-else class="prod_loading"><Loader /></div>
    </div>
  </main>
</template>

<script setup>
import services from "@/services/axios";

definePageMeta({ layout: "site" });

const route = useRoute();
const isLoading = useIsLoading();

const combo = ref(null);
const produtosDetalhes = ref([null, null]);

const imagemAtiva = ref(0);
const thumbOffset = ref(0);
const abaAtiva = ref("descricao");
const THUMBS_VISIVEIS = 4;

useHead(() => ({
  title: combo.value ? `Casa Bonita Eletros - ${combo.value.descricao}` : "Casa Bonita Eletros",
}));

const imagensUrls = computed(() => {
  if (!combo.value) return [];
  const imgs1 = (combo.value.produto1?.imagens ?? []).map((i) => i.imagem);
  const imgs2 = (combo.value.produto2?.imagens ?? []).map((i) => i.imagem);
  return [...imgs1, ...imgs2];
});

const imagensVisiveis = computed(() =>
  imagensUrls.value.slice(
    thumbOffset.value,
    thumbOffset.value + THUMBS_VISIVEIS,
  ),
);

function scrollThumbs(dir) {
  const max = imagensUrls.value.length - THUMBS_VISIVEIS;
  thumbOffset.value = Math.max(0, Math.min(thumbOffset.value + dir, max));
}

const abas = [
  { id: "descricao", label: "Descrição" },
  { id: "tecnico", label: "Características Técnicas" },
];

onMounted(async () => {
  isLoading.start();
  try {
    const res = await services.combos.getByIdPublic({ id: route.params.id });
    combo.value = res.data;

    const [d1, d2] = await Promise.all([
      services.produtos.getProdutoPorUrn({ urn: combo.value.produto1.urn }),
      services.produtos.getProdutoPorUrn({ urn: combo.value.produto2.urn }),
    ]);
    produtosDetalhes.value = [d1.data, d2.data];
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.stop();
  }
});

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function comprar() {
  console.log("Comprar combo:", combo.value.id);
}

function abrirWhatsApp() {
  const p1 = combo.value.produto1.nome;
  const p2 = combo.value.produto2.nome;
  const total = formatPreco(combo.value.valor_total);
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no combo: ${p1} + ${p2} - ${total}`,
  );
  navigateTo(`https://wa.me/5500000000000?text=${msg}`, {
    external: true,
    open: { target: "_blank" },
  });
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_combo {
  background: #f7f7f8;
  min-height: 80vh;
  padding: 32px 0 80px;
}
.prod_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}
.prod_loading,
.prod_erro {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  font-size: 15px;
  color: #888;
}

.prod_erro p {
  color: #c00;
}
.breadcrumb {
  margin-bottom: 1.5rem;

  ol {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 13px;
  }

  a {
    color: #666;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;

    i {
      font-size: 13px;
    }

    &:hover {
      color: $primary;
    }
  }

  li[aria-current="page"] {
    color: #111;
    font-weight: 500;
  }
}

.breadcrumb_sep {
  color: #bbb;
  font-size: 14px;
}
.prod_layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2.5rem;
  align-items: start;
  background: #fff;
  border-radius: 14px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e8e8e8;
}
.prod_galeria {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.prod_thumbs_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.prod_thumb_nav {
  width: 64px;
  height: 28px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #555;
  font-size: 12px;
  transition:
    border-color 0.2s,
    color 0.2s,
    background 0.2s;

  &:hover:not(:disabled) {
    border-color: $primary;
    color: white;
    background-color: $primary;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
    background: #f3f3f3;
    border-color: #e5e5e5;
    color: #aaa;
  }
}

.prod_thumbs {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex-shrink: 0;
}

.prod_thumb {
  width: 64px;
  height: 64px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
  overflow: hidden;
  cursor: pointer;
  padding: 4px;
  transition: border-color 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    border-color: #aaa;
  }

  &.prod_thumb--active {
    border-color: $primary;
  }
}

.prod_img_main_wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  min-height: 320px;
}

.prod_img_main {
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
}
.prod_painel {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.prod_nome {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
  margin: 0 0 1rem;
}

.prod_preco_wrap {
  margin-bottom: 1.25rem;
}

.prod_preco_original {
  font-size: 13px;
  color: #999;
  margin: 0 0 2px;
}

.prod_preco {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111;
  line-height: 1.1;
  margin: 0 0 2px;
}

.prod_preco_pix {
  font-size: 13px;
  color: #1daa60;
  margin: 2px 0;

  i {
    font-size: 11px;
  }
}

.prod_parcelas {
  font-size: 13px;
  color: #888;
  margin: 0;
}

.prod_qty_wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.prod_qty {
  width: auto;

  .qty_btn {
    width: 36px;
    height: 40px;
    padding: 0;
    border-color: #e0e0e0;
    color: #333;

    &:hover:not(:disabled) {
      background: #f5f5f5;
    }
    &:disabled {
      opacity: 0.35;
    }
  }

  .qty_value {
    width: 44px;
    font-size: 15px;
    border-color: #e0e0e0;
    background: #fff;
    justify-content: center;
    height: 40px;
  }
}

.prod_btn_wishlist {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid #e0e0e0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #888;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
  flex-shrink: 0;

  .bi-heart-fill {
    color: #e03;
  }

  &:hover {
    background: #fff0f0;
    border-color: #e03;
    color: #e03;
  }
}

.prod_actions {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.prod_btn_comprar {
  flex: 1;
}

.prod_btn_whatsapp {
  flex: 1;
  font-size: 12px;
}

.prod_parcelamento {
  margin-bottom: 1.25rem;
}

.prod_field_label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.4rem;
}

.prod_select_wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.prod_select {
  width: 100%;
  height: 42px;
  padding: 0 36px 0 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #444;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: $primary;
  }
}

.prod_select_icon {
  position: absolute;
  right: 12px;
  font-size: 12px;
  color: #888;
  pointer-events: none;
}

.prod_frete {
  margin-bottom: 0;
}

.prod_frete_row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.prod_cep_input {
  flex: 1 1 0;
  min-width: 0;
  height: 42px;
  padding: 0 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #111;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }
  &:focus {
    border-color: $primary;
    box-shadow: none;
  }
}

.prod_btn_calcular_wrap {
  flex-shrink: 0;

  :deep(.sec_btn) {
    width: auto;
    padding: 13px 20px;
  }
}

.prod_frete_msg {
  font-size: 12px;
  color: #1daa60;
  margin-top: 6px;
  margin-bottom: 0;
}
.prod_abas_wrap {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 2.5rem;
}

.prod_abas {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.prod_aba {
  flex-shrink: 0;
  height: 48px;
  padding: 0 28px;
  border: none;
  background: none;
  font-size: 13.5px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition:
    color 0.2s,
    border-color 0.2s;
  white-space: nowrap;

  &:hover {
    color: #333;
  }

  &.prod_aba--active {
    color: $primary;
    border-bottom-color: $primary;
  }
}

.prod_aba_conteudo {
  padding: 1.75rem 2rem;
}

.prod_desc_texto {
  font-size: 14px;
  line-height: 1.75;
  color: #444;
  margin-bottom: 1.25rem;
}

.prod_tabela_tecnica {
  width: 100%;
  border-collapse: collapse;

  tr {
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }

  th {
    width: 220px;
    padding: 10px 16px 10px 0;
    font-size: 13px;
    font-weight: 600;
    color: #555;
    text-align: left;
    vertical-align: top;
  }

  td {
    padding: 10px 0;
    font-size: 13px;
    color: #222;
  }
}
.baixar_3d {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 0 0;
  width: fit-content;

  &_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    background: $primary;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.85;
      color: #fff;
    }
  }
}
.prod_relacionados {
  margin-top: 0;
}

.prod_rel_titulo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.5rem;
}

.produtos_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.modal_3d_overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal_3d {
  background: #fff;
  border-radius: 14px;
  padding: 1.75rem 2rem;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &_titulo {
    font-size: 1rem;
    font-weight: 700;
    color: #111;
    margin: 0;
  }

  &_close {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: #888;
    line-height: 1;

    &:hover {
      color: #111;
    }
  }

  &_lista {
    display: flex;
    flex-direction: column;
  }

  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }
  }
}
@media (max-width: 1024px) {
  .prod_layout {
    grid-template-columns: 1fr;
  }

  .produtos_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  #page_combo {
    padding: 16px 0 60px;
  }

  .prod_container {
    padding: 0 1rem;
  }

  .prod_layout {
    padding: 1.25rem 1rem;
    gap: 1.25rem;
    margin-bottom: 1rem;
    border-radius: 10px;
  }

  .breadcrumb ol {
    font-size: 12px;
    row-gap: 0.2rem;
  }

  .prod_galeria {
    flex-direction: column;
  }

  .prod_img_main_wrap {
    order: 1;
    width: 100%;
    min-height: 220px;
  }

  .prod_img_main {
    max-height: 260px;
  }

  .prod_thumbs_wrap {
    order: 2;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 0.35rem;
  }

  .prod_thumbs {
    flex-direction: row;
    gap: 0.4rem;
    overflow-x: auto;
    flex: 1;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .prod_thumb {
    width: 52px;
    height: 52px;
    flex-shrink: 0;
  }

  .prod_thumb_nav {
    width: 28px;
    height: 52px;
    flex-shrink: 0;
    border-radius: 6px;

    i {
      display: inline-block;
    }

    &:first-child i {
      transform: rotate(-90deg);
    }
    &:last-child i {
      transform: rotate(90deg);
    }
  }

  .prod_actions {
    flex-direction: column;
  }

  .prod_btn_comprar,
  .prod_btn_whatsapp {
    width: 100%;
    flex: unset;
  }

  .prod_abas_wrap {
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }

  .prod_aba {
    padding: 0 16px;
    font-size: 13px;
  }

  .prod_aba_conteudo {
    padding: 1.25rem 1rem;
  }

  .prod_tabela_tecnica th {
    width: 130px;
  }

  .produtos_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .prod_container {
    padding: 0 0.75rem;
  }

  .prod_layout {
    padding: 1rem 0.75rem;
  }

  .prod_thumb {
    width: 46px;
    height: 46px;
  }

  .prod_thumb_nav {
    height: 46px;
  }

  .produtos_grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .prod_tabela_tecnica {
    th {
      width: 100px;
      font-size: 12px;
      padding-right: 8px;
    }

    td {
      font-size: 12px;
    }
  }
}

.combo_badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f5f5f5;
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  color: #555;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}

.combo_itens {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  background: #f7f7f8;
  border-radius: 10px;
  border: 1px solid #ebebeb;
}

.combo_item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.combo_item_num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: $primary;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.combo_item_img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e8e8e8;
  flex-shrink: 0;
}

.combo_item_nome {
  font-size: 13px;
  font-weight: 500;
  color: #222;
  margin: 0;
}

.combo_item_preco {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.combo_desc_titulo {
  font-size: 2rem;
  font-weight: 700;
  color: $primary;
  margin-bottom: 0.75rem;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: $primary;
    }
  }
}

.combo_desc_sep {
  border: none;
  border-top: 1px solid gray;
  margin: 1.25rem 0 1.75rem;
}
</style>
