<template>
  <div>
    <div class="container">
      <h2 class="title mt-12">Cadastrar Endereço</h2>
      <div class="row">
        <div class="col-md-10 offset-md-1 mt-9">
          <div class="row">
            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Cep:</label>
                <input v-model="state.dados.cep" class="input" type="text" @blur="cepAtributes" v-maska
                  data-maska="#####-###" />
                <span class="input-border"></span>
              </div>
            </div>

            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Estado:</label>
                <select v-model="state.dados.estado_id" class="input" type="text"
                  @change="getCidade($event.target.value)">
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
                <select v-model="state.dados.cidade_id" class="input" type="text">
                  <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
                    {{ cidade.nome }}
                  </option>
                </select>
                <span class="input-border"></span>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Logradouro:</label>
                <input v-model="state.dados.logradouro" class="input" type="text" />
                <span class="input-border"></span>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Número:</label>
                <input v-model="state.dados.numero" class="input" type="text" />
                <span class="input-border"></span>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Bairro:</label>
                <input v-model="state.dados.bairro" class="input" type="text" />
                <span class="input-border"></span>
              </div>
            </div>
            <div class="col-xl-4 col-lg-6 mb-4 mt-4">
              <div class="form">
                <label>Complemento:</label>
                <input v-model="state.dados.complemento" class="input" type="text" />
                <span class="input-border"></span>
              </div>
            </div>
          </div>
          <div class="text-right mb-6">
            <a href="/minha-conta">
              <button class="btn_transparent">Voltar</button></a>
            <button @click="saveEndereco()" class="btn_gold">Continuar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services/axios";
export default {
  setup() {
    useHead({
      title: "Adicionar Endereço",
    });
    definePageMeta({
      layout: "site",
    });
    onMounted(() => {
      getEstados();
    });
    
    const router = useRouter();
    const state = reactive({
      dados: {
        cep: "",
        numero: "",
        cidade: "",
        uf: "",
        cidade_id: "",
        estado_id: "",
        bairro: "",
        codigo_ibge: "",
      },
      estados: "",
      cidades: [{}],
    });
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

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
    async function saveEndereco() {
      try {
        state.dados.cliente_id = client_id.value;
        await services.endereco.save({
          dados: state.dados,
          token: client_token.value,
        });
        router.push('/minha-conta')
      } catch (error) {
        alert("Erro ao cadastrar endereço!");
      }
    }
    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        state.dados.estado_id = data.estado_id;
        state.dados.cidade_id = data.id;
        console.log("código IBGE:" + cod_ibge);
        getCidade(state.dados.estado_id);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }
    return {
      cepAtributes,
      state,
      saveEndereco,
      getCidade
    };
  },
};
</script>

<style scoped>
title {
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
  font-family: 'Poppins';

}

label {
  color: #000;
  font-size: 18px;
  margin-bottom: 0;
  font-family: 'Poppins';

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

input:focus~.input-border {
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
  font-family: 'Poppins', sans-serif;
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
  font-family: 'Poppins', sans-serif;
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

