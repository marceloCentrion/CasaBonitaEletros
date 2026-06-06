import service from '@/services/axios';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const storage = useClienteAuthStore();
  var client_token = storage.client_token;
  try {
    const response = await service.login.verificaTokenClientes({ client_token });
    if (response.data.token) {
      return;
    } else {
      return navigateTo('/login');
    }
  } catch (error) {
    console.error("Erro na solicitação Axios:", error);
    if (to.name !== 'login-sistema') return navigateTo('/login');
  }
});
