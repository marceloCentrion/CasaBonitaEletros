export default httpClient => ({
  save: async (representante, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/representantes', representante, { headers });
    return {
      data: response.data
    }
  },
  update: async (representante, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/representantes/' + representante.id, representante, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/representantes/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/representantes', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/representantes/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/todos-representantes');
    return {
      data: response.data
    }
  },
});