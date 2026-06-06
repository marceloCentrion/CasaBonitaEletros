<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Editar Marca</h4>
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
            @click="atualizarMarca"
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
import { useRouter, useRoute } from "vue-router";
import services from "@/services/axios";

export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Editar marca",
    });
    
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    const token = authStore.token;

    const state = reactive({
      marca: {
        id: route.params.id,
        nome: "",
        status: "ATIVO",
      },
      logoFile: null,
      logoPreview: null,
      isLoading: false,
    });

    onMounted(() => {
      fetchMarca();
    });

    async function fetchMarca() {
      try {
        const { data } = await services.marcas.getById({ id: state.marca.id, token });
        if (data) {
          state.marca.nome = data.nome;
          state.marca.status = data.status;
          if (data.logo) {
            state.logoPreview = data.logo.startsWith('http')
              ? data.logo
              : `https://api.cozinharteeletros.com.br/storage/${data.logo}`;
          }
        }
      } catch (error) {
        console.log("Erro ao buscar a marca:", error);
      }
    }

    function onLogoChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      state.logoFile = file;
      state.logoPreview = URL.createObjectURL(file);
    }

    async function atualizarMarca() {
      if (state.isLoading) return;
      
      state.isLoading = true;
      
      const dados = new FormData();
      dados.append("id", state.marca.id);
      dados.append("nome", state.marca.nome);
      dados.append("status", state.marca.status);
      if (state.logoFile) dados.append("logo", state.logoFile);

      try {
        await services.marcas.update(dados, token);
        router.push("/admin/marcas");
      } catch (error) {
        console.log("Erro ao atualizar a marca:", error);
      } finally {
        state.isLoading = false;
      }
    }

    return {
      atualizarMarca,
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
input, select {
  border: solid 1px #000;
}
.imagem {
  width: 200px;
  height: auto;
  object-fit: contain;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
}
.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}
</style>