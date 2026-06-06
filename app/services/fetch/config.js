export const baseURL = 'http://cozinharte.lojacasabonitamoveis.com.br/api/';

export const asyncFetch = async (url, name) => {
    return await useAsyncData(name, () => $fetch(baseURL + url));
}