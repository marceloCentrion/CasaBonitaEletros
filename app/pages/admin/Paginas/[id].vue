<template>
  <!-- <div>
    <div class="card">
      <div class="card-header">
        <h4>Atualizar Página</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input readonly id="nome" type="text" class="form-control" v-model="state.pagina.nome" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label for="sobre">Sobre</label>
            <editor v-model="state.pagina.sobre" />
          </div>
        </div>
        <div class="text-right mt-10">
          <button type="button" @click="salvar" class="btn btn-success mr-1">
            Salvar
          </button>
          <router-link to="/admin/paginas">
            <button type="button" class="btn btn-danger">
              Cancelar
            </button></router-link>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { onMounted, reactive } from "vue";
// import { useRouter } from "vue-router";
// import services from "@/services/axios";
// export default {
//   setup() {
//     definePageMeta({
//       middleware: 'auth'
//     });
//     const router = useRouter();
//     const state = reactive({
//       pagina: {
//         id: "",
//         nome: "",
//         sobre: "",
//       },
//     });
//     const authStore = useAuthStore();
//     const token = authStore.token;

//     onMounted(() => {
//       if (router.currentRoute._value.params.id != undefined) {
//         fetchPage();
//       }
//     });
//     async function fetchPage() {
//       try {
//         const { data } = await services.pages.getById({
//           id: router.currentRoute._value.params.id,
//           token,
//         });
//         state.pagina.id = data.id;
//         state.pagina.nome = data.nome;
//         state.pagina.sobre = data.sobre

//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async function upGrupo() {
//       let dados = new FormData();
//       dados.append("id", state.grupo.id);
//       dados.append("nome", state.grupo.nome);
//       dados.append("urn", state.grupo.urn);
//       dados.append("status", state.grupo.status);
//       dados.append("destaque1", state.grupo.destaque1);
//       dados.append("destaque2", state.grupo.destaque2);
//       if (state.imagem.file != null) {
//         dados.append("imagem", state.imagem.file);
//       }
//       dados.append("id", state.grupo.id);
//       dados.append("_method", "PATCH");
//       if (state.imagem.imagem == undefined) {
//         try {
//           await services.cases.deletarImagem({
//             id: dados.get("id"),
//             token
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       try {
//         await services.grupos.update(dados, token);
//         router.push('/admin/grupos');
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     return {
//       upGrupo,
//       router,
//       state,
//     };
//   },
// };
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
