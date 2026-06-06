<template>
  <div class="pag-wrap">
    <p class="pag-info">Exibindo {{ from }}–{{ to }} de {{ total }} produtos</p>

    <div class="pag-controls">
      <button
        class="pag-btn pag-arrow"
        :disabled="currentPage === 1"
        @click="mudarPagina(currentPage - 1)"
      >
        <i class="bi bi-arrow-left"></i>
      </button>

      <template v-for="p in paginas" :key="p">
        <button v-if="p === '...'" class="pag-btn dots" disabled>···</button>
        <button
          v-else
          class="pag-btn"
          :class="{ active: p === currentPage }"
          @click="mudarPagina(p)"
        >
          {{ p }}
        </button>
      </template>

      <button
        class="pag-btn pag-arrow"
        :disabled="currentPage === lastPage"
        @click="mudarPagina(currentPage + 1)"
      >
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  lastPage: { type: Number, required: true },
  total: { type: Number, required: true },
  perPage: { type: Number, default: 16 },
  from: { type: Number, required: true },
  to: { type: Number, required: true },
});

const emit = defineEmits(["update:currentPage"]);

function mudarPagina(page) {
  if (page < 1 || page > props.lastPage) return;
  emit("update:currentPage", page);
}

const paginas = computed(() => {
  const { currentPage: c, lastPage: last } = props;
  if (last <= 9) return Array.from({ length: last }, (_, i) => i + 1);
  const pages = [1];
  if (c > 4) pages.push("...");
  for (let i = Math.max(2, c - 2); i <= Math.min(last - 1, c + 2); i++) {
    pages.push(i);
  }
  if (c < last - 3) pages.push("...");
  pages.push(last);
  return pages;
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.pag-wrap {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  padding: 1rem 0;
}
.pag-info {
  font-size: 13px;
  color: #666;
  margin: 0;
}
.pag-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.pag-btn {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.15s ease-in-out;
  border: 1px solid transparent;
}
.pag-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border: 1px solid $primary;
  color: black;
}
.pag-btn.active {
  background: $primary;
  color: #fff;
  border-color: $primary;
  font-weight: 500;
}
.pag-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.pag-btn.dots {
  border: none;
  background: transparent;
}
.pag-arrow {
  background-color: $primary;
  color: white;
  line-height: 1;
}
</style>
