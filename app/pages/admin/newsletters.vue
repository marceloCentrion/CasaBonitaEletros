<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Newsletters</h5>
                </div>
                <div class="col-md-6"></div>
              </div>
            </div>
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
                      Contato
                    </th>
                    <th
                      style="background-color: var(--primary); color: #fff"
                      scope="col"
                    >
                      Preferencia
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
                  <tr v-for="letter in state.newsletter" :key="letter.id">
                    <td>{{ letter.id }}</td>
                    <td>{{ contatoNewsletter(letter) }}</td>
                    <td>{{ preferenciaNewsletter(letter) }}</td>
                    <td>
                      <!-- <button title="Alterar" class="btn btn-primary">
                        <i class="bi bi-pencil-fill"></i>
                      </button> -->
                      <button
                        @click="deletarLetter(letter.id)"
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
</template>

<script>
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";
export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Newsletters",
    });
    
    const toast = useToast();

    const state = reactive({
      newsletter: [],
    });
    onMounted(() => {
      fetchLetter();
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    async function fetchLetter() {
      try {
        const { data } = await services.newsletters.getAll({ token });
        console.log(data);
        state.newsletter = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function deletarLetter(id) {
      if (confirm("Deseja deletar esta New?")) {
        try {
          state.isLoading = true;
          const { data } = await services.newsletters.delete({
            id: id,
            token,
          });
          console.log(data.status);
          if (data.status != 200) {
            toast.error("Erro ao deletar a newsletter.");
          } else {
            toast.success("Newsletter excluída com sucesso!");
            fetchLetter();
          }
        } catch (error) {
          console.log(error);
          toast.error("Erro ao excluir a newsletter.");
        }
      }
    }
    function formatarTelefone(valor) {
      const numeros = String(valor || "").replace(/\D/g, "");
      if (numeros.length === 11) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
      }
      if (numeros.length === 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
      }
      return valor || "-";
    }

    function contatoNewsletter(letter) {
      return letter.whatsapp
        ? formatarTelefone(letter.whatsapp)
        : letter.telefone
          ? formatarTelefone(letter.telefone)
          : letter.email || "-";
    }

    function preferenciaNewsletter(letter) {
      const preferencia = letter.preferencia_contato || letter.tipo || "";
      if (preferencia.toLowerCase() === "whatsapp" || letter.whatsapp || letter.telefone) {
        return "WhatsApp";
      }
      if (preferencia.toLowerCase() === "email" || letter.email) {
        return "E-mail";
      }
      return "-";
    }

    return {
      state,
      deletarLetter,
      contatoNewsletter,
      preferenciaNewsletter,
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
