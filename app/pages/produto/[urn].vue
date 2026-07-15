<template>
  <main id="page_produto" aria-labelledby="produto_heading">
    <div class="prod_container">
      <template v-if="produto && !isLoading.isLoading">
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
              <NuxtLink
                v-if="produto.categoria"
                :to="{
                  path: '/produtos',
                  query: { categoria: produto.categoria.urn },
                }"
              >
                {{ produto.categoria.nome }}
              </NuxtLink>
              <span v-else>Produtos</span>
            </li>
            <li aria-hidden="true" class="breadcrumb_sep">›</li>
            <li aria-current="page">{{ produto.nome }}</li>
          </ol>
        </nav>

        <div class="prod_layout">
          <div class="prod_galeria" aria-label="Galeria de imagens do produto">
            <div class="prod_thumbs_wrap">
              <button
                :disabled="thumbOffset === 0"
                class="prod_thumb_nav"
                @click="scrollThumbs(-1)"
                aria-label="Imagens anteriores"
              >
                <i class="bi bi-chevron-up" aria-hidden="true"></i>
              </button>

              <div
                class="prod_thumbs"
                role="tablist"
                aria-label="Miniaturas do produto"
              >
                <button
                  v-for="(img, i) in imagensVisiveis"
                  :key="thumbOffset + i"
                  class="prod_thumb"
                  :class="{
                    'prod_thumb--active': imagemAtiva === thumbOffset + i,
                  }"
                  @click="imagemAtiva = thumbOffset + i"
                  role="tab"
                  :aria-selected="imagemAtiva === thumbOffset + i"
                  :aria-label="'Ver imagem ' + (thumbOffset + i + 1)"
                >
                  <img
                    :src="img"
                    :alt="produto.nome + ' - imagem ' + (thumbOffset + i + 1)"
                  />
                </button>
              </div>

              <button
                :disabled="thumbOffset + THUMBS_VISIVEIS >= imagensUrls.length"
                class="prod_thumb_nav"
                @click="scrollThumbs(1)"
                aria-label="Próximas imagens"
              >
                <i class="bi bi-chevron-down" aria-hidden="true"></i>
              </button>
            </div>

            <div
              class="prod_img_main_wrap"
              ref="imgWrapRef"
              :style="{ cursor: zoomAtivo ? 'none' : 'zoom-in' }"
              @mousemove="onMouseMove"
              @mouseenter="zoomAtivo = true"
              @mouseleave="zoomAtivo = false"
            >
              <img
                :src="imagensUrls[imagemAtiva] ?? '/placeholder-default.png'"
                :alt="produto.nome"
                class="prod_img_main"
                @error="(e) => (e.target.src = '/placeholder-default.png')"
              />

              <div
                v-show="zoomAtivo"
                class="prod_lupa"
                :style="lupaStyle"
                aria-hidden="true"
              ></div>

              <button
                class="prod_btn_fullscreen"
                @click.stop="fullscreenAtivo = true"
                aria-label="Ver em tela cheia"
              >
                <i class="bi bi-arrows-fullscreen" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <div class="prod_painel" aria-label="Informações e compra do produto">
            <p class="prod_codigo text-muted small mb-1">
              Código: {{ produto.ref }}
            </p>

            <h1 class="prod_nome" id="produto_heading">{{ produto.nome }}</h1>

            <div class="prod_preco_wrap">
              <template v-if="produto.tem_desconto === 'SIM'">
                <p class="prod_preco_original">
                  De: <s>{{ formatPreco(produto.preco) }}</s>
                </p>
                <p
                  class="prod_preco"
                  :aria-label="'Preço: ' + formatPreco(produto.preco_desconto)"
                >
                  {{ formatPreco(produto.preco_desconto) }}
                </p>
              </template>
              <template v-else>
                <p
                  class="prod_preco"
                  :aria-label="'Preço: ' + formatPreco(produto.preco)"
                >
                  {{ formatPreco(produto.preco) }}
                </p>
              </template>

              <p v-if="produto.preco_pix" class="prod_preco_pix">
                <i class="bi bi-lightning-fill"></i>
                {{ formatPreco(produto.preco_pix) }} no PIX
              </p>

              <p class="prod_parcelas">
                {{ produto.parcelas }}x de
                {{ formatPreco(produto.preco_parcela) }}
              </p>
            </div>

            <div class="prod_qty_wrap" role="group" aria-label="Quantidade">
              <div class="prod_qty input-group input-group-sm">
                <button
                  class="btn btn-outline-secondary qty_btn"
                  type="button"
                  @click="decrementar"
                  :disabled="quantidade <= 1"
                  aria-label="Diminuir quantidade"
                >
                  <i class="bi bi-dash" aria-hidden="true"></i>
                </button>
                <span
                  class="input-group-text qty_value fw-semibold"
                  aria-live="polite"
                >
                  {{ quantidade }}
                </span>
                <button
                  class="btn btn-outline-secondary qty_btn"
                  type="button"
                  @click="incrementar"
                  aria-label="Aumentar quantidade"
                >
                  <i class="bi bi-plus" aria-hidden="true"></i>
                </button>
              </div>

              <button
                class="prod_btn_wishlist"
                :aria-label="
                  produto.favorito
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'
                "
                :aria-pressed="produto.favorito"
                @click="produto.favorito = !produto.favorito"
              >
                <i
                  :class="produto.favorito ? 'bi bi-heart-fill' : 'bi bi-heart'"
                  aria-hidden="true"
                ></i>
              </button>
            </div>

            <div class="prod_actions">
              <SecButton
                v-if="vendasAtivas"
                class="prod_btn_comprar"
                @click="comprar"
                aria-label="Comprar agora"
              >
                Comprar
              </SecButton>

              <OutlineButton
                class="prod_btn_whatsapp"
                :aria-label="vendasAtivas ? 'Compre pelo WhatsApp' : 'Solicite orçamento pelo WhatsApp'"
                @click="vendasAtivas ? abrirWhatsApp(produto) : solicitarOrcamento()"
              >
                <i class="bi bi-whatsapp"></i>
                {{ vendasAtivas ? 'Compre pelo WhatsApp' : 'Adicionar ao orçamento' }}
              </OutlineButton>
            </div>

            <div class="prod_parcelamento">
              <label for="select_parcelas" class="prod_field_label">
                Parcelamento
              </label>
              <div class="prod_select_wrap">
                <select
                  id="select_parcelas"
                  v-model="parcelaSelecionada"
                  class="prod_select"
                  aria-label="Escolher parcelamento"
                >
                  <option v-for="p in parcelasOpcoes" :key="p.n" :value="p.n">
                    {{ p.n }}x de {{ formatPreco(produto.preco / p.n) }}
                  </option>
                </select>
                <i
                  class="bi bi-chevron-down prod_select_icon"
                  aria-hidden="true"
                ></i>
              </div>
            </div>

            <div class="prod_frete">
              <label for="input_cep_produto" class="prod_field_label">
                Calcule o Frete
              </label>
              <div class="prod_frete_row">
                <input
                  id="input_cep_produto"
                  v-model="cep"
                  type="text"
                  placeholder="Digite seu CEP"
                  class="prod_cep_input"
                  maxlength="9"
                  @input="mascararCep"
                  aria-label="CEP para cálculo de frete"
                />
                <div class="prod_btn_calcular_wrap">
                  <SecButton
                    type="button"
                    @click="calcularFrete"
                    :disabled="isLoading.isLoading"
                  >
                    {{ isLoading.isLoading ? "Calculando..." : "Calcular" }}
                  </SecButton>
                </div>
              </div>
              <p v-if="freteMsg" class="prod_frete_msg" role="status">
                {{ freteMsg }}
              </p>
            </div>
          </div>
        </div>

        <div class="prod_abas_wrap">
          <nav
            class="prod_abas"
            role="tablist"
            aria-label="Detalhes do produto"
          >
            <button
              v-for="aba in abas"
              :key="aba.id"
              class="prod_aba"
              :class="{ 'prod_aba--active': abaAtiva === aba.id }"
              @click="abaAtiva = aba.id"
              role="tab"
              :aria-selected="abaAtiva === aba.id"
              :aria-controls="'painel_' + aba.id"
            >
              {{ aba.label }}
            </button>
          </nav>

          <div
            v-for="aba in abas"
            :key="'painel_' + aba.id"
            :id="'painel_' + aba.id"
            role="tabpanel"
            v-show="abaAtiva === aba.id"
            class="prod_aba_conteudo"
          >
            <template v-if="aba.id === 'descricao'">
              <div class="prod_desc_texto" v-html="produto.descricao" />
            </template>

            <template v-if="aba.id === 'tecnico'">
              <table
                class="prod_tabela_tecnica"
                aria-label="Características técnicas"
              >
                <tbody>
                  <tr v-for="(atributo, i) in produto.atributos" :key="i">
                    <th scope="row">{{ atributo.nome }}</th>
                    <td>{{ atributo.valor }}</td>
                  </tr>
                  <tr v-if="produto.peso">
                    <th scope="row">Peso</th>
                    <td>{{ produto.peso }} kg</td>
                  </tr>
                  <tr v-if="produto.medida_altura">
                    <th scope="row">Altura</th>
                    <td>{{ produto.medida_altura }} mm</td>
                  </tr>
                  <tr v-if="produto.medida_largura">
                    <th scope="row">Largura</th>
                    <td>{{ produto.medida_largura }} mm</td>
                  </tr>
                  <tr v-if="produto.medida_profundidade">
                    <th scope="row">Profundidade</th>
                    <td>{{ produto.medida_profundidade }} mm</td>
                  </tr>
                  <tr v-if="produto.ncm">
                    <th scope="row">NCM</th>
                    <td>{{ produto.ncm }}</td>
                  </tr>
                  <tr v-if="produto.ean">
                    <th scope="row">EAN</th>
                    <td>{{ produto.ean }}</td>
                  </tr>
                </tbody>
              </table>
            </template>

            <template v-if="aba.id === 'downloads'">
              <div v-if="arquivos3dBlocos.length >= 1" class="baixar_3d">
                <span class="fw-bold">Blocos 3D</span>
                <div>
                  <a
                    v-if="arquivos3dBlocos.length === 1"
                    :href="arquivos3dBlocos[0].arquivo"
                    target="_blank"
                    class="baixar_3d_btn"
                  >
                    <i class="bi bi-download me-1"></i>
                    Baixar {{ extensaoArquivo(arquivos3dBlocos[0].arquivo) }}
                  </a>
                  <SecButton
                    v-else
                    style="font-size: 12px"
                    @click="mostrarLista = true"
                  >
                    <i class="bi bi-download me-1"></i>
                    Baixar 3Ds
                  </SecButton>
                </div>
              </div>

              <div v-if="arquivos3dPdfs.length >= 1" class="baixar_3d baixar_manuais">
                <span class="fw-bold">Gabaritos e Manuais</span>
                <div class="manuais_lista">
                  <a
                    v-for="pdf in arquivos3dPdfs"
                    style="transition: .1.5s;"
                    :key="pdf.id"
                    :href="pdf.arquivo"
                    target="_blank"
                    class="baixar_3d_btn baixar_3d_btn--outline"
                  >
                    <i class="bi bi-file-earmark-pdf me-1"></i>
                    {{ 'Baixar PDF' }}
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>

        <section
          v-if="produto.relacionados?.length"
          class="prod_relacionados"
          aria-labelledby="rel_heading"
        >
          <h2 class="prod_rel_titulo" id="rel_heading">
            Produtos Relacionados
          </h2>

          <ul class="produtos_grid" aria-label="Produtos relacionados">
            <ProdutoCard
              v-for="rel in produto.relacionados"
              :key="rel.id"
              :produto="rel"
              @toggle-favorito="(p) => (p.favorito = !p.favorito)"
              @adicionar-carrinho="adicionarCarrinho"
            />
          </ul>
        </section>
      </template>

      <div v-else class="prod_loading">
        <Loader />
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="fullscreenAtivo"
        class="prod_fullscreen_overlay"
        @click.self="fullscreenAtivo = false"
        role="dialog"
        aria-modal="true"
        :aria-label="produto?.nome"
      >
        <div class="prod_fullscreen_modal">
          <button
            class="prod_fullscreen_close"
            @click="fullscreenAtivo = false"
            aria-label="Fechar visualização"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>

          <button
            class="prod_fullscreen_nav prod_fullscreen_nav--prev"
            @click="navegarFullscreen(-1)"
            :disabled="imagemAtiva === 0"
            aria-label="Imagem anterior"
          >
            <i class="bi bi-chevron-left" aria-hidden="true"></i>
          </button>

          <div class="prod_fullscreen_img_wrap">
            <img
              :src="imagensUrls[imagemAtiva] ?? '/placeholder-default.png'"
              :alt="produto?.nome"
              class="prod_fullscreen_img"
              @error="(e) => (e.target.src = '/placeholder-default.png')"
            />
          </div>

          <button
            class="prod_fullscreen_nav prod_fullscreen_nav--next"
            @click="navegarFullscreen(1)"
            :disabled="imagemAtiva >= imagensUrls.length - 1"
            aria-label="Próxima imagem"
          >
            <i class="bi bi-chevron-right" aria-hidden="true"></i>
          </button>

          <p class="prod_fullscreen_counter" aria-live="polite">
            {{ imagemAtiva + 1 }} / {{ imagensUrls.length }}
          </p>
        </div>
      </div>

      <div
        v-if="mostrarLista"
        class="modal_3d_overlay"
        @click.self="mostrarLista = false"
      >
        <div class="modal_3d">
          <div class="modal_3d_header">
            <h3 class="modal_3d_titulo">Arquivos 3D</h3>
            <button
              class="modal_3d_close"
              @click="mostrarLista = false"
              aria-label="Fechar"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal_3d_lista">
            <div
              v-for="item in arquivos3dBlocos"
              :key="item.id"
              class="modal_3d_item"
            >
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-file-earmark-zip text-secondary"></i>
                <span style="font-size: 14px" class="text-dark">
                  Arquivo #{{ item.id }} ({{ extensaoArquivo(item.arquivo) }})
                </span>
              </div>
              <a
                :href="item.arquivo"
                target="_blank"
                class="btn btn-sm btn-outline-primary px-4"
                style="font-size: 12px"
                @click="mostrarLista = false"
              >
                Baixar <i class="bi bi-download ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { useCheckoutStore } from "@/stores/checkout";
import services from "@/services/axios";

const produto = ref(null);
const arquivos3d = ref([]);
const erro = ref(null);
const mostrarLista = ref(false);

const zoomAtivo = ref(false);
const lupaStyle = ref({});
const imgWrapRef = ref(null);
const fullscreenAtivo = ref(false);

const ZOOM_FACTOR = 1.4;
const LUPA_SIZE = 250;

useHead(() => ({
  title: produto.value?.nome
    ? `Casa Bonita Eletros - ${produto.value.nome}`
    : "Casa Bonita Eletros",
}));

const isLoading = useIsLoading();
const checkout = useCheckoutStore();
const carrinho = useCarrinhoStore();
const { empresa, carregarEmpresaSite } = useSiteData();
const { vendasAtivas, carregarModoOperacao } = useModoOperacao();

definePageMeta({ layout: "site" });

const route = useRoute();

const imagemAtiva = ref(0);
const quantidade = ref(1);
const abaAtiva = ref("descricao");
const parcelaSelecionada = ref(1);
const cep = ref("");
const freteMsg = ref("");

const THUMBS_VISIVEIS = 4;
const thumbOffset = ref(0);

const imagensUrls = computed(() =>
  (produto.value?.imagens ?? []).map((img) => img.imagem),
);

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

watch(imagensUrls, () => {
  thumbOffset.value = 0;
  imagemAtiva.value = 0;
});

const parcelasOpcoes = computed(() =>
  Array.from({ length: produto.value?.parcelas ?? 1 }, (_, i) => ({
    n: i + 1,
  })),
);

const arquivos3dBlocos = computed(() =>
  (arquivos3d.value ?? []).filter(
    (a) => a.tipo?.toLowerCase() !== "gabarito",
  ),
);

const arquivos3dPdfs = computed(() =>
  (arquivos3d.value ?? []).filter(
    (a) => a.tipo?.toLowerCase() === "gabarito",
  ),
);

function extensaoArquivo(url) {
  return (url?.split(".").pop() || "").toUpperCase();
}

const abas = computed(() => {
  const lista = [
    { id: "descricao", label: "Descrição" },
    { id: "tecnico", label: "Características Técnicas" },
  ];
  if (arquivos3dBlocos.value.length >= 1 || arquivos3dPdfs.value.length >= 1) {
    lista.push({ id: "downloads", label: "Downloads" });
  }
  return lista;
});

watch(abas, (novasAbas) => {
  if (!novasAbas.some((aba) => aba.id === abaAtiva.value)) {
    abaAtiva.value = "descricao";
  }
});

function onMouseMove(e) {
  if (!imgWrapRef.value) return;
  const rect = imgWrapRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const imgSrc = imagensUrls.value[imagemAtiva.value] ?? '/placeholder-default.png';
  lupaStyle.value = {
    left: `${x - LUPA_SIZE / 2}px`,
    top: `${y - LUPA_SIZE / 2}px`,
    backgroundImage: `url('${imgSrc}')`,
    backgroundSize: `${rect.width * ZOOM_FACTOR}px ${rect.height * ZOOM_FACTOR}px`,
    backgroundPosition: `${-(x * ZOOM_FACTOR - LUPA_SIZE / 2)}px ${-(y * ZOOM_FACTOR - LUPA_SIZE / 2)}px`,
  };
}

function navegarFullscreen(dir) {
  const novo = imagemAtiva.value + dir;
  if (novo >= 0 && novo < imagensUrls.value.length) {
    imagemAtiva.value = novo;
  }
}

function handleKeydown(e) {
  if (!fullscreenAtivo.value) return;
  if (e.key === 'Escape') fullscreenAtivo.value = false;
  if (e.key === 'ArrowLeft') navegarFullscreen(-1);
  if (e.key === 'ArrowRight') navegarFullscreen(1);
}

watch(fullscreenAtivo, (val) => {
  document.body.style.overflow = val ? 'hidden' : '';
});

onMounted(async () => {
  await Promise.all([fetchProduto(), carregarEmpresaSite(), carregarModoOperacao()]);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});

async function fetchProduto() {
  try {
    isLoading.start();
    erro.value = null;
    const urn = route.params.urn;
    const { data } = await services.produtos.getProdutoPorUrn({ urn });
    produto.value = data;
    arquivos3d.value = data.produtos_3d ?? [];
  } catch (e) {
    console.error(e);
    erro.value = "Produto não encontrado.";
  } finally {
    isLoading.stop();
  }
}

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function incrementar() {
  quantidade.value++;
}

function decrementar() {
  if (quantidade.value > 1) quantidade.value--;
}

function comprar() {
  if (!vendasAtivas.value) {
    abrirWhatsApp(produto.value);
    return;
  }
  checkout.iniciar(
    {
      id: produto.value.id,
      nome: produto.value.nome,
      ref: produto.value.ref,
      preco:
        produto.value.tem_desconto === "SIM"
          ? produto.value.preco_desconto
          : produto.value.preco,
      imagens: produto.value.imagens,
    },
    quantidade.value,
  );
  navigateTo("/checkout");
}

function solicitarOrcamento() {
  const item = {
    id: produto.value.id,
    nome: produto.value.nome,
    urn: produto.value.urn,
    preco: produto.value.tem_desconto === 'SIM' ? produto.value.preco_desconto : produto.value.preco,
    imagens: produto.value.imagens,
  };
  for (let i = 0; i < quantidade.value; i++) carrinho.adicionarItem(item);
  navigateTo('/carrinho');
}

function adicionarCarrinho(p) {
  console.log("Adicionado ao carrinho:", p);
}

function gerarLinkWhatsApp(p) {
  const numeroBase = empresa.value.whatsapp || empresa.value.telefone || "";
  const numeroDigits = numeroBase.replace(/\D/g, "");
  const numero = numeroDigits.startsWith("55") ? numeroDigits : `55${numeroDigits}`;
  const msg = encodeURIComponent(
    `Olá! Gostaria de solicitar um orçamento para: ${p.nome} - ${formatPreco(p.preco)}`,
  );
  return numeroDigits ? `https://wa.me/${numero}?text=${msg}` : "/contato";
}

function abrirWhatsApp(p) {
  navigateTo(gerarLinkWhatsApp(p), {
    external: true,
    open: { target: "_blank" },
  });
}

function mascararCep() {
  cep.value = cep.value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

async function calcularFrete() {
  if (cep.value.length < 9) {
    freteMsg.value = "Digite um CEP válido.";
    return;
  }
  isLoading.start();
  freteMsg.value = "";
  await new Promise((r) => setTimeout(r, 800));
  freteMsg.value = "Frete grátis para sua região! 🎉";
  isLoading.stop();
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;
#page_produto {
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
      color: var(--primary);
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
    border-color: var(--primary);
    color: white;
    background-color: var(--primary);
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
    border-color: var(--primary);
  }
}

.prod_img_main_wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 10px;
  min-height: 320px;
  overflow: hidden;
}

.prod_img_main {
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.prod_lupa {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.12),
    0 8px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 10;
}

.prod_btn_fullscreen {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1.5px solid rgba(200, 200, 200, 0.7);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  z-index: 5;
  opacity: 0;
  transform: scale(0.88);
  transition:
    opacity 0.2s,
    transform 0.2s,
    background 0.2s,
    color 0.2s;

  &:hover {
    background: #fff;
    color: var(--primary);
    border-color: var(--primary);
  }
}

.prod_img_main_wrap:hover .prod_btn_fullscreen {
  opacity: 1;
  transform: scale(1);
}

.prod_fullscreen_overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.prod_fullscreen_modal {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prod_fullscreen_close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.prod_fullscreen_img_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 5rem;
  max-width: 100%;
  max-height: 100%;
}

.prod_fullscreen_img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 6px;
  user-select: none;
}

.prod_fullscreen_nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.22);
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }

  &--prev {
    left: 1.5rem;
  }

  &--next {
    right: 1.5rem;
  }
}

.prod_fullscreen_counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
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
    border-color: var(--primary);
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
    border-color: var(--primary);
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
    color: var(--primary);
    border-bottom-color: var(--primary);
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
    background: var(--primary);
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

    &--outline {
      background: transparent;
      color: var(--primary);
      border: 1.5px solid var(--primary);

      &:hover {
        background: var(--primary);
        color: #fff;
        opacity: 1;
      }
    }
  }
}

.baixar_manuais {
  border-top: 1px solid #f0f0f0;
  margin-top: 1rem;
  padding-top: 1.25rem;
  width: 100%;
}

.manuais_lista {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
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
  .prod_btn_fullscreen {
    opacity: 1;
    transform: scale(1);
  }

  .prod_fullscreen_nav {
    width: 40px;
    height: 40px;
    font-size: 1rem;

    &--prev { left: 0.75rem; }
    &--next { right: 0.75rem; }
  }

  .prod_fullscreen_img_wrap {
    padding: 3.5rem 3rem;
  }

  #page_produto {
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
</style>
