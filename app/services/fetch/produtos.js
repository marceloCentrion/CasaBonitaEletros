import { asyncFetch } from "./config";
export default ({
    getAllProduto: async () => {
      return await asyncFetch('produtos-ativos', 'produtos');
    },
    getProdutosHome: async () => {
      return await asyncFetch('produtos-home', 'produtos'); 
    },
    getProdutoSite: async ({urn}) => {
      return await asyncFetch('produto-por-urn/'+urn, 'produto');
    },
    getAllProdutoCat: async (categoria) => {
      return await asyncFetch('produtos-por-categoria/'+categoria, 'produtos');
    },
    buscarProduto: async ({element}) => {
      return await asyncFetch('produto/pesquisa/'+element, 'produtos'); 
    }
    
})