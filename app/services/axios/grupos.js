export default httpClient => ({
  save: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/grupos', dados, { headers });
    console.log(dados)
    return {
      data: response.data
    }
  },
  update: async (dados, token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "multipart/form-data" }
    const response = await httpClient.post('/grupos/' + dados.get('id'), dados, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/grupos/' + id, { headers });
    return {
      data: response
    }
  },

  getGruposAtivos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/grupos', { headers });
    return {
      data: response.data
    }
  },
  getGruposAtivosSite: async () => {
    const response = await httpClient.get('/grupos-ativos');
    return {
      data: response.data
    }
  },
  getGrupoUm: async () => {
    const response = await httpClient.get('/grupos-destaque1');
    return {
      data: response.data
    }
  },
  getGrupoURN: async (id) => {
    const response = await httpClient.get('/produtos-por-categoria/' + id);
    return {
      data: response.data
    }
  },
  getProdutosGrupoURN: async (urn, page, per_page = 30) => {
    const response = await httpClient.get(`/produtos-por-grupo/${urn}?page=${page}&per_page=${per_page}`);
    return {
      data: response.data
    }
  },
  getProdutosPorGrupoMarca: async ({ grupo_urn, marca_id }) => {
    const response = await httpClient.get('/produto-por-grupo-marca/' + grupo_urn + '/' + marca_id);
    return {
      data: response.data
    }
  },

  getGruposDestaque2: async () => {
    const response = await httpClient.get('/grupos-destaque2');
    return {
      data: response.data
    }
  },

  getGruposDestaques: async () => {
    const response = await httpClient.get('/grupos-destaques');
    return {
      data: response.data
    }
  },

  getGrupoPorUrn: async ({ urn }) => {
    const response = await httpClient.get('/grupo-por-urn/' + urn);
    return {
      data: response.data
    }
  },
});
