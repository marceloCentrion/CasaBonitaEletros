import { asyncFetch } from "./config";
export default ({
  getBannerMeio: async () => {
    return await asyncFetch('banners-por-categoria/2', 'banner-meio');
  },
  getBannerTop: async () => {
    return await asyncFetch('banners-por-categoria/1', 'banner-topo');
  },
})