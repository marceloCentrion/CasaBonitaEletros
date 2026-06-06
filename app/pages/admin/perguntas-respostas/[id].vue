<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Pergunta</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <label for="nome">Pergunta</label>
            <textarea id="nome" type="text" class="form-control" placeholder="Digite uma pergunta:"
              v-model="state.pergunta.pergunta"></textarea>
          </div>
          <div class="col-md-5">
            <label for="nome">Resposta</label>
            <textarea id="nome" type="text" class="form-control" placeholder="Digite uma resposta:"
              v-model="state.pergunta.resposta"></textarea>
          </div>
          <div class="col-md-2">
            <label for="status">Status</label>
            <select v-model="state.pergunta.status" class="form-select">
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="upPergunta" class="btn btn-success mr-1">Salvar</button>
          <router-link to="/admin/perguntas-respostas">
            <button type="button" class="btn btn-danger">Cancelar</button></router-link>
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
    definePageMeta({
      middleware: 'auth'
    });
    const router = useRouter();
    const state = reactive({
      pergunta: {
        id: "",
        pergunta: "",
        resposta: "",
        status: "ATIVO",
      },
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      if (router.currentRoute._value.params.id != undefined) {
        fetchId();
      }
    });
    async function fetchId() {
      try {
        const { data } = await services.perguntas.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.pergunta.id = data.id;
        state.pergunta.pergunta = data.pergunta;
        state.pergunta.resposta = data.resposta;
        state.pergunta.status = data.status;
      } catch (error) {
        console.log(error);
      }
    }
    async function upPergunta() {
      try {
        await services.perguntas.update(state.pergunta, token);
        router.push("/admin/perguntas-respostas");
      } catch (error) {
        console.log(error);
      }
    }
    return {
      upPergunta,
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
