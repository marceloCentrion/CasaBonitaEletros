export default httpClient => ({
    login: async ({ email, password }) => {
        const response = await httpClient.post('/auth/login', {
            email,
            password
        })
        let errors = null

        if (!response.data) {
            errors = {
                status: response.request.status,
                statusText: response.request.statusText
            }
        }
        return {
            data: response.data,
            errors
        }
    },
    logout: async ({ token }) => {
        const response = await httpClient.get('/logout/' + token);
        return {
            data: response.data
        }
    }
})
