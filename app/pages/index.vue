<template>
  <!--
  BANNER ANTIGO — comentado para preservação. Remover quando não for mais necessário.
  <section id="section_1" aria-label="Banners promocionais">
    <div class="hero_wrapper">
      <carousel
        v-model="currentSlide"
        :items-to-show="1"
        :items-to-scroll="1"
        :snap-align="'start'"
        :autoplay="6000"
        :transition="4000"
        :wrapAround="true"
      >
        <slide v-for="banner in state.banners" :key="banner.id">
          <NuxtImg
            :src="banner.imagem || '/placeholder-default.png'"
            class="slide_img"
            :alt="banner.titulo || 'Banner promocional'"
          />
        </slide>
        <template #addons>
          <pagination />
        </template>
      </carousel>
      <div class="slide_overlay">
        <div class="slide_content">
          <span class="slide_tag">SUA COZINHA, SEU ESTILO</span>
          <h1>
            {{ activeBanner?.titulo || "Transforme Sua Cozinha com Tecnologia, Design e Sofisticação" }}
          </h1>
          <p>
            {{ activeBanner?.descricao || "Descubra eletrodomésticos premium que combinam inovação, alto desempenho e acabamento sofisticado para levar mais praticidade, elegância e eficiência para o seu dia a dia na cozinha." }}
          </p>
          <div class="slide_buttons">
            <PrimaryButton @click="router.push('/produtos')">Explore Nossas Coleções</PrimaryButton>
            <WhiteButton @click="router.push('#whatsapp')">
              <i class="bi bi-whatsapp" aria-hidden="true"></i> Compre pelo WhatsApp
            </WhiteButton>
          </div>
        </div>
      </div>
    </div>
  </section>
  -->

  <section id="section_1" aria-label="Banners promocionais">
    <div class="banner_wrapper">
      <carousel
        v-if="state.banners.length"
        v-model="currentSlide"
        :items-to-show="1"
        :items-to-scroll="1"
        :snap-align="'start'"
        :autoplay="6000"
        :transition="4000"
        :wrapAround="true"
      >
        <slide v-for="(banner, index) in state.banners" :key="banner.id" @click="irParaLink(banner)">
          <picture class="slide_picture" :style="banner.url ? 'cursor: pointer' : ''">
            <source
              v-if="banner.imagem_cel"
              type="image/avif"
              media="(max-width: 600px)"
              :srcset="`${img(banner.imagem_cel, { width: 400, format: 'avif' })} 400w, ${img(banner.imagem_cel, { width: 600, format: 'avif' })} 600w`"
              sizes="100vw"
            />
            <source
              v-if="banner.imagem_cel"
              type="image/webp"
              media="(max-width: 600px)"
              :srcset="`${img(banner.imagem_cel, { width: 400, format: 'webp' })} 400w, ${img(banner.imagem_cel, { width: 600, format: 'webp' })} 600w`"
              sizes="100vw"
            />
            
            <source
              type="image/avif"
              media="(min-width: 601px)"
              :srcset="`${img(banner.imagem || '/placeholder-default.png', { width: 1024, format: 'avif' })} 1024w, ${img(banner.imagem || '/placeholder-default.png', { width: 1280, format: 'avif' })} 1280w, ${img(banner.imagem || '/placeholder-default.png', { width: 1920, format: 'avif' })} 1920w`"
              sizes="100vw"
            />
            <source
              type="image/webp"
              media="(min-width: 601px)"
              :srcset="`${img(banner.imagem || '/placeholder-default.png', { width: 1024, format: 'webp' })} 1024w, ${img(banner.imagem || '/placeholder-default.png', { width: 1280, format: 'webp' })} 1280w, ${img(banner.imagem || '/placeholder-default.png', { width: 1920, format: 'webp' })} 1920w`"
              sizes="100vw"
            />

            <img
              :src="img(banner.imagem || '/placeholder-default.png', { width: 1280, format: 'webp' })"
              class="slide_img"
              :alt="banner.titulo || 'Banner promocional'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :loading="index === 0 ? 'eager' : 'lazy'"
            />
          </picture>
        </slide>
        <template #addons>
          <navigation v-if="state.banners.length > 1">
            <template #prev>&lt;</template>
            <template #next>&gt;</template>
          </navigation>
          <pagination />
        </template>
      </carousel>
    </div>
  </section>
  <BrandsCarousel />

  <section id="section_mais_vendidos" aria-labelledby="mv_heading">
    <div class="mv_container">
      <h2 class="mv_title" id="mv_heading">Mais Vendidos</h2>
      <carousel
        v-if="state.destaque1.length"
        :items-to-scroll="1"
        :autoplay="7000"
        :wrap-around="true"
        :transition="500"
        :breakpoints="maisVendidosBreakpoints"
        class="mv_carousel"
      >
        <slide v-for="produto in state.destaque1" :key="produto.id">
          <div class="mv_slide_item">
            <ProdutoCard
              :produto="produto"
              @adicionar-carrinho="adicionarCarrinho"
            />
          </div>
        </slide>
      </carousel>
    </div>
  </section>

  <section id="section_categorias" aria-labelledby="cat_heading">
    <div class="cat_container">
      <nav aria-label="Grupos de produtos">
        <ul class="cat_grid">
          <li
            v-for="grupo in state.grupos.slice(0, 5)"
            :key="grupo.urn"
            class="cat_item"
          >
            <NuxtLink
              :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
              class="cat_link"
            >
              <NuxtImg
                :src="grupo.imagem || '/placeholder-default.png'"
                :alt="grupo.nome"
                class="cat_img"
              />
              <span class="cat_label">{{ grupo.nome }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </section>

  <section id="section_produtos" aria-labelledby="prod_heading">
    <div class="mv_container">
      <div class="prod_header">
        <h2 class="mv_title" style="margin-bottom:0" id="prod_heading">Produtos da Casa Bonita Eletros</h2>
        <nav
          @click="router.push('/produtos')"
          class="prod_filters"
          aria-label="Ver todos os produtos"
        >
          <button class="prod_filter_btn prod_filter_btn--active">
            Ver todos
          </button>
        </nav>
      </div>

      <p v-if="!state.produtosFiltrados.length" class="text-muted small">
        Nenhum produto com esta categoria foi encontrado
      </p>

      <Loader v-else-if="useIsLoading.isLoading" />

      <carousel
        v-else
        :items-to-scroll="1"
        :autoplay="7000"
        :wrap-around="true"
        :transition="500"
        :breakpoints="maisVendidosBreakpoints"
        class="mv_carousel"
      >
        <slide v-for="item in state.produtosFiltrados" :key="item.id">
          <div class="mv_slide_item">
            <ProdutoCard
              :produto="item"
              @adicionar-carrinho="adicionarCarrinho"
            />
          </div>
        </slide>
      </carousel>
    </div>
  </section>

  <section id="section_banner_destaque" aria-label="Produto em destaque">
    <div class="bd_container">
      <div class="bd_card">
        <NuxtImg
          :src="state.bannerDestaque.imagem || '/placeholder-default.png'"
          :alt="state.bannerDestaque.titulo"
          class="bd_img"
        />
        <div class="bd_overlay">
          <div class="bd_content">
            <span class="bd_tag">{{
              state.bannerDestaque.tag || "NOVIDADE EXCLUSIVA"
            }}</span>
            <h2 class="bd_titulo">
              {{
                state.bannerDestaque.titulo || "Refrigerador Inox French Door"
              }}
            </h2>
            <p class="bd_desc">
              {{
                state.bannerDestaque.descricao ||
                "Descubra a fusão perfeita entre design sofisticado e tecnologia de ponta."
              }}
            </p>
            <a :href="state.bannerDestaque.url || '#'" class="bd_btn">
              Conheça o Lançamento
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="section_selecao_premium" aria-labelledby="sp_heading">
    <div class="mv_container">
      <h2 class="mv_title" id="sp_heading">
        Seleção Premium: Cozinhas de Alto Padrão
      </h2>
      <carousel
        v-if="state.destaque2.length"
        :items-to-scroll="1"
        :autoplay="7000"
        :wrap-around="true"
        :transition="500"
        :breakpoints="maisVendidosBreakpoints"
        class="mv_carousel"
      >
        <slide v-for="item in state.destaque2" :key="item.id">
          <div class="mv_slide_item">
            <ProdutoCard
              :produto="item"
              @adicionar-carrinho="adicionarCarrinho"
            />
          </div>
        </slide>
      </carousel>
    </div>
  </section>

  <section id="section_combo" aria-label="Combo especial">
    <div class="mv_container">
      <div class="combo_card">
        <div class="combo_info">
          <span class="combo_tag">
            <i class="bi bi-bag-check" aria-hidden="true"></i>
            COMBO ESPECIAL
          </span>
          <h2 class="combo_titulo">{{ state.comboEspecial.titulo }}</h2>
          <p class="combo_desc" v-html="state.comboEspecial.descricao"></p>
          <p class="combo_preco">
            {{ formatPreco(state.comboEspecial.preco) }}
          </p>
          <span
            v-if="state.comboEspecial.parcelas === 1"
            class="mv_frete text-center"
            >Frete Grátis</span
          >
          <div class="combo_meta">
            <span v-if="state.comboEspecial.parcelas !== 1" class="mv_parcelas">
              {{ state.comboEspecial.parcelas }}x de
              {{ formatPreco(state.comboEspecial.valor_parcela) }}
            </span>
            <span v-if="state.comboEspecial.parcelas !== 1" class="mv_frete"
              >Frete Grátis</span
            >
          </div>
          <div class="combo_action">
            <OutlineButton
              @click="router.push(`/combos/${state.comboEspecial.id}`)"
            >
              Garantir Combo
            </OutlineButton>
          </div>
        </div>

        <div class="combo_produtos">
          <div
            v-for="(produto, index) in state.comboEspecial.produtos"
            :key="produto.id"
            class="combo_produto_wrap"
          >
            <div class="combo_produto">
              <div class="combo_img_wrap">
                <NuxtImg
                  :src="produto.imagem || '/placeholder-default.png'"
                  :alt="produto.nome"
                  class="combo_img"
                />
              </div>
              <span class="combo_produto_nome">{{ produto.nome }}</span>
            </div>
            <span
              v-if="index < state.comboEspecial.produtos.length - 1"
              class="combo_plus"
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="newsletter" class="newsletter_section">
    <div class="newsletter_img_wrap">
      <NuxtImg src="/images/fogaoNewsletter.jpeg" class="newsletter_img" />
    </div>
    <Newsletter />
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import services from "@/services/axios";
import BrandsCarousel from "@/components/Brandscarousel.vue";

const router = useRouter();
const { carregarGruposSite } = useSiteData();
const img = useImage();

useHead({ title: "Casa Bonita Eletros" });
definePageMeta({ layout: "site" });

const currentSlide = ref(0);

const maisVendidosBreakpoints = {
  0: { itemsToShow: 1, snapAlign: "start" },
  540: { itemsToShow: 2, snapAlign: "start" },
  768: { itemsToShow: 3, snapAlign: "start" },
  1024: { itemsToShow: 4, snapAlign: "start" },
};

const state = reactive({
  banners: [],
  grupos: [],
  destaque1: [],
  destaque2: [],
  destaque3: [],
  produtosFiltrados: [],
  todosAtivos: [],
  bannerDestaque: {
    titulo: "Refrigerador Inox French Door",
    tag: "NOVIDADE EXCLUSIVA",
    descricao:
      "Descubra a fusão perfeita entre design sofisticado e tecnologia de ponta. Amplo espaço interno, acabamento em inox e funcionalidades inteligentes para preservar seus alimentos com estilo.",
    imagem: "/images/produtos/refrigerador-banner.jpg",
    url: "/produto/refrigerador-french-door",
  },
  comboEspecial: {
    id: null,
    titulo: "O Combo Perfeito para sua Cozinha",
    descricao:
      "Transforme sua cozinha com o combo perfeito: <strong>coifa moderna</strong> para eliminar odores e <strong>forno de embutir</strong> para preparar receitas com precisão.",
    preco: 0,
    parcelas: 1,
    valor_parcela: null,
    produtos: [],
  },
});

const { data: homePayload } = await useAsyncData('home-data', async () => {
  const [bannersRes, gruposRes, produtosHomeRes, produtosAtivosRes, comboRes] = await Promise.allSettled([
    services.banners.getBannerTop(),
    carregarGruposSite(),
    services.produtos.getAllSite(),
    services.produtos.getProdutosAtivos(),
    services.combos.getAllDestaques()
  ]);

  let payload = {
    banners: [],
    grupos: [],
    destaque1: [],
    destaque2: [],
    destaque3: [],
    produtosFiltrados: [],
    todosAtivos: [],
    bannerDestaque: {
      titulo: "Refrigerador Inox French Door",
      tag: "NOVIDADE EXCLUSIVA",
      descricao: "Descubra a fusão perfeita entre design sofisticado e tecnologia de ponta. Amplo espaço interno, acabamento em inox e funcionalidades inteligentes para preservar seus alimentos com estilo.",
      imagem: "/images/produtos/refrigerador-banner.jpg",
      url: "/produto/refrigerador-french-door",
    },
    comboEspecial: {
      id: null,
      titulo: "O Combo Perfeito para sua Cozinha",
      descricao: "Transforme sua cozinha com o combo perfeito: <strong>coifa moderna</strong> para eliminar odores e <strong>forno de embutir</strong> para preparar receitas com precisão.",
      preco: 0,
      parcelas: 1,
      valor_parcela: null,
      produtos: [],
    }
  };

  if (bannersRes.status === 'fulfilled' && bannersRes.value?.data) {
    const val = bannersRes.value.data;
    const bannersHero = val.filter((b) => b.categoria === "hero");
    payload.banners = bannersHero.length ? bannersHero : [{ imagem: "/images/hero1.jpg" }];

    const secundario = val
      .filter((b) => b.categoria === "secundario")
      .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))[0];
    if (secundario) payload.bannerDestaque = secundario;
  } else {
    payload.banners = [{ imagem: "/images/hero1.jpg" }];
  }

  if (gruposRes.status === 'fulfilled' && gruposRes.value?.length) {
    payload.grupos = gruposRes.value;
  }

  if (produtosHomeRes.status === 'fulfilled' && produtosHomeRes.value?.data) {
    payload.destaque1 = produtosHomeRes.value.data.destaque1 || [];
    payload.destaque2 = produtosHomeRes.value.data.destaque2 || [];
    payload.destaque3 = produtosHomeRes.value.data.destaque3 || [];
  }

  if (produtosAtivosRes.status === 'fulfilled' && produtosAtivosRes.value?.data?.length) {
    payload.todosAtivos = produtosAtivosRes.value.data;
    payload.produtosFiltrados = produtosAtivosRes.value.data;
  }

  if (comboRes.status === 'fulfilled' && comboRes.value?.data) {
    const lista = comboRes.value.data.data ?? comboRes.value.data ?? [];
    const ativos = lista.filter(
      (c) => c.status === "ATIVO" && c.destaque === "SIM"
    );
    if (ativos.length) {
      const combo = ativos[0];
      payload.comboEspecial = {
        id: combo.id,
        titulo: combo.descricao,
        descricao: combo.descricao,
        preco: combo.valor_total,
        parcelas: combo.parcelas ?? 1,
        valor_parcela: combo.valor_parcela ?? null,
        produtos: [
          {
            id: combo.produto1.id,
            nome: combo.produto1.nome,
            imagem: combo.produto1.imagens?.[0]?.imagem ?? "/placeholder-default.png",
          },
          {
            id: combo.produto2.id,
            nome: combo.produto2.nome,
            imagem: combo.produto2.imagens?.[0]?.imagem ?? "/placeholder-default.png",
          },
        ],
      };
    }
  }

  return payload;
});

if (homePayload.value) {
  Object.assign(state, homePayload.value);
}

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function irParaLink(banner) {
  if (!banner.url) return;
  if (banner.url.startsWith('http')) {
    window.location.href = banner.url;
  } else {
    router.push(banner.url);
  }
}

function adicionarCarrinho(produto) {
  console.log("Adicionado ao carrinho:", produto);
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

/* ── BANNER ANTIGO (CSS) — comentado junto com o HTML ──────────────────────────
#section_1 { width: 100%; position: relative; }
.hero_wrapper { position: relative; width: 100%; height: fit-content; }
:deep(.carousel), :deep(.carousel__viewport), :deep(.carousel__track), :deep(.carousel__slide) { height: 100%; }
.slide_img { width: 100%; height: 100vh; object-fit: cover; display: block; }
.slide_overlay { position: absolute; inset: 0; z-index: 2; display: flex; align-items: center; background: rgba(0,0,0,0.45); pointer-events: none; }
.slide_content { width: 100%; max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 2rem; transform: translateY(-8vh); }
.slide_buttons { pointer-events: all; display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.slide_tag { display: inline-block; border: 1px solid rgba(255,255,255,0.6); border-radius: 999px; padding: 6px 18px; font-size: 12px; font-weight: 500; letter-spacing: .1em; margin-bottom: 1.5rem; color: #fff; }
.slide_content h1 { font-size: 44.8px; font-weight: 600; line-height: 1.2; margin-bottom: 1.2rem; color: #fff; }
.slide_content p { font-size: 14px; font-weight: 400; line-height: 1.7; color: rgba(255,255,255,0.85); margin-bottom: 2rem; max-width: 50vw; text-align: center; }
:deep(.carousel__pagination) { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); gap: 6px; z-index: 3; }
:deep(.carousel__pagination-button::after) { background: rgba(255,255,255,0.5); width: 10px; height: 10px; border-radius: 50%; }
:deep(.carousel__pagination-button--active::after) { background: #fff; }
────────────────────────────────────────────────────────────────────────────── */

/* ── NOVO BANNER ROTATIVO ─────────────────────────────────────────────────── */
#section_1 {
  width: 100%;
}

.banner_wrapper {
  position: relative;
  width: 100%;
  line-height: 0;
  aspect-ratio: 3.3103;
  background-color: #f0f0f0;

  @media (max-width: 600px) {
    aspect-ratio: 1.3386;
  }
}

:deep(.carousel),
:deep(.carousel__viewport),
:deep(.carousel__track),
:deep(.carousel__slide) {
  width: 100%;
}

.slide_picture {
  width: 100%;
  display: block;
  line-height: 0;
}

.slide_img {
  width: 100%;
  height: auto;
  display: block;
}

:deep(.carousel__pagination) {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  gap: 6px;
  z-index: 3;
  margin: 0;
}

:deep(.carousel__pagination-button::after) {
  background: rgba(255, 255, 255, 0.5);
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

:deep(.carousel__pagination-button--active::after) {
  background: #fff;
}

.banner_wrapper :deep(.carousel__prev),
.banner_wrapper :deep(.carousel__next) {
  width: 58px;
  height: 84px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 86px;
  font-weight: 100;
  line-height: 0.7;
  opacity: 0.76;
  text-shadow: 0 3px 16px rgba(0, 0, 0, 0.45);
  transform: translateY(-50%);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  z-index: 4;
}

.banner_wrapper :deep(.carousel__prev) {
  left: 28px;
}

.banner_wrapper :deep(.carousel__next) {
  right: 28px;
}

.banner_wrapper :deep(.carousel__prev:hover),
.banner_wrapper :deep(.carousel__next:hover) {
  opacity: 1;
  transform: translateY(-50%) scale(1.08);
}

.banner_wrapper :deep(.carousel__prev:focus-visible),
.banner_wrapper :deep(.carousel__next:focus-visible) {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

#section_mais_vendidos {
  width: 100%;
  padding: 60px 0 80px;
  background: #fff;
}

.mv_carousel {
  width: 100%;
}

.mv_slide_item {
  padding: 0 0.625rem;
  width: 100%;
}

.mv_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.mv_title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.mv_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.mv_grid_newsletter {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

#section_categorias {
  width: 100%;
  padding: 0 0 80px;
  background: #fff;
}

.cat_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cat_grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 450px;
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cat_item:nth-child(1) {
  grid-column: 1 / 5;
  grid-row: 1;
}
.cat_item:nth-child(2) {
  grid-column: 5 / 7;
  grid-row: 1;
}
.cat_item:nth-child(3) {
  grid-column: 1 / 3;
  grid-row: 2;
}
.cat_item:nth-child(4) {
  grid-column: 3 / 5;
  grid-row: 2;
}
.cat_item:nth-child(5) {
  grid-column: 5 / 7;
  grid-row: 2;
}

.cat_link {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    pointer-events: none;
    z-index: 1;
  }
}

.cat_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;

  .cat_link:hover & {
    transform: scale(1.04);
  }
}

.cat_label {
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 2;
}

#section_produtos {
  width: 100%;
  padding: 60px 0 80px;
  background: #fff;
}

.prod_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.prod_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.prod_title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #1a1a1a;
}

.prod_filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.prod_filter_btn {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1.5px solid #d0d0d0;
  background: #fff;
  color: #444;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  &--active {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;

    &:hover {
      opacity: 0.9;
      color: #fff;
    }
  }
}

.prod_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.prod_with_newsletter {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: start;

  @media (max-width: 64rem) {
    grid-template-columns: 1fr;
  }
}

#section_banner_destaque {
  width: 100%;
  padding: 0 0 80px;
  background: #fff;
}

.bd_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.bd_card {
  position: relative;
  width: 100%;
  height: 512px;
  border-radius: 16px;
  overflow: hidden;
}

.bd_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bd_overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.72) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
}

.bd_content {
  padding: 2.5rem;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.75rem;
}

.bd_tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #fff;
  width: fit-content;
}

.bd_titulo {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0;
}

.bd_desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.65;
  margin: 0;
}

.bd_btn {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 11px 24px;
  background: #fff;
  color: #1a1a1a;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: var(--primary);
    color: #fff;
  }
}

#section_selecao_premium {
  width: 100%;
  padding: 60px 0 80px;
  background: #fff;
}

#section_combo {
  width: 100%;
  padding: 0 0 80px;
  background: #fff;
}

.combo_card {
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.combo_info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 240px;
  max-width: 280px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.combo_tag {
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
  width: fit-content;
}

.combo_titulo {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.25;
  margin: 0;
}

.combo_desc {
  font-size: 13px;
  color: #555;
  line-height: 1.65;
  margin: 0;
}

.combo_preco {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.combo_meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.combo_action {
  display: flex;
}

.mv_parcelas {
  font-size: 13px;
  color: #555;
}

.mv_frete {
  font-size: 12px;
  font-weight: 600;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 3px 10px;
  border-radius: 999px;
}

.combo_produtos {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.combo_produto_wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.combo_produto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.combo_img_wrap {
  width: 15rem;
  height: 15rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.combo_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.combo_produto_nome {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  text-align: center;
  max-width: 140px;
}

.combo_plus {
  font-size: 1.5rem;
  font-weight: 700;
  color: #aaa;
  flex-shrink: 0;
  line-height: 1;
  margin-bottom: 2.25rem;
}

.newsletter_section {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 80px;
  padding: 0 2rem;
}

.newsletter_img_wrap {
  width: 320px;
  height: auto;
  max-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media screen and (max-width: 540px) {
    display: none;
  }
}

.newsletter_img {
  width: 100%;
  max-width: 320px;
  max-height: 260px;
  height: auto;
  display: block;
  object-fit: contain;
}

@media (max-width: 1024px) {
  .mv_grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cat_grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  .cat_item:nth-child(1),
  .cat_item:nth-child(2),
  .cat_item:nth-child(3),
  .cat_item:nth-child(4),
  .cat_item:nth-child(5) {
    grid-column: span 1;
    grid-row: auto;
    height: 200px;
  }

  .prod_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cat_grid {
    grid-template-columns: 1fr 1fr;
  }

  .cat_item:nth-child(1) {
    grid-column: span 2;
    height: 200px;
  }

  .cat_item:nth-child(2),
  .cat_item:nth-child(3),
  .cat_item:nth-child(4),
  .cat_item:nth-child(5) {
    grid-column: span 1;
    grid-row: auto;
    height: 160px;
  }

  .prod_header {
    flex-direction: column;
    align-items: flex-start;
  }

  .bd_overlay {
    align-items: center;
  }

  .bd_card {
    height: 26.25rem;
  }

  .bd_titulo {
    font-size: 1.5rem;
  }

  .combo_produtos {
    flex-direction: column;
  }

  .combo_info {
    display: contents;
  }

  .combo_tag,
  .combo_titulo,
  .combo_desc,
  .combo_preco,
  .combo_meta,
  .combo_info > .mv_frete {
    width: 100%;
  }

  .combo_produtos {
    order: 6;
  }

  .combo_action {
    order: 7;
    width: 100%;
    justify-content: center;
  }

  .combo_action :deep(button) {
    width: 100%;
  }

  .combo_produto_wrap {
    flex-direction: column;
    align-items: center;
  }

  .newsletter_img_wrap {
    width: 100%;
    max-height: 220px;
  }

  .mv_grid_newsletter {
    grid-template-columns: 1fr;
    width: 100%;
  }
}

@media (max-width: 540px) {
  .banner_wrapper :deep(.carousel__prev),
  .banner_wrapper :deep(.carousel__next) {
    width: 42px;
    height: 62px;
    font-size: 64px;
  }

  .banner_wrapper :deep(.carousel__prev) {
    left: 12px;
  }

  .banner_wrapper :deep(.carousel__next) {
    right: 12px;
  }

  .mv_grid {
    grid-template-columns: 1fr;
  }

  .cat_grid {
    grid-template-columns: 1fr;
  }

  .cat_item,
  .cat_item:nth-child(n) {
    grid-column: span 1;
    grid-row: auto;
    height: 180px;
  }

  .prod_grid {
    grid-template-columns: 1fr;
  }

  .bd_card {
    height: 380px;
    border-radius: 12px;
  }

  .bd_overlay {
    align-items: flex-end;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .bd_content {
    padding: 1.5rem;
  }

  .bd_titulo {
    font-size: 1.3rem;
  }

  .mv_grid_newsletter {
    grid-template-columns: 1fr;
    width: 100%;
  }
}
</style>
