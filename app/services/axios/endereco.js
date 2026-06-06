export default httpClient => ({
  save: async ({ dados, token }) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/enderecos', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/enderecos/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/enderecos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/enderecos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/enderecos/' + id, { headers });
    return {
      data: response
    }
  },
  getEstados: async () => {
    const response = await httpClient.get('/estados');
    return {
      data: response.data
    }
  },
  getCidade: async () => {
    const response = await httpClient.get('/cidades');
    return {
      data: response.data
    }
  },
  getCityByCode: async (cod_ibge) => {
    const response = await httpClient.get('/cidade-por-codigo/' + cod_ibge);
    return {
      data: response.data
    }
  },
});