export default httpClient => ({
  save: async ({ produto, token }) => {
    const headers = {
      "Authorization": "Bearer " + token,
      "Content-Type": "multipart/form-data"
    };
    const response = await httpClient.post('/produtos', produto, { headers });
    return { data: response.data };
  },
  update: async ({ formData, id, token }) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data"
    };

    formData.append('_method', 'PUT');

    const response = await httpClient.post('/produtos/' + id, formData, { headers });

    return { data: response.data };
  },
  getById: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/produtos/' + id, { headers });
    return {
      data: response.data
    }
  },
  getAll: async ({ token, page }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }

    const per_page = 30
    const response = await httpClient.get(`/produtos`, {
      headers,
      params: {
        page: page ?? 1,
        per_page
      }
    });
    return {
      data: response.data
    }
  },
  delete: async ({ id, token }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.delete('/produtos/' + id, { headers });
    return {
      data: response
    }
  },
  salvarImagem: async ({ token, formImagem }) => {
    let headers = { "Authorization": "Bearer " + token, "Content-Type": "multipart/form-data" }
    const response = httpClient.post('/imagens-produtos', formImagem, { headers })
    return {
      data: response.data,
    }
  },
  deletarImagens: async ({ token, imagens }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.post('/deletar-imagens-produto', { imagens }, { headers })
    return { data: response }
  },
  getAllSite: async () => {
    const response = await httpClient.get('/produtos-home');
    return {
      data: response.data
    }
  },
  getProdutoSite: async ({ urn }) => {
    const response = await httpClient.get('/produto/' + urn);
    return {
      data: response.data
    }
  },
  getAllProduto: async (page, per_page, ordem) => {
    const response = await httpClient.get(`/todos-produtos?page=${page}&per_page=${per_page}&ordem=${ordem}`);
    return {
      data: response.data
    }
  },
  getProdutosAtivos: async () => {
    const response = await httpClient.get('/produtos-ativos');
    return {
      data: response.data
    }
  },
  getAllProdutoCat: async (categoria_id) => {
    const response = await httpClient.get('/produtos-por-categoria/' + categoria_id);
    return {
      data: response.data
    }
  },

  getAllProdutoCatMarca: async (categoria_urn, marca_id) => {
    const response = await httpClient.get(`/produto-por-categoria-marca/${urn}/${marca_id}}` + categoria_urn);
    return {
      data: response.data
    }
  },

  getAllProdutoGrupo: async (categoria_urn) => {
    const response = await httpClient.get('/produtos-por-grupo/' + categoria_urn);
    return {
      data: response.data
    }
  },

  buscarProduto: async (nome) => {
    const response = await httpClient.post('/produtos/pesquisa', { nome });
    return {
      data: response.data
    }
  },

  buscarPorCategoriaStatus: async (status, categoria_id, marca_id) => {
    const response = await httpClient.post('/produtos-por-filtros', {
      status,
      categoria_id,
      marca_id
    });
    return {
      data: response.data
    }
  },

  buscarPorFaixaPreco: async ({ preco_inicial, preco_final }) => {
    const response = await httpClient.post('/produtos-por-faixa-preco', { preco_inicial, preco_final });
    return {
      data: response.data
    }
  },

  buscarPorFaixaPrecoCategoria: async ({ preco_inicial, preco_final, urn }) => {
    const response = await httpClient.post('/produtos-por-faixa-categoria', { preco_inicial, preco_final, urn });
    return {
      data: response.data
    }
  },

  buscarPorFaixaPrecoGrupo: async ({ preco_inicial, preco_final }) => {
    const response = await httpClient.post('/produtos-por-faixa-preco', { preco_inicial, preco_final });
    return {
      data: response.data
    }
  },

  buscarPorCategoria: async ({ preco_inicial, preco_final }) => {
    const response = await httpClient.post('/produtos-por-faixa-preco', { preco_inicial, preco_final });
    return {
      data: response.data
    }
  },

  getProdutoPorCategoriaMarca: async ({ urn, id }) => {
    const response = await httpClient.get('/produto-por-categoria-marca/' + urn + '/' + id);
    return {
      data: response.data
    }
  },

  getProdutoPorGrupoMarca: async ({ urn, id }) => {
    const response = await httpClient.get('/produto-por-grupo-marca/' + urn + '/' + id);
    return {
      data: response.data
    }
  },

  getProdutoPorUrn: async ({ urn }) => {
    const response = await httpClient.get('/produto-por-urn/' + urn);
    return {
      data: response.data
    }
  },

  getProdutoPorRef: async ({ ref }) => {
    const response = await httpClient.get('/produto-por-ref/' + ref);
    return {
      data: response.data
    }
  },

  getProdutosPorTamanho: async ({ tamanhoId }) => {
    const response = await httpClient.get('/produtos-por-tamanho/' + tamanhoId);
    return {
      data: response.data
    }
  },

  getProdutosPorNome: async ({ nome }) => {
    const response = await httpClient.post('/produtos-por-nome', { nome });
    return {
      data: response.data
    }
  },

  verificarParcelas: async ({ produtos }) => {
    const response = await httpClient.post('/verificar-parcelas', { produtos });
    return {
      data: response.data
    }
  },

  calcularParcelas: async ({ produtos }) => {
    const response = await httpClient.post('/calcular-parcelas', { produtos });
    return {
      data: response.data
    }
  },

  buscarPorFaixaGrupo: async ({ preco_inicial, preco_final, urn }) => {
    const response = await httpClient.post('/produtos-por-faixa-grupo', { preco_inicial, preco_final, urn });
    return {
      data: response.data
    }
  },

  getProdutosPagination: async ({ token, page = 1 }) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json" }
    const response = await httpClient.get('/produtos-pagination?page=' + page, { headers });
    return {
      data: response.data
    }
  },
});
