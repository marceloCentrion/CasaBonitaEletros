<template>
  <div>
    <div class="card">
      <div class="card-header">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link :to="state.url">
                <span id="span-url" v-if="state.url == '/admin/pedidos'"
                  >Pedidos</span
                >
                <span id="span-url" v-else>Cliente</span>
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Dados do Pedido
            </li>
          </ol>
        </nav>
        <h4>Dados do Pedido</h4>
        <div class="row">
          <div class="col-md-6">
            <p>
              Pedido feito por: <span>{{ state.pedido.cliente.nome }}</span>
            </p>
            <p>Pedido criado em: {{ state.pedido.data_criacao }}</p>
            <p v-if="state.pedido.valor_produto">
              Valor dos Produtos:
              {{
                state.pedido.valor_produto.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </p>
            <p v-if="state.pedido.valor_frete">
              Valor do Frete:
              {{
                state.pedido.valor_frete.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </p>
            <p v-if="state.pedido.valor_total">
              Valor Total:
              {{
                state.pedido.valor_total.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </p>

            <div class="row" v-if="state.pedido.arquivo">
              <div class="col-md-4">
                <div>
                  <label>Nota Fiscal</label>
                </div>
                <!-- <a target="_blank" :href="state.pedido.arquivo"
                  ><img
                    src="./../../../public/images/admin/doc_icon.png"
                    style="width: 80px"
                    title="Clique para baixar"
                /></a> -->
              </div>
            </div>
            <div
              class="row"
              v-if="!state.pedido.arquivo && state.pedido.status == 'FATURADO'"
            >
              <div class="col-md-4">
                <label>Nota Fiscal</label>
                <input
                  type="file"
                  class="input"
                  @change="adicionarNotaFiscal"
                />
              </div>
            </div>
            <div class="row" v-if="state.pedido.status == 'CANCELADO'">
              <div class="col-md-10">
                <label>Motivo do cancelamento</label>
                <textarea
                  v-model="state.pedido.motivo_cancelamento"
                  class="input form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div class="row" v-if="state.pedido.status == 'ENVIADO'">
              <div class="col-md-10">
                <label>Código de Rastreio</label>
                <input
                  type="text"
                  id="codigo_rastreio"
                  class="form-control"
                  v-model="state.pedido.codigo_rastreio"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="d-flex align-self-start">
              <div>
                <label style="text-align: left !important">Status</label>
                <select v-model="state.pedido.status" class="form-select">
                  <option value="PENDENTE">Pendente</option>
                  <option value="PAGO">Pago</option>
                  <option value="FATURADO">Faturado</option>
                  <option value="CANCELADO">Cancelado</option>
                  <option value="ENVIADO">Enviado</option>
                  <option value="ENCERRADO">Encerrado</option>
                </select>
              </div>
              <div style="padding-top: 21px; padding-left: 5px">
                <SecButton @click="upStatus" class="mt-2">
                  Salvar
                </SecButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="endereco mb-4">
          <p class="title_table">Pagamento</p>
          <div class="row">
            <div class="col-sm-6">
              <p>Pagamento via {{ state.pedido.tipo_pagamento }}</p>
              <p>
                Valor dos Produtos:
                {{
                  state.pedido.valor_produtos
                    ? state.pedido.valor_produtos.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"
                }}
              </p>
              <p>
                Valor Total:
                {{
                  state.pedido.valor_total
                    ? state.pedido.valor_total.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="endereco mb-4">
          <p class="title_table">Entrega</p>
          <div class="row">
            <div class="col-sm-6">
              <p>Tipo do Frete: {{ state.pedido.tipo_frete }}</p>
            </div>
            <div class="col-sm-6">
              <p>
                Valor do Frete:
                {{
                  state.pedido.valor_frete
                    ? state.pedido.valor_frete.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"
                }}
              </p>
            </div>
          </div>

          <p class="title_table">Endereço</p>
          <div class="row">
            <div class="col-md-4 mb-2">
              <label>Logradouro:</label>
              <div class="div">
                <p>{{ state.pedido.logradouro }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Número:</label>
              <div class="div">
                <p>{{ state.pedido.numero }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Complemento:</label>
              <div class="div">
                <p>{{ state.pedido.complemento }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Bairro:</label>
              <div class="div">
                <p>{{ state.pedido.bairro }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>Cidade:</label>
              <div class="div">
                <p>{{ state.pedido.cidade }} - {{ state.pedido.estado }}</p>
              </div>
            </div>
            <div class="col-md-4 mb-2">
              <label>CEP:</label>
              <div class="div">
                <input readonly v-model="state.pedido.cep" />
              </div>
            </div>
          </div>
        </div>
        <span class="title_table">Tabela de Produtos</span>
        <table class="table table-hover">
          <thead class="thead">
            <tr>
              <th scope="col" style="color: white;">Código</th>
              <th scope="col" style="color: white;">Produto</th>
              <th scope="col" style="color: white;">Preço</th>
              <th scope="col" style="color: white;">Desconto</th>
              <th scope="col" style="color: white;">Quantidade</th>
              <th scope="col" style="color: white;">Ver Produto</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="prod_pedido in state.pedido.produtos_pedidos"
              :key="prod_pedido.produto.id"
            >
              <td>{{ prod_pedido.produto.ref }}</td>
              <td>
                {{ prod_pedido.produto.nome }} -
                {{ prod_pedido.estoque.valor_variacao.nome }}
              </td>
              <td v-if="state.pedido.tipo_pagamento == 'PIX'">
                R$
                {{
                  prod_pedido.produto.preco_pix
                    ? prod_pedido.produto.preco_pix.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"
                }}
              </td>
              <td v-else>
                {{
                  prod_pedido.produto.preco
                    ? prod_pedido.produto.preco.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "-"
                }}
              </td>
              <td>
                {{
                  prod_pedido.produto.preco_desconto
                    ? prod_pedido.produto.preco_desconto.toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    : "-"
                }}
              </td>
              <td>{{ prod_pedido.quantidade }}</td>
              <td>
                <a
                  title="Ver Produto"
                  class="btn btn_ver"
                  target="_blank"
                  :href="'/produto/' + prod_pedido.produto.urn"
                  ><i class="bi bi-eye-fill"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
        <span class="span_total" v-if="state.pedido.valor_total"
          >Total:
          {{
            state.pedido.valor_total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
          }}</span
        >
        <div class="mt-4 d-flex justify-content-end">
          <NuxtLink :to="state.url">
            <OutlineButton type="button">
              <i class="bi bi-arrow-left me-1"></i> Voltar
            </OutlineButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    

    const router = useRouter();

    const state = reactive({
      url: "",
      pedido: {
        status: "",
        cliente: {},
        valor_total: "",
        valor_produto: "",
        valor_frete: "",
        endereco: { cidade: {} },
        produtos: [{ pivot: {} }],
        motivo_cancelamento: "",
        codigo_rastreio: "",
      },
      nota_fiscal: "",
      ver_nota: false,
      div_nota: false,
    });

    const destinoPedido = localStorage.getItem("NavegacaoPedidos");
    state.url = destinoPedido;
    onMounted(() => {
      fetchpedido();
    });

    const authStore = useAuthStore();
    const token = authStore.token;

    async function fetchpedido() {
      try {
        const { data } = await services.clientes.getPedidosId({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.pedido = data;
        // state.nota_fiscal = data.arquivo;
        if (state.nota_fiscal) {
          state.ver_nota = true;
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function upStatus() {
      try {
        const formData = new FormData();
        if (state.pedido.status === "FATURADO") {
          if (state.nota_fiscal) {
            formData.append("arquivo", state.nota_fiscal.get("nota_fiscal"));
          }
        }
        if (state.pedido.status === "CANCELADO") {
          if (state.pedido.motivo_cancelamento) {
            formData.append(
              "motivo_cancelamento",
              state.pedido.motivo_cancelamento
            );
          } else {
            alert(
              "O campo motivo do cancelamento é obrigatório para o status cancelado!"
            );
            return;
          }
        }
        if (state.pedido.status === "ENVIADO") {
          if (state.pedido.codigo_rastreio) {
            formData.append("codigo_rastreio", state.pedido.codigo_rastreio);
          } else {
            alert(
              "O campo código de rastreio é obrigatório para o status enviado!"
            );
            return;
          }
        }
        formData.append("status", state.pedido.status);
        formData.append("valor_total", state.pedido.valor_total);
        formData.append("valor_produto", state.pedido.valor_produto);
        formData.append("valor_frete", state.pedido.valor_frete);
        formData.append("_method", "PUT");
        const { data } = await services.clientes.upPedido({
          id: router.currentRoute._value.params.id,
          pedido: formData,
          token,
        });
      } catch (error) {
        console.log(error);
      }
    }

    async function adicionarNotaFiscal(event) {
      try {
        const nota = event.target.files[0];
        if (nota && nota.type === "application/pdf") {
          const formData = new FormData();
          formData.append("nota_fiscal", nota);
          state.nota_fiscal = formData;
        } else {
          alert("Por favor, selecione um arquivo PDF.");
        }
      } catch (error) {
        console.log("Erro ao adicionar nota fiscal:", error);
      }
    }

    return {
      router,
      state,
      upStatus,
      adicionarNotaFiscal,
    };
  },
};
</script>
<style scoped>
#span-url {
  color: var(--primary);
  text-decoration: underline var(--primary);
}
#codigo_rastreio {
  border: solid 1px #ccc;
}
th {
  background-color: var(--primary) !important;
}

.table {
  margin-bottom: 0;
}

span {
  color: #000;
}

h4 {
  color: #000;
  margin-bottom: 0;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 0;
  margin-left: 0;
}

input:focus {
  border: none;
  outline: none;
}

input {
  border: none;
  cursor: default;
}

.input select {
  border: solid 1px #000;
}

select:focus {
  border: solid 1px var(--primary);
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}

tr {
  text-align: center;
}

th {
  border-bottom: solid 2px #000 !important;
}

td {
  border-bottom: solid 1px #000 !important;
  color: #000;
}

.table-hover > tbody > tr:hover > * {
  color: rgb(0, 0, 0);
  background-color: rgb(225, 225, 225);
}

.title_table {
  color: #000;
  font-size: 14pt;
  font-weight: 700;
}

.btn_ver {
  background: var(--primary);
  margin-bottom: 0;
  color: #fff;
}

.span_total {
  color: #000;
  font-size: 14pt;
  font-weight: 500;
}

.div {
  border-bottom: solid 2px var(--primary);
  height: 30px;
}

.div p {
  margin-bottom: 0;
  color: black;
  font-size: 12pt;
  font-weight: 500;
  text-align: justify;
}

.card-header p {
  margin-bottom: 0;
  color: #000;
  font-size: 12pt;
}

.card-header {
  background-color: transparent;
  font-size: 14pt;
  color: #000;
  font-weight: 600;
}

.card-header span {
  font-size: 14pt;
  color: #000;
  font-weight: 600;
}
</style>
