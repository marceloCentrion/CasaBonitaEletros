<template>
  <div class="container mt-4" style="max-width: 900px;">
    <div class="card">
      <div class="card-header">
        <h4>Criar Banner</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="status">Categoria do Banner</label>
            <select v-model="state.banner.categoria" class="form-select">
              <option value="hero">Hero</option>
              <option value="secundario">Secundário</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="nome">Nome do Banner</label>
            <input id="nome" type="text" class="form-control" v-model="state.banner.nome" />
          </div>
          <div class="col-md-6 mb-3">
            <label>Imagem do Banner (Desktop)</label>
            <input id="bannerFile" type="file" class="form-control" @change="adicionarImagem" />
          </div>
          <div class="col-md-6 mb-3">
            <label>Imagem do Banner (Celular)</label>
            <input id="bannerCelFile" type="file" class="form-control" @change="adicionarImagemCel" />
          </div>
          <div style="display: flex" class="col-md-6 offset-md-3 mt-4" v-if="state.imagem.imagem">
            <img :src="state.imagem.imagem" class="imagem" />
            <div class="div_btn_x">
              <button class="btn_remover" @click="removerImagem">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div style="display: flex" class="col-md-6 offset-md-3 mt-4" v-if="state.img_cel.imagem">
            <img :src="state.img_cel.imagem" class="imagem" />
            <div class="div_btn_x">
              <button class="btn_remover" @click="removerImagemCel">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="salvarBanner()"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/banners">
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
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      banner: {
        id: "",
        categoria: "hero",
        nome: "",
      },
      imagem: {},
      img_cel: {},
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchBanner();
      }
    });
    async function fetchBanner() {
      try {
        const { data } = await services.banners.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.banner.id = data.id;
        if (data.imagem != null) {
          state.imagem.imagem = data.imagem;
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarBanner() {
      if (state.isLoading) return;

      if (!state.banner.categoria) {
        toast.error("O campo Categoria é obrigatório.");
        return;
      }
      if (!state.banner.nome || !state.banner.nome.trim()) {
        toast.error("O campo Nome é obrigatório.");
        return;
      }
      if (!state.banner.id && !state.imagem.file && !state.img_cel.file) {
        toast.error("É necessário enviar pelo menos uma imagem para o banner.");
        return;
      }
      
      state.isLoading = true;
      
      let dados = new FormData();
      dados.append("categoria", state.banner.categoria);
      dados.append("nome", state.banner.nome);
      if (state.imagem.file != null) {
        dados.append("imagem", state.imagem.file);
      }
      if (state.img_cel.file != null) {
        dados.append("imagem_cel", state.img_cel.file);
      }
      dados.append("id", state.banner.id);
      dados.append("_method", "POST");
      if (state.imagem.imagem == undefined) {
        try {
          await services.banners.deletarImagem({
            id: dados.get("id"),
            token,
          });
        } catch (error) {
          console.log(error);
        }
      }
      try {
        await services.banners.save(dados, token);
        router.push("/admin/banners");
      } catch (error) {
        console.log(error);
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
    async function adicionarImagemCel(event) {
      var img_cel = event.target.files[0];
      var objImagemCel = new Object();
      objImagemCel.file = img_cel;
      objImagemCel.imagem = URL.createObjectURL(img_cel);
      state.img_cel = objImagemCel;
    }
    async function removerImagemCel() {
      state.img_cel = {};
      document.querySelector('input[type="file"]').value = null;
    }
    return {
      salvarBanner,
      removerImagem,
      adicionarImagem,
      router,
      state,
      adicionarImagemCel,
      removerImagemCel,
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
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.card-header {
  border-radius: 0px;
  background-color: #000;
  color: #fff;
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

.imagem {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
}
</style>
