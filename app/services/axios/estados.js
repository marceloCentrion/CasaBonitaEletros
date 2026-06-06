export default httpClient => ({
  // GET/POST/PUT/DELETE /estados (apiResource) - Área Administrativa
  
  save: async ({ dados, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/estados', dados, { headers });
    return {
      data: response.data
    }
  },
  
  update: async ({ dados, token, id }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.put('/estados/' + id, dados, { headers });
    return {
      data: response.data
    }
  },
  
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/estados/' + id, { headers });
    return {
      data: response.data
    }
  },
  
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/estados', { headers });
    return {
      data: response.data
    }
  },
  
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/estados/' + id, { headers });
    return {
      data: response
    }
  },
});

