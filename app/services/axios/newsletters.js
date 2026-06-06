export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/newsletter', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/newsletter/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/newsletters/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/newsletter', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/newsletter/' + id, { headers });
    return {
      data: response
    }
  },
  enviar: async ({ newsletter }) => {
    const response = await httpClient.post('/newsletter', newsletter);
    return {
      data: response.data
    }
  },
});