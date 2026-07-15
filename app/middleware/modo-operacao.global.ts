export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server || !['/checkout', '/finalizar-pedido'].includes(to.path)) return;

  const { vendasAtivas, carregarModoOperacao } = useModoOperacao();
  await carregarModoOperacao();

  if (!vendasAtivas.value) {
    return navigateTo("/produtos");
  }
});
