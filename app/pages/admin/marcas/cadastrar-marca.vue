<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Grupos</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              v-model="state.marca.nome"
            />
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.marca.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-12 mt-3">
            <label for="logo">Logo da Marca</label>
            <input
              id="logo"
              type="file"
              class="form-control"
              accept="image/jpeg,image/png,image/webp"
              @change="onLogoChange"
            />
            <img
              v-if="state.logoPreview"
              :src="state.logoPreview"
              class="imagem mt-2"
              alt="Preview da logo"
            />
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="salvarMarca"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/marcas">
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
export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Cadastrar marca",
    });
    
    const router = useRouter();
    const state = reactive({
      marca: {
        id: "",
        nome: "",
        status: "ATIVO",
      },
      logoFile: null,
      logoPreview: null,
      isLoading: false,
    });

    function onLogoChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      state.logoFile = file;
      state.logoPreview = URL.createObjectURL(file);
    }
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {});

    async function salvarMarca() {
      if (state.isLoading) return;
      
      state.isLoading = true;
      
      const dados = new FormData();
      dados.append("nome", state.marca.nome);
      dados.append("status", state.marca.status);
      if (state.logoFile) dados.append("logo", state.logoFile);

      try {
        await services.marcas.save(dados, token);
        router.push("/admin/marcas");
      } catch (error) {
        console.log(error);
      } finally {
        state.isLoading = false;
      }
    }

    return {
      salvarMarca,
      onLogoChange,
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
