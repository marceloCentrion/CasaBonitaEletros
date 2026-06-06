<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Pedidos</h5>
                </div>
                <div class="col-md-6">
                  <div class="d-flex">
                    <input
                      class="input-search"
                      type="text"
                      v-model="state.search"
                      placeholder="Pesquisar..."
                    />
                    <AdminButton
                      @click="filtrarPedidosClientes(state.search)"
                    >
                      <i class="bi bi-search"></i>
                    </AdminButton>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
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
                        E-mail
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
                    <tr v-for="pedido in state.pedidos" :key="pedido.id">
                      <td>{{ pedido.id }}</td>
                      <td>{{ pedido.cliente.nome }}</td>
                      <td>{{ pedido.cliente.email }}</td>
                      <td>{{ pedido.cliente.telefone_principal }}</td>
                      <td>{{ pedido.status }}</td>
                      <td class="td_flex">
                        <NuxtLink :to="'visualizar-pedido/' + pedido.id">
                          <button title="Visualizar Pedido" class="btn btn-secondary">
                            <i class="bi bi-eye"></i></button
                        ></NuxtLink>
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
      pedidos: [],
    });

    const authStore = useAuthStore();
    const token = authStore.token;
    const router = useRouter();

    onMounted(() => {
      localStorage.setItem(
        "NavegacaoPedidos",
        router.currentRoute.value.fullPath
      );
      fetchPedidos();
    });

    async function fetchPedidos() {
      try {
        const { data } = await services.clientes.getPedidos({ token });
        console.log(data);
        state.pedidos = data;
      } catch (error) {
        console.log(error);
      }
    }

    async function filtrarPedidosClientes(valor) {
      if (valor) {
        try {
          const { data } = await services.clientes.filtrarPedidosClientes(
            token,
            valor
          );
          state.pedidos = data;
        } catch (error) {
          console.log(error);
        }
      } else {
        fetchPedidos();
      }
    }
    return {
      state,
      filtrarPedidosClientes,
      // deletarCliente,
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
</style>
