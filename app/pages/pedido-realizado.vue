<template>
  <div>
    <top />
    <div style="background: #f2f2f2">
      <section id="sct_finalizar">
        <div class="container">
          <div
            style="
              background-color: #fff;
              border-radius: 10px;
              padding: 20px;
              margin-top: 30px;
            "
          >
            <div style="text-align: center">
              <!-- <img src="/images/site/check.png" style="width: 100px" /> -->
              <p style="font-size: 18pt">
                Parabéns! Seu pedido foi realizado com sucesso!
              </p>
              <p
                style="font-size: 12pt"
                v-if="state.pedido.tipo_pagamento != 'CARTAO'"
              >
                Agora só falta finalizar o pagamento
              </p>
              <p
                style="font-size: 12pt"
                v-if="state.pedido.tipo_pagamento == 'CARTAO'"
              >
                Seu pagamento foi realizado com sucesso!<br />
                Você receberá um e-mail com os detalhes do seu pedido.
              </p>
            </div>
            <div class="row" v-if="state.pedido.tipo_pagamento == 'PIX'">
              <div class="col-sm-3" style="text-align: center">
                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  "
                >
                  <!-- <img :src="state.pedido.pix_qr_code" style="width: 100%" /> -->
                </div>
                <textarea
                  readonly
                  v-model="state.pedido.pix_code"
                  style="resize: none"
                >
                </textarea>
                <button
                  class="btn btn-primary"
                  style="margin-top: 15px"
                  @click="copiarTexto()"
                >
                  Obter Códico Copia e Cola
                </button>
              </div>
              <div class="col-sm-9">
                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  "
                >
                  <p class="bold">Instruções</p>
                  <p>
                    1. Abra o app do seu banco ou instituição financeira e entre
                    na Área PIX.
                  </p>
                  <p>
                    2. Escolha a opção Pagar com QR Code ou Pix Copia e Cola.
                  </p>
                  <p>3. Confira os dados do pagamento, confirme e pronto!</p>
                </div>
                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  "
                >
                  <p class="bold">Atenção</p>
                  Informação Importante Após Finalizar a Compra, o PIX gerado
                  fica disponível por 6 horas aguardando o seu pagamento, após
                  este prazo ele expira e seu pedido será cancelado.
                </div>

                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  "
                >
                  <p class="bold">Pedido</p>
                  <p>
                    Detalhes do pedido Pedido
                    <span class="bold">000{{ state.pedido.id }}</span
                    >.
                  </p>
                  <p>
                    Pagamento via
                    <span class="bold">{{ state.pedido.tipo_pagamento }}</span
                    >.
                  </p>
                  <p>
                    Tipo de Entrega
                    <span class="bold">{{ state.pedido.tipo_frete }}</span
                    >.
                  </p>
                  <p v-if="state.pedido.estimativa_entrega">
                    Prazo de Entrega
                    <span class="bold">{{
                      state.pedido.estimativa_entrega
                    }}</span>
                    dias úteis.
                  </p>
                  <!-- Valor Total
                {{ state.pedido.valor_total }} -->
                </div>
              </div>
            </div>

            <div class="row" v-if="state.pedido.tipo_pagamento == 'BOLETO'">
              <div class="col-sm-3">
                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  "
                >
                  <a
                    :href="state.pedido.pdf"
                    style="width: 100%; text-align: center"
                    >{{ state.pedido.pix_qr_code }}
                    <!-- <img
                      src="/images/site/pdf.png"
                      style="width: 80%; margin-left: 5%"
                    /> -->
                    <p style="color: #000; text-decoration: none">
                      Download do boleto
                    </p>
                  </a>
                </div>
              </div>
              <div class="col-sm-9">
                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                  "
                >
                  <p class="bold">Instruções</p>

                  <p>
                    Boleto Gerado: Você pode imprimi-lo ou salvá-lo em PDF para
                    pagamento.
                  </p>

                  <p>
                    Como Pagar: O boleto pode ser pago em qualquer agência
                    bancária, casa lotérica ou pelo internet banking.
                  </p>

                  <p>
                    Prazo de Pagamento: Verifique a data de vencimento no boleto
                    para evitar atrasos. O prazo de pagamento geralmente é de 1
                    a 3 dias úteis.
                  </p>

                  <p>
                    Confirmação do Pagamento: A compensação pode levar até 3
                    dias úteis. Você será notificado por e-mail quando o
                    pagamento for confirmado, e seu pedido será liberado para
                    envio.
                  </p>

                  <p>
                    Lembre-se de pagar dentro do prazo para garantir a rápida
                    liberação do seu pedido. Se o boleto vencer, será necessário
                    refazer a compra para gerar um novo boleto.
                  </p>

                  <p>
                    1. Abra o app do seu banco ou instituição financeira e entre
                    na Área PIX.
                  </p>
                  <p>
                    2. Escolha a opção Pagar com QR Code ou Pix Copia e Cola.3.
                  </p>
                  <p>Confira os dados do pagamento, confirme e pronto!</p>
                </div>

                <div
                  class="div_qr_code"
                  style="
                    border: #f2f2f2 solid 1px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px #f2f2f2;
                    margin-top: 10px;
                  "
                >
                  <p class="bold">Pedido</p>
                  <p>Detalhes do pedido</p>
                  <p>Pedido 0000{{ state.pedido.id }}</p>
                  <p>Pagamento {{ state.pedido.tipo_pagamento }}</p>
                  <p>Valor Total {{ state.pedido.valor_total }}</p>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%; text-align: center">
            <a href="/">
              <button
                type="button"
                class="btn btn-success"
                style="padding: 10px 20px; font-size: 20pt; margin-top: 10px"
              >
                Voltar para Home
              </button>
            </a>
          </div>
        </div>
      </section>
      <bot />
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from "vue";
import services from "@/services/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    definePageMeta({
      layout: "blank",
      middleware: "client",
    });

    useHead({
      title: "Casa Bonita Eletros - Finalizar Pedido",
    });

    // const router = useRouter();
    const carrinhoStore = useCarrinhoStore();
    const { itens, valores_produtos, pedido } = storeToRefs(carrinhoStore);
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    console.log(pedido.value);
    const state = reactive({
      endereco: { cliente: {} },
      id_endereco: "",
      dados: {
        enderecos: [{ cidades: { estado: {}, estado_id: "" } }],
        cidade_id: "",
      },
      carrinho: {
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      produtos: [],
      pedidoEmAndamento: false,
      loader: false,

      pedido: {},
      qr_code: "",
    });

    onMounted(() => {
      state.pedido = pedido.value;
      console.log(pedido.value);
      state.carrinho.valor_frete = 0;
      state.carrinho.valor_total_desconto =
        valores_produtos.value.total_desconto;
      state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
      state.carrinho.valor_produtos = valores_produtos.value.total;
      state.carrinho.valor_total =
        valores_produtos.value.total + state.carrinho.valor_frete;
      state.produtos = itens;
    });

    function abrirModal() {
      state.modalOpen = true;
    }
    function fecharModal() {
      state.modalOpen = false;
    }

    async function copiarTexto() {
      try {
        // Copia o texto para a área de transferência
        await navigator.clipboard.writeText(state.pedido.pix_code);
        alert("Código Pix copiado com sucesso");
        // Reseta a mensagem após 2 segundos
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch (err) {
        console.error("Falha ao copiar: ", err);
      }
    }

    return {
      fecharModal,
      abrirModal,
      state,
      copiarTexto,
    };
  },
};
</script>
<style scoped>
.sct_finalizar {
  margin-top: 30px;
}
.bold {
  font-weight: bold;
}
</style>

