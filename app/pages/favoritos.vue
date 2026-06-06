<template>
  <main id="page_favoritos" aria-labelledby="fav_heading">
    <div class="fav_container">
      <h1 class="fav_title" id="fav_heading">Lista de Favoritos</h1>

      <div v-if="itens.length === 0" class="fav_empty" role="status">
        <i class="bi bi-heart" aria-hidden="true"></i>
        <p>Você ainda não tem produtos favoritos.</p>
        <NuxtLink to="/" class="fav_back_btn">Explorar produtos</NuxtLink>
      </div>

      <ul v-else class="fav_list" aria-label="Produtos favoritos">
        <li v-for="item in itens" :key="item.id" class="fav_item">
          <div class="fav_img_wrap">
            <img
              :src="item.imagem || '/placeholder-default.png'"
              :alt="item.nome"
              class="fav_img"
              @error="(e) => (e.target.src = '/placeholder-default.png')"
            />
          </div>

          <div class="fav_info">
            <p class="fav_nome">{{ item.nome }}</p>
            <p class="fav_codigo">
              Código: <span>{{ item.codigo }}</span>
            </p>
            <p
              class="fav_estoque"
              :class="item.disponivel ? 'estoque--ok' : 'estoque--out'"
            >
              Estoque: {{ item.disponivel ? "Disponível" : "Indisponível" }}
            </p>
          </div>

          <div
            class="fav_qty"
            role="group"
            :aria-label="'Quantidade de ' + item.nome"
          >
            <button
              class="qty_btn"
              @click="decrementar(item)"
              :disabled="item.quantidade <= 1"
              :aria-label="'Diminuir quantidade de ' + item.nome"
            >
              <i class="bi bi-dash" aria-hidden="true"></i>
            </button>
            <span class="qty_value" aria-live="polite">{{
              item.quantidade
            }}</span>
            <button
              class="qty_btn"
              @click="incrementar(item)"
              :aria-label="'Aumentar quantidade de ' + item.nome"
            >
              <i class="bi bi-plus" aria-hidden="true"></i>
            </button>
          </div>

          <p
            class="fav_preco mb-0"
            :aria-label="'Preço: ' + formatPreco(item.preco * item.quantidade)"
          >
            {{ formatPreco(item.preco * item.quantidade) }}
          </p>

          <button
            class="fav_btn_cart"
            @click="adicionarCarrinho(item)"
            :aria-label="'Adicionar ' + item.nome + ' ao carrinho'"
          >
            Adicionar ao carrinho
            <i class="bi bi-cart3" aria-hidden="true"></i>
          </button>

          <button
            class="fav_remove"
            @click="remover(item)"
            :aria-label="'Remover ' + item.nome + ' dos favoritos'"
          >
            <i class="bi bi-x" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
definePageMeta({ layout: "site" });

useHead(() => ({
  title: "Casa Bonita Eletros - Favoritos",
}));

import { useFavoritosStore } from "@/stores/favoritos";
const store = useFavoritosStore();
const { itens } = storeToRefs(store);

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

const remover = (item) => store.remover(item.id);
const incrementar = (item) => store.incrementar(item.id);
const decrementar = (item) => store.decrementar(item.id);
const adicionarCarrinho = (item) => {
  /* sua lógica de carrinho */
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_favoritos {
  min-height: 80vh;
  padding: 48px 0 80px;
}

.fav_container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 2rem;
}

.fav_title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 2rem;
}

.fav_list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
}

.fav_item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.4rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

/* Imagem */
.fav_img_wrap {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.fav_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Info */
.fav_info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.fav_nome {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fav_codigo {
  font-size: 12px;
  color: #888;
  span {
    color: #555;
  }
}

.fav_estoque {
  font-size: 12px;
  font-weight: 500;
  &.estoque--ok {
    color: #1daa60;
  }
  &.estoque--out {
    color: #e03;
  }
}

/* Quantidade */
.fav_qty {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  height: 36px;
  flex-shrink: 0;
}

.qty_btn {
  width: 36px;
  height: 36px;
  background: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
}

.qty_value {
  width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #111;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  line-height: 36px;
  display: block;
}

/* Preço */
.fav_preco {
  font-size: 15px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  min-width: 110px;
  text-align: right;
}

/* Botão carrinho */
.fav_btn_cart {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 18px;
  background: #1a2744;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;

  i {
    font-size: 15px;
  }

  &:hover {
    opacity: 0.85;
  }
}

/* Remover */
.fav_remove {
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #aaa;
  font-size: 20px;
  border-radius: 50%;
  transition:
    color 0.2s,
    background 0.2s;

  &:hover {
    color: #e03;
    background: #fff0f0;
  }
}

.fav_empty {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e8e8e8;
  padding: 4rem 2rem;
  text-align: center;
  color: #999;

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }
  p {
    font-size: 15px;
    margin-bottom: 1.5rem;
  }
}

.fav_back_btn {
  display: inline-block;
  background: $primary;
  color: #fff;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }
}

@media (max-width: 900px) {
  .fav_item {
    grid-template-columns: 64px 1fr auto;
    grid-template-rows: auto auto;
    row-gap: 0.75rem;
  }

  .fav_qty {
    grid-column: 2;
    grid-row: 2;
  }

  .fav_preco {
    grid-column: 3;
    grid-row: 2;
    min-width: unset;
  }

  .fav_btn_cart {
    grid-column: 2 / 4;
    grid-row: 3;
    justify-self: start;
  }

  .fav_remove {
    grid-column: 3;
    grid-row: 1;
    justify-self: end;
  }
}

@media (max-width: 480px) {
  .fav_btn_cart {
    width: 100%;
    justify-content: center;
  }
}
</style>
