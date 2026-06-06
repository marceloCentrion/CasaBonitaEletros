export default httpClient => ({
  save: async (pagina, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/paginas-institucionais', pagina, { headers });
    return {
      data: response.data
    }
  },
  update: async (pagina, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/paginas-institucionais/' + pagina.id, pagina, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/paginas-institucionais/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/paginas-institucionais', { headers });
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
})