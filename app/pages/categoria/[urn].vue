<template>
  <div>
    <top />
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-lg-3">
          <!-- <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a class="a-bread" href="/">Home</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Produtos
              </li>
            </ol>
          </nav> -->
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
                        <a
                          class="a-bread"
                          @click="produtosPorCategoria(categoria.urn)"
                          >{{ categoria.nome }}</a
                        >
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
                  class=""
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
                <a class="link_marca" @click="buscarPorMarca(marca.marca_id)">{{
                  marca.marca_nome
                }}</a>
              </li>
            </ul>

            <!-- <h2 class="h2_side">Ferramentas de Adivinhação</h2>
            <ul>
              <li class="item-nav" v-for="grupo in state.grupos" :key="grupo.id">
                 <span class="">{{ grupo.nome }}</span> 
                 <input type="checkbox" /> 
                <a @click="filtrados(grupo.urn)" style="cursor: pointer" class="nav-link px-0"
                  :class="{ 'nav-link-selected': grupo.urn == state.grupo_urn, }">
                  <span class="">{{ grupo.nome }}</span>
                </a>
                 <hr /> 
              </li>
            </ul> -->
            <div class="div-btn-trash">
              <button
                @click="fetchAllProdutos"
                title="Limpar Filtro"
                type="button"
                class="btn-trash"
              >
                <i class="bi bi-trash3"></i>
              </button>
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
                <p class="qtd">Exibindo todos oss {{ state.qtd }} resultados</p>
              </div>
            </div>
            <div class="row">
              <div
                class="col-lg-4 offset-lg-0 py-2"
                v-for="produto in state.produtos"
                :key="produto.id"
              >
                <cardAllProdutos :produto="produto" />
              </div>
            </div>
          </div>
          <!--
          <nav class="nav-pagination" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#"><i class="bi bi-arrow-left-short"></i> Anterior </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Próximo <i class="bi bi-arrow-right-short"></i> </a>
              </li>
            </ul>
          </nav>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { asyncServices } from "@/services/fetch";
import { ref, onMounted } from "vue";
import services from "@/services/axios";

export default {
  setup() {
    const { carregarEmpresaSite } = useSiteData();
    const checkboxState = ref("todos");
    const handleCheckbox = (value) => {
      if (value === "todos") {
        // Se 'todos' já estiver selecionado e for clicado novamente, desmarca 'todos'
        state.checkbox = [];
      } else {
        // Se clicar em qualquer outro, desmarca 'todos' e seleciona o clicado
        state.checkbox = [value];
      }
    };
    definePageMeta({
      layout: "site",
    });
    onMounted(() => {
      fetchEmpresa();
      checkboxState.value = "todos";
    });

    const router = useRouter();
    const state = reactive({
      produtos: [],
      busca: "",
      empresa: {},
      grupo_urn: "",
      checkbox: ["todos"],
    });

    fetchgrupo();
    if (router.currentRoute._value.params.urn != undefined) {
      state.grupo_urn = router.currentRoute._value.params.urn;
      produtos(state.grupo_urn);
    } else {
      console.log("aqui2");
      //      fetchAllProdutos();
    }

    async function fetchgrupo() {
      try {
        const { data } = await asyncServices.grupos.getGruposAtivos();
        state.grupo_id = data.id;
        state.grupos = data;
      } catch (error) {
        console.log(error);
      }
    }

    async function filtraPorPreco() {
      const { data } = await services.produtos.buscarPorFaixaPrecoGrupo({
        urn: router.currentRoute._value.params.urn,
        preco_inicial: state.preco_inicial,
        preco_final: state.preco_final,
      });
      state.produtos = data;
      /*
      const { data } = await services.produtos.buscarPorFaixaPreco({
        preco_inicial: state.preco_inicial,
        preco_final: state.preco_final,
      });
      console.log(data);*/
    }

    async function fetchAllProdutos() {
      try {
        console.log("aqui");
        state.grupo_urn = null;
        const { data } = await asyncServices.produtos.getAllProduto();
        state.produtos = data;
        var qtd = state.produtos;
        state.qtd = qtd.length;
        history.pushState({}, "", "/produtos");
        state.buscando = "";
        state.busca = "";
      } catch (error) {
        console.log(error);
      }
    }

    async function produtos(grupo_urn) {
      state.grupo_urn = grupo_urn;
      const { data } = await services.grupos.getProdutosGrupoURN(grupo_urn);
      console.log(data);

      state.produtos = data.produtos;
      state.marcas = data.marcas;
      var qtd = state.produtos;
      state.qtd = qtd.length;
      state.buscando = state.grupo_urn;
    }

    async function buscarPorMarca(marca_id) {
      console.log(state.grupo_urn);
      const { data } = await services.grupos.getProdutosPorGrupoMarca({
        grupo_urn: state.grupo_urn,
        marca_id,
      });
      state.produtos = data;
    }
    /*
    async function produtos(grupo_urn) {
      console.log(grupo_urn);
      state.grupo_urn = grupo_urn;

      const { data } = await services.grupos.getProdutosGrupoURN(grupo_urn);
      state.produtos = data;
      var qtd = state.produtos;
      state.qtd = qtd.length;
      state.buscando = state.grupo_urn;
    }
*/
    async function produtosPorCategoria(categoria_urn) {
      state.categoria_urn = categoria_urn;
      try {
        const { data } = await services.produtos.getAllProdutoCat(
          categoria_urn
        );
        state.produtos = data.produtos;
        state.marcas = data.marcas;
        var qtd = state.produtos;
        state.qtd = qtd.length;
        history.pushState({}, "", "/produtos/" + categoria_urn);
        state.buscando = categoria_urn;
      } catch (error) {
        console.log(error);
      }
    }
    async function filtrados(grupo_urn) {
      state.grupo_urn = grupo_urn;
      try {
        const { data } = await services.produtos.getAllProdutoCat(grupo_urn);
        state.produtos = data;
        var qtd = state.produtos;
        state.qtd = qtd.length;
        history.pushState({}, "", "/produtos/" + grupo_urn);
        state.buscando = grupo_urn;
      } catch (error) {
        console.log(error);
      }
    }
    async function buscar() {
      await services.produtos
        .buscarProduto({ nome: state.busca })
        .then((res) => {
          state.produtos = res.data;
          var qtd = state.produtos;
          state.qtd = qtd.length;
          state.buscando = state.busca;
          history.pushState({}, "", "/produtos/" + state.busca);
          state.busca = "";
        });
    }
    function menuShow() {
      let menuMobile = document.querySelector(".div_cores");
      let divTdsCores = document.getElementById("div_tds_cores");
      let caretIcon = document.getElementById("caret-icon");
      if (menuMobile.classList.contains("open")) {
        menuMobile.classList.remove("open");
        divTdsCores.style.display = "none";
        caretIcon.classList.replace("bi-caret-down", "bi-caret-up");
      } else {
        menuMobile.classList.add("open");
        divTdsCores.style.display = "block";
        caretIcon.classList.replace("bi-caret-up", "bi-caret-down");
      }
    }
    async function fetchEmpresa() {
      try {
        state.empresa = await carregarEmpresaSite();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      state,
      filtrados,
      produtosPorCategoria,
      fetchAllProdutos,
      buscar,
      menuShow,
      produtos,
      checkboxState,
      handleCheckbox,
      buscarPorMarca,
      filtraPorPreco,
    };
  },
};
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
  cursor: pointer;
}

.a-bread:hover {
  color: var(--primary);
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

/* .item-nav span {
  color: #737373;
  font-weight: 400;
  font-family: 'Livvic', sans-serif;

} */

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
  /* Oculta por padrão */
}

.open .div_tds_cores {
  display: block;
  /* Exibe quando a classe open está presente */
}

.nav-pagination {
  display: flex;
  justify-content: center;
}

.page-link {
  color: #737373;
}

.div_line {
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

  #menu {
    width: 100%;
  }

  #submenu1 {
    width: 100%;
  }

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
