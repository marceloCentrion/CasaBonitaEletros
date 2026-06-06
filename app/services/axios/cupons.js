export default httpClient => ({
  save: async ({ cupom, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/cupons', cupom, { headers });

    return {
      data: response.data
    }
  },
  update: async ({ cupom, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.put('/cupons/' + cupom.id, cupom, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cupons/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cupons', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/cupons/' + id, { headers });
    return {
      data: response
    }
  },

  getAtivos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/cupons-ativos', { headers });
    return {
      data: response.data
    }
  },

  getPorCodigo: async ({ codigo_cupom, cliente_id }) => {
    
    var url = '/cupom-por-codigo/' + codigo_cupom;

    if (cliente_id) {
      url = '/cupom-por-codigo/' + codigo_cupom+'/'+cliente_id
    }
    const response = await httpClient.get(url);
    return {
      data: response.data
    }
  },

});