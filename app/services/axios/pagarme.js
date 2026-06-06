export default httpClient => ({
  sacar: async ({ dados, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/sacar', dados, { headers });
    return {
      data: response.data
    }
  },
  
  getSaldo: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/saldo', { headers });
    return {
      data: response.data
    }
  },
  
  getSaques: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/saques', { headers });
    return {
      data: response.data
    }
  },
});