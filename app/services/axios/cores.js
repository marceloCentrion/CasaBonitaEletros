export default httpClient => ({
  save: async (cor, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/cores', cor, { headers });
    return {
      data: response.data
    }
  },
  update: async (grupo, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/cores/' + grupo.id, grupo, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cores/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cores', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/cores/' + id, { headers });
    return {
      data: response
    }
  },

});