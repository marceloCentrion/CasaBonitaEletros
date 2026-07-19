<template>
  <main class="container py-5">
    <h1>Solicitar orçamento</h1>
    <p v-if="erro" class="text-danger">{{ erro }}</p>
    <div v-if="itens.length && !sucesso" class="mb-4">
      <h2 class="fs-5">Produtos selecionados</h2>
      <ul class="list-group"><li v-for="item in itens" :key="item.id" class="list-group-item d-flex justify-content-between"><span>{{ item.quantidade }}x {{ item.nome }}</span><strong>{{ formatar(item.preco * item.quantidade) }}</strong></li></ul>
    </div>
    <form v-if="itens.length && !sucesso" @submit.prevent="enviar">
      <div class="row g-3">
        <div class="col-md-6"><label class="form-label">Nome</label><input v-model="form.nome" required class="form-control"></div>
        <div class="col-md-6"><label class="form-label">Telefone / WhatsApp</label><input v-model="form.telefone" v-maska data-maska="['(##) ####-####', '(##) # ####-####']" required type="tel" inputmode="tel" autocomplete="tel" placeholder="(00) 00000-0000" class="form-control"></div>
        <div class="col-md-6"><label class="form-label">E-mail</label><input v-model="form.email" required type="email" class="form-control"></div>
        <div class="col-12"><label class="form-label">Mensagem</label><textarea v-model="form.observacao" class="form-control" rows="4"></textarea></div>
        <div class="col-12"><button :disabled="enviando" class="btn btn-primary" type="submit">{{ enviando ? 'Enviando...' : 'Enviar solicitação' }}</button></div>
      </div>
    </form>
    <div v-if="!itens.length && !sucesso" class="alert alert-info">Adicione produtos à lista antes de solicitar o orçamento.</div>
    <div v-if="sucesso" class="alert alert-success">Solicitação registrada com sucesso. Código: <strong>{{ sucesso.codigo }}</strong>.</div>
  </main>
</template>

<script setup>
import services from '@/services/axios';
definePageMeta({ layout: 'site' });
const carrinho = useCarrinhoStore();
const itens = computed(() => carrinho.itens);
const erro = ref(''); const enviando = ref(false); const sucesso = ref(null);
const form = reactive({ nome: '', email: '', telefone: '', observacao: '' });
const formatar = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
async function enviar() {
  enviando.value = true; erro.value = '';
  try {
    const { data } = await services.orcamentos.criar({ ...form, itens: itens.value.map((item) => ({ produto_id: item.id, quantidade: item.quantidade })) });
    sucesso.value = data; carrinho.limpar();
  } catch (e) { erro.value = e.response?.data?.message || 'Não foi possível registrar sua solicitação.'; }
  finally { enviando.value = false; }
}
</script>
