export default httpClient => ({
  save: async (cor, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/pedidos', cor, { headers });
    return {
      data: response.data
    }
  },

  update: async (grupo, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/pedidos/' + grupo.id, grupo, { headers });
    return {
      data: response.data
    }
  },

  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },


  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/pedidos/' + id, { headers });
    return {
      data: response
    }
  },

  verificarParcelas: async ({ token, itens }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/verificar-parcelas', { produtos: itens }, { headers });
    return {
      data: response.data
    }
  },

  calcularFrete: async ({ cep_destinatario, produtos_req, }) => {
    const headers = { "Accept": "application/json" }
    const response = await httpClient.post('/teste', {
      cep_remetente: '96020360',
      cep_destinatario,
      produtos_req
    }, { headers });
    return {
      data: response.data
    }
  },

  testarCalculo: async ({ cep_remetente, cep_destinatario, produtos_req }) => {
    const headers = { "Accept": "application/json" }
    const response = await httpClient.post('/teste', {
      cep_remetente,
      cep_destinatario,
      produtos_req
    }, { headers });
    return {
      data: response.data
    }
  },

  webhooks: async ({ dados }) => {
    const response = await httpClient.post('/webhooks-pedidos', dados);
    return {
      data: response.data
    }
  },

  pedidosPorPixVencidos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-pix-vencidos', { headers });
    return {
      data: response.data
    }
  },

  pedidosPorBoletoVencidos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-boleto-vencidos', { headers });
    return {
      data: response.data
    }
  },

  pedidosPorNome: async ({ token, nome }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-nome/' + nome, { headers });
    return {
      data: response.data
    }
  },

  pedidoPorCodigo: async ({ codigo, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/pedido-por-codigo/' + codigo, { headers });
    return {
      data: response.data
    }
  },

  cancelarPedido: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.post('/cancelar-pedido/' + id, {}, { headers });
    return {
      data: response.data
    }
  }
});
