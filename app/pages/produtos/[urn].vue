<template>
  <div>
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <div class="quad_filtro">
            <h2 class="h2_side">Filtros de Pesquisa</h2>
            <hr />
            <div class="accordion" id="accordionExample">
              <div
                class="accordion-item"
                v-for="(grupo, i) in state.grupos"
                :key="grupo.id"
              >
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapseOne' + i"
                    :class="{
                      'nav-link-selected': grupo.urn == state.grupo_urn,
                    }"
                    aria-expanded="true"
                    :aria-controls="'collapseOne' + i"
                  >
                    {{ grupo.nome }}
                  </button>
                </h2>
                <div
                  :id="'collapseOne' + i"
                  class="accordion-collapse collapse"
                  :class="{ show: grupo.urn == state.grupo_urn }"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <ul>
                      <li
                        v-for="categoria in grupo.categorias"
                        :key="categoria.id"
                      >
                        <NuxtLink
                          class="a-bread"
                          @click="produtosPorCategoria(categoria.id)"
                          >{{ categoria.nome }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="h2_side">Faixa de Preço</h2>
            <div class="mb-6 d-flex">
              <div style="padding-right: 15px">
                <label class="label_valor">R$</label>
                <input
                  class="input_valor"
                  type="text"
                  placeholder="MIN"
                  v-model="state.preco_inicial"
                />
              </div>
              <div style="padding-right: 15px">
                <label class="label_valor">R$</label>
                <input
                  class="input_valor"
                  type="text"
                  placeholder="MÁX"
                  v-model="state.preco_final"
                />
              </div>
              <div>
                <button
                  @click="filtraPorPreco"
                  style="
                    width: 50px;
                    margin-top: 24px;
                    background-color: var(--primary);
                    height: 42px;
                    border-radius: 5px;
                  "
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <h2 class="h2_side">Marcas</h2>
            <ul>
              <li v-for="marca in state.marcas" :key="marca.marca_id">
                <NuxtLink
                  class="link_marca"
                  @click="buscarCategoriaMarca(marca.marca_id)"
                  >{{ marca.marca_nome }}
                </NuxtLink>
              </li>
            </ul>

            <div class="div-btn-trash">
              <NuxtLink to="/produtos">
                <button
                  @click="fetchAllProdutos"
                  title="Limpar Filtro"
                  type="button"
                  class="btn-trash"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-lg-9">
          <div class="py-md-5">
            <div class="row">
              <div class="col-md-6">
                <p v-if="state.buscando" class="buscando">
                  Buscando por: {{ state.buscando }}
                </p>
                <p v-else class="buscando">Buscando por: Todos</p>
              </div>
              <div class="col-md-6">
                <p class="qtd">Exibindo todos os {{ state.qtd }} resultados</p>
              </div>
            </div>
            <div class="row">
              <div
                class="col-6 col-lg-4 offset-lg-0 py-2"
                v-for="produto in state.produtos"
                :key="produto.id"
              >
                <cardAllProdutos :produto="produto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loader="state.loader" />
  </div>
</template>

<script setup>
import { asyncServices } from "@/services/fetch";
import services from "@/services/axios";

definePageMeta({
  layout: "site",
});

const storage = useClienteAuthStore();
const router = useRouter();
const route = useRoute();
const { carregarGruposSite, carregarEmpresaSite } = useSiteData();

const state = reactive({
  produtos: [],
  busca: "",
  empresa: {},
  grupo_urn: "",
  categoria_urn: "",
  checkbox: ["todos"],
  loader: false,
  client_token: storage.client_token,
  client_nome: storage.client_nome,
  preco_inicial: "",
  preco_final: "",
  buscando: "",
  qtd: 0,
  grupos: [],
  marcas: [],
});

onMounted(() => {
  fetchEmpresa();
});

// Init
fetchgrupo();
verificaLogin();

if (route.params.urn) {
  state.grupo_urn = route.params.urn;
  state.categoria_urn = route.params.urn;
  produtos(route.params.urn);
} else {
  fetchAllProdutos();
}

async function fetchgrupo() {
  try {
    state.grupos = await carregarGruposSite();
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

async function fetchAllProdutos() {
  try {
    state.loader = true;
    state.grupo_urn = null;
    const { data } = await asyncServices.produtos.getAllProduto();
    state.produtos = data;
    state.qtd = data.length;
    state.buscando = "";
    state.busca = "";
    router.push("/produtos");
  } catch (error) {
    console.log(error);
  } finally {
    state.loader = false;
  }
}

async function produtos(grupo_urn) {
  state.grupo_urn = grupo_urn;
  const { data } = await services.grupos.getGrupoURN(grupo_urn);
  state.produtos = data.produtos;
  state.marcas = data.marcas;
  state.qtd = data.produtos.length;
}

async function produtosPorCategoria(categoria_id) {
  state.categoria_id = categoria_id;
  state.loader = true;
  try {
    const { data } = await services.produtos.getAllProdutoCat(categoria_id);
    state.produtos = data.produtos;
    state.marcas = data.marcas;
    state.qtd = data.produtos.length;
    state.buscando = categoria_id;
    router.push("/produtos/" + categoria_id);
  } catch (error) {
    console.log(error);
  } finally {
    state.loader = false;
  }
}

async function buscarCategoriaMarca(marca_id) {
  try {
    const { data } = await services.categoria.getProdutosCategoriaMarca({
      categoria_urn: state.categoria_urn,
      marca_id,
    });
    state.produtos = data;
  } catch (error) {
    console.log(error);
  }
}

async function filtraPorPreco() {
  try {
    const { data } = await services.produtos.buscarPorFaixaPrecoCategoria({
      urn: state.categoria_urn,
      preco_inicial: state.preco_inicial,
      preco_final: state.preco_final,
    });
    state.produtos = data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchEmpresa() {
  try {
    state.empresa = await carregarEmpresaSite();
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}

.link_marca {
  font-weight: bold;
  color: #252b42;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  cursor: pointer;
}

.link_marca:hover {
  text-decoration: underline;
}

.accordion-body {
  padding: 0;
}

.accordion-button {
  color: #252b42 !important;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-bottom: 1rem;
  cursor: pointer;
}

.accordion-button:not(.collapsed) {
  background-color: #fff;
}

.accordion-button {
  padding: 0;
  border: none;
}

.accordion-item {
  border: none;
}

button:focus {
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
}

:focus {
  outline: none;
}

::-moz-focus-inner {
  border: 0;
}

a:focus {
  outline: none;
}

.nav-link:hover {
  color: var(--primary) !important;
}

.nav-link-selected {
  color: var(--primary) !important;
}

.div_line {
  background: #016938;
}

.div_top {
  background: #334b35;
  margin-bottom: 2rem;
}

ol {
  background: transparent;
  font-family: "Livvic", sans-serif;
}

.a-bread {
  color: #525259;
  text-decoration: none;
  font-family: "Livvic", sans-serif;
}

.a-bread:hover {
  color: var(--primary);
  cursor: pointer;
}

.h2_side {
  color: var(--primary);
  font-size: 18px;
  background: #000000;
  padding: 8px 12px;
}

hr {
  width: 100%;
  height: 1px;
  background: #e4e4eb;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.nav.nav-pills {
  background: #fcfcfc !important;
}

ul {
  padding-left: 0;
}

.qtd {
  color: var(--Color-text-2, #525259);
  font-size: 16px;
  letter-spacing: 0.16px;
  text-align: right;
}

.buscando {
  color: var(--Color-text-2, #000);
  font-size: 16px;
  letter-spacing: 0.16px;
  text-align: left;
  font-weight: 700;
}

.div-btn-trash {
  text-align: right;
  margin-top: 1em;
}

.btn-trash {
  background: #e13229;
  border: solid 1px #e13229;
  color: #fff;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  transition: 0.2s;
}

.btn-trash:hover {
  background: #ba2921;
  border: solid 1px #ba2921;
}

.item-nav {
  display: flex;
  justify-content: space-between;
}

.quad_filtro {
  padding: 20px 24px 20px 24px;
  margin-top: 3rem;
}

.div_cores {
  display: flex;
  justify-content: space-between;
}

.h2-cores {
  color: #252b42;
  font-weight: 400;
  font-size: 22px;
  font-family: "Livvic", sans-serif;
}

.div_tds_cores {
  display: none;
}

.open .div_tds_cores {
  display: block;
}

.nav-pagination {
  display: flex;
  justify-content: center;
}

.page-link {
  color: #737373;
}

.div_line_icon {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 40px;
}

.div_line_icon i {
  color: #fff;
  font-size: 12pt;
  margin-right: 1rem;
}

.div_local {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 40px;
}

.div_local i {
  color: #f7c35f;
  font-size: 12pt;
  margin-right: 1rem;
}

.div_local span {
  color: #ffffff;
  font-size: 12pt;
}

.label_valor {
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
  color: #252b42;
}

.input_valor {
  background: #e4e4eb;
  width: 100%;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
  border-radius: 4px;
}

@media (min-width: 992px) and (max-width: 1200px) {
  .h2_side,
  .h2-cores {
    font-size: 13pt;
  }

  #menu,
  #submenu1,
  .input-all {
    width: 100%;
  }

  hr {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .h2_side,
  .h2-cores {
    font-size: 12pt;
  }

  hr {
    width: 100%;
  }

  .input-all {
    width: 170px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .div_local span {
    font-size: 9pt;
  }

  .h2_side,
  .h2-cores {
    font-size: 15pt;
  }

  .input-all {
    width: 300px;
  }

  hr {
    width: 100%;
  }

  .div-btn-trash {
    text-align: left;
  }
}

@media (max-width: 575px) {
  .div_local span {
    font-size: 8pt;
  }

  .input-all {
    width: 100%;
    height: 45px;
  }

  hr {
    width: 100%;
  }

  .btn-all {
    height: 45px;
  }
}
</style>
