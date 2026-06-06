<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-10">
                  <h5>Combos</h5>
                </div>
                <div class="col-2">
                  <div style="text-align: right">
                    <AdminButton @click="abrirModal()">Novo Combo</AdminButton>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-2">
                  <label class="lbl_white">Status</label>
                  <select class="form-select" v-model="status">
                    <option value="">Todos</option>
                    <option value="ATIVO">Ativo</option>
                    <option value="INATIVO">Inativo</option>
                  </select>
                </div>
                <div class="col-2">
                  <label class="lbl_white">Destaque</label>
                  <select class="form-select" v-model="destaque">
                    <option value="">Todos</option>
                    <option value="SIM">Sim</option>
                    <option value="NAO">Não</option>
                  </select>
                </div>
                <div class="col-6 d-flex justify-content-start">
                  <div style="width: 100%">
                    <label class="lbl_white">Busca</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="descricao_combo"
                    />
                  </div>
                  <div style="padding-top: 18px">
                    <button
                      class="btn btn-outline-light btn_buscar"
                      @click="buscaCombos"
                    >
                      Filtrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <Loader
                v-if="isLoadingStore.isLoading"
                :loader="isLoadingStore"
                class="d-flex justify-content-center align-items-center p-4"
              />
              <div class="card-body" v-else>
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
                        Descrição
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Produto 1
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Produto 2
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Parcelas
                      </th>
                      <th
                        style="background-color: var(--primary); color: #fff"
                        scope="col"
                      >
                        Destaque
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
                  <tbody style="font-size: 0.875rem">
                    <tr v-if="combosFiltrados.length === 0">
                      <td colspan="8" class="text-center text-muted py-4">
                        Nenhum combo encontrado.
                      </td>
                    </tr>
                    <tr v-for="combo in combosFiltrados" v-else :key="combo.id">
                      <td>{{ combo.id }}</td>
                      <td>{{ combo.descricao }}</td>
                      <td>{{ combo.produto1?.nome ?? "-" }}</td>
                      <td>{{ combo.produto2?.nome ?? "-" }}</td>
                      <td>{{ combo.parcelas ?? "-" }}</td>
                      <td>{{ combo.destaque ?? "-" }}</td>
                      <td>{{ combo.status ?? "-" }}</td>
                      <td>
                        <button
                          title="Alterar"
                          class="btn btn-primary"
                          @click="abrirModal(combo)"
                        >
                          <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          title="Deletar"
                          class="btn btn-danger"
                          @click="abrirModalDeletar(combo.id, combo.descricao)"
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

    <div class="modal fade" id="modalCombo" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" style="background-color: var(--primary)">
            <h5 class="modal-title">
              {{ form.id ? "Editar Combo" : "Novo Combo" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="fecharModal"
            />
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-12">
                <BaseInput
                  label="Descrição"
                  v-model="form.descricao"
                  placeholder="Ex: Combo Verão"
                />
              </div>

              <div class="col-6">
                <BaseSelect
                  label="Categoria do Produto 1"
                  v-model="categoria_1"
                  placeholder="Selecione uma categoria"
                  :isInvalid="!!erros.categoria_1"
                  :errorMessage="erros.categoria_1"
                  :options="
                    categorias.map((c) => ({ value: c.id, label: c.nome }))
                  "
                  @update:modelValue="(val) => fetchProdutos(val, 1)"
                />
              </div>
              <div class="col-6">
                <BaseSelect
                  label="Categoria do Produto 2"
                  v-model="categoria_2"
                  placeholder="Selecione uma categoria"
                  :isInvalid="!!erros.categoria_2"
                  :errorMessage="erros.categoria_2"
                  :options="
                    categorias.map((c) => ({ value: c.id, label: c.nome }))
                  "
                  @update:modelValue="(val) => fetchProdutos(val, 2)"
                />
              </div>

              <div class="col-6">
                <BaseSelect
                  label="Produto 1 *"
                  v-model="form.produto_1"
                  placeholder="Selecione um produto"
                  :disabled="!categoria_1"
                  :isInvalid="!!erros.produto_1"
                  :errorMessage="erros.produto_1"
                  :options="
                    produtosFiltrados1.map((p) => ({
                      value: p.id,
                      label: p.nome,
                    }))
                  "
                />
              </div>
              <div class="col-6">
                <BaseSelect
                  label="Produto 2 *"
                  v-model="form.produto_2"
                  placeholder="Selecione um produto"
                  :disabled="!categoria_2"
                  :isInvalid="!!erros.produto_2"
                  :errorMessage="erros.produto_2"
                  :options="
                    produtosFiltrados2.map((p) => ({
                      value: p.id,
                      label: p.nome,
                    }))
                  "
                />
              </div>

              <div class="col-6">
                <BaseSelect
                  label="Parcelas"
                  v-model="form.parcelas"
                  placeholder="Selecione as parcelas"
                  :options="
                    Array.from({ length: 12 }, (_, i) => ({
                      value: i + 1,
                      label: `${i + 1}`,
                    }))
                  "
                />
              </div>
              <div class="col-6">
                <BaseSelect
                  label="Destaque"
                  v-model="form.destaque"
                  :options="[
                    { value: 'NAO', label: 'Não' },
                    { value: 'SIM', label: 'Sim' },
                  ]"
                />
              </div>
              <div class="col-6">
                <BaseSelect
                  label="Status"
                  v-model="form.status"
                  :options="[
                    { value: 'INATIVO', label: 'Inativo' },
                    { value: 'ATIVO', label: 'Ativo' },
                  ]"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <OutlineButton class="w-25" @click="fecharModal">
              Cancelar
            </OutlineButton>
            <SecButton
              class="w-25"
              @click="salvarCombo"
              :disabled="isLoadingStore.isLoading"
            >
              Salvar
            </SecButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Erro Centralizada -->
    <div v-if="modalErro.show" class="custom-modal-overlay">
      <div class="custom-modal-content">
        <div class="text-danger mb-3">
          <i class="bi bi-exclamation-triangle-fill" style="font-size: 3rem;"></i>
        </div>
        <h4 class="mb-3 text-dark">Aviso Importante</h4>
        <p class="text-muted mb-4">
          {{ modalErro.mensagem }}
        </p>
        <button class="btn btn-secondary px-4 py-2" @click="fecharModalErro">
          Entendi
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modalDeletar"
          class="modal-overlay"
          @click="fecharModalDeletar"
        />
      </Transition>

      <Transition name="modal-slide">
        <div
          v-if="modalDeletar"
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
            <p>Tem certeza que deseja deletar o combo:</p>
            <strong>{{ comboNomeParaDeletar }}</strong>
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
              @click="deletarCombo"
              :disabled="isLoadingStore.isLoading"
            >
              <i class="bi bi-trash me-1"></i>
              {{ isLoadingStore.isLoading ? "Deletando..." : "Sim, Deletar" }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import services from "@/services/axios";

useHead({ title: "Casa Bonita Eletros - Combos" });

const authStore = useAuthStore();
const token = authStore.token;
const isLoadingStore = useIsLoading();
const toast = useToast();

const combos = ref([]);
const combosFiltrados = ref([]);
const categorias = ref([]);
const produtosFiltrados1 = ref([]);
const produtosFiltrados2 = ref([]);
const categoria_1 = ref("");
const categoria_2 = ref("");
const descricao_combo = ref("");
const status = ref("");
const destaque = ref("");
const erros = ref({});

const modalErro = ref({
  show: false,
  mensagem: "",
});
const modalDeletar = ref(false);
const comboIdParaDeletar = ref(null);
const comboNomeParaDeletar = ref("");

const formVazio = {
  id: null,
  descricao: "",
  produto_1: "",
  produto_2: "",
  parcelas: 1,
  destaque: "NAO",
  status: "ATIVO",
};

const form = ref({ ...formVazio });

const modalRef = ref(null);
let modalInstance = null;

onMounted(async () => {
  const { Modal } = await import("bootstrap");
  modalInstance = new Modal(modalRef.value);
  fetchCombos();
  fetchCategorias();

  modalRef.value.addEventListener("keyup", (e) => {
    if (e.key === "Enter") salvarCombo();
  });
});

watch([() => form.value.produto_1, () => form.value.produto_2], () => {
  const p1 = produtosFiltrados1.value.find((p) => p.id == form.value.produto_1);
  const p2 = produtosFiltrados2.value.find((p) => p.id == form.value.produto_2);

  if (p1 && p2) {
    form.value.descricao = `${p1.nome} + ${p2.nome}`;
  } else if (p1) {
    form.value.descricao = p1.nome;
  } else if (p2) {
    form.value.descricao = p2.nome;
  }
});

function abrirModal(combo = null) {
  if (combo) {
    form.value = {
      id: combo.id,
      descricao: combo.descricao ?? "",
      produto_1: combo.produto_1 ?? "",
      produto_2: combo.produto_2 ?? "",
      parcelas: combo.parcelas ?? "",
      destaque: combo.destaque ?? "NAO",
      status: combo.status ?? "INATIVO",
    };
    categoria_1.value = combo.produto1?.categoria_id ?? "";
    categoria_2.value = combo.produto2?.categoria_id ?? "";
    if (categoria_1.value) fetchProdutos(categoria_1.value, 1, combo.produto_1);
    if (categoria_2.value) fetchProdutos(categoria_2.value, 2, combo.produto_2);
  } else {
    form.value = { ...formVazio };
    categoria_1.value = "";
    categoria_2.value = "";
    produtosFiltrados1.value = [];
    produtosFiltrados2.value = [];
  }
  erros.value = {};
  modalInstance.show();
}

function fecharModal() {
  modalInstance.hide();
  form.value = { ...formVazio };
  erros.value = {};
  categoria_1.value = "";
  categoria_2.value = "";
  produtosFiltrados1.value = [];
  produtosFiltrados2.value = [];
}

async function fetchCombos() {
  try {
    isLoadingStore.start();
    const { data } = await services.combos.getAll({ token });
    combos.value = data.data ?? data;
    combosFiltrados.value = combos.value;
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingStore.stop();
  }
}

async function fetchCategorias() {
  try {
    const { data } = await services.categoria.getAll({ token });
    categorias.value = data.data ?? data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchProdutos(categoria_id, slot, produto_id = null) {
  try {
    const { data } = await services.produtos.getAllProdutoCat(categoria_id);
    const lista = data.produtos ?? [];
    if (slot === 1) {
      produtosFiltrados1.value = lista;
      form.value.produto_1 = produto_id ?? "";
    } else {
      produtosFiltrados2.value = lista;
      form.value.produto_2 = produto_id ?? "";
    }
  } catch (error) {
    console.log(error);
  }
}

function buscaCombos() {
  combosFiltrados.value = combos.value.filter((c) => {
    const matchDescricao = descricao_combo.value
      ? (c.descricao ?? "")
          .toLowerCase()
          .includes(descricao_combo.value.toLowerCase())
      : true;
    const matchStatus = status.value ? c.status === status.value : true;
    const matchDestaque = destaque.value ? c.destaque === destaque.value : true;
    return matchDescricao && matchStatus && matchDestaque;
  });
}

async function salvarCombo() {
  erros.value = {};

  if (!categoria_1.value)
    erros.value.categoria_1 = "Selecione a categoria do Produto 1.";
  else if (!form.value.produto_1)
    erros.value.produto_1 = "Selecione o Produto 1.";

  if (!categoria_2.value)
    erros.value.categoria_2 = "Selecione a categoria do Produto 2.";
  else if (!form.value.produto_2)
    erros.value.produto_2 = "Selecione o Produto 2.";

  if (
    form.value.produto_1 &&
    form.value.produto_2 &&
    form.value.produto_1 === form.value.produto_2
  ) {
    erros.value.produto_2 = "Produto 2 não pode ser igual ao Produto 1.";
  }

  if (Object.keys(erros.value).length) {
    toast.error(Object.values(erros.value)[0]);
    return;
  }

  try {
    isLoadingStore.start();

    const dados = {
      descricao: form.value.descricao,
      produto_1: form.value.produto_1,
      produto_2: form.value.produto_2,
      parcelas: form.value.parcelas,
      destaque: form.value.destaque,
      status: form.value.status,
    };

    if (form.value.id !== null && form.value.id !== undefined) {
      dados.id = form.value.id;
      await services.combos.update(dados, token);
    } else {
      await services.combos.save(dados, token);
    }

    toast.success("Combo salvo com sucesso!");
    fecharModal();
    await fetchCombos();
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.erro ?? "Erro ao salvar combo.");
  } finally {
    isLoadingStore.stop();
  }
}

function abrirModalDeletar(id, nome) {
  comboIdParaDeletar.value = id;
  comboNomeParaDeletar.value = nome;
  modalDeletar.value = true;
}

function fecharModalDeletar() {
  modalDeletar.value = false;
  comboIdParaDeletar.value = null;
  comboNomeParaDeletar.value = "";
}

function fecharModalErro() {
  modalErro.value.show = false;
}

async function deletarCombo() {
  const id = comboIdParaDeletar.value;
  if (!id) return;

  try {
    isLoadingStore.start();
    const { data } = await services.combos.delete({ id, token });
    fecharModalDeletar();
    
    if (data && data.status && data.status != 200 && data.status != 201) {
      modalErro.value.mensagem = data.message || data.msg || "Erro ao deletar o combo.";
      modalErro.value.show = true;
    } else {
      toast.success("Combo deletado com sucesso!");
      await fetchCombos();
    }
  } catch (error) {
    console.error(error);
    fecharModalDeletar();
    const errorMessage = error.response?.data?.msg || error.response?.data?.message || error.response?.data?.erro || "";
    
    if (errorMessage.toLowerCase().includes("constraint") || error.response?.status === 400 || error.response?.status === 500) {
      modalErro.value.mensagem = "Não é possível excluir este combo pois existem registros vinculados a ele.";
    } else {
      modalErro.value.mensagem = errorMessage || "Ocorreu um erro inesperado ao tentar excluir o combo. Tente novamente mais tarde.";
    }
    modalErro.value.show = true;
  } finally {
    isLoadingStore.stop();
  }
}
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
.lbl_white {
  color: #fff;
}
.modal-title {
  color: #fff;
}

.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.custom-modal-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  width: 100%;
  max-width: 450px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
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
