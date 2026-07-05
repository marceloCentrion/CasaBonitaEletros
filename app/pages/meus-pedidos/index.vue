<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div style="background: #fcfcfc">
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="title mt-4 mb-4">
              <h2>Pedidos</h2>
            </div>
          </div>
        </div>
        <div class="row" v-if="state.pedidos">
          <div
            class="col-lg-10 offset-lg-1 col-md-10 mb-5"
            v-for="pedido in state.pedidos"
            :key="pedido.id"
          >
            <div class="quad">
              <div class="row">
                <div class="col-lg-6" style="font-weight: bold">
                  {{ pedido.data_escrita }}
                </div>
              </div>
              <hr />
              <div class="d-flex">
                <div
                  class="div_img"
                  v-if="pedido.produtos[0].imagens"
                  style="width: 10%"
                >
                  <img
                    id="img_pedido"
                    :src="pedido.produtos[0].imagens[0].imagem"
                    v-if="pedido.produtos[0].imagens[0]"
                  />
                  <img id="img_pedido" src="/logo/logo.svg" v-else />
                </div>
                <div style="width: 70%; padding-left: 20px">
                  <div>
                    <span class="pedido_status">
                      Código: 000{{ pedido.id }}
                    </span>
                  </div>
                  <span
                    class="pedido_status"
                    :class="state.arrayStatus[pedido.status]"
                  >
                    {{ pedido.status }}
                  </span>
                  <div
                    v-for="(produto, index) in pedido.produtos_pedidos"
                    :key="produto.id"
                  >
                    <a
                      class="div_nome"
                      v-if="index <= 4"
                      target="_blank"
                      :href="'/produto/' + produto.produtos.urn"
                    >
                      {{ produto.produtos.nome }} - {{ produto.quantidade }}
                    </a>
                  </div>
                </div>
                <div style="width: 20%">
                  <a :href="'/meus-pedidos/' + pedido.id">
                    <button class="btn_gold">Ver Pedido</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-10 offset-md-1">
            <h2 style="font-weight: bolder">
              Parece que você não possuí pedidos!
            </h2>
            <div class="mb-5 mt-5">
              <a href="/" class="btn btn-secondary mr-3"
                >Voltar para a página inicial</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from "vue";
import services from "@/services/axios";

export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Meus Pedidos",
    });
    definePageMeta({
      layout: "site",
      middleware: "client",
    });
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

    const state = reactive({
      pedidos: [
        {
          produtos: [
            {
              imagens: [{ imagem: "" }],
            },
          ],
          produtos_pedido: [],
        },
      ],
      client_token: null,
      client_nome: null,
      arrayStatus: {
        PENDENTE: "classe_a",
        ENVIADO: "classe_b",
        CANCELADO: "classe_c",
        ENCERRADO: "classe_d",
      },
    });
    state.client_token = clienteAuthStore.client_token;
    state.client_nome = clienteAuthStore.client_nome;
    onMounted(() => {
      fetchPedidos();
    });
    async function fetchPedidos() {
      try {
        var data = await services.clientes.getMeusPedidos({
          client_token: client_token.value,
          id: client_id.value,
        });
        state.pedidos = data.data;
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
.div_img {
  width: 50px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
}
.pedido_status {
  font-weight: bold;
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

  border-color: #e5e5e5 solid 1px;
  border-radius: 5px;
}

.classe_a {
  color: #f7c35f;
}

.classe_b {
  color: green;
}

.classe_c {
  color: red;
}

.classe_d {
  color: #f7c35f;
}

.div_nome {
  color: #666;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  margin-bottom: 0;
  text-decoration: none;
}
.div_nome:hover {
  color: #000;
}

.btn_gold {
  margin-top: 45px;
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  width: 200px;
  padding: 4px;
  transition: 0.5s;
}

.btn_gold:hover {
  background: var(--primary);
  color: #000;
}

.title h2 {
  color: #000;
  font-size: 32px;
}

@media (min-width: 768px) and (max-width: 991px) {
  #img_pedido {
    height: 50px;
  }

  .btn-red {
    margin-top: auto;
  }
}
</style>
