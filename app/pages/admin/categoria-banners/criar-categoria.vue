<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Criar Categoria</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="state.cat.nome" />
          </div>
          <div class="col-md-3">
            <label for="nome">Dimensões</label>
            <input id="nome" type="text" class="form-control" v-model="state.cat.dimensoes" />
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="salvarCat"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/categoria-banners">
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Criar Categoria Banner",
    });
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      cat: {
        id: "",
        nome: "",
        dimensoes: "",
      },
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    async function salvarCat() {
      if (state.isLoading) return;
      
      if (!state.cat.nome || !state.cat.nome.trim()) {
        toast.error("O campo Nome é obrigatório.");
        return;
      }

      state.isLoading = true;
      
      try {
        await services.banners.saveCat(state.cat, token);
        toast.success("Categoria criada com sucesso!");
        router.push("/admin/categoria-banners");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || "Erro ao salvar a categoria.");
      } finally {
        state.isLoading = false;
      }
    }
    
    return {
      salvarCat,
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
