export default httpClient => ({
  save: async ({ cores, produto_id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/cores-produtos', { cores, produto_id }, { headers })
    return {
      data: response.data,
    }
  },
  update: async (grupo, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/cores-produtos/' + grupo.id, grupo, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cores-produtos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cores-produtos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/cores-produtos/' + id, { headers });
    return {
      data: response
    }
  },

});