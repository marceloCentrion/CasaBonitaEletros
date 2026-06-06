export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/paginas', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/paginas/' + dados.id, dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/paginas/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/paginas', { headers });
    return {
      data: response.data
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/paginas',);
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/paginas/' + id, { headers });
    return {
      data: response
    }
  },
  deletarImagem: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/deletar-imagem/' + id, { headers });
    return {
      data: response
    }
  },
  getBannerSite: async () => {
    const response = await httpClient.get('/pagina/3');
    return {
      data: response.data
    }
  },
  getBannerProjetos: async () => {
    const response = await httpClient.get('/pagina/4');
    return {
      data: response.data
    }
  },
});