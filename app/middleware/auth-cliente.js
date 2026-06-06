export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;

  const clienteAuth = useClienteAuthStore();

  if (!clienteAuth.client_token || !clienteAuth.client_id) {
    return navigateTo("/login");
  }
});