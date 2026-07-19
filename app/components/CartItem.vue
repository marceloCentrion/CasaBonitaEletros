<template>
  <li
    class="cart_item list-group-item px-3 py-4 "
    :class="{ 'border-bottom-0': isLast }"
  >
    <div class="cart_item_img_wrap flex-shrink-0">
      <img
      :src="item.imagem || '/placeholder-default.png'"
        :alt="item.nome"
        class="cart_item_img"
        @error="(e) => (e.target.src = '/placeholder-default.png')"
      />
    </div>

    <div class="cart_item_info d-flex flex-column gap-1 flex-grow-1 min-w-0">
      <p class="cart_item_nome mb-0 fw-semibold text-truncate">
        {{ item.nome }}
      </p>
      <p class="cart_item_codigo mb-0 text-muted small">
        Código: <span class="text-secondary">{{ item.codigo }}</span>
      </p>
      <p
        class="cart_item_estoque mb-0 small fw-medium"
        :class="item.disponivel ? 'text-success' : 'text-danger'"
      >
        Estoque: {{ item.disponivel ? "Disponível" : "Indisponível" }}
      </p>
    </div>

    <div
      class="cart_item_qty input-group input-group-sm flex-nowrap"
      role="group"
      :aria-label="'Quantidade de ' + item.nome"
    >
      <button
        class="qty_btn btn btn-outline-secondary"
        type="button"
        @click="$emit('decrementar', item)"
        :disabled="item.quantidade <= 1"
        :aria-label="'Diminuir quantidade de ' + item.nome"
      >
        <i class="bi bi-dash" aria-hidden="true"></i>
      </button>
      <span class="qty_value input-group-text fw-semibold" aria-live="polite">{{
        item.quantidade
      }}</span>
      <button
        class="qty_btn btn btn-outline-secondary"
        type="button"
        @click="$emit('incrementar', item)"
        :aria-label="'Aumentar quantidade de ' + item.nome"
      >
        <i class="bi bi-plus" aria-hidden="true"></i>
      </button>
    </div>

    <p
      class="cart_item_preco mb-0 fw-bold text-end text-nowrap"
      :aria-label="'Preço: ' + formatPreco(item.preco * item.quantidade)"
    >
      {{ formatPreco(item.preco * item.quantidade) }}
    </p>

    <button
      class="cart_item_remove btn btn-link p-0 text-secondary"
      type="button"
      @click="$emit('remover', item)"
      :aria-label="'Remover ' + item.nome + ' do carrinho'"
    >
      <i class="bi bi-x fs-5" aria-hidden="true"></i>
    </button>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["incrementar", "decrementar", "remover"]);

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables";

.cart_item {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 1.25rem;
  border-left: none;
  border-right: none;
  border-top: 1px solid #f0f0f0;
  border-bottom: none;
  border-radius: 0;

  &:first-child {
    border-top: none;
  }
}

.cart_item_img_wrap {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
}

.cart_item_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cart_item_nome {
  font-size: 14px;
}

.cart_item_info {
  min-width: 0;
}

.cart_item_codigo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart_item_qty {
  width: auto;

  .qty_btn {
    width: 32px;
    height: 36px;
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
    width: 36px;
    font-size: 14px;
    border-color: #e0e0e0;
    background: #fff;
    justify-content: center;
  }
}

.cart_item_preco {
  font-size: 15px;
  min-width: 110px;
}

.cart_item_remove {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition:
    color 0.2s,
    background 0.2s;
  text-decoration: none;

  &:hover {
    color: #ee0033 !important;
    background: #fff0f0;
  }
}

@media (max-width: 600px) {
  .cart_item {
    grid-template-columns: 64px minmax(0, 1fr) auto;
    grid-template-rows: auto auto;
    row-gap: 0.75rem;

    .cart_item_qty {
      grid-column: 2;
      grid-row: 2;
    }

    .cart_item_preco {
      grid-column: 3;
      grid-row: 2;
      min-width: unset;
    }

    .cart_item_remove {
      grid-column: 3;
      grid-row: 1;
      justify-self: end;
    }
  }
}
</style>
