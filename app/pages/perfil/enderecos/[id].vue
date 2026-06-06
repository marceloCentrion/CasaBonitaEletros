<template>
  <main id="page_novo_endereco" aria-labelledby="endereco_heading">
    <div class="endereco_container">
      <nav class="breadcrumb" aria-label="Navegação estrutural">
        <ol>
          <li>
            <NuxtLink to="/" class="d-flex align-items-center gap-1">
              <i class="bi bi-house-door" aria-hidden="true"></i>
              <span>Página inicial</span>
            </NuxtLink>
          </li>
          <li aria-hidden="true" class="breadcrumb_sep">›</li>
          <li>
            <NuxtLink to="/perfil">Meu Perfil</NuxtLink>
          </li>
          <li aria-hidden="true" class="breadcrumb_sep">›</li>
          <li aria-current="page">Novo Endereço</li>
        </ol>
      </nav>

      <h1 class="endereco_heading" id="endereco_heading">
        <i class="bi bi-geo-alt" aria-hidden="true"></i>
        Adicionar Endereço
      </h1>

      <div class="endereco_card">
        <div class="endereco_card_header">
          <i class="bi bi-geo-alt" aria-hidden="true"></i>
          <h2>Informações do Endereço</h2>
        </div>

        <div class="endereco_card_body">
          <form @submit.prevent="salvar" novalidate class="endereco_form">
            <div class="form_row form_row--1">
              <div class="form_group">
                <label for="cep">CEP <span class="obrigatorio">*</span></label>

                <div class="input_with_action">
                  <input
                    id="cep"
                    v-model="form.cep"
                    type="text"
                    class="form_input"
                    :class="{ 'form_input--erro': erros.cep }"
                    placeholder="00000-000"
                    maxlength="9"
                    @input="formatarCep"
                    @blur="buscarCep"
                  />

                  <button
                    type="button"
                    class="btn_buscar_cep"
                    @click="buscarCep"
                    :disabled="buscandoCep"
                  >
                    <i v-if="buscandoCep" class="bi bi-arrow-repeat spin"></i>
                    <i v-else class="bi bi-search"></i>
                  </button>
                </div>

                <span v-if="erros.cep" class="form_erro">
                  {{ erros.cep }}
                </span>
              </div>
            </div>

            <div class="form_row form_row--2">
              <div class="form_group">
                <label for="estado"
                  >Estado <span class="obrigatorio">*</span></label
                >

                <div class="select_wrapper">
                  <select
                    id="estado"
                    v-model="form.estado"
                    class="form_select"
                    :class="{ 'form_input--erro': erros.estado }"
                    :disabled="carregandoEstados"
                    @blur="validar('estado')"
                  >
                    <option value="">
                      {{ carregandoEstados ? "Carregando..." : "Selecione" }}
                    </option>

                    <option
                      v-for="est in estados"
                      :key="est.id"
                      :value="est.uf"
                    >
                      {{ est.uf }} — {{ est.nome }}
                    </option>
                  </select>

                  <i
                    v-if="!carregandoEstados"
                    class="bi bi-chevron-down select_icon"
                  ></i>

                  <i v-else class="bi bi-arrow-repeat spin select_icon"></i>
                </div>

                <span v-if="erros.estado" class="form_erro">
                  {{ erros.estado }}
                </span>
              </div>

              <div class="form_group">
                <label for="cidade"
                  >Cidade <span class="obrigatorio">*</span></label
                >

                <div class="select_wrapper">
                  <select
                    id="cidade"
                    v-model="form.cidade"
                    class="form_select"
                    :class="{ 'form_input--erro': erros.cidade }"
                    :disabled="!form.estado || carregandoCidades"
                    @blur="validar('cidade')"
                  >
                    <option value="">
                      <template v-if="carregandoCidades"
                        >Carregando...</template
                      >
                      <template v-else-if="!form.estado">
                        Selecione o estado primeiro
                      </template>
                      <template v-else>Selecione a cidade</template>
                    </option>

                    <option
                      v-for="cid in cidadesFiltradas"
                      :key="cid.id"
                      :value="cid.nome"
                    >
                      {{ cid.nome }}
                    </option>
                  </select>

                  <i
                    v-if="!carregandoCidades"
                    class="bi bi-chevron-down select_icon"
                  ></i>

                  <i v-else class="bi bi-arrow-repeat spin select_icon"></i>
                </div>

                <span v-if="erros.cidade" class="form_erro">
                  {{ erros.cidade }}
                </span>
              </div>
            </div>

            <div class="form_row form_row--3-1">
              <div class="form_group">
                <label for="logradouro">
                  Logradouro <span class="obrigatorio">*</span>
                </label>

                <input
                  id="logradouro"
                  v-model="form.logradouro"
                  type="text"
                  class="form_input"
                  :class="{ 'form_input--erro': erros.logradouro }"
                  placeholder="Rua, Avenida, Travessa..."
                  @blur="validar('logradouro')"
                />

                <span v-if="erros.logradouro" class="form_erro">
                  {{ erros.logradouro }}
                </span>
              </div>

              <div class="form_group">
                <label for="numero">
                  Número <span class="obrigatorio">*</span>
                </label>

                <input
                  id="numero"
                  v-model="form.numero"
                  type="text"
                  class="form_input"
                  :class="{ 'form_input--erro': erros.numero }"
                  placeholder="123"
                  @blur="validar('numero')"
                />

                <span v-if="erros.numero" class="form_erro">
                  {{ erros.numero }}
                </span>
              </div>
            </div>

            <div class="form_row form_row--1">
              <div class="form_group">
                <label for="bairro">
                  Bairro <span class="obrigatorio">*</span>
                </label>

                <input
                  id="bairro"
                  v-model="form.bairro"
                  type="text"
                  class="form_input"
                  :class="{ 'form_input--erro': erros.bairro }"
                  placeholder="Nome do bairro"
                  @blur="validar('bairro')"
                />

                <span v-if="erros.bairro" class="form_erro">
                  {{ erros.bairro }}
                </span>
              </div>
            </div>

            <div class="form_row form_row--2">
              <div class="form_group">
                <label for="complemento">
                  Complemento <span class="opcional">(opcional)</span>
                </label>

                <input
                  id="complemento"
                  v-model="form.complemento"
                  type="text"
                  class="form_input"
                  placeholder="Apto, Bloco..."
                />
              </div>

              <div class="form_group">
                <label for="nome">
                  Identificação <span class="opcional">(opcional)</span>
                </label>

                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  class="form_input"
                  placeholder="Casa, Trabalho..."
                />
              </div>
            </div>

            <div class="form_check_wrapper">
              <label class="form_check" for="principal">
                <input
                  id="principal"
                  v-model="form.principal"
                  type="checkbox"
                  class="form_check_input"
                />

                <span
                  class="form_check_box"
                  :class="{ 'form_check_box--checked': form.principal }"
                >
                  <i class="bi bi-check"></i>
                </span>

                <span class="form_check_label">
                  Definir como endereço principal
                </span>
              </label>
            </div>

            <div v-if="erroGeral" class="form_erro_geral">
              <i class="bi bi-exclamation-circle"></i>
              {{ erroGeral }}
            </div>

            <div class="form_actions">
              <button
                type="button"
                class="btn_cancelar"
                @click="navigateTo('/perfil')"
              >
                Cancelar
              </button>

              <button type="submit" class="btn_salvar" :disabled="salvando">
                <i v-if="salvando" class="bi bi-arrow-repeat spin"></i>
                {{ salvando ? "Salvando..." : "Salvar Endereço" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

definePageMeta({ layout: "site" });
useHead({ title: "Casa Bonita Eletros - Novo Endereço" });

const toast = useToast();

const salvando = ref(false);
const buscandoCep = ref(false);
const carregandoEstados = ref(false);
const carregandoCidades = ref(false);
const erroGeral = ref("");

const form = ref({
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  nome: "",
  principal: false,
});

const erros = ref({
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
});

const estados = ref([]);
const cidades = ref([]);

const cidadesFiltradas = computed(() => {
  if (!form.value.estado) return [];
  return cidades.value.filter((c) => c.estado.uf === form.value.estado);
});

watch(
  () => form.value.estado,
  () => {
    form.value.cidade = "";
  },
);

async function fetchEstados() {
  carregandoEstados.value = true;
  try {
    const { data } = await services.endereco.getEstados();
    estados.value = data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar os estados. Tente novamente.");
  } finally {
    carregandoEstados.value = false;
  }
}

async function fetchCidades() {
  carregandoCidades.value = true;
  try {
    const { data } = await services.endereco.getCidade();
    cidades.value = data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao carregar as cidades. Tente novamente.");
  } finally {
    carregandoCidades.value = false;
  }
}

function validar(campo) {
  erros.value[campo] = "";
  const msgs = {
    cep: "Informe um CEP válido.",
    logradouro: "Informe o logradouro.",
    numero: "Informe o número.",
    bairro: "Informe o bairro.",
    cidade: "Selecione a cidade.",
    estado: "Selecione o estado.",
  };
  const valor = form.value[campo];
  if (!valor || (typeof valor === "string" && !valor.trim())) {
    erros.value[campo] = msgs[campo];
    return false;
  }
  if (campo === "cep" && valor.replace(/\D/g, "").length !== 8) {
    erros.value.cep = "CEP deve ter 8 dígitos.";
    return false;
  }
  return true;
}

function validarTudo() {
  const campos = ["cep", "logradouro", "numero", "bairro", "cidade", "estado"];
  return campos.map(validar).every(Boolean);
}

function formatarCep() {
  let v = form.value.cep.replace(/\D/g, "").substring(0, 8);
  form.value.cep = v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v;
}

async function buscarCep() {
  const cep = form.value.cep.replace(/\D/g, "");
  if (cep.length !== 8) return;

  buscandoCep.value = true;
  erros.value.cep = "";

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      erros.value.cep = "CEP não encontrado.";
      return;
    }

    form.value.logradouro = data.logradouro || form.value.logradouro;
    form.value.bairro = data.bairro || form.value.bairro;

    if (data.uf) {
      form.value.estado = data.uf;

      await nextTick();

      if (data.localidade) {
        const cidadeEncontrada = cidadesFiltradas.value.find(
          (c) => c.nome.toLowerCase() === data.localidade.toLowerCase(),
        );
        form.value.cidade = cidadeEncontrada
          ? cidadeEncontrada.nome
          : data.localidade;
      }
    }
  } catch {
    erros.value.cep = "Não foi possível buscar o CEP.";
  } finally {
    buscandoCep.value = false;
  }
}

async function salvar() {
  erroGeral.value = "";
  if (!validarTudo()) return;

  const client_id = localStorage.getItem("client_id");
  const client_token = localStorage.getItem("client_token");

  if (!client_id || !client_token) {
    return navigateTo("/login");
  }

  salvando.value = true;
  try {
    await services.clientes.adicionarEndereco({
      client_id,
      client_token,
      ...form.value,
      principal: form.value.principal ? "SIM" : "NAO",
    });

    toast.success("Endereço adicionado com sucesso!");
    navigateTo("/perfil");
  } catch (error) {
    erroGeral.value =
      error?.response?.data?.erro ||
      error?.message ||
      "Erro ao salvar o endereço. Tente novamente.";
  } finally {
    salvando.value = false;
  }
}

onMounted(() => {
  const client_token = localStorage.getItem("client_token");
  const client_id = localStorage.getItem("client_id");
  if (!client_token || !client_id) {
    navigateTo("/login");
    return;
  }
  fetchEstados();
  fetchCidades();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_novo_endereco {
  background: #f7f7f8;
  min-height: 80vh;
  padding: 32px 0 80px;
}

.endereco_container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  margin-bottom: 1.5rem;

  ol {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 13px;
  }

  a {
    color: #666;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;

    &:hover {
      color: $primary;
    }
  }

  li[aria-current="page"] {
    color: #111;
    font-weight: 500;
  }
}

.breadcrumb_sep {
  color: #bbb;
  font-size: 14px;
}

.endereco_heading {
  font-size: 1.65rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 1.75rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    font-size: 1.5rem;
    color: $primary;
  }
}

.endereco_card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.endereco_card_header {
  background: #1a1a1a;
  color: #fff;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  padding: 14px 20px;

  i {
    font-size: 1rem;
    color: $primary;
  }

  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
}

.endereco_card_body {
  padding: 28px 24px;
}

.endereco_form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form_row {
  display: grid;
  gap: 14px;
}

.form_row--1 {
  grid-template-columns: 1fr;
}

.form_row--2 {
  grid-template-columns: 1fr 1fr;
}

.form_row--3 {
  grid-template-columns: 1fr 1fr 1fr;
}

.form_row--3-1 {
  grid-template-columns: 3fr 1fr;
}

.form_group {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 12px;
    font-weight: 600;
    color: #444;
  }
}

.obrigatorio {
  color: #e74c3c;
  margin-left: 2px;
}

.opcional {
  color: #aaa;
  font-weight: 400;
  margin-left: 3px;
}

.form_input {
  height: 42px;
  padding: 0 12px;

  border: 1.5px solid #ddd;
  border-radius: 8px;

  font-size: 13px;
  color: #333;

  outline: none;
  width: 100%;

  background: #fff;
  box-sizing: border-box;

  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: $primary;
  }

  &--erro {
    border-color: #e74c3c;
  }
}

.select_wrapper {
  position: relative;
}

.form_select {
  height: 42px;
  padding: 0 32px 0 12px;

  border: 1.5px solid #ddd;
  border-radius: 8px;

  font-size: 13px;
  color: #444;

  appearance: none;
  background: #fff;

  outline: none;
  cursor: pointer;

  width: 100%;
  box-sizing: border-box;

  transition: border-color 0.2s;

  &:focus {
    border-color: $primary;
  }

  &.form_input--erro {
    border-color: #e74c3c;
  }

  &:disabled {
    background: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
}

.select_icon {
  position: absolute;

  right: 10px;
  top: 50%;

  transform: translateY(-50%);

  font-size: 11px;
  color: #888;

  pointer-events: none;
}

.input_with_action {
  display: flex;
  gap: 8px;
}

.btn_buscar_cep {
  height: 42px;
  width: 42px;

  flex-shrink: 0;

  background: #1a1a1a;
  border: none;
  border-radius: 8px;

  color: #fff;
  font-size: 14px;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.cep_link {
  font-size: 11px;
  color: $primary;

  text-decoration: none;
  margin-top: 1px;

  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
}

.form_erro {
  font-size: 11px;
  color: #e74c3c;
}

.form_erro_geral {
  display: flex;
  align-items: center;
  gap: 8px;

  background: #fff5f5;
  border: 1px solid #fcc;

  border-radius: 8px;

  padding: 10px 14px;

  font-size: 13px;
  color: #c0392b;

  i {
    font-size: 16px;
  }
}

.form_check_wrapper {
  padding: 4px 0;
}

.form_check {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  user-select: none;
}

.form_check_input {
  display: none;
}

.form_check_box {
  width: 18px;
  height: 18px;

  border: 1.5px solid #ccc;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  transition:
    border-color 0.2s,
    background 0.2s;

  i {
    font-size: 12px;
    color: #fff;
    opacity: 0;
    transition: opacity 0.15s;
  }

  &--checked {
    background: $primary;
    border-color: $primary;

    i {
      opacity: 1;
    }
  }
}

.form_check_label {
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

.form_actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  padding-top: 6px;
}

.btn_cancelar {
  height: 42px;
  padding: 0 20px;

  background: none;

  border: 1.5px solid #ddd;
  border-radius: 8px;

  font-size: 13px;
  font-weight: 600;

  color: #555;

  cursor: pointer;

  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: #aaa;
    color: #111;
  }
}

.btn_salvar {
  height: 42px;
  padding: 0 28px;

  background: $primary;
  color: #fff;

  border: none;
  border-radius: 8px;

  font-size: 13px;
  font-weight: 700;

  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 7px;

  transition:
    opacity 0.2s,
    transform 0.1s;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spin {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@media (max-width: 600px) {
  .form_row,
  .form_row--1,
  .form_row--2,
  .form_row--3,
  .form_row--3-1 {
    grid-template-columns: 1fr;
  }

  .form_actions {
    flex-direction: column-reverse;
  }

  .btn_cancelar,
  .btn_salvar {
    width: 100%;
    justify-content: center;
  }
}
</style>
