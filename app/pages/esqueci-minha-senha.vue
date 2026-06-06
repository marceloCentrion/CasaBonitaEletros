<template>
  <div>
    <top />
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="card">
              <div class="linear">
                <form>
                  <div class="row">
                    <div class="div_img_logo">
                      <img
                        alt="Casa Bonita Eletros"
                        src="/logo/blackLogo.svg"
                      />
                    </div>
                  </div>
                  <p class="span_input">
                    Informe o seu e-mail abaixo para receber as instruções de
                    como criar uma nova senha.
                  </p>
                  <input
                    id="input_email"
                    type="email"
                    class="form-control"
                    placeholder="Seu e-mail"
                    v-model="state.email"
                  />
                  <button
                    type="button"
                    class="btn btn-send"
                    title="ENVIAR"
                    @click="sendEmail"
                  >
                    ENVIAR
                  </button>
                  <div class="copy">
                    <p>Casa Bonita Eletros © {{ attyear }} - todos os direitos reservados.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="state.loader" class="overlay">
        <div class="loader"></div>
      </div>
    </section>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  setup() {
    definePageMeta({
      layout: "blank",
    });
    useHead({});
    const state = reactive({
      email: "",
      loader: false,
    });

    const attyear = new Date().getFullYear();

    useHead({
      title: "Casa Bonita Eletros - Recuperar Minha Senha",
    });
    async function sendEmail() {
      state.loader = true;
      await services.clientes
        .sendEmailPassword({
          email: state.email,
        })
        .then((data) => {
          if (!data.data.sucesso) {
            alert("Email não enviado!!!");
            return;
          } else {
            alert("Email  Enviado!!!");
            state.email = "";
            state.loader = false;
          }
        })
        .catch((error) => {
          state.loader = false;
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              alert(element2);
            });
            state.email = "";
          });
        })
        .finally((state.loader = false));
    }
    return {
      state,
      sendEmail,
      attyear,
    };
  },
};
</script>
<style scoped>
section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #69696977;
}

.card {
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.49);
  background-image: url("/images/site/back_pass.jpg");
  background-size: cover;
  height: 80vh;
  border: solid 2px #000;
}

.linear {
  height: 80vh;
  background: #000000d0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.div_img_logo {
  text-align: center;
}

.span_input {
  text-align: center;
  color: #fff;
  font-size: 14pt;
  font-weight: 600;
}

input {
  width: 100%;
  margin-bottom: 1rem;
}

.btn-send {
  background: var(--primary);
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 700;
  color: #313131;
  padding: 6px 20px;
  border-radius: 4px;
  transition: 0.3s;
}

.btn-send:hover {
  background: #a8903f;
}

.copy p {
  text-align: center;
  color: #fff;
  font-size: 12pt;
  font-weight: 500;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  width: 60px;
  height: 60px;
  border: 10px solid #978444;
  border-top-color: #e9b91b;
  animation: spin013151 1s linear infinite;
  border-radius: 100%;
}

@keyframes spin013151 {
  to {
    transform: rotate(360deg);
  }
}
</style>

