export default httpClient => ({
  save: async (pergunta, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/perguntas', pergunta, { headers });
    return {
      data: response.data
    }
  },
  update: async (pergunta, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/perguntas/' + pergunta.id, pergunta, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/perguntas/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/perguntas', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/perguntas/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/mostrar-perguntas');
    return {
      data: response.data
    }
  },
});