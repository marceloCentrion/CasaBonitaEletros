export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/marcas', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    dados.append('_method', 'PUT');
    const response = await httpClient.post('/marcas/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/marcas/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/marcas', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/marcas/' + id, { headers });
    return {
      data: response
    }
  },
  marcasAtivas: async () => {
    const headers = { "Accept": "application/json" }
    const response = await httpClient.get('/marcas-ativas', { headers });
    return {
      data: response.data
    }
  },
  produtosPorMarca: async (id) => {
    const headers = { "Accept": "application/json" }
    const response = await httpClient.get('/produtos-por-marca/' + id, { headers });
    return {
      data: response.data
    }
  },
}); 