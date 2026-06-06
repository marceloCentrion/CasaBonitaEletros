<template>
  <div style="min-height: 80vh">
    <top
      :nome_cliente="state.client_nome"
      :token_cliente="state.client_token"
    />
    <div class="container">
      <div class="div_tile">
        <h2 class="title">Meus Endereços</h2>
        <button type="button" class="btn-end" @click="openModal()">
          <i class="bi bi-house-add"></i> Adicionar Endereço
        </button>
      </div>
      <div class="row mb-3">
        <div
          class="col-md-3"
          v-for="endereco in state.data.enderecos"
          :key="endereco.id"
        >
          <div class="card">
            <p
              style="
                font-weight: 700;
                font-size: 15px;
                margin-bottom: 0;
                color: var(--primary);
              "
              v-if="endereco.principal === 'SIM'"
            >
              Endereço Principal
            </p>
            <p
              style="
                font-weight: 700;
                font-size: 15px;
                margin-bottom: 0;
                color: var(--primary);
              "
              v-else
            >
              Endereço Secundário
            </p>
            <strong>{{ endereco.nome }}</strong>
            <h5>
              {{ endereco.logradouro }}, {{ endereco.numero }},
              {{ endereco.bairro }}, {{ endereco.complemento }},
              {{ endereco.cidade?.nome }}
            </h5>
            <div class="div_btn">
              <button class="btn-gold" @click="openModal(endereco)">
                <i class="bi bi-pen"></i> Alterar
              </button>
              <button class="btn_transparent" @click="removerEnd(endereco.id)">
                <i class="bi bi-trash3"></i> Remover
              </button>
            </div>
          </div>
        </div>
        <div class="div_btn_endereco">
          <NuxtLink to="/minha-conta">
            <button title="Cancelar" class="btn_transparent">Cancelar</button>
          </NuxtLink>
        </div>
      </div>
      <div class="modal_endereco" tabindex="-1" v-if="state.isModalVisible">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" v-if="state.selectedEndereco.id">
                Alterar Endereço <i class="bi bi-house-door"></i>
              </h4>
              <h4 class="modal-title" v-else>
                Adicionar Endereço <i class="bi bi-house-door"></i>
              </h4>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateEndereco">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="nome" class="form-label"
                        >Quem irá receber</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.nome"
                        id="nome"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="tel" class="form-label">Telefone</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.telefone"
                        id="tel"
                        v-maska
                        data-maska="[ '(##) ####-####','(##) # ####-####' ]"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="mb-3">
                      <label for="cep" class="form-label">Cep</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.cep"
                        id="cep"
                        v-maska
                        data-maska="#####-###"
                        @blur="cepAtributes"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="mb-3">
                      <label for="estado" class="form-label">Estado</label>
                      <select
                        class="form-select"
                        @change="getCidade($event.target.value)"
                        v-model="state.selectedEndereco.cidade.estado_id"
                      >
                        <option
                          v-for="estado in state.estados"
                          :key="estado.id"
                          :value="estado.id"
                        >
                          {{ estado.nome }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="mb-3">
                      <label for="cidade" class="form-label">Cidade</label>
                      <select
                        v-model="state.selectedEndereco.cidade_id"
                        class="form-select"
                      >
                        <option
                          v-for="cidade in state.cidades"
                          :key="cidade.id"
                          :value="cidade.id"
                        >
                          {{ cidade.nome }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-9">
                    <div class="mb-3">
                      <label for="logradouro" class="form-label"
                        >Logradouro</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.logradouro"
                        id="logradouro"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="mb-3">
                      <label for="numero" class="form-label">Número</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.numero"
                        id="numero"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="bairro" class="form-label">Bairro</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.bairro"
                        id="bairro"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="mb-3">
                      <label for="complemento" class="form-label"
                        >Complemento</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="state.selectedEndereco.complemento"
                        id="complemento"
                      />
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <div>
                    <input
                      type="checkbox"
                      id="check_principal"
                      v-model="state.selectedEndereco.principal"
                    />
                    <label for="check_principal" class="lbl_end_principal"
                      >Endereço Principal</label
                    >
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn_transparent mr-1"
                @click="closeModal"
              >
                Cancelar
              </button>
              <button type="submit" class="btn-gold" @click="updateEndereco">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loader="state.loader" />
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import services from "@/services/axios";
import { useRouter } from "vue-router";
import { useClienteAuthStore } from "../stores/clienteAuth";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const router = useRouter();
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);
    if (!client_id.value || !client_token.value) {
      router.push({ name: "index" });
    }
    definePageMeta({
      layout: "site",
      middleware: "client",
    });
    const state = reactive({
      loader: false,
      client_id: "",
      id_endereco: "",
      data: { enderecos: [] },
      estados: [],
      cidades: [],
      estado_id: "",
      isModalVisible: false,
      selectedEndereco: {
        nome: "",
        telefone: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        principal: false,
        cidade: {
          estado_id: null,
        },
        cidade_id: null,
      },
      client_token: null,
      client_nome: null,
    });
    state.client_token = clienteAuthStore.client_token;
    state.client_nome = clienteAuthStore.client_nome;
    onMounted(() => {
      getEstados();
      fetchDataCliente();
    });

    function openModal(endereco = null) {
      state.isModalVisible = true;
      if (endereco) {
        state.selectedEndereco = {
          ...endereco,
          principal: endereco.principal === "SIM", // Converte para booleano
          cidade: endereco.cidade || { estado_id: null },
          cidade_id: endereco.cidade ? endereco.cidade.id : null,
        };
      } else {
        state.selectedEndereco = {
          telefone: "",
          cep: "",
          logradouro: "",
          numero: "",
          bairro: "",
          complemento: "",
          principal: false,
          cidade: {
            estado_id: null,
          },
          cidade_id: null,
        };
      }
    }

    function closeModal() {
      state.isModalVisible = false;
    }

    async function fetchDataCliente() {
      try {
        state.loader = true;
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.loader = false;
        state.data.enderecos = data.enderecos;
        state.estado_id = data.enderecos[0].cidade.estado_id;
        getCidade(state.estado_id);
      } catch (error) {
        state.client_token = null;
        state.client_nome = null;
      } finally {
        state.loader = false;
      }
    }

    async function updateEndereco() {
      try {
        state.loader = true;
        const enderecoData = {
          ...state.selectedEndereco,
          principal: state.selectedEndereco.principal ? "SIM" : "NAO",
        };
        if (enderecoData.cidade) {
          delete enderecoData.cidade;
        }
        if (state.selectedEndereco.id) {
          await services.clientes.upEndereco({
            id_endereco: state.selectedEndereco.id,
            endereco: enderecoData,
            client_token: client_token.value,
          });
          state.loader = false;
        } else {
          enderecoData.cliente_id = client_id.value;
          await services.clientes.createEndereco({
            endereco: enderecoData,
            client_token: client_token.value,
            client_id: client_id.value,
          });
          state.loader = false;
        }
        state.isModalVisible = false;
        state.loader = false;
        fetchDataCliente();
      } catch (error) {
        console.log(error);
      } finally {
        state.loader = false;
      }
    }

    async function cepAtributes() {
      try {
        const cep = state.selectedEndereco.cep
          .replace("-", "")
          .replace(".", "");
        state.selectedEndereco.cep = cep;
        const res = await services.cep.apiCep(cep);
        state.selectedEndereco.logradouro = res.data.logradouro;
        state.selectedEndereco.bairro = res.data.bairro;
        state.selectedEndereco.codigo_ibge = res.data.ibge;
        state.selectedEndereco.ibge = res.data.ibge;
        getCityByCode(state.selectedEndereco.ibge);
      } catch (error) {
        console.log(error);
      }
    }

    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        state.selectedEndereco.cidade.estado_id = data.estado_id;
        state.selectedEndereco.cidade_id = data.id;
        getCidade(state.selectedEndereco.cidade.estado_id);
      } catch (error) {
        console.log("aqui:" + error);
      }
    }

    async function getEstados() {
      try {
        const { data } = await services.endereco.getEstados();
        state.estados = data;
      } catch (error) {
        console.log("Erro ao buscar estados:", error);
      }
    }

    async function getCidade(estado_id) {
      try {
        const { data } = await services.endereco.getCidade(estado_id);
        state.cidades = data;
      } catch (error) {
        console.log("Erro ao buscar cidades:", error);
      }
    }

    async function removerEnd(id_endereco) {
      if (confirm("Deseja remover este endereço?")) {
        await services.clientes.deleteEnd({
          id_endereco: id_endereco,
          client_token: client_token.value,
        });
      }
      fetchDataCliente();
    }

    return {
      getCidade,
      getEstados,
      cepAtributes,
      state,
      openModal,
      updateEndereco,
      closeModal,
      removerEnd,
    };
  },
};
</script>
<style scoped>
.div_btn_endereco {
  margin-top: 1rem;
}

.card {
  width: 100%;
  padding: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.div_tile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.div_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h5 {
  color: gray;
  font-size: 14px;
  font-weight: 400;
  font-family: "Poppins";
  margin-top: 5px;
  margin-bottom: 10px;
}

.title {
  color: #000;
  font-size: 32px;
  font-weight: 600;
  font-family: "Poppins";
}

.div_data {
  border-bottom: solid 3px var(--primary);
  background-color: #c4c4c483;
  padding: 5px 5px;
  border-radius: 5px 5px 0px 0px;
}

.div_data p {
  color: #000;
  font-size: 16px;
  margin-bottom: 0;
  font-family: "Poppins";
}

label {
  color: #000;
  font-size: 18px;
  margin-bottom: 0;
  font-family: "Poppins";
}

.div_edit {
  text-align: right;
}

.btn-end {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: #000;
  color: #fff;
  width: auto;
  padding: 5px 10px;
  transition: 0.5s;
  font-size: 14pt;
}

.btn-end:hover {
  background: transparent;
  color: #000;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: auto;
  padding: 5px 10px;
  transition: 0.5s;
  margin-right: 1rem;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.btn-gold {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  width: auto;
  padding: 5px 10px;
  transition: 0.5s;
}

.btn-gold:hover {
  background: var(--primary);
  color: #000;
}

@media (max-width: 575px) {
  .btn_gold {
    margin-top: 5px;
  }

  .btn_transparent {
    margin-right: 0;
  }
}

.lbl_end_principal {
  font-weight: normal;
  font-size: 12pt;
  margin-left: 3px;
}

.modal_endereco {
  display: flex;
  /* Usa flexbox para centralização */
  align-items: center;
  /* Centraliza verticalmente */
  justify-content: center;
  /* Centraliza horizontalmente */
  position: fixed;
  /* Fixa a posição em relação à viewport */
  top: 0;
  /* Começa do topo */
  left: 0;
  /* Começa da esquerda */
  width: 100%;
  /* Ocupa toda a largura da viewport */
  height: 100%;
  /* Ocupa toda a altura da viewport */
  background: rgba(0, 0, 0, 0.5);
  /* Fundo semitransparente para o efeito de overlay */
  z-index: 1050;
  /* Coloca o modal acima de outros elementos */
}

.modal-dialog {
  position: relative;
  /* Posição relativa para conter o conteúdo do modal */
  width: 100%;
  /* Ajusta a largura automaticamente */
  margin: 10px;
  /* Margem para espaçamento */
  pointer-events: none;
  /* Desabilita interação com o conteúdo fora do modal */
  max-width: 700px;
  /* Limita a largura máxima do modal */
}

.modal-content {
  position: relative;
  /* Posição relativa para conter os elementos */
  display: flex;
  /* Flexbox para a disposição dos elementos */
  flex-direction: column;
  /* Disposição vertical */
  width: 100%;
  /* Ocupa toda a largura disponível */
  pointer-events: auto;
  /* Habilita interação com o conteúdo do modal */
  background-color: #fff;
  /* Cor de fundo branca */
  background-clip: padding-box;
  /* Ajusta o recorte de fundo */
  border: 1px solid rgba(0, 0, 0, 0.2);
  /* Borda leve */
  border-radius: 0.3rem;
  /* Borda arredondada */
  outline: 0;
  /* Remove o contorno */
}

.modal-header {
  display: flex;
  /* Flexbox para a disposição dos elementos */
  align-items: center;
  /* Alinhamento vertical centralizado */
  justify-content: space-between;
  /* Espaço entre os elementos */
  padding: 1rem;
  /* Espaçamento interno */
  border-bottom: 1px solid #dee2e6;
  /* Linha divisória inferior */
  border-top-left-radius: 0.3rem;
  /* Bordas arredondadas nos cantos superiores */
  border-top-right-radius: 0.3rem;
}

.modal-title {
  margin-bottom: 0;
  /* Remove a margem inferior */
  line-height: 1.5;
  /* Ajusta a altura da linha */
}

.btn-close {
  padding: 0.5rem;
  /* Espaçamento interno */
  margin: -0.5rem -0.5rem -0.5rem auto;
  /* Margens negativas para ajuste */
}

.modal-body {
  position: relative;
  /* Posição relativa para conter os elementos */
  flex: 1 1 auto;
  /* Flexbox para ajuste automático */
  padding: 1rem;
  /* Espaçamento interno */
}

.modal-footer {
  display: flex;
  /* Flexbox para a disposição dos elementos */
  align-items: center;
  /* Alinhamento vertical centralizado */
  justify-content: flex-end;
  /* Alinhamento dos botões à direita */
  padding: 0.75rem;
  /* Espaçamento interno */
  border-top: 1px solid #dee2e6;
  /* Linha divisória superior */
  border-bottom-right-radius: 0.3rem;
  /* Bordas arredondadas nos cantos inferiores */
  border-bottom-left-radius: 0.3rem;
}
</style>

