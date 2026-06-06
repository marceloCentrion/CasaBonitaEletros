export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/combos', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.put('/combos/' + dados.id, dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/combos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/combos', { headers });
    return {
      data: response.data
    }
  },
  getAllDestaques: async () => {
    const response = await httpClient.get('/combos-destaques');
    return {
      data: response.data
    }
  },
  getByIdPublic: async ({ id }) => {
    const response = await httpClient.get('/combos-destaques/' + id);
    return { data: response.data };
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/combos/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/combos');
    return {
      data: response.data
    }
  },
});