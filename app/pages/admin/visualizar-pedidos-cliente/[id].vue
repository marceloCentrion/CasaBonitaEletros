<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <NuxtLink to="/admin/clientes">
                      <span id="span-url">Clientes</span>
                    </NuxtLink>
                  </li>
                  <li
                    class="breadcrumb-item active"
                    aria-current="page"
                    style="color: #fff"
                  >
                    Pedidos de {{ state.nome }}
                  </li>
                </ol>
              </nav>
              <div class="row align-items-center">
                <div class="col-md-6 d-flex align-items-center gap-2">
                  <!-- BUG 4 FIX: botão voltar usando $router.back() para retornar à página anterior -->
                  <button
                    class="btn btn-voltar"
                    @click="$router.back()"
                    title="Voltar"
                  >
                    <i class="bi bi-arrow-left"></i>
                  </button>
                  <h5>Pedidos de {{ state.nome }}</h5>
                </div>
                <div class="col-md-6">
                  <div class="d-flex">
                    <input
                      class="input-search"
                      type="text"
                      v-model="state.search"
                      placeholder="Pesquisar..."
                      @keydown.enter="filtrarPedidosClientes(state.search)"
                    />
                    <button
                      class="btn btn-primary"
                      @click="filtrarPedidosClientes(state.search)"
                      :disabled="state.loadingBusca"
                    >
                      <i
                        v-if="state.loadingBusca"
                        class="bi bi-arrow-repeat spin"
                      ></i>
                      <i v-else class="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body">
              <!-- BUG 4 FIX: estado de loading enquanto busca os dados -->
              <div v-if="state.loading" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Carregando...</span>
                </div>
              </div>

              <div v-else class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th style="background-color: var(--primary); color: #fff">
                        Nome
                      </th>
                      <th style="background-color: var(--primary); color: #fff">
                        Produtos
                      </th>
                      <th style="background-color: var(--primary); color: #fff">
                        Valor
                      </th>
                      <th style="background-color: var(--primary); color: #fff">
                        Status
                      </th>
                      <th style="background-color: var(--primary); color: #fff">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pedido in state.pedidos" :key="pedido.id">
                      <td>{{ state.nome }}</td>
                      <td>
                        <ul>
                          <li
                            v-for="produto in pedido.produtos"
                            :key="produto.id"
                          >
                            {{ produto.nome }}
                          </li>
                        </ul>
                      </td>
                      <td>{{ formatarMoeda(pedido.valor_total) }}</td>
                      <td>{{ pedido.status }}</td>
                      <td class="td_flex">
                        <NuxtLink :to="'/admin/visualizar-pedido/' + pedido.id">
                          <button
                            title="Visualizar pedido"
                            class="btn btn-secondary"
                            style="color: #fff !important"
                          >
                            <i class="bi bi-eye"></i>
                          </button>
                        </NuxtLink>
                      </td>
                    </tr>

                    <tr v-if="!state.loading && !state.pedidos.length">
                      <td colspan="5" class="text-center py-3">
                        Nenhum pedido encontrado.
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
      title: "Casa Bonita Eletros - Pedidos",
    });

    const state = reactive({
      id: "",
      nome: "",
      pedidos: [],
      search: "",
      loading: false,
      loadingBusca: false,
    });

    const router = useRouter();
    const authStore = useAuthStore();
    const token = authStore.token;

    onMounted(() => {
      fetchCliente();
    });

    async function fetchCliente() {
      try {
        state.loading = true;
        const { data } = await services.clientes.getById({
          id: router.currentRoute.value.params.id,
          token,
        });
        state.id = data.id;
        state.nome = data.nome;
        state.pedidos = data.pedidos ?? [];
      } catch (error) {
        console.log(error);
        state.pedidos = [];
      } finally {
        state.loading = false;
      }
    }

    async function filtrarPedidosClientes(valor) {
      if (valor) {
        state.loadingBusca = true;
        try {
          const { data } = await services.clientes.filtrarPedidosClientes(
            token,
            valor
          );
          state.pedidos = data ?? [];
        } catch (error) {
          console.log(error);
        } finally {
          state.loadingBusca = false;
        }
      } else {
        fetchCliente();
      }
    }

    function formatarMoeda(valor) {
      if (valor == null) return "—";
      return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    return {
      state,
      filtrarPedidosClientes,
      formatarMoeda,
    };
  },
};
</script>

<style scoped>
.breadcrumb-item::before {
  color: #fff !important;
}

#span-url {
  color: #fff;
  text-decoration: underline #fff;
}

h5 {
  color: #fff;
  margin: 0;
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
  color: #fff !important;
}

.btn-voltar {
  background-color: transparent;
  border: solid 1px #fff;
  color: #fff !important;
}

.btn-voltar:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.input-search {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background: transparent;
  color: #fff;
  outline: none;
  border: solid 1px #fff;
  border-radius: 5px;
}

ul {
  list-style: none;
  text-align: center;
  padding: 0;
}

.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>