<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-10">
                  <h5>Orçamentos</h5>
                </div>
                <div class="col-2 text-end">
                  <AdminButton title="Atualizar lista" @click="carregar">
                      <i class="bi bi-arrow-clockwise"></i>
                  </AdminButton>
                </div>
              </div>
              <div class="row mt-1">
                <div class="col-md-3">
                  <label class="lbl_white" for="filtro-status">Status</label>
                  <select id="filtro-status" v-model="statusFiltro" class="form-select">
                    <option value="">Todos</option>
                    <option v-for="status in statuses" :key="status" :value="status">
                      {{ formatarStatus(status) }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="lbl_white" for="busca-orcamento">Busca</label>
                  <input
                    id="busca-orcamento"
                    v-model="busca"
                    type="search"
                    class="form-control"
                    aria-label="Pesquisar orçamentos"
                    @keyup.enter="aplicarFiltros"
                  />
                </div>
                <div class="col-md-3 d-flex align-items-end">
                  <button class="btn btn-outline-light btn_buscar" @click="aplicarFiltros">
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            <div class="card-body">
              <p v-if="erro" class="alert alert-danger mb-3" role="alert">
                {{ erro }}
              </p>

              <p class="resultado-texto text-end mb-2">
                Exibindo {{ orcamentosFiltrados.length }} orçamento{{ orcamentosFiltrados.length === 1 ? "" : "s" }}
              </p>

              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Data</th>
                      <th scope="col">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="carregando">
                      <td colspan="7" class="text-center py-4">Carregando orçamentos...</td>
                    </tr>
                    <tr v-else-if="!orcamentosFiltrados.length">
                      <td colspan="7" class="text-center py-4">Nenhum orçamento encontrado.</td>
                    </tr>
                    <tr v-for="orcamento in orcamentosFiltrados" :key="orcamento.id">
                      <td data-label="Código">{{ orcamento.codigo }}</td>
                      <td data-label="Cliente">{{ orcamento.nome }}</td>
                      <td data-label="E-mail">{{ orcamento.email }}</td>
                      <td data-label="Telefone">{{ orcamento.telefone }}</td>
                      <td data-label="Valor" class="text-nowrap">{{ formatar(orcamento.valor_total) }}</td>
                      <td data-label="Data" class="text-nowrap">{{ formatarData(orcamento.created_at) }}</td>
                      <td data-label="Ação" class="td_flex">
                        <button
                          type="button"
                          class="btn status-btn"
                          :class="`status-btn--${String(orcamento.status || 'NOVO').toLowerCase()}`"
                          :title="`Status: ${formatarStatus(orcamento.status || 'NOVO')}`"
                          :aria-label="`Alterar status: ${formatarStatus(orcamento.status || 'NOVO')}`"
                          @click="abrirModalStatus(orcamento)"
                        >
                          <i class="bi bi-circle-fill"></i>
                        </button>
                        <NuxtLink
                          :to="`/admin/orcamentos/${orcamento.id}`"
                          title="Visualizar orçamento"
                          class="btn btn-secondary"
                        >
                          <i class="bi bi-eye"></i>
                        </NuxtLink>
                        <button
                          title="Abrir PDF para impressão"
                          class="btn btn-danger"
                          :disabled="gerandoPdfId === orcamento.id"
                          @click="imprimirPdf(orcamento)"
                        >
                          <i :class="gerandoPdfId === orcamento.id ? 'bi bi-hourglass-split' : 'bi bi-file-earmark-pdf'"></i>
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

      <Teleport to="body">
        <div v-if="modalStatusAberto" class="modal-status-backdrop" @click="fecharModalStatus"></div>
        <section v-if="modalStatusAberto" class="modal-status" role="dialog" aria-modal="true" aria-labelledby="modal-status-titulo">
          <div class="modal-status__header">
            <div>
              <h5 id="modal-status-titulo">Alterar status</h5>
              <span>{{ orcamentoSelecionado?.codigo }}</span>
            </div>
            <button type="button" class="btn-close btn-close-white" aria-label="Fechar" @click="fecharModalStatus"></button>
          </div>
          <div class="modal-status__body">
            <p>Selecione o novo status do orçamento:</p>
            <div class="status-opcoes">
              <button
                v-for="status in statuses"
                :key="status"
                type="button"
                class="btn status-opcao"
                :class="[`status-btn--${status.toLowerCase()}`, { 'status-opcao--selecionado': statusSelecionado === status }]"
                @click="statusSelecionado = status"
              >
                {{ formatarStatus(status) }}
              </button>
            </div>
          </div>
          <div class="modal-status__footer">
            <button type="button" class="btn btn-light" @click="fecharModalStatus">Cancelar</button>
            <button type="button" class="btn btn-primary" :disabled="salvandoStatus" @click="salvarStatus">
              {{ salvandoStatus ? "Salvando..." : "Salvar status" }}
            </button>
          </div>
        </section>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import services from "@/services/axios";

useHead({ title: "Casa Bonita Eletros - Orçamentos" });

const auth = useAuthStore();
const orcamentos = ref([]);
const busca = ref("");
const buscaAplicada = ref("");
const statusFiltro = ref("");
const erro = ref("");
const carregando = ref(false);
const gerandoPdfId = ref(null);
const modalStatusAberto = ref(false);
const orcamentoSelecionado = ref(null);
const statusSelecionado = ref("NOVO");
const salvandoStatus = ref(false);
const statuses = ["NOVO", "EM_ANALISE", "ENVIADO", "APROVADO", "RECUSADO", "EXPIRADO"];

const orcamentosFiltrados = computed(() => {
  const termo = buscaAplicada.value.trim().toLocaleLowerCase("pt-BR");

  return orcamentos.value.filter((orcamento) =>
    (!statusFiltro.value || orcamento.status === statusFiltro.value) &&
    (!termo || [orcamento.codigo, orcamento.nome, orcamento.email, orcamento.telefone]
      .filter(Boolean)
      .some((valor) => String(valor).toLocaleLowerCase("pt-BR").includes(termo))),
  );
});

function aplicarFiltros() {
  buscaAplicada.value = busca.value;
}

function formatar(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0);
}

function formatarData(valor) {
  if (!valor) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(valor));
}

function formatarStatus(status) {
  return String(status).replaceAll("_", " ");
}

async function carregar() {
  carregando.value = true;
  erro.value = "";
  try {
    const { data } = await services.orcamentos.listar(auth.token);
    orcamentos.value = Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error(error);
    erro.value = "Não foi possível carregar os orçamentos.";
  } finally {
    carregando.value = false;
  }
}

async function imprimirPdf(orcamento) {
  gerandoPdfId.value = orcamento.id;
  erro.value = "";
  try {
    const { data } = await services.orcamentos.pdf(orcamento.id, auth.token);
    const url = URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    console.error(error);
    erro.value = "Não foi possível gerar o PDF do orçamento.";
  } finally {
    gerandoPdfId.value = null;
  }
}

function abrirModalStatus(orcamento) {
  orcamentoSelecionado.value = orcamento;
  statusSelecionado.value = orcamento.status || "NOVO";
  modalStatusAberto.value = true;
}

function fecharModalStatus() {
  if (salvandoStatus.value) return;
  modalStatusAberto.value = false;
  orcamentoSelecionado.value = null;
}

async function salvarStatus() {
  if (!orcamentoSelecionado.value) return;

  salvandoStatus.value = true;
  erro.value = "";
  try {
    const { data } = await services.orcamentos.atualizar(
      orcamentoSelecionado.value.id,
      { status: statusSelecionado.value },
      auth.token,
    );
    Object.assign(orcamentoSelecionado.value, data);
    modalStatusAberto.value = false;
    orcamentoSelecionado.value = null;
  } catch (error) {
    console.error(error);
    erro.value = "Não foi possível atualizar o status do orçamento.";
  } finally {
    salvandoStatus.value = false;
  }
}

onMounted(carregar);
</script>

<style scoped>
h5 {
  color: #fff;
  margin-bottom: 0;
}

th {
  background-color: var(--primary);
  color: #fff;
  border-bottom: solid 1px #000 !important;
  white-space: nowrap;
}

tr {
  text-align: center;
}

td {
  vertical-align: middle;
  border-bottom: solid 1px #000 !important;
}

.card-header {
  background-color: #181818;
  border-radius: 0;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.table-hover > tbody > tr:hover > * {
  color: #000;
  background-color: #e1e1e1;
}

.td_flex {
  text-align: center;
  white-space: nowrap;
}

.td_flex .btn {
  margin: 5px;
}

.status-btn {
  color: #fff;
  text-decoration: none;
}

.status-btn--novo { background: #6c757d; }
.status-btn--em_analise { background: #d97706; }
.status-btn--enviado { background: #0d6efd; }
.status-btn--aprovado { background: #198754; }
.status-btn--recusado { background: #dc3545; }
.status-btn--expirado { background: #495057; }

.modal-status-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1050;
  background: rgba(0, 0, 0, .5);
}

.modal-status {
  position: fixed;
  z-index: 1051;
  top: 50%;
  left: 50%;
  width: min(440px, calc(100vw - 2rem));
  overflow: hidden;
  background: #fff;
  border-radius: .5rem;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, .25);
  transform: translate(-50%, -50%);
}

.modal-status__header,
.modal-status__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.modal-status__header { color: #fff; background: #181818; }
.modal-status__header h5 { margin: 0; }
.modal-status__header span { font-size: .8125rem; color: #d1d5db; }
.modal-status__body { padding: 1.25rem; }
.modal-status__footer { border-top: 1px solid #dee2e6; justify-content: flex-end; }

.status-opcoes { display: flex; flex-wrap: wrap; gap: .5rem; }
.status-opcao { color: #fff; font-size: .8125rem; }
.status-opcao--selecionado { outline: 3px solid #181818; outline-offset: 2px; }

.lbl_white {
  color: #fff;
  display: block;
  margin-bottom: 0.25rem;
}

.btn_buscar {
  margin-bottom: 1px;
  white-space: nowrap;
}

.resultado-texto {
  color: #6c757d;
  font-size: 0.875rem;
}
</style>
