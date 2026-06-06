<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <h5>Perguntas e Respostas</h5>
                </div>
                <div class="col-2">
                  <div style="text-align: right">
                    <NuxtLink
                      to="/admin/perguntas-respostas/cadastrar-pergunta"
                    >
                      <AdminButton>Nova Pergunta</AdminButton>
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
                        Pergunta
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Status
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="Pergunta in state.perguntas" :key="Pergunta.id">
                      <td>{{ Pergunta.id }}</td>
                      <td>{{ Pergunta.pergunta }}</td>
                      <td>{{ Pergunta.status }}</td>
                      <td>
                        <NuxtLink
                          :to="'/admin/perguntas-respostas/' + Pergunta.id"
                        >
                          <button title="Alterar" class="btn btn-primary">
                            <i class="bi bi-pencil-fill"></i>
                          </button>
                        </NuxtLink>
                        <button
                          @click="deletar(Pergunta.id)"
                          title="Deletar"
                          class="btn btn-danger"
                        >
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
  </div>
</template>
<script>
import { reactive } from "vue";
import { onMounted } from "vue";
import services from "@/services/axios";
export default {
  setup() {
    useHead({});

    const authStore = useAuthStore();
    const token = authStore.token;
    const state = reactive({
      perguntas: [],
    });
    onMounted(() => {
      fetch();
    });
    async function fetch() {
      try {
        const { data } = await services.perguntas.getAll({ token });
        console.log(data);
        state.perguntas = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletar(id) {
      if (confirm("Deseja deletar esta pergunta?")) {
        try {
          state.isLoading = true;
          const { data } = await services.perguntas.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar pergunta.");
          } else {
            fetch();
          }
        } catch (error) {
          console.log(error);
          alert(error.response.data.message);
        }
      }
    }
    return {
      state,
      deletar,
    };
  },
};
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
