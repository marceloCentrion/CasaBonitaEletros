export default httpClient => ({
  //*-------------------------------
  //* Auth | Administradores
  //*-------------------------------

  logarSistema: async ({ email, password }) => {
    let errors = null
    let data = null
    try {
      const response = await httpClient.post('/admin/login', { email, password })
      data = response.data
    } catch (error) {
      errors = {
        status: error.response?.status,
        statusText: error.response?.statusText
      }
    }
    return { data, errors }
  },

  verificaToken: async (token) => {
    let errors = null
    let data = null
    try {
      const response = await httpClient.get('/admin-verifica-token', {
        headers: { Authorization: 'Bearer ' + token }
      })
      data = response.data
    } catch (error) {
      errors = {
        status: error.response?.status,
        statusText: error.response?.statusText
      }
    }
    return { data, errors }
  },

  //*-------------------------------
  //* Auth | Clientes
  //*-------------------------------

  logarCliente: async ({ email, password }) => {
    let errors = null
    let data = null
    try {
      const response = await httpClient.post('/clientes/login', { email, password })
      data = response.data
    } catch (error) {
      errors = {
        status: error.response?.status,
        statusText: error.response?.statusText
      }
    }
    return { data, errors }
  },

  cadastrarCliente: async (payload) => {
    let errors = null
    let data = null
    try {
      const response = await httpClient.post('/clientes', { payload })
      data = response.data
    } catch (error) {
      errors = {
        status: error.response?.status,
        statusText: error.response?.statusText
      }
    }
    return { data, errors }
  },

  verificaTokenClientes: async ({ client_token }) => {
    let errors = null
    let data = null
    try {
      const response = await httpClient.get('/clientes-verifica-token', {
        headers: { Authorization: 'Bearer ' + client_token }
      })
      data = response.data
    } catch (error) {
      errors = {
        status: error.response?.status,
        statusText: error.response?.statusText
      }
    }
    return { data, errors }
  },
})