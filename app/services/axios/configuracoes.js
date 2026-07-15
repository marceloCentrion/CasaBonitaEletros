export default (httpClient) => ({
  getSite: async () => {
    const response = await httpClient.get('/configuracoes-site');
    return { data: response.data };
  },
});
