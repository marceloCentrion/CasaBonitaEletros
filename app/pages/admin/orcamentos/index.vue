<template>
  <div class="container-fluid py-4">
    <h4>Orçamentos</h4>
    <p v-if="erro" class="text-danger">{{ erro }}</p>
    <div class="table-responsive"><table class="table table-hover">
      <thead><tr><th>Código</th><th>Cliente</th><th>Contato</th><th>Valor</th><th>Status</th><th></th></tr></thead>
      <tbody><tr v-for="orcamento in orcamentos" :key="orcamento.id">
        <td>{{ orcamento.codigo }}</td><td>{{ orcamento.nome }}</td><td>{{ orcamento.email }}<br>{{ orcamento.telefone }}</td>
        <td>{{ formatar(orcamento.valor_total) }}</td>
        <td><select v-model="orcamento.status" class="form-select"><option v-for="status in statuses" :key="status">{{ status }}</option></select></td>
        <td><button class="btn btn-primary btn-sm" @click="salvar(orcamento)">Salvar</button></td>
      </tr></tbody>
    </table></div>
  </div>
</template>

<script setup>
import services from '@/services/axios';
const auth = useAuthStore();
const orcamentos = ref([]);
const erro = ref('');
const statuses = ['NOVO', 'EM_ANALISE', 'ENVIADO', 'APROVADO', 'RECUSADO', 'EXPIRADO'];
const formatar = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
async function carregar() { try { orcamentos.value = (await services.orcamentos.listar(auth.token)).data; } catch { erro.value = 'Não foi possível carregar os orçamentos.'; } }
async function salvar(orcamento) { try { await services.orcamentos.atualizar(orcamento.id, { status: orcamento.status }, auth.token); } catch { erro.value = 'Não foi possível atualizar o orçamento.'; } }
onMounted(carregar);
</script>
