import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const id = ref(null);
  const nome = ref(null);

  function reset() {
    token.value = null;
    id.value = null;
    nome.value = null;
  }

  return { token, id, nome, reset };
}, { persist: true });