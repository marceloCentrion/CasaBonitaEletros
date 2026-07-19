import { defineStore } from "pinia";

export const useCarrinhoStore = defineStore(
  "carrinho",
  () => {
    const itens = ref([]);

    const subtotal = computed(() =>
      itens.value.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
    );

    const totalItens = computed(() =>
      itens.value.reduce((acc, i) => acc + i.quantidade, 0)
    );

    function adicionarItem(produto) {
      const existente = itens.value.find((i) => i.id === produto.id);

      if (existente) {
        existente.quantidade++;
      } else {
        itens.value.push({
          id: produto.id,
          nome: produto.nome,
          codigo: produto.ref || produto.codigo || produto.urn || String(produto.id),
          preco: produto.preco,
          quantidade: 1,
          disponivel: true,
          imagem:
            produto.imagens?.[0]?.imagem_thumb ||
            produto.imagem?.imagem_thumb ||
            "/placeholder-default.png",
        });
      }
    }

    function finalizar() {
      if (itens.value.length === 0) return;

      const { useCheckoutStore } = require("@/stores/checkout");
      const checkout = useCheckoutStore();
      checkout.iniciar(itens.value);
      navigateTo("/checkout");
    }

    function incrementar(item) {
      const encontrado = itens.value.find((i) => i.id === item.id);
      if (encontrado) encontrado.quantidade++;
    }

    function decrementar(item) {
      const encontrado = itens.value.find((i) => i.id === item.id);
      if (encontrado && encontrado.quantidade > 1) encontrado.quantidade--;
    }

    function remover(item) {
      itens.value = itens.value.filter((i) => i.id !== item.id);
    }

    function limpar() {
      itens.value = [];
    }

    return {
      itens,
      subtotal,
      totalItens,
      adicionarItem,
      finalizar,
      incrementar,
      decrementar,
      remover,
      limpar,
    };
  },
  {
    persist: true,
  }
);
