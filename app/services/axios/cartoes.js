export default httpClient => ({
  // GET/POST/PUT/DELETE /cartoes (apiResource) - Área do Cliente
  
  save: async ({ dados, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.post('/cartoes', dados, { headers });
    return {
      data: response.data
    }
  },
  
  update: async ({ dados, client_token, id }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.put('/cartoes/' + id, dados, { headers });
    return {
      data: response.data
    }
  },
  
  getById: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/cartoes/' + id, { headers });
    return {
      data: response.data
    }
  },
  
  getAll: async ({ client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/cartoes', { headers });
    return {
      data: response.data
    }
  },
  
  delete: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.delete('/cartoes/' + id, { headers });
    return {
      data: response
    }
  },
});

