<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Categoria</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              placeholder="Digite um nome:"
              v-model="state.categoria.nome"
              maxlength="255"
            />
            <small class="text-muted" style="font-size: 11px;">{{ state.categoria.nome?.length || 0 }}/255 caracteres</small>
          </div>
          <div class="col-md-3">
            <label for="nome">URN</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              placeholder="Digite uma urn:"
              v-model="state.categoria.urn"
              maxlength="255"
            />
            <small class="text-muted" style="font-size: 11px;">{{ state.categoria.urn?.length || 0 }}/255 caracteres</small>
          </div>
          <div class="col-md-3">
            <label for="status">Grupo</label>
            <select v-model="state.categoria.grupo_id" class="form-select">
              <option
                v-for="grupo in state.grupos"
                :key="grupo.id"
                :value="grupo.id"
              >
                {{ grupo.nome }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label for="status">Status</label>
            <select v-model="state.categoria.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12">
            <label>Imagem</label>
            <div class="div_imagens">
              <div class="list-group list-group-horizontal">
                <div v-if="state.imagem_preview" class="list-group-item">
                  <img :src="state.imagem_preview" class="img_categoria" />
                  <button class="btn_remover" @click="removerImagem" type="button">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>

                <div v-if="!state.imagem_preview" class="list-group-item">
                  <div class="file-upload">
                    <input id="file-input-imagem" type="file" accept="image/*" @change="adicionarImagem" />
                    <label for="file-input-imagem">
                      <div class="adicionar_imagem" @dragover.prevent @drop.prevent="onDropImagem">
                        <div class="icones">
                          <i class="bi bi-card-image i1"></i>
                          <i class="bi bi-plus i2"></i>
                        </div>
                        <span class="drop-hint">Arraste ou clique</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Imagem do grupo FORA do file-upload -->
                <div v-if="state.categoria.grupo?.imagem" class="list-group-item d-flex flex-column align-items-center justify-content-center">
                  <img :src="state.categoria.grupo.imagem" alt="Imagem do grupo" class="img_grupo" />
                  <span style="font-size: 11px; color: #555; display: block; text-align: center; margin-top: 4px;">
                    {{ state.categoria.grupo.nome }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="atualizarcat"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/categorias">
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
      title: "Casa Bonita Eletros - Alterar categoria",
    });
    
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      categoria: {
        id: "",
        nome: "",
        urn: "",
        status: "ATIVO",
        grupo_id: "",
        grupo:null,
      },
      grupos: [],
      imagem_file: null,
      imagem_preview: null,
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchCat();
      }
      fetchGrupo();
    });
    async function fetchGrupo() {
      try {
        const { data } = await services.grupos.getAll({ token });
        state.grupos = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchCat() {
      try {
        const { data } = await services.categoria.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.categoria.id = data.id;
        state.categoria.nome = data.nome;
        state.categoria.urn = data.urn;
        state.categoria.status = data.status;
        state.categoria.grupo_id = data.grupo_id;
        state.categoria.grupo = data.grupo;
        state.imagem_preview = data.imagem || null;
      } catch (error) {
        console.log(error);
      }
    }

    function adicionarImagem(event) {
      const file = event.target.files[0];
      if (!file) return;
      state.imagem_file = file;
      state.imagem_preview = URL.createObjectURL(file);
    }

    function onDropImagem(event) {
      const file = event.dataTransfer.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      state.imagem_file = file;
      state.imagem_preview = URL.createObjectURL(file);
    }

    function removerImagem() {
      state.imagem_file = null;
      state.imagem_preview = null;
      const fileInput = document.querySelector("#file-input-imagem");
      if (fileInput) fileInput.value = null;
    }

    async function atualizarcat() {
      if (state.isLoading) return;

      if (!state.categoria.nome || !state.categoria.nome.trim()) {
        toast.error("O campo Nome é obrigatório.");
        return;
      }
      if (!state.categoria.urn || !state.categoria.urn.trim()) {
        toast.error("O campo URN é obrigatório.");
        return;
      }
      if (!state.categoria.grupo_id) {
        toast.error("Selecione um Grupo para a categoria.");
        return;
      }

      state.isLoading = true;

      try {
        const formData = new FormData();
        formData.append("id", state.categoria.id);
        formData.append("nome", state.categoria.nome);
        formData.append("urn", state.categoria.urn);
        formData.append("status", state.categoria.status);
        formData.append("grupo_id", state.categoria.grupo_id);
        if (state.imagem_file) {
          formData.append("imagem", state.imagem_file);
        }

        await services.categoria.update(formData, token);
        toast.success("Categoria atualizada com sucesso!");
        router.push("/admin/categorias");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || error.response?.data?.message || "Erro ao atualizar a categoria. Verifique se o nome/URN já existem.");
      } finally {
        state.isLoading = false;
      }
    }
    return {
      atualizarcat,
      adicionarImagem,
      onDropImagem,
      removerImagem,
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

.img_grupo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #000;
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

/* Imagem */
.div_imagens {
  margin-top: 10px;
}

.list-group-horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.list-group-item {
  padding: 0;
  width: 150px;
  height: 150px;
  border: none;
  position: relative;
}

.img_categoria {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}

.file-upload {
  display: inline-block;
  position: relative;
}

#file-input-imagem {
  display: none;
}

.adicionar_imagem {
  width: 150px;
  height: 150px;
  border: var(--primary) 2px dashed;
  text-align: center;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.adicionar_imagem:hover {
  background-color: #fffbef;
}

.adicionar_imagem .icones {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.adicionar_imagem .icones .i1 {
  font-size: 28px;
}

.adicionar_imagem .icones .i2 {
  font-size: 18px;
  margin-left: 2px;
}

.drop-hint {
  font-size: 10px;
  color: #999;
  margin-top: 6px;
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
