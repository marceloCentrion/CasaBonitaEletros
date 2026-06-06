<template>
  <div>
    <top       
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
      />
    <div class="container">
      <div class="title mt-4 mb-4">
        <h2>Meus Dados</h2>
      </div>
      <div class="row mb-4">
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Nome</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.nome }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Email</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.email }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>CPF</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.cpf }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Data de Nascimento</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.data_nascimento }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Telefone Principal</label>
          <div class="div_data mb-4">
            <p>{{ state.dados.telefone_principal }}</p>
          </div>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <label>Telefone Secundário</label>
          <div class="div_data mb-md-4">
            <p>{{ state.dados.telefone_alternativo }}</p>
          </div>
        </div>
        <div class="col-xl-2 offset-xl-2 mt-xl-4 col-lg-3 offset-md-6 col-md-3 col-sm-4 offset-sm-3 mt-sm-2 mt-2">
          <div class="div_edit">
            <NuxtLink to="/editar-meus-dados">
              <button title="Editar Dados" class="btn_transparent" type="button">
                Editar dados
              </button>
            </NuxtLink>
          </div>
        </div>
        <div class="col-xl-2 mt-xl-4 col-lg-3 col-md-3 col-sm-5 mt-sm-2 mt-2">
          <div class="div_btn_endereco">
            <button @click="verificarEndereco()" title="Meus endereços" class="btn_transparent">
              Meus Endereços
            </button>
          </div>
        </div>
        <div class="col-xl-2 mt-xl-1 col-md-2 col-sm-3 mt-sm-2 mt-2">
          <div class="div_btn_endereco">
            <NuxtLink to="/">
              <button title="Voltar" class="btn_transparent">Voltar</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <loader :loader="state.loader" />
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    useHead({
      title: "Minha Conta",
    });
    definePageMeta({
      layout: "site",
      middleware: "client",
    });

    const state = reactive({
      dados: { enderecos: { cidade_id: "" } },
      tipo_senha: "password",
      id_endereco: "",
      loader: false,
      client_token: null,
      client_nome: null,
    });

    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    state.client_token = clienteAuthStore.client_token;
    state.client_nome = clienteAuthStore.client_nome;

    
    onMounted(() => {
      fetchDataCliente();
      getEstados();
    });

    async function fetchDataCliente() {
      try {
        state.loader = true;
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.loader = false;
        state.dados = data;
        state.id_endereco = data.enderecos[0].id;
        var data_nascimento = data.data_nascimento;
        formatarData(data_nascimento);
        // var estado_id = data.enderecos.cidade.estado_id;
        // getCidade(estado_id);
      } catch (error) {
        state.client_token = null;
        state.client_nome = null;
      } finally {
        state.loader = false;
      }
    }
    function verificarEndereco() {
      router.push("/meus-enderecos"); /*
      console.log(state.id_endereco);
      if (
        state.id_endereco == null ||
        state.id_endereco == undefined ||
        state.id_endereco == ""
      ) {
        if (
          confirm(
            "Ops, vimos que não possuí endereço cadastrado, gostaria de adicionar um novo endereço?"
          )
        ) {
          router.push("/criar-endereco");
        }
      } else {
        
      }
      state.modalOpen = true;*/
    }
    function fecharModal() {
      state.modalOpen = false;
      fetchDataCliente();
    }
    function upCliente() {
      try {
        services.clientes.upCliente({
          dados: state.dados,
          client_token: client_token.value,
          client_id: client_id.value,
        });
      } catch (error) {
        console.log(error);
      }
      state.modalOpen = false;
    }
    function upEndereco() {
      try {
        services.clientes.upEndereco({
          id_endereco: state.id_endereco,
          endereco: state.dados.enderecos,
          client_token: client_token.value,
          client_id: client_id.value,
        });
      } catch (error) {
        console.log(error);
      }
    }
    function formatarData(data_nascimento) {
      let data_americana = data_nascimento;
      let data_brasileira = data_americana.split("-").reverse().join("/");
      state.dados.data_nascimento = data_brasileira;
    }
    function revSenha() {
      if (state.tipo_senha == "password") {
        state.tipo_senha = "text";
      } else {
        state.tipo_senha = "password";
      }
    }
    async function cepAtributes() {
      var cep = state.dados.enderecos.cep;
      state.dados.enderecos.cep = cep.replace("-", "").replace(".", "");
      await services.cep.apiCep(state.dados.enderecos.cep).then((res) => {
        console.log(res.data);
        state.dados.enderecos.logradouro = res.data.logradouro;
        state.dados.enderecos.bairro = res.data.bairro;
        state.dados.enderecos.cidade.nome = res.data.localidade;
        state.dados.enderecos.cidade.estado.uf = res.data.uf;
        state.dados.enderecos.codigo_ibge = res.data.ibge;
      });
      getCityByCode(state.dados.enderecos.codigo_ibge);
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
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        state.dados.enderecos.cidade.estado_id = data.estado_id;
        state.dados.enderecos.cidade_id = data.id;
        console.log("código IBGE:" + cod_ibge);
        getCidade(state.dados.enderecos.cidade.estado_id);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    return {
      state,
      verificarEndereco,
      fecharModal,
      upCliente,
      upEndereco,
      revSenha,
      cepAtributes,
      getCidade,
    };
  },
};
</script>
<style scoped>
.title h2 {
  color: #000;
  font-size: 32px;
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
  --border-after-color: rgb(255, 0, 0);
  --input-hovered-color: #e049491f;
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

input:focus~.input-border {
  width: 100%;
}

.form label {
  font-size: 14pt;
  margin-bottom: 0;
}

.div_btn {
  text-align: right;
}

.btn_cancelar {
  background: red;
  color: #fff;
  padding: 5px 10px;
  font-size: 12pt;
  font-weight: 700;
  border: solid 2px red;
  border-radius: 5px;
  transition: 0.3s;
  margin-right: 10px;
}

.btn_cancelar:hover {
  background: transparent;
  color: #000;
  padding: 5px 10px;
  font-size: 12pt;
  font-weight: 700;
  border: solid 2px red;
  border-radius: 5px;
}

.btn_salvar {
  background: blue;
  color: #fff;
  padding: 5px 10px;
  font-size: 12pt;
  font-weight: 700;
  border: solid 2px blue;
  border-radius: 5px;
  transition: 0.3s;
}

.btn_salvar:hover {
  background: transparent;
  color: #000;
  padding: 5px 10px;
  font-size: 12pt;
  font-weight: 700;
  border: solid 2px blue;
  border-radius: 5px;
}

#togglePass {
  background: transparent;
  border: none;
}

#togglePass:hover {
  background: var(--input-hovered-color);
}

.btn_endereco {
  border-radius: 4px;
  border: 1px solid #e13229;
  background: transparent;
  color: #e13229;
  width: 100%;
  padding: 5px;
  transition: 0.2s;
}

.btn_endereco:hover {
  border-radius: 4px;
  border: 1px solid #e13229;
  background: #e13229;
  color: #fff;
  width: 100%;
}

.div_btn_endereco {
  text-align: left;
}

.title_modal {
  color: red;
}

.btn_save {
  padding: 5px;
  width: 100px;
  background: #00a000;
  border: solid 2px #000;
  border-radius: 5px;
  color: #000;
  transition: 0.2s;
}

.btn_save:hover {
  background: #008000;
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
  margin-right: 10px;
}

.btn_cancel:hover {
  background: #8f0303;
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
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}
</style>

