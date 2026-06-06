export default httpClient => ({
  calcularFrete: async ({ dados, token} ) => {
    const headers = { "Authorization": "Bearer " + token, "Accept": "application/json", "Content-Type": "application/json","User-Agent": "centrionweb@gmail.com" }
    const response = await httpClient.post('/v2/me/shipment/calculate', 
    
    {
    "from": {
        "postal_code": "96020360"
    },
    "to": {
        "postal_code": "01018020"
    },
    "products": [
        {
            "id": "x",
            "width": 11,
            "height": 17,
            "length": 11,
            "weight": 0.3,
            "insurance_value": 10.1,
            "quantity": 1
        }
    ],
    "options": {
        "receipt": false,
        "own_hand": false
    },
    "services": "1,2,18"
}
    
    , { headers });
    return {
      data: response.data
    } 
  },

});