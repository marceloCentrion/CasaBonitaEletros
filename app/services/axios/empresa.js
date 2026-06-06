export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/empresa', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/empresa/' + dados.id, dados, { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.delete('/empresa/' + id, { headers });
    return {
      data: response.data
    }
  },
  getEmpresa: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/empresa', { headers });
    return {
      data: response.data
    }
  },
  getSite: async () => {
    const response = await httpClient.get('/empresa');
    return {
      data: response.data
    }
  },
  getInfos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/infos-sistema', { headers });
    return {
      data: response.data
    }
  },
});