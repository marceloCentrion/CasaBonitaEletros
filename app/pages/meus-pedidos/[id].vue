<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div style="background: #fcfcfc">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <div class="title mt-4 mb-2">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="/">Página Principal</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="/meus-pedidos">Meus Pedidos</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Pedido
                  </li>
                </ol>
              </nav>
            </div>
            <div class="card">
              <div style="display: flex; justify-content: space-between">
                <span style="font-weight: 700">Pedido</span>
                <span style="font-weight: 700">{{
                  state.pedido.data_criacao
                }}</span>
              </div>

              <hr />
              <div class="row">
                <div class="col-md-6">
                  <div class="informacao">
                    <p><span>Código: </span>000{{ state.pedido.id }}</p>

                    <p>
                      <span>Valor dos produtos:</span>
                      {{
                        state.pedido.valor_produtos
                          ? state.pedido.valor_produtos.toLocaleString(
                              "pt-br",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )
                          : "-"
                      }}
                    </p>
                  </div>
                </div>
                <div class="col-md-6">
                  <p style="color: #000; text-align: right">
                    Status: {{ state.pedido.status }}
                  </p>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="row">
                <div class="col-md-12">
                  <span style="font-weight: 700">Produtos</span>
                  <hr />
                </div>
              </div>

              <div
                v-for="produto_pedido in state.pedido.produtos_pedidos"
                :key="produto_pedido.id"
                style="display: flex; justify-content: flex-start"
              >
                <div
                  v-if="produto_pedido.produto.imagens"
                  style="margin-right: 10px"
                >
                  <img
                    id="img-table"
                    :src="produto_pedido.produto.imagens[0].imagem"
                  />
                </div>
                <div v-else>
                  <img id="img-table" src="/logo/logo.svg" />
                </div>

                <div>
                  <span style="font-weight: 600">{{
                    produto_pedido.produto.nome
                  }}</span>
                  <div>Quantidade: {{ produto_pedido.quantidade }}</div>
                  <div
                    v-if="
                      state.pedido &&
                      produto_pedido.estoque.valor_variacao.nome != 'Padrão'
                    "
                  >
                    Quantidade: {{ produto_pedido.estoque.valor_variacao.nome }}
                  </div>
                </div>
                <div style="margin-left: auto; font-weight: 600">
                  <div v-if="state.pedido.tipo_pagamento == 'PIX'">
                    R$ {{ produto_pedido.produto.preco_pix }}
                  </div>
                  <div v-else>R$ {{ produto_pedido.produto.preco }}</div>
                </div>
              </div>

              <hr />
              <div style="display: flex; justify-content: space-between">
                <div>Valor Total dos Produtos</div>
                <div v-if="state.pedido.tipo_pagamento == 'PIX'">
                  {{
                    state.pedido.valor_produtos
                      ? state.pedido.valor_produtos.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "-"
                  }}
                </div>
              </div>
            </div>
            <div class="card">
              <div class="row">
                <div class="col-md-12">
                  <span style="font-weight: 700">Entrega</span>
                  <hr />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>Tipo</div>
                <div v-if="state.pedido.tipo_frete == 'Retirada'">
                  <b>Retirada na loja</b>
                </div>
                <div v-else>
                  <b>{{ state.pedido.tipo_frete }}</b>
                </div>
              </div>
              <div
                style="display: flex; justify-content: space-between"
                v-if="state.pedido.tipo_frete != 'Retirada'"
              >
                <div>Endereço</div>
                <div>
                  {{ state.pedido.logradouro }}, N°{{ state.pedido.numero }}
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div>Bairro</div>
                  <div>{{ state.pedido.bairro }}</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div>Cidade</div>
                  <div>
                    {{ state.pedido.cidade }} - {{ state.pedido.estado }}
                  </div>
                </div>
              </div>

              <hr />
              <div style="display: flex; justify-content: space-between">
                <div>Frete</div>
                <div>
                  {{
                    state.pedido.valor_frete.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </div>
              </div>
            </div>

            <div class="card">
              <div class="row">
                <div class="col-md-12">
                  <span style="font-weight: 700">Pagamento</span>
                  <hr />
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>Tipo de Pagamento</div>
                <div>{{ state.pedido.tipo_pagamento }}</div>
              </div>

              <div style="display: flex; justify-content: space-between">
                <div>Subtotal</div>
                <div></div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>Frete</div>
                <div>
                  {{
                    state.pedido.valor_frete.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </div>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>Desconto</div>
                <div>BB</div>
              </div>
              <hr />
              <div style="display: flex; justify-content: space-between">
                <div>Valor Total</div>
                <div>
                  {{
                    state.pedido.valor_total.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Ver Pedidos",
    });
    definePageMeta({
      layout: "site",
      middleware: "client",
    });
    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token } = storeToRefs(clienteAuthStore);

    const state = reactive({
      pedido: {
        produtos: [{ imagens: [{ imagem: "" }], pivot: {}, preco: 0 }],
        endereco: { cidade: { estado: {} } },
        valor_total: 0,
        valor_frete: 0,
      },
      client_token: null,
      client_nome: null,
    });
    state.client_token = clienteAuthStore.client_token;
    state.client_nome = clienteAuthStore.client_nome;
    onMounted(() => {
      fetchPedidos();
    });
    async function fetchPedidos() {
      try {
        const { data } = await services.clientes.getPedidoSite({
          client_token: client_token.value,
          id: router.currentRoute._value.params.id,
        });
        state.pedido = data;
      } catch (error) {
        state.client_token = null;
        state.client_nome = null;
      }
    }
    return {
      state,
    };
  },
};
</script>
<style scoped>
p {
  font-family: "Poppins";
  font-weight: 100;
}
p span {
  font-weight: 700;
}
.breadcrumb-item a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}
tr th {
  color: #fff;
  font-weight: 900;
  background: #000;
}
tr td {
  color: #000;
  font-weight: 700;
}
td,
th {
  text-align: center;
}
.div_img {
  padding: 10px;
}
.quad {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 15px;
}
#img_pedido {
  width: 100%;
  height: 100px;
  object-fit: cover;
}
.div_nome p {
  color: #666;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  margin-bottom: 0;
}
.btn-red {
  border-radius: 4px;
  background: var(--Color-primary, #e13229);
  width: 100%;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border: none;
  color: #fff;
  margin-top: 45px;
}
.title h2 {
  color: #000;
  font-size: 32px;
}
.informacao h5 {
  color: #000;
}
.div_itens {
  margin-top: 2rem;
}
.div_itens h3 {
  color: #000;
}
.card {
  border-radius: 8px;
  border: 1.5px solid #dadae3;
  background: #fff;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 30px;
}
.card-text {
  margin-bottom: 0;
  color: #000;
}
#img-table {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.div_endereco h5 {
  color: #000;
  margin-bottom: 0;
}
.table-striped > tbody > tr:nth-of-type(2n + 1) > * {
  color: #000;
}
@media (min-width: 768px) and (max-width: 991px) {
}
</style>
