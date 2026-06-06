import { asyncFetch } from "./config";
export default ({
    getBannerSite: async () => {
        return await asyncFetch('pagina/3', 'banners');
    },
    getBannerProjetos: async () => {
        return await asyncFetch('pagina/4', 'banners');
    },
})