<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />

    <div class="container">
      <h2 class="title">Meus Dados</h2>
      <div class="row">
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>Nome:</label>
            <input
              v-model="state.dados.nome"
              class="input"
              type="text"
              v-mask-cep
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>Email:</label>
            <input
              v-model="state.dados.email"
              class="input"
              type="email"
              v-mask-cep
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>CPF:</label>
            <input
              v-model="state.dados.cpf"
              class="input"
              type="text"
              v-mask-cep
              v-maska
              data-maska="###.###.###-##"
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>Telefone Principal:</label>
            <input
              v-model="state.dados.telefone_principal"
              class="input"
              type="text"
              v-maska
              data-maska="['(##) ####-####', '(##) # ####-####']"
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>Telefone Alternativo:</label>
            <input
              v-model="state.dados.telefone_alternativo"
              class="input"
              type="text"
              v-maska
              data-maska="['(##) ####-####','(##) # ####-####']"
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div
          class="col-xl-4 col-lg-6 mb-4 mt-4"
          v-if="
            state.dados.cnpj == 'null' ||
            state.dados.cnpj == 'undefined' ||
            state.dados.cnpj == ''
          "
        >
          <div class="form">
            <label>CNPJ:</label>
            <input
              v-model="state.dados.cnpj"
              class="input"
              type="text"
              v-mask-cep
            />
            <span class="input-border"></span>
          </div>
        </div>
        <div class="col-xl-4 col-lg-6 mb-4 mt-4">
          <div class="form">
            <label>Data de Nascimento:</label>
            <input
              v-model="state.dados.data_nascimento"
              class="input"
              type="text"
              v-maska
              data-maska="##/##/####"
            />
            <span class="input-border"></span>
          </div>
        </div>
        <!-- <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Cep:</label>
          <input class="input" type="text" v-mask-cep v-model="state.dados.endereco.cep" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Logradouro:</label>
          <input class="input" type="text" v-model="state.dados.endereco.logradouro" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Estado:</label>
          <select v-model="state.dados.endereco.cidade.estado_id" class="input" type="text">
            <option v-for="estado in state.estados" :key="estado.id" :value="estado.id">
              {{ estado.nome }}
            </option>
          </select>
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Cidade:</label>
          <select v-model="state.dados.endereco.cidade_id" class="input" type="text">
            <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
              {{ cidade.nome }}
            </option>
          </select>
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Número:</label>
          <input class="input" type="text" v-model="state.dados.endereco.numero" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Bairro:</label>
          <input class="input" type="text" v-model="state.dados.endereco.bairro" />
          <span class="input-border"></span>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 mb-4 mt-4">
        <div class="form">
          <label>Complemento:</label>
          <input class="input" type="text" v-model="state.dados.endereco.complemento" />
          <span class="input-border"></span>
        </div>
      </div> -->
      </div>
      <div class="div_btn">
        <NuxtLink to="/minha-conta"
          ><button class="btn_transparent" type="button" title="Cancelar">
            Cancelar
          </button>
        </NuxtLink>
        <button @click="upCliente" class="btn_gold" type="button">
          Salvar
        </button>
      </div>
      <loader :loader="state.loader" />
    </div>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

    definePageMeta({
      layout: "site",
      middleware: "client",
    });
    onMounted(() => {
      fetchDataCliente();
      getEstados();
    });
    const state = reactive({
      dados: { endereco: { estado: {}, cidade: {} } },
      tipo_senha: "password",
      modal_type: "",
      id_endereco: "",
      loader: false,
    });
    state.client_token = clienteAuthStore.client_token;
    state.client_nome = clienteAuthStore.client_nome;

    async function fetchDataCliente() {
      state.loader = true;
      try {
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.dados = data;
        state.loader = false;
      } catch (error) {
        state.client_token = null;
        state.client_nome = null;
      } finally {
        state.loader = false;
      }
    }
    function upCliente() {
      try {
        state.loader = true;
        services.clientes.upCliente({
          dados: state.dados,
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.loader = false;
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
      router.push("/minha-conta");
    }
    async function cepAtributes() {
      var cep = state.dados.cep;
      state.dados.cep = cep.replace("-", "").replace(".", "");
      await services.cep.apiCep(state.dados.cep).then((res) => {
        console.log(res.data);
        state.dados.logradouro = res.data.logradouro;
        state.dados.bairro = res.data.bairro;
        state.dados.cidade = res.data.localidade;
        state.dados.uf = res.data.uf;
        state.dados.codigo_ibge = res.data.ibge;
      });
      getCityByCode(state.dados.codigo_ibge);
    }
    async function getEstados() {
      try {
        const { data } = await services.endereco.getEstados();
        state.estados = data;
        console.log(state.estados);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    async function getCidade(estado_id) {
      try {
        const { data } = await services.endereco.getCidade(estado_id);
        state.cidades = data;
        console.log(state.cidades);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    return {
      state,
      upCliente,
      cepAtributes,
      getEstados,
      getCidade,
    };
  },
};
</script>
<style scoped>
.title {
  color: #000;
  font-size: 32px;
  font-weight: 600;
  font-family: "Poppins";
  margin-top: 2rem;
}

.div_data {
  border-bottom: solid 3px var(--primary);
  background-color: #c4c4c483;
  padding: 5px 5px;
  border-radius: 5px 5px 0px 0px;
}

.div_data p {
  color: #000;
  font-size: 16px;
  margin-bottom: 0;
  font-family: "Poppins";
}

label {
  color: #000;
  font-size: 18px;
  margin-bottom: 0;
  font-family: "Poppins";
}

.div_edit {
  text-align: right;
}

.form {
  --width-of-input: 100%;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: var(--primary);
  --input-hovered-color: #0000001f;
  position: relative;
  width: var(--width-of-input);
}

.input {
  color: #000;
  font-size: 12pt;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}

/* Hover on Input */
input:hover {
  background: var(--input-hovered-color);
}

input:focus {
  outline: none;
}

input:focus ~ .input-border {
  width: 100%;
}

.form label {
  font-size: 14pt;
  margin-bottom: 0;
}

.div_btn {
  text-align: right;
  margin-bottom: 2rem;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 200px;
  padding: 6px;
  transition: 0.5s;
  margin-right: 1rem;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.btn_gold {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  width: 200px;
  padding: 6px;
  transition: 0.5s;
}

.btn_gold:hover {
  background: var(--primary);
  color: #000;
}

@media (max-width: 575px) {
  .btn_gold {
    margin-top: 5px;
  }

  .btn_transparent {
    margin-right: 0;
  }
}
</style>

