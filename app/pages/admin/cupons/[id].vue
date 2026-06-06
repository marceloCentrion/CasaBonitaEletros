<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Cupom</h4>
      </div>
      <div class="card-body">
        <div>
          <input
            type="radio"
            id="radio_percentual"
            v-model="state.cupom.tipo_desconto"
            value="PERCENTUAL"
          />
          <label for="radio_percentual">Percentual</label>
          <input
            type="radio"
            id="radio_valor"
            v-model="state.cupom.tipo_desconto"
            value="VALOR"
          />
          <label for="radio_valor">Valor</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="valido_primeira_compra"
            v-model="state.cupom.primeira_compra"
          />
          <label for="valido_primeira_compra"
            >Válido apenas para primeira compra</label
          >
        </div>
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              v-model="state.cupom.nome"
              maxlength="255"
            />
            <small class="text-muted" style="font-size: 11px;">{{ state.cupom.nome?.length || 0 }}/255 caracteres</small>
          </div>

          <div class="col-md-2">
            <label for="codigo">Código</label>
            <input
              id="codigo"
              type="text"
              class="form-control"
              v-model="state.cupom.codigo"
              maxlength="50"
            />
            <small class="text-muted" style="font-size: 11px;">{{ state.cupom.codigo?.length || 0 }}/50 caracteres</small>
          </div>

          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.cupom.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="CANCELADO">Cancelado</option>
              <option value="VENCIDO">Vencido</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="status">Parceiro</label>
            <select v-model="state.cupom.parceiro_id" class="form-select">
              <option
                v-for="cliente in state.clientes"
                :value="cliente.id"
                :key="cliente.id"
              >
                {{ cliente.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="data_inicial">Data Inicial</label>
            <input
              id="data_inicial"
              type="text"
              class="form-control"
              v-model="state.cupom.data_inicial"
              @input="mascararData('data_inicial')"
              maxlength="10"
              placeholder="DD/MM/AAAA"
            />
          </div>

          <div class="col-md-4">
            <label for="validade">Data de Validade</label>
            <input
              id="validade"
              type="text"
              class="form-control"
              v-model="state.cupom.validade"
              @input="mascararData('validade')"
              maxlength="10"
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div class="col-md-4">
            <label for="desconto" v-if="state.cupom.tipo_desconto == 'PERCENTUAL'"
              >Percentual</label
            >
            <label for="desconto" v-else>Valor (em Reais)</label>
            <input
              id="desconto"
              type="text"
              class="form-control"
              v-model="state.cupom.desconto"
            />
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="salvarCupom"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/cupons">
            <OutlineButton type="button">
              <i class="bi bi-x-circle me-1"></i>
              Cancelar
            </OutlineButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Cadastrar cupom",
    });
    
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      cupom: {
        id: "",
        nome: "",
        codigo: "",
        status: "",
        data_inicial: "",
        validade: "",
        parceiro_id: "",
      },
      imagem: {},
      clientes: [],
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchClientes();
        fetchCupom();
      }
    });
    async function fetchClientes() {
      try {
        const { data } = await services.clientes.getAll(token);
        console.log(data);
        state.clientes = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchCupom() {
      try {
        const { data } = await services.cupons.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.cupom = data;
        state.cupom.primeira_compra = false;
        if (state.cupom.valido_apenas_primeira_compra == "SIM")
          state.cupom.primeira_compra = true;
      } catch (error) {
        console.log(error);
      }
    }

    function mascararData(campo) {
      let valor = state.cupom[campo].replace(/\D/g, "");
      if (valor.length > 2 && valor.length <= 4) {
        valor = valor.replace(/^(\d{2})(\d+)/, "$1/$2");
      } else if (valor.length > 4) {
        valor = valor.replace(/^(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
      }
      state.cupom[campo] = valor;
    }

    async function salvarCupom() {
      if (state.isLoading) return;

      if (!state.cupom.nome || !state.cupom.nome.trim()) {
        toast.error("O campo Nome é obrigatório.");
        return;
      }
      if (!state.cupom.codigo || !state.cupom.codigo.trim()) {
        toast.error("O campo Código é obrigatório.");
        return;
      }
      if (!state.cupom.data_inicial || state.cupom.data_inicial.length < 10) {
        toast.error("O campo Data Inicial está inválido ou incompleto.");
        return;
      }
      if (!state.cupom.validade || state.cupom.validade.length < 10) {
        toast.error("O campo Data de Validade está inválido ou incompleto.");
        return;
      }
      if (!state.cupom.desconto) {
        toast.error("O campo Desconto é obrigatório.");
        return;
      }

      const parseDate = (str) => {
        const [dia, mes, ano] = str.split("/");
        return new Date(`${ano}-${mes}-${dia}T00:00:00`);
      };

      if (parseDate(state.cupom.validade) < parseDate(state.cupom.data_inicial)) {
        toast.error("A data de validade não pode ser menor que a data inicial.");
        return;
      }

      state.isLoading = true;

      try {
        state.cupom.valido_apenas_primeira_compra = "NAO";
        if (state.cupom.primeira_compra)
          state.cupom.valido_apenas_primeira_compra = "SIM";

        await services.cupons.update({ cupom: state.cupom, token });
        toast.success("Cupom atualizado com sucesso!");
        router.push("/admin/cupons");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || "Erro ao atualizar o cupom.");
      } finally {
        state.isLoading = false;
      }
    }

    return {
      salvarCupom,
      router,
      state,
      mascararData,
    };
  },
};
</script>

<style scoped>
h4 {
  color: #fff;
}

.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
}

#radio_valor {
  margin-left: 10px;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
  resize: none;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.imagem {
  width: 100%;
  object-fit: cover;
  margin-top: 1em;
  height: auto;
}

.btn_remover {
  border: none;
  outline: none;
  background-color: #ff0000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #f57171;
}

.btn_remover:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #f57171;
}

.div_btn_x {
  margin-left: 10px;
}
</style>
