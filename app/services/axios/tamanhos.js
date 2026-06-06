export default httpClient => ({
  saveTamanho: async ({ tamanhos, produto_id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/tamanhos-produtos', { tamanhos, produto_id }, { headers })
    return {
      data: response.data,
    }
  },
  save: async (tamanho, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/tamanhos', tamanho, { headers });
    return {
      data: response.data
    }
  },
  update: async (tamanho, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/tamanhos/' + tamanho.id, tamanho, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/tamanhos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/tamanhos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/tamanhos/' + id, { headers });
    return {
      data: response
    }
  },

});