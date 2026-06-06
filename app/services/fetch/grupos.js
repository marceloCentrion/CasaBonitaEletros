import { asyncFetch } from "./config";
export default ({
  getGruposAtivos: async () => {
    return await asyncFetch('grupos-ativos', 'produtos');
  },
  getGrupoUm: async () => {
    return await asyncFetch('grupos-destaque1', 'produtos');
  },
  getgrupoDois: async () => {
    return await asyncFetch('grupos-destaque2', 'produtos');
  },


})