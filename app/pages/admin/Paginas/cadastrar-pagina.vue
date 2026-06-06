<template>
  <!-- <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Página</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="state.page.nome_pagina" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label for="sobre">Sobre</label>
            <editor v-model="state.page.sobre" />
          </div>
        </div>
        <div class="text-right mt-10">
          <router-link to="/admin/paginas">
            <button type="button" class="btn btn-danger mr-1">
              Cancelar
            </button>
          </router-link>
          <button type="button" @click="salvar" class="btn btn-success">
            Salvar
          </button>
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

//     const router = useRouter();
//     const state = reactive({
//       page: {
//         nome_pagina: "",
//         sobre: "",
//       },
//     });
//     const authStore = useAuthStore();
//     const token = authStore.token;
//     onMounted(() => { });

//     async function salvar() {
//       let pagina = {};
//       pagina.nome = state.page.nome_pagina;
//       pagina.sobre = state.page.sobre;

//       try {
//         await services.pages.save(pagina, token);
//         router.push("/admin/paginas");
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     return {
//       salvar,
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
