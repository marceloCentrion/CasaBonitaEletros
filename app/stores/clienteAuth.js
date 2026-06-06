import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useClienteAuthStore = defineStore("clienteAuth", {
    state: () => ({
        client_token: useLocalStorage("client_token", null),
        client_id: useLocalStorage("client_id", null),
        client_nome: useLocalStorage("client_nome", null),
    }),
    hydrate(state, initialState) {
        state.client_id = useLocalStorage("client_id", null);
        state.client_nome = useLocalStorage("client_nome", null);
        state.client_token = useLocalStorage("client_token", null);
    }
})