<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Contatos</h5>
                </div>
                <div class="col-md-6"></div>
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
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Telefone
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
                    <tr v-for="ctt in state.contatos" :key="ctt.id">
                      <td>{{ ctt.id }}</td>
                      <td style="line-height: 1.1">{{ ctt.nome }}</td>
                      <td>
                        <strong>{{ ctt.status }}</strong>
                      </td>
                      <td>{{ ctt.telefone }}</td>
                      <td>
                        <NuxtLink :to="'/admin/ver-contato/' + ctt.id"
                          ><button title="Ler" class="btn btn-primary">
                            <i class="bi bi-eye"></i></button
                        ></NuxtLink>
                        <button
                          @click="deletarContato(ctt.id)"
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
import { onMounted, reactive } from "vue";
import services from "@/services/axios";

export default {
  setup() {
    
    useHead({
      title: "Casa Bonita Eletros - Contatos",
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    const state = reactive({
      contatos: [],
    });
    onMounted(() => {
      fetchContatos();
    });
    async function fetchContatos() {
      try {
        const { data } = await services.contato.getAll({ token });
        console.log(data);
        state.contatos = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarContato(id) {
      if (confirm("Deseja deletar esse contato?")) {
        try {
          state.isLoading = true;
          const { data } = await services.contato.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            alert("Erro ao deletar contato!!!.");
          } else {
            fetchContatos();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return {
      state,
      deletarContato,
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
