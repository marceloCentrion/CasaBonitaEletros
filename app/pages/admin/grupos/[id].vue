<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Grupo</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite um nome:"
              v-model="state.grupo.nome" />
          </div>
          <div class="col-md-3">
            <label for="nome">URN</label>
            <input id="nome" type="text" class="form-control" placeholder="Digite um nome:" v-model="state.grupo.urn" />
          </div>
          <div class="col-md-2">
            <label for="status">Destaque 1</label>
            <select v-model="state.grupo.destaque1" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Destaque 2</label>
            <select v-model="state.grupo.destaque2" class="form-select">
              <option value="SIM">Sim</option>
              <option value="NAO">Não</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.grupo.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-4">
            <label>Imagem</label>
            <input type="file" class="form-control" @change="adicionarImagem" />
          </div>
          <div style="display: flex" class="col-md-6 offset-md-3 mt-4" v-if="state.imagem.imagem">
            <img :src="state.imagem.imagem" class="imagem" />
            <div class="div_btn_x">
              <button class="btn_remover" @click="removerImagem">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="upGrupo()"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/grupos">
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
      title: "Casa Bonita Eletros - Alterar grupo",
    });
    
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      grupo: {
        id: "",
        nome: "",
        urn: "",
        status: "ATIVO",
        destaque1: '',
        destaque2: '',
      },
      imagem: {},
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchGrupo();
      }
    });
    async function fetchGrupo() {
      try {
        const { data } = await services.grupos.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.grupo.id = data.id;
        state.grupo.nome = data.nome;
        state.grupo.urn = data.urn;
        state.grupo.status = data.status;
        state.grupo.destaque1 = data.destaque1;
        state.grupo.destaque2 = data.destaque2;
        state.imagem.imagem = data.imagem
      } catch (error) {
        console.log(error);
      }
    }
    async function upGrupo() {
      if (state.isLoading) return;

      if (!state.grupo.nome || !state.grupo.nome.trim()) {
        toast.error("O campo Nome é obrigatório.");
        return;
      }
      if (!state.grupo.urn || !state.grupo.urn.trim()) {
        toast.error("O campo URN é obrigatório.");
        return;
      }

      state.isLoading = true;
      
      let dados = new FormData();
      dados.append("id", state.grupo.id);
      dados.append("nome", state.grupo.nome);
      dados.append("urn", state.grupo.urn);
      dados.append("status", state.grupo.status);
      dados.append("destaque1", state.grupo.destaque1);
      dados.append("destaque2", state.grupo.destaque2);
      if (state.imagem.file != null) {
        dados.append("imagem", state.imagem.file);
      }
      dados.append("id", state.grupo.id);
      dados.append("_method", "PATCH");
      if (state.imagem.imagem == undefined) {
        try {
          await services.grupos.deletarImagem({
            id: dados.get("id"),
            token
          });
        } catch (error) {
          console.log(error);
        }
      }
      try {
        await services.grupos.update(dados, token);
        toast.success("Grupo atualizado com sucesso!");
        router.push('/admin/grupos');
      } catch (error) {
        toast.error(error.response?.data?.msg || error.response?.data?.message || "Erro ao atualizar grupo.");
        console.log(error);
      } finally {
        state.isLoading = false;
      }
    }
    async function adicionarImagem(event) {
      var img = event.target.files[0];
      var objImagem = new Object();
      objImagem.file = img;
      objImagem.imagem = URL.createObjectURL(img);
      state.imagem = objImagem;
    }
    async function removerImagem() {
      state.imagem = {};
      document.querySelector('input[type="file"]').value = null;
    }
    return {
      adicionarImagem,
      removerImagem,
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
