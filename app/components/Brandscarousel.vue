<template>
  <section id="section_marcas" aria-labelledby="marcas_heading">
    <div class="marcas_container">
      <h2 class="marcas_title" id="marcas_heading">Marcas Parceiras</h2>

      <div class="marcas_track_wrapper">
        <div class="marcas_track" :style="trackStyle">
          <NuxtLink
            v-for="(marca, index) in duplicatedMarcas"
            :key="`${marca.nome}-${index}`"
            :to="{ path: '/produtos', query: { marca: marca.id } }"
            class="marca_item"
            :aria-label="`Ver produtos ${marca.nome}`"
          >
            <NuxtImg
              :src="marca.logo"
              :alt="marca.nome"
              class="marca_logo"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import services from "@/services/axios";

const marcas = ref([]);

const duplicatedMarcas = computed(() =>
  marcas.value.length ? [...marcas.value, ...marcas.value] : []
);

const isPaused = ref(false);

const trackStyle = computed(() => ({
  animationPlayState: isPaused.value ? "paused" : "running",
}));

onMounted(async () => {
  try {
    const { data } = await services.marcas.marcasAtivas();
    const lista = [data?.marcas, data?.data, data].find(Array.isArray) ?? [];
    const comLogo = lista.filter((m) => m.logo || m.imagem);
    if (comLogo.length) {
      marcas.value = comLogo.map((m) => {
        const logo = m.logo ?? m.imagem;
        return {
          id:   m.marca_id ?? m.id,
          nome: m.marca_nome ?? m.nome ?? "",
          logo: logo.startsWith('http')
            ? logo
            : `https://api.cozinharteeletros.com.br/storage/${logo}`,
        };
      });
    }
  } catch (err) {
    console.error("Erro ao carregar marcas:", err);
  }
});
</script>

<style lang="scss">
@use "@/assets/scss/variables" as *;

#section_marcas {
  width: 100%;
  padding: 60px 0;
  background-color: #ffffff !important;
  position: relative;
  z-index: 1;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .marcas_container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .marcas_title {
    font-size: 1.7rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2.5rem;
  }

  .marcas_track_wrapper {
    overflow: hidden;
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 80px;
      z-index: 2;
      pointer-events: none;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, #ffffff, transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, #ffffff, transparent);
    }
  }

  .marcas_track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: scroll-marcas 32s linear infinite;

    &:hover {
      animation-play-state: paused;
    }
  }

  @keyframes scroll-marcas {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Item */
  .marca_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3rem;
    height: 80px;
    border-right: 1px solid #ebebeb;
    flex-shrink: 0;
    cursor: pointer;
    text-decoration: none;

    &:last-child {
      border-right: none;
    }
  }

  .marca_logo {
    height: 56px;
    width: auto;
    max-width: 150px;
    min-width: 120px;
    object-fit: contain;
    filter: grayscale(100%) opacity(35%);
    transition: filter 0.35s ease;
    user-select: none;
  }

  .marca_item:hover .marca_logo {
    filter: grayscale(0%) opacity(100%);
  }

  @media (max-width: 768px) {
    .marcas_track_wrapper {
      &::before,
      &::after { width: 40px; }
    }

    .marca_item {
      padding: 0 2rem;
      height: 64px;
    }

    .marca_logo {
      height: 44px;
    }
  }

  @media (max-width: 540px) {
    .marca_item { padding: 0 1.5rem; }
    .marcas_title { font-size: 1.3rem; }

    .marca_logo {
      height: 36px;
    }
  }
}
</style>