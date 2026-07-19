<template>
  <main id="page_carrinho" aria-labelledby="cart_heading" class="py-5">
    <div class="container">
      <div class="row g-4 align-items-start">
        <section class="col-12 col-lg-8" aria-label="Itens do carrinho">
          <h1 class="fs-4 fw-bold text-dark mb-4" id="cart_heading">
            {{ vendasAtivas ? 'Seu Carrinho' : 'Produtos para orçamento' }}
          </h1>

          <div
            v-if="carrinho.itens.length === 0"
            class="card border-muted rounded-3 text-center py-5 px-4 text-secondary"
            role="status"
          >
            <i class="bi bi-cart-x fs-1 mb-3 d-block" aria-hidden="true"></i>
            <p class="mb-4">Seu carrinho está vazio.</p>
            <SecButton
              @click="router.push('/produtos')"
              class="btn btn-dark fw-semibold px-4 mx-auto"
              style="width: fit-content"
            >
              Continuar comprando
            </SecButton>
          </div>

          <ul
            v-else
            class="rounded-3 overflow-hidden px-0"
            aria-label="Lista de produtos no carrinho"
          >
            <CartItem
              v-for="(item, index) in carrinho.itens"
              :key="item.id"
              :item="item"
              :is-last="index === carrinho.itens.length - 1"
              @incrementar="carrinho.incrementar"
              @decrementar="carrinho.decrementar"
              @remover="carrinho.remover"
            />
          </ul>
        </section>

        <aside class="col-12 col-lg-4" aria-labelledby="summary_heading">
          <div
            class="card border-muted rounded-3 p-4 shadow-sm sticky-top"
            style="top: 100px"
          >
            <h2 class="fs-6 fw-bold text-dark mb-4" id="summary_heading">
              {{ vendasAtivas ? 'Resumo do seu pedido' : 'Resumo do orçamento' }}
            </h2>

            <div v-if="vendasAtivas" class="mb-3">
              <label for="input_cep" class="form-label small fw-bold text-dark">
                Calcule o Frete
              </label>
              <div class="d-flex flex-row gap-3">
                <input
                  id="input_cep"
                  v-model="cep"
                  type="text"
                  placeholder="Digite seu CEP"
                  class="form-control w-75"
                  maxlength="9"
                  aria-label="CEP para cálculo de frete"
                  @input="mascararCep"
                />
                <SecButton
                  style="width: fit-content"
                  class="w-25"
                  type="button"
                  @click="calcularFrete"
                  :disabled="loadingFrete"
                >
                  {{ loadingFrete ? "..." : "Calcular" }}
                </SecButton>
              </div>
              <p v-if="freteMsg" class="form-text mt-1" role="status">
                {{ freteMsg }}
              </p>
            </div>

            <div v-if="vendasAtivas" class="mb-3">
              <label
                for="input_cupom"
                class="form-label small fw-bold text-dark"
              >
                Cupom de Desconto
              </label>
              <div class="d-flex flex-row gap-3">
                <input
                  id="input_cupom"
                  v-model="cupom"
                  type="text"
                  placeholder="Insira seu cupom"
                  class="form-control w-75"
                  aria-label="Código do cupom de desconto"
                />
                <SecButton
                  style="width: fit-content"
                  class="w-25"
                  type="button"
                  @click="aplicarCupom"
                  :disabled="loadingCupom"
                >
                  {{ loadingCupom ? "..." : "Aplicar" }}
                </SecButton>
              </div>
              <p
                v-if="cupomMsg"
                class="form-text mt-1"
                :class="cupomValido ? 'text-success' : 'text-danger'"
                role="status"
              >
                {{ cupomMsg }}
              </p>
            </div>

            <hr class="my-3" />

            <dl class="mb-2">
              <div
                v-if="desconto > 0"
                class="d-flex justify-content-between small text-secondary mb-1"
              >
                <dt class="fw-normal">Desconto</dt>
                <dd class="mb-0 fw-medium text-success">
                  − {{ formatPreco(desconto) }}
                </dd>
              </div>
              <div
                v-if="frete !== null"
                class="d-flex justify-content-between small text-secondary mb-1"
              >
                <dt class="fw-normal">Frete</dt>
                <dd class="mb-0 fw-medium">
                  {{ frete === 0 ? "Grátis" : formatPreco(frete) }}
                </dd>
              </div>
            </dl>

            <div class="summary_total d-flex align-items-baseline justify-content-between gap-3 mb-1">
              <p class="small fw-semibold text-dark mb-0">Total:</p>
              <p
                class="summary_total_valor fw-bold text-dark lh-1 mb-0 text-nowrap"
                aria-live="polite"
              >
                {{ formatPreco(totalFinal) }}
              </p>
            </div>
            <p v-if="vendasAtivas" class="text-secondary mb-4">
              ou em até 10x de {{ formatPreco(totalFinal / 10) }}
            </p>

            <SecButton
              type="button"
              :class="{ summary_action_orcamento: !vendasAtivas }"
              @click="finalizar"
              :disabled="carrinho.itens.length === 0"
            >
              {{ vendasAtivas ? 'Finalizar compra' : 'Solicitar orçamento' }}
            </SecButton>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useCarrinhoStore } from "@/stores/carrinho";

definePageMeta({ layout: "site" });

useHead(() => ({
  title: 'Casa Bonita Eletros - Carrinho'
}))

const router = useRouter();

const carrinho = useCarrinhoStore();
const { vendasAtivas, carregarModoOperacao } = useModoOperacao();

onMounted(carregarModoOperacao);

const cep = ref("");
const cupom = ref("");
const freteMsg = ref("");
const cupomMsg = ref("");
const cupomValido = ref(false);
const frete = ref(null);
const desconto = ref(0);
const loadingFrete = ref(false);
const loadingCupom = ref(false);

const totalFinal = computed(
  () => carrinho.subtotal - desconto.value + (frete.value || 0),
);

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function mascararCep() {
  cep.value = cep.value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

async function calcularFrete() {
  if (cep.value.length < 9) {
    freteMsg.value = "Digite um CEP válido.";
    return;
  }
  loadingFrete.value = true;
  freteMsg.value = "";
  await new Promise((r) => setTimeout(r, 800));
  frete.value = 0;
  freteMsg.value = "Frete grátis para sua região! 🎉";
  loadingFrete.value = false;
}

async function aplicarCupom() {
  if (!cupom.value.trim()) {
    cupomMsg.value = "Digite um cupom.";
    return;
  }
  loadingCupom.value = true;
  cupomMsg.value = "";
  await new Promise((r) => setTimeout(r, 600));
  if (cupom.value.toUpperCase() === "DESC10") {
    desconto.value = carrinho.subtotal * 0.1;
    cupomValido.value = true;
    cupomMsg.value = "Cupom aplicado! 10% de desconto.";
  } else {
    desconto.value = 0;
    cupomValido.value = false;
    cupomMsg.value = "Cupom inválido ou expirado.";
  }
  loadingCupom.value = false;
}

function finalizar() {
  navigateTo(vendasAtivas.value ? '/checkout' : '/solicitar-orcamento');
}
</script>

<style scoped lang="scss">
#page_carrinho {
  min-height: 80vh;
}

.summary_total_valor {
  font-size: 2rem;
}

.summary_action_orcamento {
  margin-top: 5px;
}
</style>
