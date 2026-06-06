<template>
  <div>
    <top />
    <section class="pt-12 pb-12" id="sct_1">
      <div class="container">
        <div class="row">
          <div class="col mt-n19">
            <div class="card">
              <div class="row">
                <div class="col-md-6 d-none d-md-block">
                  <div>
                    <!-- <img id="img_conta" src="/images/site/logo_prit.png" alt="Imagem de Login" /> -->
                  </div>
                </div>
                <div class="col-md-6">
                  <form class="form">
                    <h2>Faça Seu Cadastro</h2>
                    <p>Preencha os campos abaixo para criar uma conta.</p>
                    <div class="row">
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="nome" class="label">Nome <span style="color: red">*</span></label>
                          <input required type="text" name="nome" id="nome" v-model="state.nova_conta.nome" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="tel" class="label">Telefone Principal
                            <span style="color: red">*</span></label>
                          <input required type="text" name="tel" id="tel" v-model="state.nova_conta.telefone_principal"
                            v-maska data-maska="[ '(##) ####-####','(##) # ####-####' ]" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="email" class="label">E-mail <span style="color: red">*</span></label>
                          <input required type="email" name="email" id="email"
                            v-model="state.nova_conta.email" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="senha" class="label">Senha <span style="color: red">*</span></label>
                          <input required type="password" name="senha" id="senha"
                            v-model="state.nova_conta.password" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="nascimento" class="label">Data de Nascimento
                            <span style="color: red">*</span></label>
                          <input required type="text" name="nascimento" id="nascimento"
                            v-model="state.nova_conta.data_nascimento" v-maska data-maska="##/##/####" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="nascimento" class="label">Pessoa <span style="color: red">*</span></label>
                          <select v-model="state.nova_conta.tipo_pessoa">
                            <option value="FISICA">Fisíca</option>
                            <option value="JURIDICA">Jurídica</option>
                          </select>
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span" v-if="state.nova_conta.tipo_pessoa == 'FISICA'">
                          <label for="cpf" class="label">CPF <span style="color: red">*</span></label>
                          <input id="cpf" type="text" v-model="state.nova_conta.cpf" v-maska
                            data-maska="###.###.###-##" />
                        </span>
                        <span class="input-span" v-if="state.nova_conta.tipo_pessoa == 'JURIDICA'">
                          <label for="cnpj" class="label">CNPJ<span style="color: red">*</span></label>
                          <input id="cnpj" type="text" v-model="state.nova_conta.cnpj" v-maska
                            data-maska="##.###.###/####-##" />
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="cep" class="label">CEP <span style="color: red">*</span></label>
                          <input @blur="cepAtributes($event.target.value)" v-maska data-maska="#####-###" required
                            type="text" name="cep" id="cep" v-model="state.nova_conta.endereco.cep" /></span>
                      </div>
                      <div class="col-md-8">
                        <span class="input-span">
                          <label for="endereco" class="label">Logradouro <span style="color: red">*</span></label>
                          <input required type="text" name="endereco" id="endereco"
                            v-model="state.nova_conta.endereco.logradouro" /></span>
                      </div>
                      <div class="col-md-4">
                        <span class="input-span">
                          <label for="num" class="label">Número <span style="color: red">*</span></label>
                          <input required type="text" name="num" id="num"
                            v-model="state.nova_conta.endereco.numero" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="complemento" class="label">Complemento</label>
                          <input required type="text" name="complemento" id="complemento"
                            v-model="state.nova_conta.endereco.complemento" /></span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="bairro" class="label">Bairro <span style="color: red">*</span></label>
                          <input required type="text" name="bairro" id="bairro"
                            v-model="state.nova_conta.endereco.bairro" /></span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="estado" class="label">Estado <span style="color: red">*</span></label>
                          <select v-model="state.nova_conta.endereco.estado_id"
                            @change="getCidades($event.target.value)">
                            <option v-for="estado in state.estados" :key="estado.id" :value="estado.id">
                              {{ estado.nome }}
                            </option>
                          </select>
                        </span>
                      </div>
                      <div class="col-md-6">
                        <span class="input-span">
                          <label for="cidade" class="label">Cidade <span style="color: red">*</span></label>
                          <select v-model="state.nova_conta.endereco.cidade_id">
                            <option v-for="cidade in state.cidades" :key="cidade.id" :value="cidade.id">
                              {{ cidade.nome }}
                            </option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <span class="span"><a target="_blank" href="/politicas-de-privacidade"
                        title="Politicas de Privacidade">Politicas de Privacidade</a></span>
                    <button class="submit btn-entrar" type="button" title="Criar Conta" @click="novaConta()">
                      FINALIZAR CADASTRO
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <loader :loader="state.loader" />
      </div>
    </section>
  </div>
</template>

<script setup>
import services from "@/services/axios";
definePageMeta({
  layout: "site",
});
onMounted(() => {
  getEstados();
});

const router = useRouter();
const state = reactive({
  loader: false,
  nova_conta: {
    nome: null,
    telefone_principal: null,
    telefone_alternativo: null,
    email: null,
    numero: null,
    password: null,
    data_nascimento: null,
    tipo_pessoa: "FISICA",
    cpf: null,
    cnpj: null,
    endereco: {
      logradouro: null,
      bairro: null,
      cep: null,
      cidade: null,
      cidade_id: null,
      estado: null,
      estado_id: null,
      uf: null,
      ibge: null,
    },
  },
});
async function cepAtributes(cep) {
  cep = cep.replace("-", "").replace(".", "");
  await services.cep.apiCep(cep).then((res) => {
    state.nova_conta.endereco.logradouro = res.data.logradouro;
    state.nova_conta.endereco.bairro = res.data.bairro;
    state.nova_conta.endereco.cidade = res.data.localidade;
    state.nova_conta.endereco.uf = res.data.uf;
    state.nova_conta.endereco.ibge = res.data.ibge;
  });
  getCityByCode(state.nova_conta.endereco.ibge);
}
async function getCidades(estado_id) {
  try {
    const { data } = await services.endereco.getCidade(estado_id);
    state.cidades = data;
  } catch (error) {
    console.log(error);
  }
}
async function novaConta() {
  state.loader = true;
  try {
    await services.clientes.novaConta(state.nova_conta);
    router.push("/login");
    state.loader = false;

  } catch (error) {
    console.log(error);

    let msg = "Ocorreu um erro desconhecido.";
    if (error.response && error.response.data) {
      if (error.response.data.error) {
        msg = error.response.data.error; // Caso seja o formato de erro com `error`.
      } else if (error.response.data.message) {
        msg = error.response.data.message; // Caso seja o formato de erro com `message`.
      }
    }

    state.loader = false;
    alert(msg);
  } finally {
    state.loader = false;
  }

}
async function getEstados() {
  try {
    const { data } = await services.endereco.getEstados();
    state.estados = data;
  } catch (error) {
    console.log(error);
  }
}
async function getCityByCode(cod_ibge) {
  try {
    const { data } = await services.endereco.getCityByCode(cod_ibge);
    state.nova_conta.endereco.estado_id = data.estado_id;
    state.nova_conta.endereco.cidade_id = data.id;
    getCidades(state.nova_conta.endereco.estado_id);
  } catch (error) {
    console.log("aqui:" + error);
  }
}
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 20px;
}

#img_conta {
  width: 100%;
  object-fit: cover;
  height: 56rem;
  border-radius: 20px 0px 0px 20px;
}

form {
  padding: 32px 24px;
}

form h2 {
  font-family: "Poppins", Tahoma;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: var(--primary);
  margin-bottom: 10px;
}

form p {
  font-family: "Poppins", Tahoma;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #737373;
}

form select {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e4e4eb;
  background: #ffffff;
}

form input {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e4e4eb;
  background: #ffffff;
}

form .btn-entrar {
  background: #2F225C;
  padding: 16px 10px;
  width: 100%;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  transition: 0.3s;
}

form .btn-entrar:hover {
  background: #2F225C;
}

form .btn-conta {
  background: var(--primary);
  padding: 16px 10px;
  width: 100%;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #ffffff;
  border-radius: 4px;
  transition: 0.3s;
}

form .btn-conta:hover {
  background: #ad9443;
}

.label {
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  text-align: left;
  color: #343c6a;
}

.span a {
  color: #000000;
}

.spam a:hover {
  color: var(--primary);
}

@media (min-width: 768px) and (max-width: 991px) {
  #img_conta {
    height: 60rem;
  }
}
</style>

