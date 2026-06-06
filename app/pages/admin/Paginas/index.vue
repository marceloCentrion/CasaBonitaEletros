<template>
  <!-- <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <h5>Páginas</h5>
                </div>
                <div class="col-2">
                  <div style="text-align: right">
                    <NuxtLink to="/admin/paginas/cadastrar-pagina">
                      <AdminButton>
                        Nova Página
                      </button>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Código
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Nome
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="page in state.pages" :key="page.id">
                      <td>{{ page.id }}</td>
                      <td>{{ page.nome }}</td>
                      <td>
                        <NuxtLink :to="'/admin/paginas/' + page.id">
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <button @click="deletarCategoria(marca.id)" title="Deletar" class="btn btn-danger">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { reactive } from "vue";
// import { onMounted } from "vue";
// import services from "@/services/axios";
// export default {
//   setup() {
//     const authStore = useAuthStore();
//     const token = authStore.token;
//     const state = reactive({
//       pages: [],
//     });
//     onMounted(() => {
//       fetchPages();
//     });
//     async function fetchPages() {
//       try {
//         const { data } = await services.pages.getAll({ token });
//         state.pages = data;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     return {
//       state,
//     };
//   },
// };
</script>

<style scoped>
h5 {
  color: #fff;
}

th {
  border-bottom: solid 1px #000 !important;
}

tr {
  text-align: center;
}

td {
  border-bottom: solid 1px #000 !important;
}

.card-header {
  background-color: #181818;
  border-radius: 0px;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.table-hover > tbody > tr:hover > * {
  color: rgb(0, 0, 0);
  background-color: rgb(225, 225, 225);
}

.btn {
  margin: 5px;
}
</style>
