import { asyncFetch } from "./config";
export default ({
    getCatAtivas: async () => {
        return await asyncFetch('categorias-ativas', 'categoria');
    },
})