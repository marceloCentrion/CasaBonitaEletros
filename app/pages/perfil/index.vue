<template>
  <main id="page_perfil" aria-labelledby="perfil_heading">
    <div class="perfil_container">
      <nav class="breadcrumb" aria-label="Navegação estrutural">
        <ol>
          <li>
            <NuxtLink to="/" class="d-flex align-items-center gap-1">
              <i class="bi bi-house-door" aria-hidden="true"></i>
              <span>Página inicial</span>
            </NuxtLink>
          </li>
          <li aria-hidden="true" class="breadcrumb_sep">›</li>
          <li aria-current="page">Meu Perfil</li>
        </ol>
      </nav>

      <div v-if="isLoading.isLoading && !usuario" class="perfil_loading">
        <Loader />
      </div>

      <template v-else-if="usuario">
        <div class="perfil_layout">
          <aside class="perfil_sidebar" aria-label="Menu do perfil">
            <div class="sidebar_avatar">
              <div class="avatar_circle" aria-hidden="true">
                <span class="avatar_initials">{{ iniciais }}</span>
              </div>
              <div class="avatar_info">
                <strong class="avatar_nome">{{ primeiroNome }}</strong>
                <span class="avatar_email">{{ usuario.email }}</span>
              </div>
            </div>

            <nav class="sidebar_nav" aria-label="Seções do perfil">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                class="sidebar_nav_item"
                :class="{ 'sidebar_nav_item--ativo': abaAtiva === tab.id }"
                @click="navigateTo({ query: { ...route.query, aba: tab.id } })"
                :aria-current="abaAtiva === tab.id ? 'page' : undefined"
              >
                <i :class="`bi bi-${tab.icon}`" aria-hidden="true"></i>
                {{ tab.label }}
              </button>
            </nav>

            <button class="sidebar_sair" @click="sair" type="button">
              <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
              Sair da conta
            </button>
          </aside>

          <div class="perfil_main">
            <section
              v-show="abaAtiva === 'dados'"
              class="perfil_card"
              aria-labelledby="sec_dados"
            >
              <div class="perfil_card_header">
                <i class="bi bi-person-circle" aria-hidden="true"></i>
                <h2 id="sec_dados">Informações Pessoais</h2>
                <button
                  class="btn_editar"
                  type="button"
                  @click="toggleEditar"
                  :aria-label="editando ? 'Cancelar edição' : 'Editar dados'"
                >
                  <i
                    :class="`bi bi-${editando ? 'x-lg' : 'pencil'}`"
                    aria-hidden="true"
                  ></i>
                  {{ editando ? "Cancelar" : "Editar" }}
                </button>
              </div>

              <div class="perfil_card_body">
                <template v-if="!editando">
                  <div class="dados_grid">
                    <div class="dado_item">
                      <span class="dado_label">Nome completo</span>
                      <span class="dado_valor">{{ usuario.nome }}</span>
                    </div>
                    <div class="dado_item">
                      <span class="dado_label">{{
                        usuario.tipo_pessoa === "JURIDICA" ? "CNPJ" : "CPF"
                      }}</span>
                      <span class="dado_valor">{{
                        formatarCpfCnpj(
                          usuario.cpf ?? usuario.cnpj,
                          usuario.tipo_pessoa,
                        )
                      }}</span>
                    </div>
                    <div class="dado_item">
                      <span class="dado_label">Data de Nascimento</span>
                      <span class="dado_valor">{{
                        usuario.data_nascimento || "—"
                      }}</span>
                    </div>
                    <div class="dado_item">
                      <span class="dado_label">E-mail</span>
                      <span class="dado_valor">{{ usuario.email }}</span>
                    </div>
                    <div class="dado_item">
                      <span class="dado_label">Telefone Principal</span>
                      <span class="dado_valor">{{
                        formatarTelefone(usuario.telefone_principal)
                      }}</span>
                    </div>
                    <div class="dado_item" v-if="usuario.telefone_secundario">
                      <span class="dado_label">Telefone Secundário</span>
                      <span class="dado_valor">{{
                        formatarTelefone(usuario.telefone_secundario)
                      }}</span>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <form
                    class="dados_form"
                    @submit.prevent="salvarDados"
                    novalidate
                  >
                    <div class="form_row">
                      <div class="form_group">
                        <label for="edit_nome">Nome completo</label>
                        <input
                          id="edit_nome"
                          v-model="form.nome"
                          type="text"
                          class="form_input"
                          autocomplete="name"
                        />
                      </div>
                      <div class="form_group">
                        <label for="edit_nascimento">Data de Nascimento</label>
                        <input
                          id="edit_nascimento"
                          v-model="form.data_nascimento"
                          type="date"
                          class="form_input"
                        />
                      </div>
                    </div>
                    <div class="form_row">
                      <div class="form_group">
                        <label for="edit_email">E-mail</label>
                        <input
                          id="edit_email"
                          v-model="form.email"
                          type="email"
                          class="form_input"
                          autocomplete="email"
                        />
                      </div>
                      <div class="form_group">
                        <label for="edit_telefone">Telefone Principal</label>
                        <input
                          id="edit_telefone"
                          v-model="form.telefone_principal"
                          type="tel"
                          class="form_input"
                          placeholder="(00) 00000-0000"
                          autocomplete="tel"
                        />
                      </div>
                    </div>

                    <div class="form_actions">
                      <button
                        class="btn_salvar"
                        type="submit"
                        :disabled="salvando"
                        :aria-busy="salvando"
                      >
                        <i
                          v-if="salvando"
                          class="bi bi-arrow-repeat spin"
                          aria-hidden="true"
                        ></i>
                        {{ salvando ? "Salvando..." : "Salvar alterações" }}
                      </button>
                    </div>
                  </form>
                </template>
              </div>
            </section>

            <section
              v-show="abaAtiva === 'enderecos'"
              class="perfil_card"
              aria-labelledby="sec_enderecos"
            >
              <div class="perfil_card_header">
                <i class="bi bi-geo-alt" aria-hidden="true"></i>
                <h2 id="sec_enderecos">Meus Endereços</h2>
                <button
                  class="btn_editar"
                  type="button"
                  @click="navigateTo('/perfil/enderecos/novo')"
                >
                  <i class="bi bi-plus-circle" aria-hidden="true"></i>
                  Adicionar
                </button>
              </div>

              <div class="perfil_card_body">
                <ul
                  v-if="enderecos.length"
                  class="enderecos_list"
                  aria-label="Meus endereços"
                >
                  <li
                    v-for="end in enderecos"
                    :key="end.id"
                    class="endereco_item"
                  >
                    <div class="endereco_topo">
                      <div class="endereco_badges">
                        <span
                          class="badge_tipo"
                          :class="
                            end.principal === 'SIM'
                              ? 'badge_tipo--principal'
                              : 'badge_tipo--secundario'
                          "
                        >
                          <i
                            :class="`bi bi-${end.principal === 'SIM' ? 'star-fill' : 'geo-alt'}`"
                            aria-hidden="true"
                          ></i>
                          {{
                            end.principal === "SIM"
                              ? "Endereço Principal"
                              : "Endereço Secundário"
                          }}
                        </span>
                      </div>
                      <button
                        class="btn_endereco_editar"
                        type="button"
                        @click="navigateTo(`/perfil/enderecos/${end.id}`)"
                        :aria-label="`Editar endereço ${end.nome}`"
                      >
                        <i class="bi bi-pencil" aria-hidden="true"></i>
                      </button>
                    </div>

                    <strong class="endereco_nome">{{ end.nome }}</strong>
                    <p class="endereco_linha">
                      {{ end.logradouro }}, {{ end.numero
                      }}<template v-if="end.complemento">
                        — {{ end.complemento }}</template
                      >
                    </p>
                    <p class="endereco_linha">
                      {{ end.bairro }} · {{ end.cidade?.nome }},
                      {{ end.cidade?.estado?.uf }}
                    </p>
                    <p class="endereco_cep">CEP: {{ end.cep }}</p>
                  </li>
                </ul>

                <div v-else class="enderecos_vazio">
                  <i class="bi bi-geo-alt" aria-hidden="true"></i>
                  <p>Você ainda não cadastrou nenhum endereço.</p>
                  <button
                    class="btn_salvar"
                    type="button"
                    @click="navigateTo('/perfil/enderecos/novo')"
                  >
                    <i class="bi bi-plus-circle" aria-hidden="true"></i>
                    Adicionar Endereço
                  </button>
                </div>
              </div>
            </section>

            <section
              v-show="abaAtiva === 'pedidos'"
              class="perfil_card"
              aria-labelledby="sec_pedidos"
            >
              <div class="perfil_card_header">
                <i class="bi bi-bag" aria-hidden="true"></i>
                <h2 id="sec_pedidos">Meus Pedidos</h2>
              </div>

              <div class="perfil_card_body">
                <Loader v-if="carregandoPedidos" />

                <ul
                  v-else-if="pedidos.length"
                  class="pedidos_list"
                  aria-label="Meus pedidos"
                >
                  <li
                    v-for="pedido in pedidos"
                    :key="pedido.id"
                    class="pedido_item"
                    @click="navigateTo(`/pedido/${pedido.urn ?? pedido.id}`)"
                    tabindex="0"
                    role="button"
                    :aria-label="`Ver pedido ${pedido.id}`"
                    @keydown.enter="
                      navigateTo(`/pedido/${pedido.urn ?? pedido.id}`)
                    "
                  >
                    <div class="pedido_topo">
                      <span class="pedido_id">#{{ pedido.id }}</span>
                      <span
                        class="pedido_status"
                        :class="`pedido_status--${(pedido.status || 'pendente').toLowerCase()}`"
                      >
                        {{ pedido.status || "Pendente" }}
                      </span>
                    </div>
                    <p class="pedido_data">
                      {{ pedido.created_at || pedido.data }}
                    </p>
                    <p class="pedido_valor">{{ formatPreco(pedido.total) }}</p>
                    <span class="pedido_ver">
                      Ver detalhes
                      <i class="bi bi-chevron-right" aria-hidden="true"></i>
                    </span>
                  </li>
                </ul>

                <div v-else class="enderecos_vazio">
                  <i class="bi bi-bag" aria-hidden="true"></i>
                  <p>Você ainda não realizou nenhum pedido.</p>
                  <button
                    class="btn_salvar"
                    type="button"
                    @click="navigateTo('/produtos')"
                  >
                    Explorar produtos
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </template>

      <div v-else class="perfil_nao_logado">
        <ClientOnly>
          <i class="bi bi-person-x" aria-hidden="true"></i>
          <p>Você precisa estar logado para ver seu perfil.</p>
          <button class="btn_salvar" @click="navigateTo('/login')">
            Fazer login
          </button>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>

<script setup>
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";

const clienteAuth = useClienteAuthStore();

definePageMeta({
  layout: "site",
  middleware: "auth-cliente",
  ssr: false,
});

useHead({ title: "Casa Bonita Eletros - Meu Perfil" });

const isLoading = useIsLoading();
const toast = useToast();
const route = useRoute();

const usuario = ref(null);
const enderecos = ref([]);
const pedidos = ref([]);

const abaAtiva = ref(route.query.aba || "dados");
const editando = ref(false);
const salvando = ref(false);
const salvandoSenha = ref(false);
const carregandoPedidos = ref(false);
const erroSenha = ref("");

const form = ref({
  nome: "",
  email: "",
  data_nascimento: "",
  telefone_principal: "",
});

const senha = ref({
  atual: "",
  nova: "",
  confirmar: "",
});

const tabs = [
  { id: "dados", label: "Dados Pessoais", icon: "person" },
  { id: "enderecos", label: "Endereços", icon: "geo-alt" },
  { id: "pedidos", label: "Meus Pedidos", icon: "bag" },
];

const iniciais = computed(() => {
  if (!usuario.value?.nome) return "?";
  return usuario.value.nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
});

const primeiroNome = computed(() => {
  if (!usuario.value?.nome) return "";
  return usuario.value.nome.split(" ")[0];
});

function formatPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarCpfCnpj(valor, tipo) {
  if (!valor) return "—";
  const v = valor.replace(/\D/g, "");
  if (tipo === "JURIDICA" || v.length === 14) {
    return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarTelefone(valor) {
  if (!valor) return "—";
  const v = valor.replace(/\D/g, "");
  if (v.length === 11) return v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return v.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

function toggleEditar() {
  editando.value = !editando.value;
  if (editando.value && usuario.value) {
    form.value = {
      nome: usuario.value.nome ?? "",
      email: usuario.value.email ?? "",
      data_nascimento: usuario.value.data_nascimento ?? "",
      telefone_principal: usuario.value.telefone_principal ?? "",
    };
  }
}

async function salvarDados() {
  salvando.value = true;
  try {
    await services.clientes.atualizarDados({
      client_id: clienteAuth.client_id,
      client_token: clienteAuth.client_token,
      ...form.value,
    });

    Object.assign(usuario.value, form.value);
    editando.value = false;
    toast.success("Dados atualizados com sucesso!");
  } catch (error) {
    toast.error(
      error?.response?.data?.erro ||
        error?.message ||
        "Erro ao salvar os dados.",
    );
  } finally {
    salvando.value = false;
  }
}

async function alterarSenha() {
  erroSenha.value = "";

  if (!senha.value.atual || !senha.value.nova || !senha.value.confirmar) {
    erroSenha.value = "Preencha todos os campos.";
    return;
  }
  if (senha.value.nova !== senha.value.confirmar) {
    erroSenha.value = "As senhas não coincidem.";
    return;
  }
  if (senha.value.nova.length < 6) {
    erroSenha.value = "A nova senha deve ter pelo menos 6 caracteres.";
    return;
  }

  salvandoSenha.value = true;
  try {
    await services.clientes.alterarSenha({
      client_id: clienteAuth.client_id,
      client_token: clienteAuth.client_token,
      senha_atual: senha.value.atual,
      nova_senha: senha.value.nova,
    });

    senha.value = { atual: "", nova: "", confirmar: "" };
    toast.success("Senha alterada com sucesso!");
  } catch (error) {
    erroSenha.value =
      error?.response?.data?.erro ||
      error?.message ||
      "Erro ao alterar a senha.";
  } finally {
    salvandoSenha.value = false;
  }
}

function sair() {
  clienteAuth.client_token = null;
  clienteAuth.client_id = null;
  clienteAuth.client_nome = null;
  navigateTo("/login");
}

async function carregarPedidos() {
  if (pedidos.value.length) return;
  carregandoPedidos.value = true;
  try {
    const { data } = await services.pedidos.getMeusPedidos({
      client_id: clienteAuth.client_id,
      client_token: clienteAuth.client_token,
    });
    pedidos.value = data ?? [];
  } catch {
    pedidos.value = [];
  } finally {
    carregandoPedidos.value = false;
  }
}

watch(
  () => route.query.aba,
  (aba) => {
    if (aba) abaAtiva.value = aba;
    if (aba === "pedidos") carregarPedidos();
  },
);

onMounted(async () => {
  if (abaAtiva.value === "pedidos") carregarPedidos();

  if (!clienteAuth.client_token || !clienteAuth.client_id) {
    return navigateTo("/login");
  }

  isLoading.start();
  try {
    const { data } = await services.clientes.getDataCliente({
      client_id: clienteAuth.client_id,
      client_token: clienteAuth.client_token,
    });

    if (!data) return navigateTo("/login");

    usuario.value = data;
    enderecos.value = data.enderecos ?? [];
  } catch {
    navigateTo("/login");
  } finally {
    isLoading.stop();
  }
});
</script>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/scss/variables" as *;

#page_perfil {
  background: #f7f7f8;
  min-height: 80vh;
  padding: 32px 0 80px;
}

.perfil_container {
  max-width: 1280px;
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
    i {
      font-size: 13px;
    }
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

.perfil_loading {
  display: flex;
  justify-content: center;
  padding: 6rem 0;
}

.perfil_layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  align-items: start;
}

.perfil_sidebar {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar_avatar {
  background: #1a1a1a;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar_circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar_initials {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
}

.avatar_info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.avatar_nome {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar_email {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar_nav {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  flex: 1;
}

.sidebar_nav_item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 20px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;

  i {
    font-size: 1rem;
    color: #aaa;
    transition: color 0.15s;
  }

  &:hover {
    background: #f5f5f5;
    color: #111;
    i {
      color: $primary;
    }
  }

  &--ativo {
    background: #f0f4ff;
    color: #111;
    font-weight: 600;
    border-left: 3px solid $primary;
    padding-left: 17px;
    i {
      color: $primary;
    }
  }
}

.sidebar_sair {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: none;
  border: none;
  border-top: 1px solid #ebebeb;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  color: #c0392b;
  cursor: pointer;
  transition: background 0.15s;
  i {
    font-size: 1rem;
  }
  &:hover {
    background: #fff5f5;
  }
}

.perfil_card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
}

.perfil_card_header {
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
    flex: 1;
  }
}

.btn_editar {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  cursor: pointer;
  transition: background 0.18s;
  i {
    font-size: 12px;
    color: #fff;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.perfil_card_body {
  padding: 24px;
}

.dados_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.dado_item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;

  &:nth-last-child(-n + 2) {
    border-bottom: none;
  }
}

.dado_label {
  font-size: 11px;
  font-weight: 600;
  color: #aaa;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.dado_valor {
  font-size: 14px;
  font-weight: 500;
  color: #222;
}

.dados_form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form_row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.form_group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 12px;
    font-weight: 500;
    color: #555;
  }
}

.form_input {
  height: 40px;
  padding: 0 12px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #333;
  outline: none;
  width: 100%;
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

.form_erro {
  font-size: 11px;
  color: #e74c3c;
  margin-top: -8px;
}

.form_actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.btn_salvar {
  height: 40px;
  padding: 0 24px;
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

.enderecos_list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.endereco_item {
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: border-color 0.2s;
  &:hover {
    border-color: $primary;
  }
}

.endereco_topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.endereco_badges {
  display: flex;
  gap: 6px;
}

.badge_tipo {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 999px;
  i {
    font-size: 10px;
  }

  &--principal {
    background: #fff8ec;
    color: color.adjust(#f5a623, $lightness: -15%);
    border: 1px solid #f5d09a;
  }
  &--secundario {
    background: #f5f5f5;
    color: #888;
    border: 1px solid #e0e0e0;
  }
}

.btn_endereco_editar {
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  transition:
    color 0.15s,
    background 0.15s;
  &:hover {
    color: $primary;
    background: #f5f5f5;
  }
}

.endereco_nome {
  font-size: 13px;
  font-weight: 700;
  color: #222;
}

.endereco_linha {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.endereco_cep {
  font-size: 11px;
  color: #aaa;
  margin: 4px 0 0;
}

.enderecos_vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px 0;
  color: #ccc;
  i {
    font-size: 2.5rem;
  }
  p {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

.pedidos_list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pedido_item {
  border: 1.5px solid #e8e8e8;
  border-radius: 10px;
  padding: 14px 18px;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 16px;
  transition:
    border-color 0.2s,
    background 0.15s;

  &:hover {
    border-color: $primary;
    background: #fafbff;
  }
  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }
}

.pedido_id {
  font-size: 13px;
  font-weight: 700;
  color: #333;
}

.pedido_data {
  font-size: 12px;
  color: #aaa;
  margin: 0;
}

.pedido_valor {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.pedido_status {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: capitalize;

  &--aprovado,
  &--pago {
    background: #e6f9f0;
    color: #1e9e58;
  }
  &--pendente {
    background: #fff8e0;
    color: #b88700;
  }
  &--cancelado {
    background: #fff0f0;
    color: #c0392b;
  }
  &--enviado {
    background: #e8f0ff;
    color: #2563eb;
  }
}

.pedido_ver {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: $primary;
  font-weight: 500;
  white-space: nowrap;
  i {
    font-size: 11px;
  }
}

.perfil_nao_logado {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 0;
  color: #ccc;
  i {
    font-size: 3rem;
  }
  p {
    font-size: 15px;
    color: #999;
    margin: 0;
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

@media (max-width: 1024px) {
  .perfil_layout {
    grid-template-columns: 220px 1fr;
  }
}

@media (max-width: 768px) {
  .perfil_layout {
    grid-template-columns: 1fr;
  }

  .perfil_sidebar {
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 12px;
    overflow: hidden;
  }

  .sidebar_avatar {
    width: 100%;
    border-radius: 0;
  }

  .sidebar_nav {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 6px;
    gap: 2px;
  }

  .sidebar_nav_item {
    flex: 1 1 auto;
    justify-content: center;
    padding: 10px 12px;
    font-size: 12px;
    gap: 6px;
    border-left: none;
    border-bottom: 3px solid transparent;

    &--ativo {
      border-left: none;
      border-bottom: 3px solid $primary;
      padding-left: 12px;
    }
  }

  .sidebar_sair {
    width: 100%;
    justify-content: center;
  }

  .dados_grid {
    grid-template-columns: 1fr;
  }

  .dado_item:nth-last-child(-n + 2) {
    border-bottom: 1px solid #f0f0f0;
  }
  .dado_item:last-child {
    border-bottom: none;
  }

  .form_row {
    grid-template-columns: 1fr;
  }

  .pedido_item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .perfil_container {
    padding: 0 1rem;
  }
  .enderecos_list {
    grid-template-columns: 1fr;
  }
}
</style>
