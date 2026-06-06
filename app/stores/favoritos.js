import { defineStore } from "pinia";

export const useFavoritosStore = defineStore(
    "favoritos",
    () => {
        const itens = ref([]);

        const isFavorito = (id) => itens.value.some((i) => i.id === id);

        function toggleFavorito(produto) {
            if (isFavorito(produto.id)) {
                remover(produto.id);
            } else {
                adicionar(produto);
            }
        }

        function adicionar(produto) {
            if (isFavorito(produto.id)) return;

            itens.value.push({
                id: produto.id,
                nome: produto.nome,
                codigo: produto.codigo ?? produto.urn ?? "",
                preco: produto.preco,
                quantidade: 1,
                disponivel: produto.disponivel ?? true,
                imagem: produto.imagens?.[0]?.imagem ?? produto.imagem ?? "/placeholder-default.png",
            });
        }

        function remover(id) {
            itens.value = itens.value.filter((i) => i.id !== id);
        }

        function incrementar(id) {
            const item = itens.value.find((i) => i.id === id);
            if (item) item.quantidade++;
        }

        function decrementar(id) {
            const item = itens.value.find((i) => i.id === id);
            if (item && item.quantidade > 1) item.quantidade--;
        }

        const total = computed(() =>
            itens.value.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
        );

        const quantidade = computed(() => itens.value.length);

        return {
            itens,
            isFavorito,
            toggleFavorito,
            adicionar,
            remover,
            incrementar,
            decrementar,
            total,
            quantidade,
        };
    },
    { persist: true }
);