export default (httpClient) => ({
  criar: async (dados) => {
    const response = await httpClient.post('/orcamentos', dados);
    return { data: response.data };
  },
  listar: async (token) => {
    const response = await httpClient.get('/orcamentos', { headers: { Authorization: `Bearer ${token}` } });
    return { data: response.data };
  },
  obter: async (id, token) => {
    const response = await httpClient.get(`/orcamentos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return { data: response.data };
  },
  pdf: async (id, token) => {
    const response = await httpClient.get(`/orcamentos/${id}/pdf`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    });
    return { data: response.data };
  },
  atualizar: async (id, dados, token) => {
    const response = await httpClient.put(`/orcamentos/${id}`, dados, { headers: { Authorization: `Bearer ${token}` } });
    return { data: response.data };
  },
});
