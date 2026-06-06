<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Variação</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite um nome:"
              v-model="state.variacao.nome" />
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="upVariacao()"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/variacoes">
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
import { useRoute } from "vue-router";
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    const route = useRoute();
    const toast = useToast();
    const authStore = useAuthStore();

    const state = reactive({
      isLoading: false,
      variacao: {
        id: "",
        nome: "",
      },
    });

    onMounted(() => {
      if (route.params.id != undefined) {
        fetchVari();
      }
    });

    async function fetchVari() {
      try {
        const { data } = await services.variacoes.getById({
          id: route.params.id,
          token: authStore.token,
        });
        state.variacao.id = data.id;
        state.variacao.nome = data.nome;

      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar dados da variação.");
      }
    }

    async function upVariacao() {
      try {
        state.isLoading = true;
        await services.variacoes.update(state.variacao, authStore.token);
        toast.success("Variação atualizada com sucesso!");
        await navigateTo("/admin/variacoes");
      } catch (error) {
        console.log("Erro da API:", error.response?.data);
        const errorData = error.response?.data;
        let errorMessage = "Erro ao atualizar variação.";
        
        if (errorData) {
          if (typeof errorData === 'string') errorMessage = errorData;
          else if (errorData.message) errorMessage = errorData.message;
          else if (errorData.msg) errorMessage = errorData.msg;
          else if (errorData.error) errorMessage = errorData.error;
          else if (errorData.errors && typeof errorData.errors === 'object') {
             const firstKey = Object.keys(errorData.errors)[0];
             errorMessage = errorData.errors[firstKey][0];
          }
        }
        toast.error(errorMessage);
      } finally {
        state.isLoading = false;
      }
    }

    return {
      upVariacao,
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
