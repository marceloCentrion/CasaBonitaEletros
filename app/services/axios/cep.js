export default httpCep => ({
  apiCep: async (cep) => {
    const response = await httpCep.get('/' + cep + '/json/')
    return {
      data: response.data,
    }
  }
})