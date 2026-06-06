export default httpClient => ({
  save: async (cliente, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.post('/clientes', cliente, { headers });
    return {
      data: response.data
    }
  },
  update: async (cliente, token) => {
    const headers = { "Authorization": "Bearer " + token }
    const response = await httpClient.put('/clientes/' + cliente.id, cliente, { headers });
    return {
      data: response.data
    }
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async (token) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes', { headers });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/clientes/' + id, { headers });
    return {
      data: response
    }
  },
  filtrarClientes: async (token, valor) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes-por-nome/' + valor, { headers });
    return {
      data: response.data
    }
  },
  filtrarPedidosClientes: async (token, valor) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-nome/' + valor, { headers });
    return {
      data: response.data
    }
  },
  getPerfil: async ({ client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes-verifica-token', { headers });
    return {
      data: response.data
    }
  },
  novaConta: async (nova_conta) => {
    const response = await httpClient.post('/nova-conta', nova_conta);
    return {
      data: response.data
    }
  },
  getPedidos: async ({ token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos', { headers });
    return {
      data: response.data
    }
  },
  getPedidosId: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },
  upPedido: async ({ id, token, pedido }) => {
    const headers = {
      "Authorization": "Bearer " + token,
      "Accept": "application/json",
    };
    const response = await httpClient.post('/pedidos/' + id, pedido, { headers });
    return {
      data: response.data
    };
  },
  getMeusPedidos: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/pedidos-por-cliente/' + id, { headers });
    return {
      data: response.data
    }
  },
  getPedidoSite: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/pedidos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getDataCliente: async ({ client_id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/clientes/' + client_id, { headers });
    return {
      data: response.data
    }
  },
  upCliente: async ({ dados, client_token, client_id }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.put('/clientes/' + client_id, dados, { headers });
    return {
      data: response.data
    }
  },
  upEndereco: async ({ endereco, client_token, id_endereco }) => {
    const headers = { "Authorization": "Bearer " + client_token }
    const response = await httpClient.put('/enderecos/' + id_endereco, endereco, { headers });
    return {
      data: response.data
    }
  },
  createEndereco: async ({ endereco, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token }
    const response = await httpClient.post('/enderecos', endereco, { headers });
    return {
      data: response.data
    }
  },
  deleteEnd: async ({ id_endereco, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.delete('/enderecos/' + id_endereco, { headers });
    return {
      data: response
    }
  },
  sendEmailPassword: async ({ email }) => {
    const response = await httpClient.post('/clientes/esqueci-minha-senha', { email });
    return {
      data: response.data
    }
  },
  sendNewPassword: async ({ nova_senha, confirmacao_senha, token }) => {
    const response = await httpClient.post('/clientes/recuperar-senha/' + token, { nova_senha, confirmacao_senha });
    return {
      data: response.data,
      status: response.status,
    }
  },
  getEndereco: async ({ client_id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/enderecos-por-cliente/' + client_id, { headers });
    return {
      data: response.data
    }
  },
  fazerPedido: async ({ dados, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.post('/fazer-pedido', dados, { headers });
    return {
      data: response.data
    }
  },

  // Novas rotas adicionadas:

  // POST /clientes/mudar-senha/{id} - Área do Cliente
  mudarSenha: async ({ id, client_token, nova_senha, confirmacao_senha }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.post('/clientes/mudar-senha/' + id, { nova_senha, confirmacao_senha }, { headers });
    return {
      data: response.data
    }
  },

  // GET /desativar-cliente/{id} - Área do Cliente
  desativarCliente: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/desativar-cliente/' + id, { headers });
    return {
      data: response.data
    }
  },

  // GET /endereco-principal/{id} - Área do Cliente
  getEnderecoPrincipal: async ({ id, client_token }) => {
    const headers = { "Authorization": "Bearer " + client_token, "Accept": "application/json" }
    const response = await httpClient.get('/endereco-principal/' + id, { headers });
    return {
      data: response.data
    }
  },
});
