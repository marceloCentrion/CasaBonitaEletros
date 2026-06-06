export default httpClient => ({
  save: async ({ atributos, produto_id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/atributos', { atributos, produto_id }, { headers })
    return {
      data: response.data,
    }
  },
  update: async (variacao, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/atributos/' + variacao.id, variacao, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/atributos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/atributos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/atributos/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/atributos');
    return {
      data: response.data
    }
  },
});