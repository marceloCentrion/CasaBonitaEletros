<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Endereços</h4>
      </div>
      <div class="card-body">
        <div>
          <div class="row" v-for="endereco in state.enderecos" :key="endereco.id">
            <p
              class="endereco_principal"
              v-if="endereco.principal === 'SIM'">
              Endereço Principal
            </p>
            <p
              class="endereco_principal"
              v-if="endereco.principal === 'NAO'">
              Endereço Secundário
            </p>
            <div class="col-md-4">
              <label for="nome">Nome</label>
              <input id="nome" type="text" class="form-control" v-model="endereco.nome" />
            </div>
            <div class="col-md-4">
              <label for="telefone">Telefone</label>
              <input id="telefone" type="text" class="form-control" v-model="endereco.telefone" />
            </div>
            <div class="col-md-4">
              <label for="endereco">Endereço</label>
              <input id="endereco" type="text" class="form-control" v-model="endereco.logradouro" />
            </div>
            <div class="col-md-4">
              <label for="numero">Número</label>
              <input id="numero" type="text" class="form-control" v-model="endereco.numero" />
            </div>
            <div class="col-md-4">
              <label for="bairro">Bairro</label>
              <input id="bairro" type="text" class="form-control" v-model="endereco.bairro" />
            </div>
            <div class="col-md-4">
              <label for="cep">CEP</label>
              <input id="cep" type="text" class="form-control" v-model="endereco.cep" />
            </div>
            <div class="col-md-4">
              <label for="cidade">Cidade</label>
              <input id="cidade" type="text" class="form-control" v-model="endereco.cidade.nome" />
            </div>
            <div class="col-md-4">
              <label for="estado">Estado</label>
              <input id="estado" type="text" class="form-control" v-model="endereco.cidade.estado.nome" />
            </div>
            <div class="col-md-4">
              <label for="complemento">Complemento</label>
              <input id="complemento" type="text" class="form-control" v-model="endereco.complemento" />
            </div>
          </div>
        </div>
        <div class="btns_right">
          <SecButton to="/admin/clientes" style="width: fit-content; padding: 10px 30px;">
            Voltar
          </SecButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services/axios";
import SecButton from "~/components/SecButton.vue";

export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      enderecos: [
        {
          cep: "",
          logradouro: "",
          numero: "",
          bairro: "",
          complemento: "",
          cidade: {
            nome: "",
            estado: { nome: "" },
          },
        },
      ],
    });

    onMounted(() => {
      // BUG 3 FIX: trocado _value.params por .value.params (API reativa correta)
      if (router.currentRoute.value.params.id != undefined) {
        fetchEndereco();
      }
    });

    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchEndereco() {
      try {
        const { data } = await services.clientes.getById({
          id: router.currentRoute.value.params.id,
          token,
        });
        state.enderecos = data.enderecos;
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
h4 {
  color: #fff;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  pointer-events: none;
  background-color: #f3f3f3;
  color: #333;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
}

input:focus {
  outline: none;
}

select {
  border: solid 1px #000;
}

select:focus {
  outline: none !important;
}

.btns_right {
  text-align: right;
  margin-top: 5rem;
}

.card-header {
  border-bottom: none;
  background-color: #181818;
  color: #fff;
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}

.endereco_principal {
  margin-top: 10px;
  margin-bottom: 0;
  color: #000;
  font-weight: 700;
}
</style>  