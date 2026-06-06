<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h5>
          Email: <span class="tipo_title">{{ state.tipo }}</span>
        </h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <p>{{ state.nome }}</p>
          </div>
          <div class="col-md-4">
            <label for="nome">Email</label>
            <p>{{ state.email }}</p>
          </div>
          <div class="col-md-4">
            <label for="nome">Telefone</label>
            <p>{{ state.telefone }}</p>
          </div>
          <div class="col-md-12">
            <label for="nome">Mensagem</label>
            <p>{{ state.mensagem }}</p>
          </div>
        </div>
        <div class="btns_right">
          <router-link to="/admin/contatos">
            <button type="button" class="btn btn-danger">Voltar</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      id: "",
      tipo: "",
      nome: "",
      email: "",
      razao_social: "",
      telefone: "",
      whatsapp: "",
      cidade: "",
      estado: "",
      mensagem: "",
      curriculo: "",
    });
    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchContatos();
      }
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchContatos() {
      try {
        const { data } = await services.contato.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.id = data.id;
        state.nome = data.nome;
        state.email = data.email;
        state.tipo = data.tipo;
        state.razao_social = data.razao_social;
        state.telefone = data.telefone;
        state.whatsapp = data.whatsapp;
        state.cidade = data.cidade;
        state.estado = data.estado;
        state.mensagem = data.mensagem;
        state.curriculo = data.curriculo;
      } catch (error) {
        console.log(error);
      }
    }
    return {
      router,
      state,
    };
  },
};
</script>
<style scoped>
h5 {
  color: #fff;
}

.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}

label {
  color: gray;
  font-size: 14pt;
  font-weight: 700;
  margin-bottom: 0;
  border-bottom: 2px solid gray;
  text-align: left;
  width: 100%;
  margin-left: 0;
}

p {
  color: #000;
  font-size: 12pt;
  font-weight: 700;
}

.btns_right {
  text-align: right;
  margin-top: 5rem;
}

.btn_cancel {
  padding: 5px;
  width: 100px;
  background: #c4342d;
  border: solid 2px #000;
  color: #000;
  border-radius: 5px;
  margin-left: 10px;
  transition: 0.2s;
}

.btn_cancel:hover {
  background: #8f0303;
}

.div_pdf {
  margin-top: 2rem;
  text-align: left;
}

svg {
  margin-top: 1rem;
  width: 50px;
  height: 50px;
  color: #000;
  transition: 0.2s;
}

svg:hover {
  color: blue;
}
</style>
