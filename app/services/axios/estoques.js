export default httpClient => ({
  // GET/POST/PUT/DELETE /estoques (apiResource) - Área Administrativa
  
  save: async ({ dados, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/estoques', dados, { headers });
    return {
      data: response.data
    }
  },
  
  update: async ({ dados, token, id }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.put('/estoques/' + id, dados, { headers });
    return {
      data: response.data
    }
  },
  
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/estoques/' + id, { headers });
    return {
      data: response.data
    }
  },
  
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/estoques', { headers });
    return {
      data: response.data
    }
  },
  
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/estoques/' + id, { headers });
    return {
      data: response
    }
  },
});

