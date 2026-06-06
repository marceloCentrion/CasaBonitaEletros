<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Grupo</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <BaseInput
              id="parcelas"
              label="Parcelas"
              v-model="state.taxa.parcelas"
              placeholder="Ex: 12"
              maxlength="2"
              :isInvalid="!!state.errors.parcelas"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-3">
            <BaseInput
              id="taxas"
              label="Taxas (%)"
              v-model="state.taxa.taxas"
              placeholder="Ex: 4.5"
              maxlength="10"
              :isInvalid="!!state.errors.taxas"
              errorMessage="Preencha este campo"
            />
          </div>
        </div>
        <div class="mt-5 pt-3 d-flex justify-content-end gap-3">
          <NuxtLink class="no-link" to="/admin/taxas-cartao">
            <OutlineButton type="button">Cancelar</OutlineButton>
          </NuxtLink>
          <SecButton class="w-fit-content px-8" @click="upGrupo" :disabled="state.isLoading">
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import services from "@/services/axios";
import BaseInput from "@/components/BaseInput.vue";
import SecButton from "~/components/SecButton.vue";
import OutlineButton from "~/components/OutlineButton.vue";
import { useToast } from "@/composables/useToast";

export default {
  components: { BaseInput, SecButton, OutlineButton },
  setup() {
    
    const router = useRouter();
    const toast = useToast();
    const state = reactive({
      taxa: {
        id: "",
        parcelas: "",
        taxas: "",
      },
      errors: {},
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchMarca();
      }
    });
    async function fetchMarca() {
      try {
        const { data } = await services.taxas.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.taxa.id = data.id;
        state.taxa.taxas = data.taxas;
        state.taxa.parcelas = data.parcelas;
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar dados da taxa.");
      }
    }
    async function upGrupo() {
      state.errors = {};
      let erro = false;

      if (!state.taxa.parcelas) { state.errors.parcelas = true; erro = true; }
      if (!state.taxa.taxas) { state.errors.taxas = true; erro = true; }

      if (erro) {
        toast.error("Por favor, preencha todos os campos obrigatórios destacados.");
        return;
      }

      if (state.isLoading) return;
      state.isLoading = true;

      try {
        await services.taxas.update(state.taxa, token);
        toast.success("Taxa atualizada com sucesso!");
        router.push("/admin/taxas-cartao");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || error.response?.data?.message || "Erro ao atualizar taxa.");
      } finally {
        state.isLoading = false;
      }
    }
    return {
      upGrupo,
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

.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
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
