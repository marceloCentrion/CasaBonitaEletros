export default httpClient => ({
  // Variacoes - API Resource
  save: async (categoria, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/valores-variacoes', categoria, { headers });
    return {
      data: response.data
    }
  },
  update: async (variacao, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/valores-variacoes/' + variacao.id, variacao, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/valores-variacoes/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/valores-variacoes', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/valores-variacoes/' + id, { headers });
    return {
      data: response
    }
  },

  // Valores Variacoes - API Resource
  saveValor: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/valores-variacoes', dados, { headers });
    return {
      data: response.data
    }
  },
  updateValor: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/valores-variacoes/' + dados.id, dados, { headers });
    return {
      data: response.data
    }
  },
  getValorById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/valores-variacoes/' + id, { headers });
    return {
      data: response.data
    }
  },
  getValoresAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/valores-variacoes', { headers });
    return {
      data: response.data
    }
  },
  deleteValor: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/valores-variacoes/' + id, { headers });
    return {
      data: response
    }
  },

  // Site functions
  getAllSite: async () => {
    const response = await httpClient.get('/categorias-ativas');
    return {
      data: response.data
    }
  },
  saveVariacaoId: async ({ variacoes, produto_id, token }) => {
    alert('Caiu no post AXIOS')
    console.log(variacoes)
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/valores-variacoes', { variacoes, produto_id }, { headers })
    return {
      data: response.data,
    }
  },

});
