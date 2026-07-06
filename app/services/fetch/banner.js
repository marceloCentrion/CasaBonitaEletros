import { asyncFetch } from "./config";
export default ({
  getBannerMeio: async () => {
    return await asyncFetch('banners-por-categoria/secundario', 'banner-meio');
  },
  getBannerTop: async () => {
    return await asyncFetch('banners-por-categoria/hero', 'banner-topo');
  },
})