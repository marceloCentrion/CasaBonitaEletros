<template>
  <div class="auth_page container">
    <aside class="auth_visual" aria-hidden="true">
      <NuxtImg
        src="/images/loginImage.png"
        alt="Cozinha moderna com refrigerador"
        class="auth_visual_img"
      />
      <div class="auth_visual_overlay">
        <div class="auth_visual_content">
          <span class="auth_visual_tag">SUA COZINHA COMEÇA AQUI</span>
          <h2 class="auth_visual_title">Bem-vindo à Casa Bonita Eletros</h2>
          <p class="auth_visual_desc">
            Entre ou crie sua conta para explorar eletrodomésticos<br />
            que unem design e tecnologia.
          </p>
        </div>
      </div>
    </aside>

    <main class="auth_form_panel">
      <div class="auth_form_wrapper">
        <nav class="auth_tabs mx-auto" aria-label="Tipo de acesso">
          <button
            class="auth_tab"
            :class="{ 'auth_tab--active': abaAtiva === 'login' }"
            @click="irParaLogin"
          >
            Login
          </button>
          <button
            class="auth_tab"
            :class="{ 'auth_tab--active': abaAtiva === 'cadastro' }"
            @click="irParaCadastro"
          >
            Criar Conta
          </button>
        </nav>

        <div v-if="abaAtiva === 'login'" class="auth_section">
          <div class="auth_heading text-center">
            <h1 class="auth_title">Acesse sua conta</h1>
            <p class="auth_subtitle">
              Entre para acompanhar seus pedidos, salvar produtos favoritos e
              ter uma experiência de compra mais rápida.
            </p>
          </div>

          <form novalidate class="auth_fields" @submit.prevent="handleLogin">
            <BaseInput
              id="login_email"
              v-model="loginForm.email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              autocomplete="email"
              required
              :is-invalid="
                (loginValidated && !emailValido(loginForm.email)) ||
                loginErroCredenciais
              "
              :is-valid="
                loginValidated &&
                emailValido(loginForm.email) &&
                !loginErroCredenciais
              "
              :error-message="
                loginForm.email ? 'E-mail inválido.' : 'Preencha o e-mail.'
              "
            />

            <div class="auth_field_group">
              <label class="auth_label" for="login_senha">Senha</label>
              <div class="auth_input_wrap">
                <input
                  id="login_senha"
                  v-model="loginForm.senha"
                  :type="mostrarSenhaLogin ? 'text' : 'password'"
                  class="auth_input"
                  :class="{
                    'auth_input--invalid':
                      (loginValidated && !loginForm.senha) ||
                      loginErroCredenciais,
                    'auth_input--valid':
                      loginValidated &&
                      !!loginForm.senha &&
                      !loginErroCredenciais,
                  }"
                  placeholder="Digite sua senha"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="auth_eye_btn"
                  @click="mostrarSenhaLogin = !mostrarSenhaLogin"
                  :aria-label="
                    mostrarSenhaLogin ? 'Ocultar senha' : 'Mostrar senha'
                  "
                >
                  <i
                    class="bi"
                    :class="mostrarSenhaLogin ? 'bi-eye-slash' : 'bi-eye'"
                  />
                </button>
              </div>
              <span
                v-if="
                  (loginValidated && !loginForm.senha) || loginErroCredenciais
                "
                class="auth_input_error"
              >
                {{
                  loginErroCredenciais
                    ? "E-mail ou senha incorretos."
                    : "Preencha a senha."
                }}
              </span>
            </div>

            <a href="/esqueci-minha-senha" class="auth_forgot"
              >Esqueceu sua senha?</a
            >

            <SecButton type="submit" :disabled="loginCarregando">
              {{ loginCarregando ? "Entrando..." : "Entrar" }}
            </SecButton>

            <p class="auth_switch">
              Ainda não tem uma conta?
              <NuxtLink
                to="#"
                class="auth_switch_link"
                @click.prevent="irParaCadastro"
              >
                Criar conta
              </NuxtLink>
            </p>
          </form>
        </div>

        <template v-if="abaAtiva === 'cadastro'">
          <div class="auth_heading text-center">
            <h1 class="auth_title text-center">Crie sua conta</h1>
            <p class="auth_subtitle">
              Cadastre-se para acompanhar pedidos, salvar seus produtos
              favoritos e receber novidades exclusivas.
            </p>
          </div>

          <div class="cad_step_pill">
            <i class="bi" :class="stepIconClass" aria-hidden="true" />
            <span>{{ stepLabel }}</span>
          </div>

          <form
            v-if="cadastroStep === 1"
            novalidate
            class="auth_fields"
            @submit.prevent="avancarPasso1"
          >
            <BaseInput
              id="cad_email"
              v-model="cadastroForm.email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              autocomplete="email"
              required
              :is-invalid="cad1Validated && !emailValido(cadastroForm.email)"
              :is-valid="cad1Validated && emailValido(cadastroForm.email)"
              :error-message="
                cadastroForm.email ? 'E-mail inválido.' : 'Preencha o e-mail.'
              "
            />

            <BaseInput
              id="cad_email_conf"
              v-model="cadastroForm.emailConfirmacao"
              type="email"
              label="Confirmar e-mail"
              placeholder="Confirme seu e-mail"
              autocomplete="email"
              required
              :is-invalid="cad1Validated && !emailsIguais"
              :is-valid="cad1Validated && emailsIguais"
              :error-message="
                !cadastroForm.emailConfirmacao
                  ? 'Confirme o e-mail.'
                  : 'Os e-mails não coincidem.'
              "
            />

            <div class="auth_field_group">
              <label class="auth_label" for="cad_senha">Crie sua senha</label>
              <div class="auth_input_wrap">
                <input
                  id="cad_senha"
                  v-model="cadastroForm.senha"
                  :type="mostrarSenhaCad ? 'text' : 'password'"
                  class="auth_input"
                  :class="{
                    'auth_input--invalid':
                      cad1Validated && !senhaValida(cadastroForm.senha),
                    'auth_input--valid':
                      cad1Validated && senhaValida(cadastroForm.senha),
                  }"
                  placeholder="Mínimo 8 caracteres"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  class="auth_eye_btn"
                  @click="mostrarSenhaCad = !mostrarSenhaCad"
                  :aria-label="
                    mostrarSenhaCad ? 'Ocultar senha' : 'Mostrar senha'
                  "
                >
                  <i
                    class="bi"
                    :class="mostrarSenhaCad ? 'bi-eye-slash' : 'bi-eye'"
                  />
                </button>
              </div>
              <span
                v-if="cad1Validated && !senhaValida(cadastroForm.senha)"
                class="auth_input_error"
              >
                {{
                  !cadastroForm.senha
                    ? "Crie uma senha."
                    : "A senha deve ter pelo menos 8 caracteres."
                }}
              </span>
            </div>

            <div class="auth_field_group">
              <label class="auth_label" for="cad_senha_conf"
                >Confirmar senha</label
              >
              <div class="auth_input_wrap">
                <input
                  id="cad_senha_conf"
                  v-model="cadastroForm.senhaConfirmacao"
                  :type="mostrarSenhaConfCad ? 'text' : 'password'"
                  class="auth_input"
                  :class="{
                    'auth_input--invalid': cad1Validated && !senhasIguais,
                    'auth_input--valid': cad1Validated && senhasIguais,
                  }"
                  placeholder="Repita sua senha"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  class="auth_eye_btn"
                  @click="mostrarSenhaConfCad = !mostrarSenhaConfCad"
                  :aria-label="
                    mostrarSenhaConfCad ? 'Ocultar senha' : 'Mostrar senha'
                  "
                >
                  <i
                    class="bi"
                    :class="mostrarSenhaConfCad ? 'bi-eye-slash' : 'bi-eye'"
                  />
                </button>
              </div>
              <span
                v-if="cad1Validated && !senhasIguais"
                class="auth_input_error"
              >
                {{
                  !cadastroForm.senhaConfirmacao
                    ? "Confirme a senha."
                    : "As senhas não coincidem."
                }}
              </span>
            </div>

            <SecButton type="submit">Avançar</SecButton>

            <p class="auth_switch">
              Já tem uma conta?
              <a href="#" class="auth_switch_link" @click.prevent="irParaLogin"
                >Entrar</a
              >
            </p>
          </form>

          <form
            v-if="cadastroStep === 2"
            novalidate
            class="auth_fields"
            @submit.prevent="avancarPasso2"
          >
            <div
              class="cad_radio_group"
              role="radiogroup"
              aria-label="Tipo de pessoa"
            >
              <label class="cad_radio_label">
                <input
                  type="radio"
                  v-model="cadastroForm.tipoPessoa"
                  value="FISICA"
                  class="cad_radio_input"
                />
                <span>Pessoa Física</span>
              </label>
              <label class="cad_radio_label">
                <input
                  type="radio"
                  v-model="cadastroForm.tipoPessoa"
                  value="JURIDICA"
                  class="cad_radio_input"
                />
                <span>Pessoa Jurídica</span>
              </label>
            </div>

            <BaseInput
              id="cad_nome"
              v-model="cadastroForm.nome"
              type="text"
              label="Nome completo"
              placeholder="Digite seu nome"
              autocomplete="name"
              required
              :is-invalid="cad2Validated && !cadastroForm.nome.trim()"
              :is-valid="cad2Validated && !!cadastroForm.nome.trim()"
              error-message="Preencha o nome completo."
            />

            <BaseInput
              id="cad_cpf"
              v-model="cadastroForm.cpf"
              v-mask-cpf
              type="text"
              :label="cadastroForm.tipoPessoa === 'JURIDICA' ? 'CNPJ' : 'CPF'"
              :placeholder="
                cadastroForm.tipoPessoa === 'JURIDICA'
                  ? 'Digite seu CNPJ'
                  : 'Digite seu CPF'
              "
              required
              :is-invalid="
                cad2Validated &&
                !docValido(cadastroForm.cpf, cadastroForm.tipoPessoa)
              "
              :is-valid="
                cad2Validated &&
                docValido(cadastroForm.cpf, cadastroForm.tipoPessoa)
              "
              :error-message="
                !cadastroForm.cpf
                  ? cadastroForm.tipoPessoa === 'JURIDICA'
                    ? 'Preencha o CNPJ.'
                    : 'Preencha o CPF.'
                  : cadastroForm.tipoPessoa === 'JURIDICA'
                    ? 'CNPJ inválido.'
                    : 'CPF inválido.'
              "
            />

            <div class="auth_row">
              <BaseInput
                id="cad_celular"
                v-model="cadastroForm.celular"
                v-mask-phone.br
                type="tel"
                label="Celular"
                placeholder="(00) 00000-0000"
                autocomplete="tel"
                required
                :is-invalid="
                  cad2Validated && !celularValido(cadastroForm.celular)
                "
                :is-valid="cad2Validated && celularValido(cadastroForm.celular)"
                :error-message="
                  !cadastroForm.celular
                    ? 'Preencha o celular.'
                    : 'Celular inválido.'
                "
              />

              <BaseInput
                id="cad_telefone"
                v-model="cadastroForm.telefone"
                v-mask-phone.br
                type="tel"
                label="Telefone fixo"
                placeholder="(00) 0000-0000"
              />
            </div>

            <div class="auth_row">
              <div class="auth_field_group">
                <label class="auth_label" for="cad_sexo">Sexo</label>
                <div class="auth_select_wrap">
                  <select
                    id="cad_sexo"
                    v-model="cadastroForm.sexo"
                    class="auth_input auth_select"
                    required
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                    <option value="nao_informar">Prefiro não informar</option>
                  </select>
                  <i
                    class="bi bi-chevron-down auth_select_icon"
                    aria-hidden="true"
                  />
                </div>
                <div
                  v-if="cad2Validated && !cadastroForm.sexo"
                  class="auth_select_error"
                >
                  Selecione o sexo.
                </div>
              </div>

              <BaseInput
                id="cad_nascimento"
                v-model="cadastroForm.dataNascimento"
                type="date"
                label="Data de nascimento"
                placeholder="DD/MM/AAAA"
                required
                :is-invalid="
                  cad2Validated && !dataValida(cadastroForm.dataNascimento)
                "
                :is-valid="
                  cad2Validated && dataValida(cadastroForm.dataNascimento)
                "
                :error-message="
                  !cadastroForm.dataNascimento
                    ? 'Preencha a data de nascimento.'
                    : 'Use o formato DD/MM/AAAA.'
                "
              />
            </div>

            <div class="auth_btn_row">
              <OutlineButton type="button" @click="cadastroStep = 1"
                >Voltar</OutlineButton
              >
              <SecButton type="submit" :flex="true">Avançar</SecButton>
            </div>

            <p class="auth_switch">
              Já tem uma conta?
              <a href="#" class="auth_switch_link" @click.prevent="irParaLogin"
                >Entrar</a
              >
            </p>
          </form>

          <form
            v-if="cadastroStep === 3"
            novalidate
            class="auth_fields"
            @submit.prevent="handleCadastro"
          >
            <BaseInput
              id="cad_cep"
              v-model="cadastroForm.cep"
              v-mask-cep
              type="text"
              label="CEP"
              placeholder="00000-000"
              required
              :is-invalid="cad3Validated && !cepValido(cadastroForm.cep)"
              :is-valid="cad3Validated && cepValido(cadastroForm.cep)"
              :error-message="
                !cadastroForm.cep ? 'Preencha o CEP.' : 'CEP inválido.'
              "
            />

            <BaseInput
              id="cad_endereco"
              v-model="cadastroForm.endereco"
              type="text"
              label="Endereço"
              placeholder="Digite seu endereço"
              autocomplete="street-address"
              required
              :is-invalid="cad3Validated && !cadastroForm.endereco.trim()"
              :is-valid="cad3Validated && !!cadastroForm.endereco.trim()"
              error-message="Preencha o endereço."
            />

            <div class="auth_row">
              <BaseInput
                id="cad_numero"
                v-model="cadastroForm.numero"
                type="text"
                label="Número"
                placeholder="Ex: 126"
                required
                :is-invalid="cad3Validated && !cadastroForm.numero.trim()"
                :is-valid="cad3Validated && !!cadastroForm.numero.trim()"
                error-message="Preencha o número."
              />

              <BaseInput
                id="cad_complemento"
                v-model="cadastroForm.complemento"
                type="text"
                label="Complemento"
                placeholder="Ex: Casa"
              />
            </div>

            <BaseInput
              id="cad_referencia"
              v-model="cadastroForm.referencia"
              type="text"
              label="Ponto de Referência"
              placeholder="Ex: Próximo à Igreja Matriz"
            />

            <BaseInput
              id="cad_bairro"
              v-model="cadastroForm.bairro"
              type="text"
              label="Bairro"
              placeholder="Digite seu bairro"
              required
              :is-invalid="cad3Validated && !cadastroForm.bairro.trim()"
              :is-valid="cad3Validated && !!cadastroForm.bairro.trim()"
              error-message="Preencha o bairro."
            />

            <div class="auth_row_address">
              <div class="auth_field_group">
                <label class="auth_label" for="cad_estado">Estado</label>
                <div class="auth_select_wrap">
                  <select
                    id="cad_estado"
                    v-model="cadastroForm.estado"
                    class="auth_input auth_select"
                    :class="{
                      'auth_input--invalid':
                        cad3Validated && !cadastroForm.estado,
                      'auth_input--valid':
                        cad3Validated && !!cadastroForm.estado,
                    }"
                  >
                    <option value="" disabled>UF</option>
                    <option
                      v-for="est in estados"
                      :key="est.id"
                      :value="est.uf"
                    >
                      {{ est.uf }}
                    </option>
                  </select>
                  <i
                    class="bi bi-chevron-down auth_select_icon"
                    aria-hidden="true"
                  />
                </div>
                <span
                  v-if="cad3Validated && !cadastroForm.estado"
                  class="auth_input_error"
                >
                  Obrigatório.
                </span>
              </div>

              <div class="auth_field_group">
                <label class="auth_label" for="cad_cidade">Cidade</label>
                <div class="auth_select_wrap">
                  <select
                    id="cad_cidade"
                    v-model="cadastroForm.cidade"
                    class="auth_input auth_select"
                    :class="{
                      'auth_input--invalid':
                        cad3Validated && !cadastroForm.cidade,
                      'auth_input--valid':
                        cad3Validated && !!cadastroForm.cidade,
                    }"
                    :disabled="!cadastroForm.estado"
                  >
                    <option value="" disabled>Selecione</option>
                    <option
                      v-for="cid in cidadesFiltradas"
                      :key="cid.id"
                      :value="cid.id"
                    >
                      {{ cid.nome }}
                    </option>
                  </select>
                  <i
                    class="bi bi-chevron-down auth_select_icon"
                    aria-hidden="true"
                  />
                </div>
                <span
                  v-if="cad3Validated && !cadastroForm.cidade"
                  class="auth_input_error"
                >
                  Preencha a cidade.
                </span>
              </div>
            </div>

            <p v-if="erroCadastro" class="auth_error">{{ erroCadastro }}</p>

            <div class="auth_btn_row">
              <OutlineButton type="button" @click="cadastroStep = 2"
                >Voltar</OutlineButton
              >
              <SecButton
                type="submit"
                :flex="true"
                :disabled="cadastroCarregando"
              >
                {{ cadastroCarregando ? "Criando conta..." : "Criar conta" }}
              </SecButton>
            </div>

            <p class="auth_switch">
              Já tem uma conta?
              <a href="#" class="auth_switch_link" @click.prevent="irParaLogin"
                >Entrar</a
              >
            </p>
          </form>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast";
import services from "@/services/axios";
const clienteAuth = useClienteAuthStore();

const toast = useToast();

useHead({ title: "Casa Bonita Eletros - Login" });
definePageMeta({ layout: "site" });

const router = useRouter();
const authStore = useAuthStore();

const abaAtiva = ref("login");
const cadastroStep = ref(1);
const loginCarregando = ref(false);
const cadastroCarregando = ref(false);

const loginValidated = ref(false);
const cad1Validated = ref(false);
const cad2Validated = ref(false);
const cad3Validated = ref(false);

const loginErroCredenciais = ref(false);
const erroCadastro = ref("");

const mostrarSenhaLogin = ref(false);
const mostrarSenhaCad = ref(false);
const mostrarSenhaConfCad = ref(false);

const loginForm = reactive({ email: "", senha: "" });

const cadastroForm = reactive({
  email: "",
  emailConfirmacao: "",
  senha: "",
  senhaConfirmacao: "",
  tipoPessoa: "FISICA",
  nome: "",
  cpf: "",
  celular: "",
  telefone: "",
  sexo: "",
  dataNascimento: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  referencia: "",
  bairro: "",
  estado: "",
  cidade: "" as number | "",
});

interface Estado {
  id: number;
  nome: string;
  uf: string;
  codigo_uf: number;
}

interface Cidade {
  id: number;
  nome: string;
  codigo_ibge: number;
  estado_id: number;
  estado: Estado;
}

const cidades = ref<Cidade[]>([]);
const estados = ref<Estado[]>([]);

onMounted(() => {
  (fetchCidades(), fetchEstados());
});

const cidadesFiltradas = computed(() => {
  if (!cadastroForm.estado) return [];
  return cidades.value.filter((c) => c.estado.uf === cadastroForm.estado);
});

watch(
  () => cadastroForm.estado,
  () => {
    cadastroForm.cidade = "";
  },
);

const fetchCidades = async () => {
  try {
    const { data } = await services.endereco.getCidade();
    cidades.value = data;
  } catch (error) {
    console.error(error);
    toast.error(
      "Ocorreu um erro ao buscar as cidades. Por favor, tente novamente mais tarde",
    );
  }
};

const fetchEstados = async () => {
  try {
    const { data } = await services.endereco.getEstados();
    estados.value = data;
  } catch (error) {
    console.error(error);
    toast.error(
      "Ocorreu um erro ao buscar os estados. Por favor, tente novamente mais tarde",
    );
  }
};

const emailsIguais = computed(
  () =>
    !!cadastroForm.emailConfirmacao &&
    cadastroForm.email === cadastroForm.emailConfirmacao,
);

const senhasIguais = computed(
  () =>
    !!cadastroForm.senhaConfirmacao &&
    cadastroForm.senha === cadastroForm.senhaConfirmacao,
);

const stepLabel = computed(() => {
  if (cadastroStep.value === 1) return "DADOS PARA ACESSO";
  if (cadastroStep.value === 2) return "DADOS PESSOAIS";
  return "ENDEREÇO";
});

const stepIconClass = computed(() => {
  if (cadastroStep.value === 1) return "bi-envelope";
  if (cadastroStep.value === 2) return "bi-person";
  return "bi-geo-alt";
});

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const senhaValida = (v: string) => v.length >= 8;
const dataValida = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
const celularValido = (v: string) => v.replace(/\D/g, "").length >= 10;
const cepValido = (v: string) => v.replace(/\D/g, "").length === 8;
const docValido = (v: string, tipo: string) => {
  const digits = v.replace(/\D/g, "");
  return tipo === "JURIDICA" ? digits.length === 14 : digits.length === 11;
};

function irParaLogin() {
  abaAtiva.value = "login";
  cadastroStep.value = 1;
  loginValidated.value = false;
  loginErroCredenciais.value = false;
  mostrarSenhaLogin.value = false;
}

function irParaCadastro() {
  abaAtiva.value = "cadastro";
  cadastroStep.value = 1;
  cad1Validated.value = false;
  mostrarSenhaCad.value = false;
  mostrarSenhaConfCad.value = false;
}

async function handleLogin() {
  loginValidated.value = true;
  loginErroCredenciais.value = false;

  if (!emailValido(loginForm.email) || !loginForm.senha) {
    toast.error("Preencha todos os campos corretamente.");
    return;
  }

  loginCarregando.value = true;
  try {
    const { data, errors } = await services.login.logarCliente({
      email: loginForm.email,
      password: loginForm.senha,
    });

    if (errors || !data?.token) {
      loginErroCredenciais.value = true;
      toast.error("E-mail ou senha incorretos.");
      return;
    }

    clienteAuth.client_token = data.token;
    clienteAuth.client_id = String(data.id);
    clienteAuth.client_nome = data.nome;

    toast.success("Login realizado com sucesso!");
    await router.push("/");
  } catch (e) {
    toast.error("Erro ao fazer login. Tente novamente.");
    loginErroCredenciais.value = true;
  } finally {
    loginCarregando.value = false;
  }
}

function avancarPasso1() {
  cad1Validated.value = true;
  if (
    !emailValido(cadastroForm.email) ||
    !emailsIguais.value ||
    !senhaValida(cadastroForm.senha) ||
    !senhasIguais.value
  ) {
    toast.error("Preencha todos os campos corretamente.");
    return;
  }
  cadastroStep.value = 2;
}

function avancarPasso2() {
  cad2Validated.value = true;
  erroCadastro.value = "";
  if (
    !cadastroForm.nome.trim() ||
    !docValido(cadastroForm.cpf, cadastroForm.tipoPessoa) ||
    !celularValido(cadastroForm.celular) ||
    !cadastroForm.sexo ||
    !dataValida(cadastroForm.dataNascimento)
  ) {
    toast.error("Preencha todos os campos corretamente.");
    return;
  }
  cadastroStep.value = 3;
}

async function handleCadastro() {
  cad3Validated.value = true;
  erroCadastro.value = "";

  if (
    !cepValido(cadastroForm.cep) ||
    !cadastroForm.endereco.trim() ||
    !cadastroForm.numero.trim() ||
    !cadastroForm.bairro.trim() ||
    !cadastroForm.estado.trim() ||
    !cadastroForm.cidade
  ) {
    toast.error("Preencha todos os campos obrigatórios.");
    return;
  }

  cadastroCarregando.value = true;
  try {
    const payload = {
      tipo_pessoa: cadastroForm.tipoPessoa,
      nome: cadastroForm.nome,
      email: cadastroForm.email,
      password: cadastroForm.senha,
      cpf: cadastroForm.cpf.replace(/\D/g, ""),
      telefone_principal: cadastroForm.celular.replace(/\D/g, ""),
      telefone_secundario: cadastroForm.telefone.replace(/\D/g, ""),
      sexo: cadastroForm.sexo,
      data_nascimento: cadastroForm.dataNascimento,
      endereco: {
        cep: cadastroForm.cep.replace(/\D/g, ""),
        logradouro: cadastroForm.endereco,
        numero: cadastroForm.numero,
        complemento: cadastroForm.complemento,
        referencia: cadastroForm.referencia,
        bairro: cadastroForm.bairro,
        estado: cadastroForm.estado,
        cidade_id: cadastroForm.cidade,
      },
    };

    const { data } = await services.clientes.novaConta(payload);

    if (!data) {
      toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      erroCadastro.value = "Erro ao criar conta. Tente novamente mais tarde.";
      return;
    }

    toast.success("Conta criada com sucesso! Faça login para continuar.");
    irParaLogin();
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 409) {
      toast.error("Este e-mail já está cadastrado.");
      erroCadastro.value = "Este e-mail já está cadastrado.";
    } else if (status === 422) {
      toast.error("Verifique os dados informados e tente novamente.");
      erroCadastro.value = "Verifique os dados informados e tente novamente.";
    } else {
      toast.error("Erro ao criar conta. Tente novamente mais tarde.");
      erroCadastro.value = "Erro ao criar conta. Tente novamente mais tarde.";
    }
  } finally {
    cadastroCarregando.value = false;
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.auth_page {
  display: grid;
  margin: 2rem auto;
  grid-template-columns: 50% 1fr;
  min-height: 80vh;
  background: #fff;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.auth_visual {
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
}

.auth_visual_img {
  position: absolute;
  border-radius: 1rem;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.auth_visual_overlay {
  position: absolute;
  border-radius: 1rem;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 2.5rem;
}

.auth_visual_content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth_visual_tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #fff;
  width: fit-content;
}

.auth_visual_title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0;
}

.auth_visual_desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.auth_form_panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  overflow-y: auto;
}

.auth_form_wrapper {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth_tabs {
  display: flex;
  gap: 0.5rem;
  background: #f2f2f2;
  border-radius: 999px;
  padding: 4px;
  width: fit-content;
}

.auth_tab {
  padding: 8px 22px;
  border-radius: 999px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &--active {
    background: $primary;
    color: #fff;
    font-weight: 600;
  }

  &:not(.auth_tab--active):hover {
    color: #333;
  }
}

.auth_heading {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.auth_title {
  font-size: 1.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.auth_subtitle {
  font-size: 13.5px;
  color: #666;
  line-height: 1.65;
  margin: 0;
}

.cad_step_pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.07em;
  width: fit-content;

  .bi {
    font-size: 14px;
    color: #555;
  }
}

.auth_section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth_fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth_field_group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.auth_label {
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
}

.auth_input_wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.auth_input {
  width: 100%;
  padding: 11px 40px 11px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #fff;
  transition: border-color 0.2s;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: $primary;
  }

  &--invalid {
    border-color: #dc3545 !important;
  }

  &--valid {
    border-color: #198754 !important;
  }
}

.auth_eye_btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 16px;

  &:hover {
    color: #555;
  }
}

.auth_input_error {
  font-size: 0.8rem;
  color: #dc3545;
}

.auth_select_wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.auth_select {
  appearance: none;
  padding-right: 36px;
  cursor: pointer;
  width: 100%;
}

.auth_select_icon {
  position: absolute;
  right: 13px;
  font-size: 13px;
  color: #999;
  pointer-events: none;
}

.auth_select_error {
  font-size: 0.8rem;
  color: #dc3545;
}

.cad_radio_group {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.cad_radio_label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.cad_radio_input {
  accent-color: $primary;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.auth_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.auth_row_address {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 0.75rem;
}

.auth_forgot {
  font-size: 13px;
  color: #555;
  text-decoration: none;
  width: fit-content;

  &:hover {
    color: $primary;
    text-decoration: underline;
  }
}

.auth_btn_row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.25rem;
}

.auth_error {
  font-size: 13px;
  color: #dc3545;
  text-align: center;
  margin: 0;
}

.auth_switch {
  font-size: 13px;
  color: #666;
  text-align: center;
  margin: 0;
}

.auth_switch_link {
  color: $primary;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 540px) {
  .auth_form_panel {
    padding: 2rem 1.25rem;
    align-items: flex-start;
    padding-top: 2.5rem;
  }

  .auth_title {
    font-size: 1.5rem;
  }

  .auth_row {
    grid-template-columns: 1fr;
  }
}
</style>
