export default httpClient => ({
  save: async (categoria, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/categorias', categoria, { headers });
    return {
      data: response.data
    }
  },
  update: async (categoria, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/categorias/' + categoria.id, categoria, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categorias/' + id, { headers });
    return {
      data: response.data
    }
  },

  getByGrupoId: async ({ grupo_id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categorias-por-grupo/' + grupo_id, { headers });
    return {
      data: response.data
    }
  },

  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/categorias', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/categorias/' + id, { headers });
    return {
      data: response
    }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/categorias-ativas');
    return {
      data: response.data
    }
  },

  getProdutosCategoriaMarca: async ({ categoria_urn, marca_id }) => {
    const response = await httpClient.get('/produto-por-categoria-marca/' + categoria_urn + '/' + marca_id);
    return {
      data: response.data
    }
  },

  // Nova rota: GET /categoria-por-urn/{urn}
  getCategoriaPorUrn: async ({ urn }) => {
    const response = await httpClient.get('/categoria-por-urn/' + urn);
    return {
      data: response.data
    }
  },

  // Nova rota: GET /categorias-por-grupo/{urn}
  getCategoriasPorGrupo: async ({ urn }) => {
    const response = await httpClient.get('/categorias-por-grupo/' + urn);
    return {
      data: response.data
    }
  },
});
