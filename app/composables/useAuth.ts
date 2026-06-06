interface UseAuthReturn {
  logado: ComputedRef<boolean>;
  clientId: ComputedRef<string | null>;
  sair: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const store = useClienteAuthStore(); 

  const logado = computed(() => !!store.client_token && !!store.client_id);
  const clientId = computed(() => store.client_id);

  const sair = async (): Promise<void> => {
    store.client_token = null;
    store.client_id = null;
    store.client_nome = null;
    await navigateTo("/login");
  };

  return { logado, clientId, sair };
};