export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/projetos', dados, { headers });
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/projetos/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/projetos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/projetos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/projetos/' + id, { headers });
    return {
      data: response
    }
  },
  salvarImagem: async ({ token, formImagem }) => {
    let headers = { "Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }
    const response = httpClient.post('/imagens-projetos', formImagem, { headers })
    return {
      data: response.data,
    }
  },
  deletarImagens: async ({ token, imagens }) => {
    let headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/deletar-imagens-projetos', { imagens }, { headers })
    return { data: response }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/todos-projetos');
    return {
      data: response.data
    }
  },
  deletarImagem: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/deletar-imagem/' + id, { headers });
    return {
      data: response
    }
  },

});