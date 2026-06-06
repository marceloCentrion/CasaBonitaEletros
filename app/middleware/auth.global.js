import services from "@/services/axios"
import { useToast } from "@/composables/useToast";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;
  if (!to.path.startsWith('/admin')) return;

  const storage = useAuthStore();
  const token = storage.token;
  const toast = useToast();

  if (!token) return navigateTo('/login-sistema');

  const { errors } = await services.login.verificaToken(token);

  if (errors) {
    toast.error('Token expirado! Faça login novamente');
    return navigateTo('/login-sistema');
  }
});