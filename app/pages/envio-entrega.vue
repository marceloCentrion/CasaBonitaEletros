<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div class="container">
      <div class="card">
        <h1 class="title">Envio e Entrega</h1>
        <span v-html="state.pagina.sobre"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from "@/services/axios";
const storage = useClienteAuthStore();

definePageMeta({
  layout: "site",
});
useHead({
  title: "Casa Bonita Eletros - Politicas de Privacidade",
});
const state = reactive({
  pagina: {},
  client_nome: null,
  client_token: null,
});
state.client_token = storage.client_token;
state.client_nome = storage.client_nome;

verificaLogin();

fetchPages();
async function fetchPages() {
  try {
    const { data } = await services.pagina.getAllSite();
    state.pagina = data[0];
  } catch (error) {
    console.log(error);
  }
}
async function verificaLogin() {
  await services.login
    .verificaTokenClientes({ client_token: storage.client_token })
    .catch(() => {
      state.client_nome = null;
      state.client_token = null;
      storage.client_token = null;
      storage.client_nome = null;
    });
}
</script>

<style scoped>
h1,
h2,
h3 {
  color: #252b42;
  font-family: "Poppins";
}

.title {
  font-size: 32px;
  font-weight: 700;
  line-height: 44px;
  color: var(--primary);
}

.card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  padding: 40px;
  margin-bottom: 4rem;
  margin-top: 4rem;
}

ul {
  padding-left: 20px;
}

p,
ul {
  line-height: 1.6;
  font-family: "Poppins", Tahoma;
}

/* Estilo específico para números nos <h3> */
h3 {
  position: relative;
}
</style>

















