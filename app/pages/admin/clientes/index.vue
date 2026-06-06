<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6">
                  <h5>Clientes</h5>
                </div>
                <div class="col-md-6">
                  <div class="d-flex">
                    <input
                      class="input-search"
                      type="text"
                      v-model="state.search"
                      placeholder="Pesquisar..."
                      @keydown.enter="filtrarClientes(state.search)"
                    />
                    <AdminButton @click="filtrarClientes(state.search)">
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
                        Status
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Tipo Pessoa
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Telefone Principal
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
                    <tr v-for="cliente in state.clientes" :key="cliente.id">
                      <td data-label="Código">{{ cliente.id }}</td>
                      <td data-label="Nome">{{ cliente.nome }}</td>
                      <td data-label="Status">{{ cliente.status }}</td>
                      <td data-label="Tipo Pessoa">
                        {{ cliente.tipo_pessoa }}
                      </td>
                      <td data-label="Telefone Principal">
                        {{ formatTelefone(cliente.telefone_principal) }}
                      </td>
                      <td class="td_flex" data-label="Ação">
                <NuxtLink :to="'/admin/clientes/' + cliente.id" title="Alterar" class="btn btn-primary">
                  <i class="bi bi-pencil-fill"></i>
                        </NuxtLink>
                <NuxtLink :to="'/admin/endereco/' + cliente.id" title="Endereço" class="btn btn-warning">
                  <i class="bi bi-list-columns-reverse"></i>
                        </NuxtLink>
                        <NuxtLink
                          :to="
                            '/admin/visualizar-pedidos-cliente/' + cliente.id
                          "
                  title="Visualizar Pedidos"
                  class="btn btn-secondary"
                        >
                  <i class="bi bi-eye"></i>
                        </NuxtLink>
                        <button
                          @click="abrirModalDeletar(cliente.id, cliente.nome)"
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

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="state.modalDeletar"
          class="modal-overlay"
          @click="fecharModalDeletar"
        />
      </Transition>

      <Transition name="modal-slide">
        <div
          v-if="state.modalDeletar"
          class="modal-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
        >
          <div class="modal-confirm__header">
            <span id="modal-titulo">
              <i
                class="bi bi-exclamation-triangle-fill me-2"
                style="color: #e74c3c"
              ></i>
              Confirmar Exclusão
            </span>
            <button
              class="modal-confirm__close"
              @click="fecharModalDeletar"
              aria-label="Fechar"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="modal-confirm__body">
            <p>Tem certeza que deseja deletar o cliente:</p>
            <strong>{{ state.clienteNomeParaDeletar }}</strong>
            <p class="modal-confirm__aviso">
              Esta ação não poderá ser desfeita.
            </p>
          </div>

          <div class="modal-confirm__footer">
            <button
              class="btn-modal btn-modal--cancelar"
              @click="fecharModalDeletar"
            >
              <i class="bi bi-x-circle me-1"></i> Cancelar
            </button>
            <button
              class="btn-modal btn-modal--confirmar"
              @click="deletarCliente"
              :disabled="state.isLoading"
            >
              <i class="bi bi-trash me-1"></i>
              {{ state.isLoading ? "Deletando..." : "Sim, Deletar" }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";
export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Clientes",
    });

    onMounted(() => {
      fetchClientes();
    });

    const authStore = useAuthStore();
    const token = authStore.token;
    const toast = useToast();

    const state = reactive({
      clientes: [],
      search: "",
      isLoading: false,
      modalDeletar: false,
      clienteIdParaDeletar: null,
      clienteNomeParaDeletar: "",
    });

    function formatTelefone(numero) {
      if (!numero) return "";
      const digits = numero.replace(/\D/g, "");
      if (digits.length === 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
      if (digits.length === 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      }
      return numero;
    }

    async function fetchClientes() {
      try {
        const { data } = await services.clientes.getAll(token);
        state.clientes = data;
      } catch (error) {
        console.log(error);
      }
    }

    function abrirModalDeletar(id, nome) {
      state.clienteIdParaDeletar = id;
      state.clienteNomeParaDeletar = nome;
      state.modalDeletar = true;
    }

    function fecharModalDeletar() {
      state.modalDeletar = false;
      state.clienteIdParaDeletar = null;
      state.clienteNomeParaDeletar = "";
    }

    async function deletarCliente() {
      try {
        state.isLoading = true;
        const { data } = await services.clientes.delete({
          id: state.clienteIdParaDeletar,
          token,
        });
        toast.success("Cliente deletado com sucesso!");
        fecharModalDeletar();
        fetchClientes();
      } catch (error) {
        toast.error(error.response?.data?.msg || "Erro ao deletar cliente.");
        console.log(error);
      } finally {
        state.isLoading = false;
      }
    }

    async function filtrarClientes(valor) {
      if (valor) {
        try {
          const { data } = await services.clientes.filtrarClientes(
            token,
            valor,
          );
          state.clientes = data;
        } catch (error) {
          console.log(error);
        }
      } else {
        fetchClientes();
      }
    }

    return {
      state,
      deletarCliente,
      abrirModalDeletar,
      fecharModalDeletar,
      filtrarClientes,
      formatTelefone,
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
  color: #fff !important;
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

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1040;
  cursor: pointer;
}

.modal-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 420px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  z-index: 1050;
  overflow: hidden;
}

.modal-confirm__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background-color: #181818;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
}

.modal-confirm__close {
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  opacity: 0.8;
  transition: opacity 0.15s;
}

.modal-confirm__close:hover {
  opacity: 1;
}

.modal-confirm__body {
  padding: 1.5rem 1.25rem 1rem;
  text-align: center;
  color: #333;
  font-size: 0.95rem;
}

.modal-confirm__body strong {
  display: block;
  font-size: 1.05rem;
  color: #111;
  margin-top: 0.25rem;
}

.modal-confirm__aviso {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: #888;
}

.modal-confirm__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem 1.25rem;
  border-top: 1px solid #f0f0f0;
}

.btn-modal {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    opacity 0.15s,
    background 0.15s;
  color: #fff;
}

.btn-modal:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-modal--cancelar {
  background-color: #6c757d;
}

.btn-modal--cancelar:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-modal--confirmar {
  background-color: #e74c3c;
}

.btn-modal--confirmar:hover:not(:disabled) {
  background-color: #c0392b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-slide-enter-from,
.modal-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -46%);
}
</style>
