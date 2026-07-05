<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div class="container">
      <div class="content">
        <h1>Sobre a Casa Bonita Eletros</h1>
        <p v-html="state.empresa.sobre_nos"></p>
        <div class="mt-12">
          <div class="row">
            <div class="col-lg-3 col-6">
              <div class="icon_div">
                <div>
                  <!-- <img src="/images/site/icon1.png" alt="Icon1" /> -->
                </div>
                <div class="content_i">
                  <p>PARCELAMOS NO CARTÃO</p>
                  <span>Em todos os cartões de crédito</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="icon_div">
                <div>
                  <!-- <img src="/images/site/icon2.png" alt="Icon2" /> -->
                </div>
                <div class="content_i">
                  <p>PAGUE NO PIX</p>
                  <span>E ganhe 5% de desconto</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="icon_div">
                <div>
                  <!-- <img src="/images/site/icon3.png" alt="Icon3" /> -->
                </div>
                <div class="content_i">
                  <p>RETIRE NA LOJA OU MOTOTAXI</p>
                  <span>Para moradores de Maringá</span>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="icon_div">
                <div>
                  <!-- <img src="/images/site/icon4.png" alt="Icon4" /> -->
                </div>
                <div class="content_i">
                  <p>SITE SEGURO</p>
                  <span>Protegemos seus dados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="state.empresa.facebook || state.empresa.instagram || state.empresa.twitter"
      class="div_social_color"
    >
      <h3>Siga-nos nas redes sociais:</h3>
      <a v-if="state.empresa.instagram" :href="state.empresa.instagram" target="_blank"
        ><i class="bi bi-instagram social-icon"></i
      ></a>
      <a v-if="state.empresa.facebook" :href="state.empresa.facebook" target="_blank">
        <i class="bi bi-facebook social-icon"></i>
      </a>
      <a v-if="state.empresa.twitter" :href="state.empresa.twitter" target="_blank">
        <i class="bi bi-twitter social-icon"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { reactive } from "vue";
import services from "@/services/axios";
export default {
  setup() {
    const storage = useClienteAuthStore();
    const { carregarEmpresaSite } = useSiteData();
    const state = reactive({
      empresa: {},
      client_nome: null,
      client_token: null,
    });
    state.client_token = storage.client_token;
    state.client_nome = storage.client_nome;

    verificaLogin();

    onMounted(() => {
      fetchEmpresa();
    });

    async function fetchEmpresa() {
      try {
        state.empresa = await carregarEmpresaSite();
      } catch (error) {
        console.log(error);
      }
    }

    async function verificaLogin() {
      await services.login
        .verificaTokenClientes({ client_token: storage.client_token })
        .catch(() => {
          state.client_nome = null;
          state.client_token = null;
          storage.client_token = null;
          storage.client_nome = null;
        });
    }

    return {
      state,
    };
  },
};

definePageMeta({
  layout: "site",
});
</script>

<style scoped>
.content h1 {
  font-family: "Livvic", sans-serif;
  color: var(--primary);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-align: left;
}

.content p {
  font-family: "Montserrat", sans-serif;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.icon_div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content_i {
  margin-left: 1rem;
  line-height: 1.2;
}

.content_i p {
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
  color: #252b42;
  font-family: "Montserrat";
}

.content_i span {
  margin-bottom: 0;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
  font-family: "Montserrat";
}

.div_social_color {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  padding: 20px 0;
}

.div_social_color h3 {
  font-family: "Livvic", sans-serif;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-align: center;
  margin-right: 1rem;
}

.social-icon {
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin: 0 10px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  font-size: 25px;
  transition: background-color 0.3s, color 0.3s;
}

.social-icon:hover {
  background-color: #fff;
  color: #000;
}
</style>

