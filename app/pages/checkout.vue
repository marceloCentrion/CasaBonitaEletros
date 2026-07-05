<template>
  <main id="page_compra_rapida" aria-labelledby="checkout_heading">
    <div class="checkout_container">
      <nav class="breadcrumb" aria-label="Navegação estrutural">
        <ol>
          <li>
            <NuxtLink to="/" class="d-flex align-items-center gap-1">
              <i class="bi bi-house-door" aria-hidden="true"></i>
              <span>Página inicial</span>
            </NuxtLink>
          </li>
          <li aria-hidden="true" class="breadcrumb_sep">›</li>
          <li aria-current="page">Finalizar Compra</li>
        </ol>
      </nav>

      <div v-if="isLoading.isLoading && !usuario" class="checkout_loading">
        <Loader />
      </div>

      <template v-else>
        <h1 class="checkout_heading" id="checkout_heading">
          <i class="bi bi-bag-check" aria-hidden="true"></i>
          Finalizar Pedido
        </h1>

        <div class="checkout_grid">
          <div class="checkout_left">
            <section class="checkout_card" aria-labelledby="sec_info">
              <div class="checkout_card_header">
                <i class="bi bi-person-circle" aria-hidden="true"></i>
                <h2 id="sec_info">Informações Pessoais</h2>
              </div>
              <div class="checkout_card_body">
                <template v-if="usuario">
                  <div class="info_row">
                    <span class="info_label">Nome:</span>
                    <span class="info_value">{{ usuario.nome }}</span>
                  </div>
                  <div class="info_row">
                    <span class="info_label">
                      {{ usuario.tipo_pessoa === "JURIDICA" ? "CNPJ" : "CPF" }}:
                    </span>
                    <span class="info_value">{{
                      formatarCpfCnpj(
                        usuario.cpf ?? usuario.cnpj,
                        usuario.tipo_pessoa,
                      )
                    }}</span>
                  </div>
                  <div class="info_row">
                    <span class="info_label">Data de Nascimento:</span>
                    <span class="info_value">{{
                      usuario.data_nascimento
                    }}</span>
                  </div>
                  <div class="info_row">
                    <span class="info_label">E-mail:</span>
                    <span class="info_value">{{ usuario.email }}</span>
                  </div>
                  <div class="info_row">
                    <span class="info_label">Telefone Principal:</span>
                    <span class="info_value">{{
                      formatarTelefone(usuario.telefone_principal)
                    }}</span>
                  </div>
                </template>
                <div v-else class="info_skeleton">
                  <span v-for="i in 5" :key="i" class="skeleton_line"></span>
                </div>
              </div>
            </section>

            <section class="checkout_card" aria-labelledby="sec_endereco">
              <div class="checkout_card_header">
                <i class="bi bi-truck" aria-hidden="true"></i>
                <h2 id="sec_endereco">Endereço de Entrega</h2>
              </div>
              <div class="checkout_card_body">
                <template v-if="enderecos.length">
                  <ul
                    class="endereco_list"
                    role="radiogroup"
                    aria-label="Selecionar endereço de entrega"
                  >
                    <li
                      v-for="end in enderecos"
                      :key="end.id"
                      class="endereco_item"
                      :class="{
                        'endereco_item--ativo': enderecoSelecionado === end.id,
                      }"
                      @click="enderecoSelecionado = end.id"
                      role="radio"
                      :aria-checked="enderecoSelecionado === end.id"
                      tabindex="0"
                      @keydown.enter="enderecoSelecionado = end.id"
                      @keydown.space.prevent="enderecoSelecionado = end.id"
                    >
                      <div class="endereco_radio">
                        <span class="radio_circle">
                          <span
                            v-if="enderecoSelecionado === end.id"
                            class="radio_dot"
                          ></span>
                        </span>
                        <div class="endereco_info">
                          <span
                            class="endereco_tipo"
                            :class="
                              end.principal === 'SIM'
                                ? 'tipo--principal'
                                : 'tipo--secundario'
                            "
                          >
                            {{
                              end.principal === "SIM"
                                ? "Endereço Principal"
                                : "Endereço Secundário"
                            }}
                          </span>
                          <strong class="endereco_nome">{{ end.nome }}</strong>
                          <p class="endereco_linha">
                            {{ end.logradouro }}, {{ end.numero
                            }}<template v-if="end.complemento">
                              | {{ end.complemento }}</template
                            >, {{ end.bairro }}
                          </p>
                          <p class="endereco_linha">
                            {{ end.cidade?.nome }},
                            {{ end.cidade?.estado?.uf }} | {{ end.cep }}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </template>

                <p v-else class="endereco_vazio">Nenhum endereço cadastrado.</p>

                <button
                  class="btn_add_endereco"
                  type="button"
                  @click="navigateTo('/perfil/enderecos')"
                  aria-label="Adicionar novo endereço"
                >
                  <i class="bi bi-plus-circle" aria-hidden="true"></i>
                  Adicionar Endereço
                </button>
              </div>
            </section>
          </div>

          <section
            class="checkout_card checkout_pagamento"
            aria-labelledby="sec_pagamento"
          >
            <div class="checkout_card_header">
              <i class="bi bi-credit-card-2-front" aria-hidden="true"></i>
              <h2 id="sec_pagamento">Pagamento</h2>
            </div>
            <div class="checkout_card_body">
              <div
                class="pgto_opcao"
                :class="{ 'pgto_opcao--ativo': metodoPagamento === 'cartao' }"
                @click="metodoPagamento = 'cartao'"
                role="radio"
                :aria-checked="metodoPagamento === 'cartao'"
                tabindex="0"
                @keydown.enter="metodoPagamento = 'cartao'"
              >
                <span class="radio_circle">
                  <span
                    v-if="metodoPagamento === 'cartao'"
                    class="radio_dot"
                  ></span>
                </span>
                <i class="bi bi-credit-card" aria-hidden="true"></i>
                <span>Cartão de Crédito</span>
              </div>

              <transition name="fade_slide">
                <div v-if="metodoPagamento === 'cartao'" class="pgto_form">
                  <div class="form_group">
                    <label for="parcelas">Quantidade de Parcelas</label>
                    <div class="select_wrapper">
                      <select
                        id="parcelas"
                        v-model="cartao.parcelas"
                        class="form_select"
                      >
                        <option value="">Selecione</option>
                        <option
                          v-for="p in parcelasOpcoes"
                          :key="p.value"
                          :value="p.value"
                        >
                          {{ p.label }}
                        </option>
                      </select>
                      <i
                        class="bi bi-chevron-down select_icon"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>

                  <div class="form_group">
                    <label for="num_cartao">Número do Cartão</label>
                    <input
                      id="num_cartao"
                      v-model="cartao.numero"
                      type="text"
                      class="form_input"
                      :class="{ 'form_input--erro': erros.numero }"
                      placeholder="0000 0000 0000 0000"
                      maxlength="19"
                      autocomplete="cc-number"
                      @input="formatarNumeroCartao"
                      @blur="validarCampo('numero')"
                    />
                    <span v-if="erros.numero" class="form_erro">{{
                      erros.numero
                    }}</span>
                  </div>

                  <div class="form_group">
                    <label for="nome_cartao">Nome no Cartão</label>
                    <input
                      id="nome_cartao"
                      v-model="cartao.nome"
                      type="text"
                      class="form_input"
                      :class="{ 'form_input--erro': erros.nome }"
                      placeholder="Como está no cartão"
                      autocomplete="cc-name"
                      @blur="validarCampo('nome')"
                    />
                    <span v-if="erros.nome" class="form_erro">{{
                      erros.nome
                    }}</span>
                  </div>

                  <div class="form_row">
                    <div class="form_group">
                      <label>Validade</label>
                      <div class="validade_row">
                        <div class="select_wrapper">
                          <select
                            v-model="cartao.mes"
                            class="form_select"
                            aria-label="Mês de validade"
                          >
                            <option value="">Mês</option>
                            <option v-for="m in meses" :key="m" :value="m">
                              {{ m }}
                            </option>
                          </select>
                          <i
                            class="bi bi-chevron-down select_icon"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div class="select_wrapper">
                          <select
                            v-model="cartao.ano"
                            class="form_select"
                            aria-label="Ano de validade"
                          >
                            <option value="">Ano</option>
                            <option v-for="a in anos" :key="a" :value="a">
                              {{ a }}
                            </option>
                          </select>
                          <i
                            class="bi bi-chevron-down select_icon"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div class="form_group">
                      <label for="cvv">Código CVV</label>
                      <input
                        id="cvv"
                        v-model="cartao.cvv"
                        type="text"
                        class="form_input"
                        :class="{ 'form_input--erro': erros.cvv }"
                        placeholder="cvv"
                        maxlength="4"
                        autocomplete="cc-csc"
                        @blur="validarCampo('cvv')"
                      />
                      <span v-if="erros.cvv" class="form_erro">{{
                        erros.cvv
                      }}</span>
                    </div>
                  </div>

                  <button
                    class="btn_finalizar"
                    type="button"
                    :disabled="processando || !podeFinalizar"
                    @click="finalizarCompra"
                    :aria-busy="processando"
                  >
                    <i
                      v-if="processando"
                      class="bi bi-arrow-repeat spin"
                      aria-hidden="true"
                    ></i>
                    {{ processando ? "Processando..." : "Finalizar Compra" }}
                  </button>
                </div>
              </transition>

              <div class="pgto_divider" aria-hidden="true"></div>

              <div
                class="pgto_opcao"
                :class="{ 'pgto_opcao--ativo': metodoPagamento === 'pix' }"
                @click="metodoPagamento = 'pix'"
                role="radio"
                :aria-checked="metodoPagamento === 'pix'"
                tabindex="0"
                @keydown.enter="metodoPagamento = 'pix'"
              >
                <span class="radio_circle">
                  <span
                    v-if="metodoPagamento === 'pix'"
                    class="radio_dot"
                  ></span>
                </span>
                <i class="bi bi-qr-code" aria-hidden="true"></i>
                <span>Pix</span>
              </div>

              <transition name="fade_slide">
                <div
                  v-if="metodoPagamento === 'pix'"
                  class="pgto_form pgto_pix_info"
                >
                  <div class="pix_destaque">
                    <i
                      class="bi bi-lightning-charge-fill"
                      aria-hidden="true"
                    ></i>
                    <span>Aprovação instantânea</span>
                  </div>
                  <p class="pix_desc">
                    Após finalizar, você receberá o QR Code e a chave Pix para
                    concluir o pagamento.
                  </p>
                  <p class="pix_economia">
                    Economize
                    <strong>{{
                      formatPreco(checkout.totalPix.economia)
                    }}</strong>
                    pagando com Pix!
                  </p>
                  <button
                    class="btn_finalizar"
                    type="button"
                    :disabled="processando || !enderecoSelecionado"
                    @click="finalizarCompra"
                    :aria-busy="processando"
                  >
                    <i
                      v-if="processando"
                      class="bi bi-arrow-repeat spin"
                      aria-hidden="true"
                    ></i>
                    {{ processando ? "Processando..." : "Gerar QR Code Pix" }}
                  </button>
                </div>
              </transition>

              <div class="pgto_divider" aria-hidden="true"></div>

              <div
                class="pgto_opcao"
                :class="{ 'pgto_opcao--ativo': metodoPagamento === 'boleto' }"
                @click="metodoPagamento = 'boleto'"
                role="radio"
                :aria-checked="metodoPagamento === 'boleto'"
                tabindex="0"
                @keydown.enter="metodoPagamento = 'boleto'"
              >
                <span class="radio_circle">
                  <span
                    v-if="metodoPagamento === 'boleto'"
                    class="radio_dot"
                  ></span>
                </span>
                <i class="bi bi-upc-scan" aria-hidden="true"></i>
                <span>Boleto Bancário</span>
              </div>

              <transition name="fade_slide">
                <div v-if="metodoPagamento === 'boleto'" class="pgto_form">
                  <p class="boleto_desc">
                    O boleto será gerado após a confirmação. O prazo de
                    compensação é de até 3 dias úteis.
                  </p>
                  <button
                    class="btn_finalizar btn_finalizar--boleto"
                    type="button"
                    :disabled="processando || !enderecoSelecionado"
                    @click="finalizarCompra"
                    :aria-busy="processando"
                  >
                    <i
                      v-if="processando"
                      class="bi bi-arrow-repeat spin"
                      aria-hidden="true"
                    ></i>
                    {{ processando ? "Processando..." : "Gerar Boleto" }}
                  </button>
                </div>
              </transition>
            </div>
          </section>

          <section
            class="checkout_card checkout_resumo"
            aria-labelledby="sec_resumo"
          >
            <div class="checkout_card_header">
              <i class="bi bi-bag" aria-hidden="true"></i>
              <h2 id="sec_resumo">Resumo do Pedido</h2>
            </div>
            <div class="checkout_card_body">
              <p class="resumo_label">
                {{ checkout.itens.length }}
                {{ checkout.itens.length === 1 ? "produto" : "produtos" }}
                <span class="resumo_qtd"
                  >({{ checkout.quantidade }} itens)</span
                >
              </p>

              <ul class="resumo_itens" aria-label="Produtos no pedido">
                <li
                  v-for="item in checkout.itens"
                  :key="item.id"
                  class="resumo_item"
                >
                  <div class="resumo_item_img_wrap">
                    <img
                      :src="item.imagem || '/placeholder-default.png'"
                      :alt="item.nome"
                      class="resumo_item_img"
                    />
                  </div>
                  <div class="resumo_item_info">
                    <p class="produto_nome">{{ item.nome }}</p>
                    <p class="produto_qtd">
                      Qtd: {{ item.quantidade }} ·
                      {{ formatPreco(item.preco * item.quantidade) }}
                    </p>
                  </div>
                </li>
              </ul>

              <div class="resumo_valores">
                <div class="resumo_linha">
                  <span>Subtotal</span>
                  <span>{{ formatPreco(checkout.subtotal) }}</span>
                </div>
                <div class="resumo_linha">
                  <span>Frete</span>
                  <span class="valor--gratis">Grátis</span>
                </div>
                <div class="resumo_linha resumo_linha--total">
                  <span>Total</span>
                  <span>{{ formatPreco(checkout.total) }}</span>
                </div>
                <div class="resumo_linha resumo_linha--pix">
                  <span>Total no Pix</span>
                  <span>{{ formatPreco(checkout.totalPix.valor) }}</span>
                </div>
              </div>

              <div v-if="erroCheckout" class="checkout_erro" role="alert">
                <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
                {{ erroCheckout }}
              </div>
            </div>
          </section>
        </div>
      </template>
    </div>
  </main>
</template>

<script setup>
import { useCheckoutStore } from "~/stores/checkout";
import { useToast } from "@/composables/useToast";
import services from "@/services/axios";

definePageMeta({ layout: "site" });

useHead({ title: "Casa Bonita Eletros - Finalizar Compra" });

const checkout = useCheckoutStore();
const toast = useToast();
const isLoading = useIsLoading();

const usuario = ref(null);
const clienteId = ref(null);
const enderecos = ref([]);
const enderecoSelecionado = ref(null);
const metodoPagamento = ref("cartao");
const processando = ref(false);
const erroCheckout = ref(null);

const cartao = ref({
  numero: "",
  nome: "",
  mes: "",
  ano: "",
  cvv: "",
  parcelas: "",
});

const erros = ref({ numero: "", nome: "", cvv: "" });

const parcelasOpcoes = computed(() =>
  Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const valor = checkout.total / n;
    return {
      value: n,
      label:
        n === 1
          ? `1x de ${formatPreco(valor)} (sem juros)`
          : `${n}x de ${formatPreco(valor)}`,
    };
  }),
);

const meses = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const anoAtual = new Date().getFullYear();
const anos = Array.from({ length: 15 }, (_, i) => String(anoAtual + i));

const podeFinalizar = computed(() => {
  if (!enderecoSelecionado.value) return false;
  if (metodoPagamento.value === "cartao") {
    return (
      cartao.value.numero.replace(/\s/g, "").length === 16 &&
      cartao.value.nome.trim().length >= 4 &&
      cartao.value.mes &&
      cartao.value.ano &&
      cartao.value.cvv.length >= 3 &&
      cartao.value.parcelas
    );
  }
  return true;
});

function validarCampo(campo) {
  erros.value[campo] = "";
  if (
    campo === "numero" &&
    cartao.value.numero.replace(/\s/g, "").length !== 16
  )
    erros.value.numero = "Número inválido.";
  if (campo === "nome" && cartao.value.nome.trim().length < 4)
    erros.value.nome = "Informe o nome como está no cartão.";
  if (campo === "cvv" && cartao.value.cvv.length < 3)
    erros.value.cvv = "CVV inválido.";
}

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarNumeroCartao() {
  let v = cartao.value.numero.replace(/\D/g, "").substring(0, 16);
  cartao.value.numero = v.replace(/(.{4})/g, "$1 ").trim();
}

function formatarCpfCnpj(valor, tipo) {
  if (!valor) return "-";
  const v = valor.replace(/\D/g, "");
  if (tipo === "JURIDICA" || v.length === 14) {
    return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarTelefone(valor) {
  if (!valor) return "-";
  const v = valor.replace(/\D/g, "");
  if (v.length === 11) {
    return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return v.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

async function fetchUsuario() {
  try {
    const client_token = localStorage.getItem("client_token");
    const client_id = localStorage.getItem("client_id");

    if (!client_token || !client_id) {
      return navigateTo("/login");
    }

    const { data } = await services.clientes.getDataCliente({
      client_id,
      client_token,
    });

    if (!data) {
      return navigateTo("/login");
    }

    usuario.value = data;
    clienteId.value = client_id;

    const lista = data.enderecos ?? [];
    enderecos.value = lista;
    const principal = lista.find((e) => e.principal === "SIM");
    enderecoSelecionado.value = principal?.id ?? lista[0]?.id ?? null;
  } catch (error) {
    console.error(error);
    navigateTo("/login");
  }
}

async function finalizarCompra() {
  erroCheckout.value = null;

  if (!enderecoSelecionado.value) {
    toast.error("Selecione um endereço de entrega.");
    return;
  }

  processando.value = true;
  try {
    const payload = {
      endereco_id: enderecoSelecionado.value,
      metodo_pagamento: metodoPagamento.value,
      itens: checkout.itens.map((i) => ({
        produto_id: i.id,
        quantidade: i.quantidade,
        preco: i.preco,
      })),
      ...(metodoPagamento.value === "cartao" && {
        cartao: {
          numero: cartao.value.numero.replace(/\s/g, ""),
          nome: cartao.value.nome,
          validade: `${cartao.value.mes}/${cartao.value.ano}`,
          cvv: cartao.value.cvv,
          parcelas: cartao.value.parcelas,
        },
      }),
    };

    const { data } = await services.pedidos.criar(payload);
    checkout.limpar();
    toast.success("Pedido realizado com sucesso!");
    navigateTo(`/pedido/${data.id ?? data.urn ?? "confirmado"}`);
  } catch (error) {
    erroCheckout.value =
      error?.response?.data?.erro ||
      error?.response?.data?.message ||
      error?.message ||
      "Ocorreu um erro ao processar o pagamento. Tente novamente.";
    toast.error(erroCheckout.value);
  } finally {
    processando.value = false;
  }
}

onMounted(async () => {
  checkout.restaurar();

  if (!checkout.itens.length) {
    return navigateTo("/produtos");
  }

  isLoading.start();
  await fetchUsuario();
  isLoading.stop();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_compra_rapida {
  background: #f7f7f8;
  min-height: 80vh;
  padding: 32px 0 80px;
}

.checkout_container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  margin-bottom: 1.2rem;
  ol {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 13px;
  }
  a {
    color: #666;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;
    i {
      font-size: 13px;
    }
    &:hover {
      color: var(--primary);
    }
  }
  li[aria-current="page"] {
    color: #111;
    font-weight: 500;
  }
}

.breadcrumb_sep {
  color: #bbb;
  font-size: 14px;
}

.checkout_loading {
  display: flex;
  justify-content: center;
  padding: 6rem 0;
}

.checkout_heading {
  font-size: 1.65rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  i {
    font-size: 1.5rem;
    color: var(--primary);
  }
}

.checkout_grid {
  display: grid;
  grid-template-columns: 1fr 1fr 340px;
  gap: 1.5rem;
  align-items: start;
}

.checkout_card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.checkout_card_header {
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 14px 20px;
  i {
    font-size: 1rem;
    color: var(--primary);
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
}

.checkout_card_body {
  padding: 20px;
}

.info_skeleton {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton_line {
  display: block;
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
  width: 80%;
  &:nth-child(odd) {
    width: 65%;
  }
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.info_row {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 7px 0;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
}

.info_label {
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  min-width: 155px;
}

.info_value {
  color: #555;
}

.endereco_list {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.endereco_item {
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 14px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  &:hover {
    border-color: var(--primary);
    background: #fffbf2;
  }
  &.endereco_item--ativo {
    border-color: var(--primary);
    background: #f2f7ff;
  }
}

.endereco_radio {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.radio_circle {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  border: 2px solid #ccc;
  flex-shrink: 0;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
  .endereco_item--ativo &,
  .pgto_opcao--ativo & {
    border-color: var(--primary);
  }
}

.radio_dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--primary);
}

.endereco_info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.endereco_tipo {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 2px;
}

.tipo--principal {
  color: var(--primary);
}
.tipo--secundario {
  color: #888;
}

.endereco_nome {
  font-size: 13px;
  font-weight: 700;
  color: #222;
}

.endereco_linha {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.endereco_vazio {
  font-size: 13px;
  color: #999;
  margin-bottom: 1rem;
}

.btn_add_endereco {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  transition: opacity 0.2s;
  i {
    font-size: 15px;
  }
  &:hover {
    opacity: 0.75;
  }
}

.pgto_opcao {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  transition: color 0.2s;
  i {
    font-size: 1.1rem;
    color: #888;
    transition: color 0.2s;
  }
  &:hover {
    color: #111;
    i {
      color: var(--primary);
    }
  }
  &.pgto_opcao--ativo {
    color: #111;
    i {
      color: var(--primary);
    }
  }
}

.pgto_divider {
  border: none;
  border-top: 1px solid #ebebeb;
  margin: 0;
}

.pgto_form {
  padding: 8px 0 16px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form_group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 12px;
    font-weight: 500;
    color: #555;
  }
}

.form_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form_input {
  height: 40px;
  padding: 0 12px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  &::placeholder {
    color: #bbb;
  }
  &:focus {
    border-color: var(--primary);
  }
  &--erro {
    border-color: #e74c3c;
  }
}

.form_erro {
  font-size: 11px;
  color: #e74c3c;
}

.select_wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form_select {
  height: 40px;
  padding: 0 32px 0 12px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #444;
  appearance: none;
  background: #fff;
  outline: none;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.2s;
  &:focus {
    border-color: var(--primary);
  }
}

.select_icon {
  position: absolute;
  right: 10px;
  font-size: 11px;
  color: #888;
  pointer-events: none;
}

.validade_row {
  display: flex;
  gap: 8px;
  .select_wrapper {
    flex: 1;
  }
}

.btn_finalizar {
  height: 44px;
  width: 100%;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    opacity 0.2s,
    transform 0.1s;
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &--boleto {
    background: #2c2c2c;
  }
}

.pgto_pix_info {
  gap: 10px;
}

.pix_destaque {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #2ecc71;
  i {
    font-size: 14px;
  }
}

.pix_desc {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.pix_economia {
  font-size: 13px;
  color: #555;
  margin: 0;
  background: #f0faf5;
  border: 1px solid #b2e6cc;
  border-radius: 6px;
  padding: 8px 12px;
  strong {
    color: #1e9e58;
  }
}

.boleto_desc {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.resumo_label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px;
}

.resumo_qtd {
  color: #888;
  font-weight: 400;
  font-size: 13px;
}

.resumo_itens {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 260px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
}

.resumo_item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #efefef;
}

.resumo_item_img_wrap {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resumo_item_img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.resumo_item_info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.produto_nome {
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.produto_qtd {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.resumo_valores {
  border-top: 1.5px solid #f0f0f0;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resumo_linha {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  &--total {
    font-weight: 700;
    color: #111;
    font-size: 15px;
    padding-top: 6px;
    border-top: 1px solid #ebebeb;
    margin-top: 4px;
  }
  &--pix {
    font-size: 13px;
    color: #1e9e58;
    font-weight: 500;
  }
}

.valor--gratis {
  color: #1e9e58;
  font-weight: 600;
}

.checkout_erro {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff5f5;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  color: #c0392b;
  margin-top: 12px;
  i {
    font-size: 16px;
  }
}

.fade_slide-enter-active,
.fade_slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.fade_slide-enter-from,
.fade_slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 1024px) {
  .checkout_grid {
    grid-template-columns: 1fr 1fr;
    .checkout_resumo {
      grid-column: 1 / -1;
    }
  }
}

@media (max-width: 768px) {
  .checkout_grid {
    grid-template-columns: 1fr;
    .checkout_resumo {
      grid-column: auto;
    }
  }
  .form_row {
    grid-template-columns: 1fr;
  }
  .info_label {
    min-width: 130px;
  }
}

@media (max-width: 480px) {
  .checkout_container {
    padding: 0 1rem;
  }
}
</style>
