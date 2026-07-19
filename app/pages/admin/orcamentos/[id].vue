<template>
  <div class="maxWidth">
    <div class="py-4 container-fluid">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5>Orçamento {{ orcamento.codigo || "" }}</h5>
          <NuxtLink to="/admin/orcamentos" class="btn btn-outline-light">Voltar</NuxtLink>
        </div>

        <div v-if="carregando" class="card-body text-center py-5">Carregando orçamento...</div>
        <div v-else-if="erro" class="card-body"><p class="alert alert-danger mb-0">{{ erro }}</p></div>
        <div v-else class="card-body">
          <section class="secao mb-4" aria-labelledby="cliente-heading">
            <h6 id="cliente-heading" class="secao_titulo">Dados do cliente</h6>
            <div class="row g-3">
              <div class="col-md-4"><span class="campo">Cliente</span><strong>{{ orcamento.nome }}</strong></div>
              <div class="col-md-4"><span class="campo">E-mail</span><strong>{{ orcamento.email }}</strong></div>
              <div class="col-md-4"><span class="campo">Telefone</span><strong>{{ orcamento.telefone }}</strong></div>
            </div>
          </section>

          <section class="mb-4" aria-labelledby="itens-heading">
            <h6 id="itens-heading" class="secao_titulo">Itens do orçamento</h6>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead><tr><th>Produto</th><th>REF</th><th>Quantidade</th><th>Valor unitário</th><th>Total</th></tr></thead>
                <tbody>
                  <tr v-for="item in orcamento.itens || []" :key="item.id">
                    <td>{{ item.produto?.nome || "Produto removido" }}</td>
                    <td>{{ item.produto?.ref || "-" }}</td>
                    <td>{{ item.quantidade }}</td>
                    <td>{{ formatar(item.valor_unitario) }}</td>
                    <td>{{ formatar(item.valor_total) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="secao_atualizacao" aria-labelledby="atualizacao-heading">
            <h6 id="atualizacao-heading" class="secao_titulo">Atualização do orçamento</h6>
            <div class="row g-3">
              <div class="col-md-3"><label class="form-label">Status</label><select v-model="form.status" class="form-select"><option v-for="status in statuses" :key="status" :value="status">{{ formatarStatus(status) }}</option></select></div>
              <div class="col-md-3"><label class="form-label">Validade</label><input v-model="form.validade" type="date" class="form-control" /></div>
              <div class="col-md-6"><label class="form-label">Observação</label><textarea v-model="form.observacao" rows="2" class="form-control"></textarea></div>
            </div>
            <div class="rodape_orcamento">
              <div><span class="campo mb-0">Total do orçamento</span><strong class="total">{{ formatar(orcamento.valor_total) }}</strong></div>
              <button class="btn btn-primary" :disabled="salvando" @click="salvar"><i class="bi bi-check-lg me-1"></i>{{ salvando ? "Salvando..." : "Salvar alterações" }}</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import services from "@/services/axios";

useHead({ title: "Casa Bonita Eletros - Visualizar Orçamento" });
const route = useRoute();
const auth = useAuthStore();
const orcamento = ref({});
const carregando = ref(true);
const salvando = ref(false);
const erro = ref("");
const statuses = ["NOVO", "EM_ANALISE", "ENVIADO", "APROVADO", "RECUSADO", "EXPIRADO"];
const form = reactive({ status: "NOVO", validade: "", observacao: "" });

function formatar(valor) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor || 0); }
function formatarStatus(status) { return String(status).replaceAll("_", " "); }
function dataParaInput(valor) { return valor ? String(valor).slice(0, 10) : ""; }

async function carregar() {
  try {
    const { data } = await services.orcamentos.obter(route.params.id, auth.token);
    orcamento.value = data;
    form.status = data.status || "NOVO";
    form.validade = dataParaInput(data.validade);
    form.observacao = data.observacao || "";
  } catch (error) {
    console.error(error);
    erro.value = "Não foi possível carregar o orçamento.";
  } finally { carregando.value = false; }
}

async function salvar() {
  salvando.value = true;
  try {
    const { data } = await services.orcamentos.atualizar(orcamento.value.id, { ...form }, auth.token);
    orcamento.value = data;
  } catch (error) {
    console.error(error);
    erro.value = "Não foi possível salvar as alterações.";
  } finally { salvando.value = false; }
}

onMounted(carregar);
</script>

<style scoped>
.card { border: solid 1px #000; border-radius: 5px; }
.card-header { background: #181818; border-radius: 0; }
h5 { color: #fff; margin: 0; }
th { background: var(--primary); color: #fff; white-space: nowrap; }
td, th { vertical-align: middle; }
.secao { padding: 1rem 1.25rem; background: #f8f9fa; border: 1px solid #e3e6e8; border-radius: .35rem; }
.secao_titulo { font-weight: 700; margin-bottom: 1rem; color: #1f2937; }
.campo { display: block; color: #6c757d; font-size: .875rem; margin-bottom: .25rem; }
.secao_atualizacao { padding: 1.25rem; background: #f8f9fa; border-top: 3px solid var(--primary); border-radius: .35rem; }
.rodape_orcamento { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #dee2e6; }
.total { display: block; font-size: 1.5rem; line-height: 1.2; }

@media (max-width: 576px) {
  .rodape_orcamento { align-items: stretch; flex-direction: column; }
  .rodape_orcamento .btn { width: 100%; }
}
</style>
