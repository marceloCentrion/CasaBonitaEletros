<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Atualizar Produto</h3>
      </div>

      <div class="card-body">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Cadastrar Produto
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="atributos-tab"
              data-bs-toggle="tab"
              data-bs-target="#atributos-tab-pane"
              type="button"
              role="tab"
              aria-controls="atributos-tab-pane"
              aria-selected="false"
              @click="verficaProdutoId"
            >
              Atributos
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Estoque
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
          >
            <h4>Dados Principais</h4>
            <div class="row">
              <div class="col-md-1">
                <label for="id">Código</label>
                <input
                  id="id"
                  type="text"
                  class="form-control"
                  readonly
                  v-model="state.produto.id"
                />
              </div>
              <div class="col-md-2">
                <label for="nome">REF</label>
                <input
                  id="nome"
                  type="text"
                  class="form-control"
                  v-model="state.produto.ref"
                />
              </div>
              <div class="col-md-3">
                <label for="status">Grupo</label>
                <select v-model="state.produto.grupo_id" class="form-select">
                  <option
                    v-for="grupo in state.grupos"
                    :key="grupo.id"
                    :value="grupo.id"
                    @change="fetchCategorias($event.target.value)"
                  >
                    {{ grupo.nome }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="status">Categoria</label>
                <select
                  v-model="state.produto.categoria_id"
                  class="form-select"
                >
                  <option
                    v-for="categoria in state.categorias"
                    :key="categoria.id"
                    :value="categoria.id"
                  >
                    {{ categoria.nome }}
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label for="status">Marca</label>
                <select v-model="state.produto.marca_id" class="form-select">
                  <option
                    v-for="marca in state.marcas"
                    :key="marca.id"
                    :value="marca.id"
                  >
                    {{ marca.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <label for="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  class="form-control"
                  v-model="state.produto.nome"
                />
              </div>
              <div class="col-md-4">
                <label for="urn">URN</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.urn"
                />
              </div>
            </div>
            <h4>Preços praticados</h4>
            <div>
              <br />
              <input
                @change="
                  if ($event.target.checked) {
                    state.produto.tem_desconto = 'SIM';
                    state.produto.preco_desconto = '';
                  } else state.produto.tem_desconto = 'NAO';
                "
                type="checkbox"
                id="tem_desconto"
                v-model="state.produto.check_tem_desconto"
              /><label for="tem_desconto"
                >Produto com desconto.
                <button
                  title="Marque se o produto tiver desconto."
                  for="tem_desconto"
                >
                  (?)
                </button></label
              >
            </div>
            <div class="row">
              <div class="col-md-2">
                <label for="urn"
                  >Preço
                  <button title="Preço normal do produto.">(?)</button></label
                >
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.preco"
                />
              </div>
              <div class="col-md-2">
                <label for="urn"
                  >Preço Desconto
                  <button title="Preço do produto com desconto.">
                    (?)
                  </button></label
                >
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.preco_desconto"
                  :disabled="!state.produto.check_tem_desconto"
                />
              </div>
              <div class="col-md-2">
                <label for="urn"
                  >Preço Pix
                  <button title="Preço do produto no Pix.">(?)</button></label
                >
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.preco_pix"
                />
              </div>

              <div class="col-md-2">
                <label for="status"
                  >Parcelas
                  <button title="Quantidade de parcelas aceitas no cartão.">
                    (?)
                  </button></label
                >
                <select v-model="state.produto.parcelas" class="form-select">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>
            <h4>Medidas</h4>
            <div class="row">
              <div class="col-md-3">
                <label for="urn">Peso</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.peso"
                />
              </div>
              <div class="col-md-3">
                <label for="urn">Altura</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.medida_altura"
                />
              </div>
              <div class="col-md-3">
                <label for="urn">Largura</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.medida_largura"
                />
              </div>
              <div class="col-md-3">
                <label for="urn">Profundidade</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.medida_profundidade"
                />
              </div>
            </div>
            <h4>Dados Fiscais</h4>
            <div class="row">
              <div class="col-md-3">
                <label for="urn">NCM</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.ncm"
                />
              </div>
              <div class="col-md-3">
                <label for="urn">EAN</label>
                <input
                  id="urn"
                  type="text"
                  class="form-control"
                  v-model="state.produto.ean"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <label for="status">Descrição</label>
                <textarea
                  class="form-control"
                  style="width: 100%"
                  v-model="state.produto.descricao"
                  rows="5"
                ></textarea>
              </div>
              <div class="col-md-2">
                <label for="status">Status</label>
                <select v-model="state.produto.status" class="form-select">
                  <option value="ATIVO">Ativo</option>
                  <option value="INATIVO">Inativo</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="status">Mais Vendidos</label>
                <select v-model="state.produto.destaque1" class="form-select">
                  <option value="SIM">Sim</option>
                  <option value="NAO">Não</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="status">Seleção Premium</label>
                <select v-model="state.produto.destaque2" class="form-select">
                  <option value="SIM">Sim</option>
                  <option value="NAO">Não</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="status">Lançamentos</label>
                <select v-model="state.produto.destaque3" class="form-select">
                  <option value="SIM">Sim</option>
                  <option value="NAO">Não</option>
                </select>
              </div>
              <div class="col-md-4">
                <div class="input_img">
                  <label>Imagem</label>
                  <input
                    type="file"
                    class="form-control"
                    @change="adicionarImagens"
                  />
                  <span v-if="state.erro_imagem" class="text-danger"
                    >Este campo é obrigatório</span
                  >
                </div>
              </div>
              <div class="col-md-12" v-if="state.imagens.length > 0">
                <div class="row">
                  <div
                    class="col-md-2"
                    v-for="(objImagem, index) in state.imagens"
                    :key="objImagem"
                    style="display: flex"
                  >
                    <img :src="objImagem.imagem" class="imagem" />
                    <div class="div_btn_x mt-4">
                      <button class="btn_remover" @click="removerImagem(index)">
                        <i class="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="atributos-tab-pane"
            role="tabpanel"
            aria-labelledby="atributos-tab"
            tabindex="0"
          >
            <div class="row">
              <div class="col-md-3">
                <label for="nome-atributo">Nome</label>
                <input
                  id="nome-atributo"
                  type="text"
                  class="form-control"
                  v-model="state.atributo.nome"
                />
              </div>
              <div class="col-md-2">
                <label for="valor-atributo">Valor</label>
                <input
                  id="valor-atributo"
                  type="text"
                  class="form-control"
                  v-model="state.atributo.valor"
                />
              </div>
              <div class="col-md-4 mt-7">
                <button
                  @click="addTributo()"
                  class="btn btn-warning"
                  type="button"
                >
                  Adicionar
                </button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(atributo, index) in state.array_atributo"
                  :key="atributo.id"
                >
                  <td scope="row">{{ atributo.id }}</td>
                  <td>{{ atributo.nome }}</td>
                  <td>{{ atributo.valor }}</td>
                  <td>
                    <button
                      title="Deletar"
                      @click="deletarPlano(index)"
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabindex="0"
          >
            <div class="row">
              <div class="col-md-3 mt-6">
                <label for="variacao">Variação</label>
                <select
                  class="form-select"
                  v-model="state.variacao_id"
                  @change="
                    setNomeVariacao($event.target.selectedOptions[0].innerHTML)
                  "
                >
                  <option
                    v-for="variacao in state.variacoes"
                    :value="variacao.id"
                    :key="variacao.id"
                  >
                    {{ variacao.nome }}
                  </option>
                </select>
              </div>
              <div class="col-md-3 mt-6">
                <label for="variacao">Quantidade</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="state.quantidade_estoque"
                />
              </div>

              <div class="col-md-4 mt-6">
                <button
                  @click="addVariacao()"
                  class="btn btn-warning"
                  type="button"
                >
                  Adicionar
                </button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(estoque, index) in state.array_estoques"
                  :key="estoque.id"
                >
                  <td scope="row">{{ estoque.id }}</td>
                  <td>{{ estoque.valor_variacao.nome }}</td>
                  <td>
                    <button
                      title="Deletar"
                      @click="deletarEstoque(index)"
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="text-right mt-10">
            <button
              type="button"
              @click="salvarProduto"
              class="btn btn-success mr-1"
            >
              Salvar
            </button>
            <router-link to="/admin/produtos">
              <button type="button" class="btn btn-danger">Cancelar</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import services from "@/services/axios";
export default {
  components: {},
  setup() {
    
    const router = useRouter();

    const state = reactive({
      produto: {
        id: "",
        marca_id: "",
        categoria_id: "",
        nome: "",
        ref: "",
        url: "",
        genero: "",
        status: "ATIVO",
        destaque1: "NAO",
        destaque2: "NAO",
        destaque3: "NAO",
        tem_desconto: "NAO",
        check_tem_desconto: false,
        atributo: [{}],
      },
      atributo: {
        nome: "",
        valor: "",
      },
      produto_id: "",
      array_atributo: [],
      atributo: {},
      marcas: [],
      imagem: {},
      imagens: [],
      imagens_deletar: [],

      array_estoques: [],
    });
    const authStore = useAuthStore();
    const token = authStore.token;
    onMounted(() => {
      fetchGrupo();
      fetchMarca();
      fetchVariacoes();
      if (router.currentRoute._value.params.id != undefined) {
        fetchProduto();
      }
    });

    async function fetchGrupo() {
      try {
        const { data } = await services.grupos.getGruposAtivos({ token });
        state.grupos = data;
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchVariacoes() {
      try {
        const { data } = await services.variacoes.getAll({ token });
        console.log(data);
        state.variacoes = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchMarca() {
      try {
        const { data } = await services.marcas.marcasAtivas();
        state.marcas = data;
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchCategoria(grupo_id) {
      try {
        const { data } = await services.categoria.getByGrupoId({
          token,
          grupo_id,
        });
        state.categorias = data;
      } catch (error) {
        console.log(error);
      }
    }
    function setNomeVariacao(valor) {
      state.vari_nome_selecionado = valor;
    }

    async function fetchProduto() {
      try {
        const { data } = await services.produtos.getById({
          id: router.currentRoute._value.params.id,
          token,
        });
        state.produto = data.id;
        state.produto = data;
        state.array_atributo = data.atributos;
        state.array_estoques = data.estoques;
        state.imagens = data.imagens;
        state.produto.grupo_id = data.categoria.grupo_id;
        if (data.tem_desconto == "SIM") {
          state.produto.check_tem_desconto = true;
        }

        fetchCategoria(data.categoria.grupo_id);
      } catch (error) {
        console.log(error);
      }
    }
    async function salvarProduto() {
      console.log(
        "Qtd de imagens para deletar: " + state.imagens_deletar.length
      );
      if (state.imagens_deletar.length > 0) {
        try {
          console.log(token);
          const { data } = await services.produtos.deletarImagens({
            imagens: state.imagens_deletar,
            token,
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
      state.produto.estoques = state.array_estoques;
      services.produtos
        .update({ produto: state.produto, token })
        .then((data_produto) => {
          for (let i = 0; i < state.imagens.length; i++) {
            if (
              state.imagens[i].file != undefined &&
              state.imagens[i].file != null
            ) {
              var formImagem = new FormData();
              formImagem.append("produto_id", state.produto.id);
              formImagem.append("imagem", state.imagens[i].file);
              services.produtos
                .salvarImagem({ formImagem, token })
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.log(error);
                  return;
                });
            }
          }
          router.push("/admin/produtos");
        })
        .catch((error) => {
          console.log(error);
          var valores = Object.values(error.response.data.errors);
          valores.forEach((element) => {
            element.forEach((element2) => {
              console.log(element2);
            });
          });
        });
    }
    async function adicionarImagens(event) {
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        var objImagem = new Object();
        objImagem.id = index + 1;
        objImagem.file = element;
        objImagem.imagem = URL.createObjectURL(element);
        state.imagens.push(objImagem);
        console.log(objImagem);
      }
    }
    async function removerImagem(index_imagem) {
      //  console.log(state.imagens[index_imagem].id);
      if (state.imagens[index_imagem].id != undefined) {
        state.imagens_deletar.push(state.imagens[index_imagem].id);
      }
      console.log(state.imagens_deletar);
      state.imagens.splice(index_imagem, 1);
      document.querySelector('input[type="file"]').value = null;
    }

    //FUNÇÕES ADD ATRIBUTOS
    async function addTributo() {
      var atributo = {};
      atributo.nome = state.atributo.nome;
      atributo.valor = state.atributo.valor;
      state.array_atributo.push(atributo);
    }
    async function deletarPlano(atributo_i) {
      state.array_atributo.splice(atributo_i, 1);
    }
    async function deletarEstoque(index) {
      state.array_estoques.splice(index, 1);
    }
    async function saveAtributo() {
      console.log(state.array_atributo);
      try {
        await services.atributos.save({
          produto_id: state.produto_id,
          atributos: state.array_atributo,
          token,
        });
      } catch (error) {
        console.log(error);
        var valores = Object.values(error.response.data.errors);
        alert(valores);
      }
    }
    async function addVariacao() {
      var obj_variacao = {};
      obj_variacao.valor_variacao_id = state.variacao_id;
      obj_variacao.nome = state.vari_nome_selecionado;
      obj_variacao.quantidade = state.quantidade_estoque;
      state.array_estoques.push(obj_variacao);
    }
    return {
      salvarProduto,
      adicionarImagens,
      removerImagem,
      router,
      state,
      saveAtributo,
      deletarPlano,
      deletarEstoque,
      addTributo,
      setNomeVariacao,
      addVariacao,
    };
  },
};
</script>
<style scoped>
h4 {
  color: #000;
}
#tem_desconto {
  margin-right: 5px;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: var(--primary);
  font-weight: 600;
}

.nav-tabs .nav-link {
  color: #000;
  font-weight: 600;
}

.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
  resize: none;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.imagem {
  width: 100%;
  object-fit: cover;
  margin-top: 1em;
  height: auto;
}

.btn_remover {
  border: none;
  outline: none;
  background-color: #ff0000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #f57171;
}

.btn_remover:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #f57171;
}

.div_btn_x {
  margin-left: 10px;
}
</style>
