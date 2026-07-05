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
                        src="/logo/logo.svg"
                      />
                    </div>
                  </div>
                  <p class="span_input">Digite sua nova senha.</p>
                  <input
                    id="input_email"
                    type="password"
                    class="form-control"
                    v-model="state.senha_um"
                  />
                  <p class="span_input">Repita sua nova senha.</p>
                  <input
                    id="input_email"
                    type="password"
                    class="form-control"
                    v-model="state.senha_dois"
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
    </section>
  </div>
</template>
<script>
import { reactive } from "vue";
import services from "@/services/axios";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      senha_um: "",
      senha_dois: "",
    });

    const attyear = new Date().getFullYear();

    useHead({
      title: "Casa Bonita Eletros - Recuperar Minha Senha",
    });
    definePageMeta({
      layout: "blank",
    });
    async function sendEmail() {
      await services.clientes
        .sendNewPassword({
          token: router.currentRoute._value.params.token,
          nova_senha: state.senha_um,
          confirmacao_senha: state.senha_dois,
        })
        .then((data) => {
          if (!data.data.status == 200) {
            alert("Falha ao alterar senha!!!");
            return;
          } else {
            alert("Senha alterado com sucesso!!!");
            router.push("/login");
          }
        })
        .catch((error) => {
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              alert(element2);
            });
          });
        });
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
</style>
