export default httpClient => ({
  // GET/POST/PUT/DELETE /imagens-produtos (apiResource) - Área Administrativa
  
  save: async ({ dados, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/imagens-produtos', dados, { headers });
    return {
      data: response.data
    }
  },
  
  update: async ({ dados, token, id }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/imagens-produtos/' + id, dados, { headers });
    return {
      data: response.data
    }
  },
  
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/imagens-produtos/' + id, { headers });
    return {
      data: response.data
    }
  },
  
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/imagens-produtos', { headers });
    return {
      data: response.data
    }
  },
  
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/imagens-produtos/' + id, { headers });
    return {
      data: response
    }
  },
});

