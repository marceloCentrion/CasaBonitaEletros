import { defineStore } from "pinia";

const STORAGE_KEY = "checkout";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    itens: [],
  }),

  getters: {
    subtotal: (state) =>
      state.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
    total: (state) =>
      state.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0),
    totalPix: (state) => {
      const total = state.itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
      const valor = total * 0.95;
      return { valor, economia: total - valor };
    },
    quantidade: (state) =>
      state.itens.reduce((acc, i) => acc + i.quantidade, 0),
  },

  actions: {
    iniciar(itens) {
      this.itens = itens;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ itens }));
    },

    restaurar() {
      try {
        const salvo = sessionStorage.getItem(STORAGE_KEY);
        if (salvo) {
          const { itens } = JSON.parse(salvo);
          this.itens = itens ?? [];
        }
      } catch {
        this.limpar();
      }
    },

    limpar() {
      this.itens = [];
      sessionStorage.removeItem(STORAGE_KEY);
    },
  },
});