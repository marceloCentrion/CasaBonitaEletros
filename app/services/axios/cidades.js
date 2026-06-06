export default httpClient => ({
  save: async (dados) => {
    const response = await httpClient.post('/cidades', dados);
    return {
      data: response.data
    }
  },

  update: async (dados, id) => {
    const response = await httpClient.put('/cidades/' + id, dados);
    return {
      data: response.data
    }
  },

  getById: async (pid) => {
    const response = await httpClient.get('/cidades/' + id);
    return {
      data: response.data
    }
  },

  getAll: async () => {
    const response = await httpClient.get('/cidades');
    return {
      data: response.data
    }
  },

  delete: async (id) => {
    const response = await httpClient.delete('/cidades/' + id);
    return {
      data: response
    }
  },
});

