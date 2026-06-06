export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/banners', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/banners/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/banners/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/banners', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/banners/' + id, { headers });
    return {
      data: response
    }
  },
  deletarImagem: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/deletar-imagem/' + id, { headers });
    return {
      data: response
    }
  },
  getDestaques: async () => {
    const response = await httpClient.get('/clientes-destaque');
    return {
      data: response.data
    }
  },
  getClientes: async () => {
    const response = await httpClient.get('/todos-clientes');
    return {
      data: response.data
    }
  },
  saveCat: async (cat, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/categoria-banners', cat, { headers });
    console.log(cat)
    return {
      data: response.data
    }
  },
  getAllCat: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categoria-banners', { headers });
    return {
      data: response.data
    }
  },
  getByIdCat: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categoria-banners/' + id, { headers });
    return {
      data: response.data
    }
  },
  updateCat: async (cat, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.put('/categoria-banners/' + cat.id, cat, { headers });
    return {
      data: response.data
    }
  },
  deleteCat: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/categoria-banners/' + id, { headers });
    return {
      data: response
    }
  },

  getBannersPorCategoria: async ({ id }) => {
    const response = await httpClient.get('/banners-por-categoria/' + id);
    return {
      data: response.data
    }
  },

  getBannerTop: async () => {
    const response = await httpClient.get('/banners-site');
    return {
      data: response.data
    }
  },
});
