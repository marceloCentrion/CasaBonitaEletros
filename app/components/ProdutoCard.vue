<template>
  <div class="mv_card">
    <button
      class="mv_wishlist"
      @click="handleFavoritar"
      :aria-label="'Favoritar ' + produto.nome"
    >
      <i
        :class="isFavorito ? 'bi bi-heart-fill' : 'bi bi-heart'"
        aria-hidden="true"
      ></i>
    </button>

    <NuxtLink
      :to="produto.url || '/produto/' + produto.urn"
      class="mv_img_wrap"
      :aria-label="produto.nome"
    >
      <NuxtImg
        :src="
          produto.imagens?.[0]?.imagem_thumb ||
          produto.imagem?.imagem_thumb ||
          '/placeholder-default.png'
        "
        :alt="produto.nome"
        class="mv_img"
      />
    </NuxtLink>

    <div class="mv_info">
      <span v-if="produto.marca" class="mv_marca">
        {{ produto.marca.nome || produto.marca }}
      </span>

      <a :href="produto.url || '/produto/' + produto.urn" class="mv_nome">
        {{ produto.nome }}
      </a>

      <p class="mv_preco" :aria-label="'Preço: ' + formatPreco(produto.preco)">
        {{ formatPreco(produto.preco) }}
      </p>

      <p
        v-if="produto.preco_pix && produto.preco_pix < produto.preco"
        class="mv_preco_pix"
      >
        {{ formatPreco(produto.preco_pix) }} no Pix
      </p>

      <div class="mv_meta">
        <span class="mv_parcelas">
          {{ produto.parcelas }}x de {{ formatPreco(produto.preco_parcela) }}
        </span>
        <span class="mv_frete">Frete Grátis</span>
      </div>

      <div class="mv_actions">
        <SecButton :disabled="adicionado" @click="handleAdicionarCarrinho">
          <template v-if="adicionado">
            Adicionado!
            <i class="bi bi-check-lg" aria-hidden="true"></i>
          </template>
          <template v-else>
            Adicionar ao carrinho
            <i class="bi bi-cart3 ms-2" aria-hidden="true"></i>
          </template>
        </SecButton>

        <a
          :href="linkWhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          class="mv_btn_whatsapp"
          :aria-label="'Comprar ' + produto.nome + ' pelo WhatsApp'"
        >
          <i class="bi bi-whatsapp" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarrinhoStore } from "@/stores/carrinho";
import { useToast } from "@/composables/useToast";

const toast = useToast();

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
});

const carrinho = useCarrinhoStore();
const adicionado = ref(false);

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function handleAdicionarCarrinho() {
  try {
    carrinho.adicionarItem(props.produto);
    adicionado.value = true;
    toast.success("Salvo no carrinho com sucesso!");
  } catch (error) {
    console.error(error);
    toast.error(
      "Ocorreu um erro ao adicionar ao carrinho, tente novamente mais tarde",
    );
  }
}

const linkWhatsApp = computed(() => {
  const numero = "5500000000000";
  const msg = encodeURIComponent(
    `Olá! Tenho interesse no produto: ${props.produto.nome} - ${formatPreco(props.produto.preco)}`,
  );
  return `https://wa.me/${numero}?text=${msg}`;
});

import { useFavoritosStore } from "@/stores/favoritos";
const favoritosStore = useFavoritosStore();

const isFavorito = computed(() => favoritosStore.isFavorito(props.produto.id));

function handleFavoritar() {
  favoritosStore.toggleFavorito(props.produto);
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.mv_card {
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 1.25rem 1rem 1rem;
  display: flex;
  height: 100%;
  flex-direction: column;
}

.mv_wishlist {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f5f5f5;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  font-size: 15px;
  transition-duration: 0.2s;
  z-index: 1;

  &:hover {
    background: #f0f2fd;
    color: $primary;
    border: 1px solid $primary;
  }
}

.mv_img_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  margin-bottom: 1.1rem;
  overflow: hidden;
}

.mv_img {
  max-width: 100%;
  width: 90%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  .mv_card:hover & {
    transform: scale(1.04);
  }
}

.mv_info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mv_marca {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.mv_nome {
  font-size: 13.5px;
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.45;
  margin-bottom: 0.65rem;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: $primary;
  }
}

.mv_preco {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.2rem;
}

.mv_preco_pix {
  font-size: 13px;
  color: $primary;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.mv_meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.mv_parcelas {
  font-size: 12px;
  color: #666;
}

.mv_frete {
  font-size: 12px;
  font-weight: 600;
  color: $primary;
}

.mv_actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: auto;
}

.mv_btn_cart {
  flex: 1;
  background: $primary;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 11px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition:
    opacity 0.2s,
    background 0.2s;

  i {
    font-size: 15px;
  }

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &--adicionado {
    background: $primary;
    cursor: default;
    opacity: 1 !important;
  }
}

.mv_btn_whatsapp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid #e0e0e0;
  line-height: 1;
  background: #fff;
  color: black;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition:
    background 0.2s,
    border-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #f0f2fd;
    border-color: $primary;
  }

  i {
    line-height: 1;
    display: block;
  }
}
</style>
