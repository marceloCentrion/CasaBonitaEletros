<template>
  <div>
    <div style="background: #fcfcfc; min-height: 100vh">
      <div class="line_top p-2">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="div_img">
                <img src="/logo/logo.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="sct_pedido">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-md-6 mt-4">
              <div class="card">
                <h5 class="card-header">
                  <i class="bi bi-person-circle"></i>
                  Informações Pessoais
                </h5>
                <div class="card-body">
                  <p class="card-text">
                    <strong>Nome:</strong> {{ state.dados.nome }}
                  </p>
                  <p class="card-text">
                    <strong>CPF:</strong> {{ state.dados.cpf }}
                  </p>
                  <p class="card-text">
                    <strong>Data de Nascimento:</strong>
                    {{ state.dados.data_nascimento }}
                  </p>
                  <p class="card-text">
                    <strong>E-mail:</strong>
                    {{ state.dados.email }}
                  </p>
                  <p class="card-text">
                    <strong>Telefone Principal:</strong>
                    {{ state.dados.telefone_principal }}
                  </p>
                  <p class="card-text" v-if="state.dados.telefone_alternativo">
                    <strong>Telefone Alternativo:</strong>
                    {{ state.dados.telefone_alternativo }}
                  </p>
                </div>
              </div>
              <div
                class="card card_endereco"
                v-if="state.obj_frete.metodo !== 'RETIRADA'"
              >
                <h5 class="card-header">
                  <i class="bi bi-truck"></i> Endereço de Entrega
                </h5>
                <div class="card-body" v-if="state.enderecos.length > 0">
                  <div
                    class="mb-2"
                    v-for="endereco in state.enderecos"
                    :key="endereco.id"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        :id="'endereco_' + endereco.id"
                        :value="endereco.id"
                        v-model="state.endereco_id"
                        name="endereco"
                        @change="setEnderecoSelecionado(endereco)"
                      />
                      <label
                        class="form-check-label"
                        :for="'endereco_' + endereco.id"
                      >
                        <p
                          class="endereco_principal"
                          v-if="endereco.principal === 'SIM'"
                        >
                          Endereço Principal
                        </p>
                        <p
                          class="endereco_principal"
                          v-if="endereco.principal === 'NAO'"
                        >
                          Endereço Secundário
                        </p>
                        <strong>
                          {{ endereco.nome }}
                        </strong>
                        <br />
                        {{ endereco.logradouro }}, {{ endereco.numero }},
                        {{ endereco.complemento }}, {{ endereco.bairro }}
                        <br />
                        {{ endereco.cidade.nome }} |
                        {{ endereco.cidade.estado.nome }} | {{ endereco.cep }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="card-body" v-else>
                  <p>Nenhum endereço principal encontrado.</p>
                </div>
                <div class="card-body">
                  <button type="button" class="btn-end" @click="openModal()">
                    <i class="bi bi-house-add"></i> Adicionar Endereço
                  </button>
                </div>
              </div>
              <div class="card mt-3">
                <h5 class="card-header">
                  <i class="bi bi-send-check"></i>
                  Tipo de Entrega
                </h5>
                <div class="card-body">
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <p style="font-weight: bold; margin-bottom: 0">
                        Retirada na Loja
                      </p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        @change="alteraMetodoFrete($event.target, 'RETIRADA')"
                        v-model="state.retirada"
                      />
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between">
                    <div>
                      <p style="font-weight: bold; margin-bottom: 0">
                        Entrega em Maringá via moto taxi
                      </p>
                    </div>
                    <div style="color: #fff">
                      <input
                        type="checkbox"
                        @change="alteraMetodoFrete($event.target, 'MOTO')"
                        v-model="state.moto_taxi"
                      />
                    </div>
                  </div>
                  <div v-if="state.obj_frete.metodo != 'RETIRADA'">
                    <div class="d-flex justify-conten t-between">
                      <div>
                        <span>Frete: {{ state.frete_selecionado.nome }} </span>
                        <span v-if="state.obj_frete.metodo === 'RETIRADA'">
                          - entrega em
                          {{ state.frete_selecionado.dias_entrega }} dias
                        </span>
                      </div>
                      <div>
                        &nbsp;{{
                          parseFloat(
                            state.frete_selecionado.valor_frete
                          ).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                      </div>
                    </div>
                    <p
                      v-if="
                        state.obj_frete.metodo !== 'RETIRADA' &&
                        state.obj_frete.metodo !== 'MOTO'
                      "
                    >
                      <a
                        style="
                          font-size: 11px;
                          font-weight: bold;
                          text-decoration: underline;
                        "
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Ver outras opções de frete
                      </a>
                    </p>
                    <div class="collapse" id="collapseExample">
                      <div
                        class=""
                        v-for="(tipo_frete, i) in state.frete.fretes"
                        :key="tipo_frete.id"
                      >
                        <div v-if="!state.frete.fretes[i].error">
                          <input
                            type="radio"
                            class="radio_frete"
                            :id="'radio_frete_' + i"
                            v-model="state.tipo_frete_selecionado"
                            :value="tipo_frete.id"
                            @change="alterarFrete(tipo_frete)"
                            style="margin-right: 5px"
                          />
                          <label :for="'radio_frete_' + i">
                            {{
                              parseFloat(tipo_frete.preco).toLocaleString(
                                "pt-br",
                                {
                                  style: "currency",
                                  currency: "BRL",
                                }
                              )
                            }}
                            <span>{{ tipo_frete.nome }}</span></label
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    Endereço da Loja:
                    <strong>
                      <p style="margin-bottom: 0">
                        Localização: {{ state.empresa.endereco }},
                        {{ state.empresa.numero }},
                        {{ state.empresa.cidade_uf }}
                      </p>
                      <p style="margin-bottom: 0">
                        CEP: {{ state.empresa.cep }}
                      </p>
                      <p>Telefone: {{ state.empresa.telefone }}</p>
                    </strong>
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <h5 class="card-header">
                  <i class="bi bi-send-check"></i>
                  Cupom de Desconto
                </h5>
                <div class="card-body">
                  <div
                    style="display: flex; justify-content: space-between"
                    v-if="!state.cupom"
                  >
                    <div style="width: 60%">
                      <label>Cupom de desconto:</label>
                      <input
                        type="text"
                        id="codigo_cupom"
                        class="form-control"
                        v-model="state.codigo_cupom"
                      />
                    </div>
                    <div style="width: 20%; padding-left: 5px">
                      <button
                        type="button"
                        @click="buscarCupom"
                        class="btn_aplicar"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>

                  <div
                    style="display: flex; justify-content: space-between"
                    v-else
                  >
                    <div style="width: 70%">
                      <div>
                        <p style="font-weight: bold; margin-bottom: 0">CUPOM</p>
                      </div>
                    </div>
                    <div
                      style="width: 30%; padding-left: 5px; font-weight: bold"
                    >
                      <div v-if="state.cupom.tipo_desconto != 'PERCENTUAL'">
                        <div v-if="state.cupom.desconto">
                          {{
                            state.cupom.desconto.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })
                          }}
                        </div>
                        <div>
                          {{
                            state.cupom.valor.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })
                          }}
                        </div>
                      </div>
                      <div
                        v-else
                        style="
                          padding-left: 5px;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        {{ state.cupom.desconto }} %
                      </div>
                    </div>
                  </div>

                  <div v-if="state.cupom_invalido">
                    <p style="color: red">Cupom inválido</p>
                  </div>

                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-start;
                      margin-top: 10px;
                    "
                    v-if="state.cupom"
                  >
                    <div style="width: 30%">{{ state.cupom.codigo }}</div>

                    <div style="width: 20%">
                      <button
                        class="btn_aplicar"
                        @click="cancelarCupom()"
                        style="margin-top: 0"
                      >
                        Alterar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mt-4">
              <div class="card">
                <h5 class="card-header">
                  <i class="bi bi-cash-stack"></i>
                  Pagamento
                </h5>
                <div class="card-body">
                  <div class="div_titulos_pagamento">
                    <input
                      type="radio"
                      id="radio_cartao_credito"
                      value="CARTAO"
                      class="radio"
                      v-model="state.tipo_pagamento"
                    />
                    <label for="radio_cartao_credito">
                      <i class="bi bi-credit-card"></i>
                      Cartão de Crédito</label
                    >
                  </div>

                  <div
                    class="card_tipo_pagamento"
                    v-if="state.tipo_pagamento == 'CARTAO'"
                  >
                    <div>
                      <label for="nome">Quantidade de Parcelas</label>
                      <select class="form-select" v-model="state.parcela">
                        <option
                          v-for="(parcela, index) in state.parcelas"
                          :key="index"
                          :value="parcela.parcela"
                        >
                          {{ parcela.string }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label for="nome">Número do Cartão</label>
                      <input
                        type="text"
                        id="numero_cartao"
                        class="form-control"
                        v-model="state.cartao.numero.value"
                        placeholder="0000 0000 0000 0000"
                        v-maska
                        data-maska="#### #### #### ####"
                      />
                    </div>
                    <div>
                      <label for="nome">Nome no Cartão</label>
                      <input
                        type="text"
                        id="nome_cartao"
                        class="form-control"
                        v-model="state.cartao.nome.value"
                      />
                    </div>
                    <div>
                      <div class="row">
                        <div class="col-sm-8">
                          <div class="row">
                            <div class="col-sm-12">
                              <label for="nome">Validade</label>
                              <div class="row">
                                <div
                                  class="col-sm-6"
                                  style="padding-right: 0px"
                                >
                                  <select
                                    class="form-select"
                                    v-model="state.cartao.mes.value"
                                  >
                                    <option value="">Mês</option>
                                    <option
                                      v-for="(month, index) in 12"
                                      :key="index"
                                      :value="index"
                                    >
                                      {{ month }}
                                    </option>
                                  </select>
                                </div>
                                <div class="col-sm-6">
                                  <select
                                    class="form-select"
                                    v-model="state.cartao.ano.value"
                                  >
                                    <option value="">Ano</option>
                                    <option
                                      v-for="(ano, index) in state.anos"
                                      :key="index"
                                      :value="ano"
                                    >
                                      {{ ano }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <label>Código CVV</label>
                          <input
                            type="text"
                            id="nome_cartao"
                            class="form-control"
                            v-maska
                            data-maska="###"
                            placeholder="cvv"
                            v-model="state.cartao.cvv.value"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn_comprar mt-2"
                      @click="fazerPedido('CARTAO')"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                  <hr />
                  <div class="div_titulos_pagamento">
                    <input
                      type="radio"
                      id="radio_pix"
                      class="radio"
                      value="PIX"
                      v-model="state.tipo_pagamento"
                    />
                    <label for="radio_pix">
                      <!-- <img
                        src="/images/site/pix_icon.png"
                        style="width: 15px"
                      /> -->
                      Pix</label
                    >
                  </div>
                  <div
                    class="card_tipo_pagamento"
                    v-if="state.tipo_pagamento == 'PIX'"
                  >
                    <p>
                      Pagamento via PIX:
                      <span class="bold">{{
                        state.carrinho.valor_total_pix.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      }}</span>
                    </p>
                    <p>
                      O QR Code será exibido logo após a sua confirmação de
                      compra.
                    </p>

                    <p class="bold">Importante:</p>
                    <p>
                      Após Finalizar a Compra, o PIX gerado fica disponível por
                      6 horas aguardando o seu pagamento, após isso, ele irá
                      expirar e seu pedido será cancelado.
                    </p>

                    <p>
                      O pedido é aprovado em até 1 dia útil após a realização do
                      pagamento.
                    </p>
                    <p>
                      O pagamento via PIX pode ser efetuado pelos aplicativos de
                      internet banking usando o QRCode ou a opção de "Copia e
                      Cola" disponibilizados no App!
                    </p>
                    <button
                      type="button"
                      class="btn_comprar mt-2"
                      @click="fazerPedido('PIX')"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                  <hr />
                  <div class="div_titulos_pagamento">
                    <input
                      type="radio"
                      id="radio_boleto"
                      value="BOLETO"
                      class="radio"
                      v-model="state.tipo_pagamento"
                    />
                    <label for="radio_boleto">
                      <!-- <img
                        src="/images/site/boleto_icon.png"
                        style="width: 25px"
                      /> -->
                      Boleto Bancário</label
                    >
                  </div>

                  <div
                    class="card_tipo_pagamento"
                    v-if="state.tipo_pagamento == 'BOLETO'"
                  >
                    <p>
                      Pagamento no boleto bancário:
                      <span class="bold">{{
                        state.carrinho.valor_total_desconto.toLocaleString(
                          "pt-br",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )
                      }}</span>
                    </p>
                    <p>
                      O boleto será exibido logo após a sua confirmação de
                      compra.
                    </p>
                    <p class="bold">Importante:</p>
                    <p>
                      O pedido é aprovado em até 2 dias úteis após a realização
                      do pagamento. O pagamento do boleto pode ser efetuado pela
                      internet, utilizando o código de barras, ou diretamente em
                      bancos, lotéricas e correios, apresentando o boleto
                      impresso.
                    </p>
                    <button
                      type="button"
                      class="btn_comprar mt-2"
                      @click="fazerPedido('BOLETO')"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-md-6 mt-4">
              <div class="card">
                <h5 class="card-header">
                  <i class="bi bi-box2"></i> Resumo do Pedido
                </h5>
                <div class="card-body">
                  <p class="card-text">
                    <strong>Produtos:</strong>
                  </p>

                  <carousel :items-to-show="1">
                    <slide v-for="produto in state.produtos" :key="produto.id">
                      <div class="div_produto">
                        <img :src="produto.imagem" style="width: 100%" />
                        <div>
                          {{ produto.nome }} ({{
                            produto.estoque.valor_variacao.nome
                          }})
                        </div>
                      </div>
                    </slide>
                    <template #addons>
                      <navigation />
                      <pagination />
                    </template>
                  </carousel>

                  <p class="card-text">
                    <strong>Frete:</strong>
                    {{
                      parseFloat(
                        state.frete_selecionado.valor_frete
                      ).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}
                  </p>

                  <p class="card-text">
                    <strong>Total:</strong>
                    {{
                      state.carrinho.valor_total.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}
                  </p>
                  <p
                    class="card-text"
                    v-if="
                      state.carrinho.valor_total_desconto != null ||
                      state.carrinho.valor_total_desconto != undefined
                    "
                  >
                    <strong>Total com Desconto:</strong>
                    {{
                      state.carrinho.valor_total_desconto.toLocaleString(
                        "pt-br",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )
                    }}
                  </p>
                  <p class="card-text">
                    <strong>Total no Pix:</strong>
                    {{
                      state.carrinho.valor_total_pix.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-2 mt-xl-1 col-md-2 col-sm-4 mt-sm-2 mt-2">
              <div class="div_btn_endereco mt-3 mb-3">
                <NuxtLink to="/carrinho">
                  <button title="Voltar" class="btn_transparent">Voltar</button>
                </NuxtLink>
              </div>
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
                            >Quem irá Receber</label
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
                    class="btn_transparent mr-1 w-auto"
                    @click="closeModal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="btn-gold"
                    @click="updateEndereco"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--  <bot /> -->
    </div>
    <loader :loader="state.loader" />
    <div class="modal_endereco" v-if="state.modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="text-danger">Erro ao realizar pedido</h3>
          </div>
          <div class="modal-body">
            {{ state.msg }}
          </div>
          <div class="modal-footer">
            <div class="d-flex">
              <button
                class="btn btn-danger"
                type="button"
                @click="fecharModalError"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { reactive, onMounted, computed } from "vue";
import services from "@/services/axios";
import { useRouter } from "vue-router";
import { string } from "yup";
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    definePageMeta({
      layout: "blank",
      middleware: "client",
    });

    useHead({
      title: "Casa Bonita Eletros - Finalizar Pedido",
    });

    const router = useRouter();
    const { carregarEmpresaSite } = useSiteData();
    const carrinhoStore = useCarrinhoStore();
    const {
      itens,
      valores_produtos,
      frete_selecionado,
      cupom,
      qtd_parcelas,
      fretes,
      obj_frete,
      valores_totais,

      metodo_frete,
    } = storeToRefs(carrinhoStore);

    const {
      limparCarrinho,
      adicionarPedido,
      limparFrete,
      adicionaFrete,
      resetValoresTotais,
      addCupom,
    } = carrinhoStore;
    const clienteAuthStore = useClienteAuthStore();
    const { client_token, client_id } = storeToRefs(clienteAuthStore);

    const state = reactive({
      modal: false,
      msg: "",
      moto_taxi: false,
      retirada: false,
      empresa: {},
      loader: false,
      dados: {
        enderecos: [],
      },
      cupom: null,
      endereco: { cliente: {} },
      endereco_id: null,
      dados: {},
      enderecos: [],
      fretes: [],
      carrinho: {
        valor_total: "",
        valor_total_desconto: "",
        valor_total_pix: "",
        valor_frete: "",
        valor_produtos: "",
      },
      frete_selecionado: {
        valor_frete: 0,
      },
      cartao: {
        numero: {
          value: null,
          messageError: false,
        },
        nome: {
          value: null,
          messageError: false,
        },
        mes: {
          value: null,
          messageError: false,
        },
        ano: {
          value: null,
          messageError: false,
        },
        cvv: {
          value: null,
          messageError: false,
        },
      },
      produtos: [{}],
      tipo_pagamento: "CARTAO",
      produtos: [],
      pedidoEmAndamento: false,
      loader: false,
      obj_frete: {},
      frete: {
        fretes: [],
      },
      tipo_frete_selecionado: 0,
      selectedEndereco: {
        nome: "",
        telefone: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        complemento: "",
        principal: false,
        metodo_frete: "",
        cidade: {
          estado_id: null,
        },
        cidade_id: null,
      },
    });

    state.obj_frete = obj_frete.value;

    onMounted(() => {
      if (cupom.value && cupom.value.valor != 0) {
        state.cupom = cupom.value;
      }
      const currentYear = new Date().getFullYear();
      var anos = [];
      for (let i = 0; i <= 15; i++) {
        anos.push(currentYear + i);
      }
      state.anos = anos;
      // state.cupom = cupom.value;
      // Verifica se obj_frete.value está definido
      if (obj_frete.value) {
        // Atualiza o valor de frete_selecionado
        state.frete_selecionado = obj_frete.value;

        // Define valor_frete com base em obj_frete.value
        if (obj_frete.value.preco !== undefined) {
          state.frete_selecionado.valor_frete = obj_frete.value.preco;
        } else {
          console.warn("Preco não está definido em obj_frete.value");
        }

        if (state.obj_frete.metodo === "RETIRADA") {
          fetchEmpresa();
        }

        fetchDataCliente(null);

        state.carrinho.valor_frete = 0;
        state.carrinho.valor_produtos = valores_produtos.value.total;

        state.carrinho.valor_total_desconto =
          valores_totais.value.total_desconto;
        state.carrinho.valor_total_pix = valores_totais.value.total_pix;
        state.carrinho.valor_total = valores_totais.value.total;

        state.produtos = itens;

        const principal = state.enderecos.find(
          (endereco) => endereco.principal === "SIM"
        );
        if (principal) {
          state.endereco_id = principal.id;
        }
        state.tipo_frete_selecionado = obj_frete.value.id;
        state.cartao.mes.value = "";

        const isEmpty = (obj) => {
          return Object.keys(obj).length === 0;
        };

        if (!isEmpty(fretes.value)) {
          state.frete = fretes.value;
          state.cep = state.frete.cep;
        }
      } else {
        console.warn("obj_frete.value está indefinido");
      }
      calcularValorTotal();
      fetchParcelas();
    });

    async function alteraMetodoFrete(target, metodo_frete) {
      if (target.checked) {
        state.obj_frete.metodo = metodo_frete;
        if (metodo_frete == "RETIRADA") {
          state.moto_taxi = false;
          state.frete_selecionado.valor_frete = 0;
          state.frete_selecionado.nome = "Retirada";
          state.frete.preco = 0;
          fetchEmpresa();
        } else {
          state.retirada = false;
          state.frete_selecionado.valor_frete = 10;
          state.frete_selecionado.nome = "Moto Taxi";
          state.frete.preco = 10;

          state.carrinho.valor_total = valores_produtos.value.total;
          state.carrinho.valor_total_desconto =
            valores_produtos.value.total_desconto;
          state.carrinho.valor_total_pix = valores_produtos.value.total_pix;
        }
      } else {
        state.obj_frete.metodo = "CORREIOS";
        setEnderecoSelecionado(state.enderecos[0]);
        await alterarFrete(state.fretes[0]);

        // console.log("aaa");
        //   console.log(state.frete.preco);
        //     state.frete_selecionado.valor_frete = state.frete.preco;
      }

      // Recalcule o valor total após atualizar o frete
      fetchParcelas();
      recalcularTotalCarrinho();

      //   console.log("metodo frete dos check: " + state.obj_frete.metodo);
    }

    async function recalcularTotalCarrinho() {
      state.carrinho.valor_frete = state.frete_selecionado.valor_frete;
      state.carrinho.valor_total =
        state.carrinho.valor_produtos + state.frete_selecionado.valor_frete;

      state.carrinho.valor_total_pix =
        parseFloat(valores_produtos.value.total_pix) +
        parseFloat(state.frete_selecionado.valor_frete);

      state.carrinho.valor_total_desconto =
        parseFloat(valores_produtos.value.total_desconto) +
        parseFloat(state.frete_selecionado.valor_frete);
    }

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

    async function fetchEmpresa() {
      try {
        state.empresa = await carregarEmpresaSite();
      } catch (error) {
        console.log("Erro ao carregar empresa.");
      }
    }

    async function fetchDataCliente(id_novo_end) {
      try {
        const { data } = await services.clientes.getDataCliente({
          client_token: client_token.value,
          client_id: client_id.value,
        });
        state.dados = data;

        state.enderecos = data.enderecos;
        const principal = state.enderecos.find(
          (endereco) => endereco.principal === "SIM"
        );

        if (
          principal &&
          state.obj_frete.metodo !== "RETIRADA" &&
          state.obj_frete.metodo !== "MOTO"
        ) {
          state.endereco_id = principal.id;
          calcularFrete(principal.cep);
        } else if (state.enderecos.length > 0) {
          state.endereco_id = state.enderecos[0].id;
        }

        if (id_novo_end) state.endereco_id = id_novo_end;
      } catch (error) {
        router.push("/login");
      }
    }

    async function cancelarCupom() {
      resetValoresTotais();
      state.cupom = null;
      calcularValorTotal();
    }

    function calcularValorTotal() {
      state.carrinho.valor_total =
        parseFloat(valores_produtos.value.total) +
        parseFloat(state.frete_selecionado.valor_frete);
      state.carrinho.valor_total_pix;
      state.carrinho.valor_total_pix =
        parseFloat(valores_produtos.value.total_pix) +
        parseFloat(state.frete_selecionado.valor_frete);

      state.carrinho.valor_total_desconto =
        parseFloat(valores_produtos.value.total_desconto) +
        parseFloat(state.frete_selecionado.valor_frete);
    }

    async function fetchParcelas() {
      try {
        const { data } = await services.taxas.getAllSite();
        var array_parcelas = [];

        for (let i = 1; i <= 12; i++) {
          if (i <= qtd_parcelas.value) {
            var pr = {};
            var valor = state.carrinho.valor_total_desconto;
            pr.valor = valor.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });

            var valor_parcela = valor / i;

            pr.valor_parcela = valor_parcela.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            });

            pr.parcela = i;

            pr.juros = "sem juros";

            pr.string = i + "x " + pr.valor_parcela + " sem juros";
            array_parcelas.push(pr);
            continue;
          }
          for (let i2 = 0; i2 < data.length; i2++) {
            if (i == data[i2].parcelas) {
              var pr = {};
              var valor_acrecimo =
                state.carrinho.valor_total_desconto * (data[i2].taxas / 100);

              var valor = state.carrinho.valor_total_desconto + valor_acrecimo;
              var valor_parcela = valor / i;

              var parcela_formatada = valor_parcela.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });

              pr.valor = valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              });
              pr.juros = "com juros";
              pr.parcela = i;
              pr.string =
                i + " parcelas de " + parcela_formatada + " (" + pr.valor + ")";
              array_parcelas.push(pr);
            }
          }
        }

        state.parcelas = array_parcelas;
        /*
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          parcelas;
          console.log(element);
        }*/

        //      state.dados = data;
        //      state.enderecos = data.enderecos;
      } catch (error) {
        alert("Erro ao carregar parcelas, por favor recarregue a página.");
      }
    }

    async function setEnderecoSelecionado(endereco) {
      limparFrete();
      adicionaFrete(state.fretes, state.fretes[0], "CALCULADO");
      calcularFrete(endereco.cep);
    }

    async function alterarFrete(frete) {
      limparFrete();
      if (frete.error) {
        frete = state.fretes[1];
      }
      adicionaFrete(state.fretes, frete, "CALCULADO");

      state.frete_selecionado = frete;
      state.frete_selecionado.valor_frete = frete.preco;

      state.frete.preco = frete.preco;
      state.frete.prazo_frete = frete.dias_entrega;

      state.tipo_frete_selecionado = frete.id;

      state.prazo_frete = frete.dias_entrega;

      state.frete.prazo_frete = frete.dias_entrega;

      state.prazo_frete = frete.dias_entrega;

      state.carrinho.valor_total = valores_produtos.value.total;
      state.carrinho.valor_total_desconto =
        valores_produtos.value.total_desconto;
      state.carrinho.valor_total_pix = valores_produtos.value.total_pix;

      //  state.frete_selecionado.valor_frete = data.fretes[1].preco;
    }

    async function calcularFrete(cep) {
      var produtos_req = [];

      state.produtos.forEach((item) => {
        var produto = {};
        produto.id = item.id;
        produto.qtd = item.quantidade;
        produtos_req.push(produto);
      });

      limparFrete();
      var cep_sem_traco = cep.replace("-", "");
      try {
        state.loader = true;
        const { data } = await services.pedido.calcularFrete({
          produtos_req,
          cep_destinatario: cep_sem_traco,
        });
        state.frete = {};
        if (data.fretes[0].error) {
          adicionaFrete(data, data.fretes[1], "CALCULADO");
          state.obj_frete_selecionado = data.fretes[1];
          state.frete.preco = data.fretes[1].preco;
          state.frete.prazo_frete = data.fretes[1].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[1].id;
          state.prazo_frete = data.fretes[1].dias_entrega;
          state.fretes = data.fretes;
          state.frete_selecionado.valor_frete = data.fretes[1].preco;

          // state.carrinho.valor_total =
          //   valores_produtos.value.total// + parseFloat(data.fretes[1].preco);
        } else {
          state.fretes = data.fretes;
          adicionaFrete(data, data.fretes[0], "CALCULADO");
          state.obj_frete_selecionado = data.fretes[0];
          state.frete.preco = data.fretes[0].preco;
          state.frete.prazo_frete = data.fretes[0].dias_entrega;
          state.tipo_frete_selecionado = data.fretes[0].id;
          state.prazo_frete = data.fretes[0].dias_entrega;
          state.frete_selecionado.valor_frete = data.fretes[0].preco;
        }
        state.loader = false;
        state.frete = data;
        state.frete.fretes = state.fretes;
        state.carrinho.valor_total = valores_totais.value.total;
        state.carrinho.valor_total_desconto =
          valores_totais.value.total_desconto;
        state.carrinho.valor_total_pix = valores_totais.value.total_pix;
      } catch (error) {
        alert("Erro ao calcular Frete!");
      } finally {
        state.loader = false;
      }
    }

    async function buscarCupom() {
      try {
        const { data } = await services.cupons.getPorCodigo({
          codigo_cupom: state.codigo_cupom,
          cliente_id: client_id.value,
        });
        state.cupom = data;
        addCupom(
          state.cupom.id,
          state.cupom.tipo_desconto,
          state.cupom.desconto
        );
        if (state.cupom.tipo_desconto == "VALOR") {
          state.total = 10;
          //    state.valores_produtos.total_desconto - state.cupom.desconto;
        } else if (state.cupom.tipo_desconto == "PERCENTUAL") {
          state.carrinho.valor_total_desconto =
            valores_produtos.value.total_desconto;

          state.carrinho.valor_total_pix = valores_produtos.value.total_pix;

          /*
          state.carrinho.valor_total = state.carrinho.valor_produtos + state.frete_selecionado.valor_frete;



          state.valores_produtos.total_desconto =



            valores_produtos.value.valor_total_desconto -
            state.valores_produtos.total * (state.cupom.desconto / 100);
valores_produtos.value
state.valores_produtos.total_desconto =
            state.valores_produtos.total -
            state.valores_produtos.total * (state.cupom.desconto / 100);


      state.carrinho.valor_total =
        state.carrinho.valor_produtos + state.frete_selecionado.valor_frete;

      state.carrinho.valor_total_pix =
        parseFloat(valores_produtos.value.total_pix) +
        parseFloat(state.frete_selecionado.valor_frete);

      state.carrinho.valor_total_desconto =
        parseFloat(valores_produtos.value.total_desconto) +
        parseFloat(state.frete_selecionado.valor_frete);






          state.valores_produtos.total_desconto =
            state.valores_produtos.total -
            state.valores_produtos.total * (state.cupom.desconto / 100);

          var pix =
            state.valores_produtos.total -
            state.valores_produtos.total * (state.cupom.desconto / 100);

          state.valores_produtos.total_pix = pix - pix * (5 / 100);
          /*
          state.valores_produtos.total_pix =
            state.valores_produtos.total_pix -
            state.valores_produtos.total_pix * (state.cupom.desconto / 100) -
            (state.valores_produtos.total_pix -
              state.valores_produtos.total_pix * (10 / 100));*/
        }
        calcularValorTotal();
        state.cupom_invalido = false;
      } catch (error) {
        //  state.cupom_invalido = true;
        state.cupom = null;
        state;
      }
    }

    async function fazerPedido(tipo_pagamento) {
      var is = 1;

      var parcela = state.parcela;
      state.loader = true;
      state.pedidoEmAndamento = true;
      if (tipo_pagamento == "CARTAO") {
        if (
          state.cartao.numero.value == "" ||
          state.cartao.mes.value == "" ||
          state.cartao.ano.value == "" ||
          state.cartao.cvv.value == ""
        ) {
          alert("Preencha os dados do cartão!");
          state.loader = false;
          return;
        }

        const numberFormat = state.cartao.numero.value.replace(/\s+/g, "");
        var cartao = {};
        cartao.numero = numberFormat;
        cartao.nome = state.cartao.nome.value;
        cartao.mes = state.cartao.mes.value;
        cartao.ano = state.cartao.ano.value;
        cartao.cvv = state.cartao.cvv.value;
      } else {
        parcela = 1;
      }

      try {
        var dataPedido = await services.clientes.fazerPedido({
          client_token: client_token.value,
          dados: {
            metodo_frete: state.frete_selecionado.nome,
            endereco_id: state.endereco_id,
            cliente_id: client_id.value,
            valor_total: state.carrinho.valor_total,
            preco_frete: state.frete_selecionado.valor_frete,
            tipo_frete: state.frete_selecionado.nome,
            frete_id: state.tipo_frete_selecionado,
            valor_produtos: state.carrinho.valor_produtos,
            tipo_pagamento,
            estimativa_entrega: state.frete_selecionado.dias_entrega,
            parcela,
            cartao,
            produtos: state.produtos,
            ...state.carrinho,
          },
        });
        limparCarrinho();
        adicionarPedido(dataPedido.data);
        state.loader = false;
        state.pedidoEmAndamento = false;
        router.push("/pedido-realizado");
      } catch (error) {
        if (error.response.status == 500) {
          state.loader = false;
          state.pedidoEmAndamento = false;
          state.modal = true;
          state.msg = error.response.data.msg;
          return;
        }

        let error_msg = "";
        if (error.response && error.response.data) {
          if (error.response.data.error && error.response.data.error.message) {
            error_msg = error.response.data.error.message;
          } else if (error.response.data.message) {
            error_msg = error.response.data.message;
          }
        } else {
          error_msg = "Ocorreu um erro desconhecido.";
        }
        state.loader = false;
        state.pedidoEmAndamento = false;
        state.modal = true;
        state.msg = error_msg;
      } finally {
        state.loader = false;
      }
    }

    async function updateEndereco() {
      try {
        const enderecoData = {
          ...state.selectedEndereco,
          principal: state.selectedEndereco.principal ? "SIM" : "NAO",
        };
        var end;
        if (state.selectedEndereco.id) {
          end = await services.clientes.upEndereco({
            id_endereco: state.selectedEndereco.id,
            endereco: enderecoData,
            client_token: client_token.value,
          });
        } else {
          enderecoData.cliente_id = client_id.value;
          end = await services.clientes.createEndereco({
            endereco: enderecoData,
            client_token: client_token.value,
            client_id: client_id.value,
          });
        }
        calcularFrete(state.selectedEndereco.cep);
        state.isModalVisible = false;
        fetchDataCliente(end.data.id);
        recalcularTotalCarrinho();
      } catch (error) {
        console.log("Erro ao atualizar o endereco");
      }
    }

    function abrirModal() {
      state.modalOpen = true;
    }

    function fecharModalError() {
      state.modal = false;
    }
    function fecharModal() {
      state.modalOpen = false;
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
        console.log("Erro ao carregar cep");
      }
    }

    async function getCityByCode(cod_ibge) {
      try {
        const { data } = await services.endereco.getCityByCode(cod_ibge);
        state.selectedEndereco.cidade.estado_id = data.estado_id;
        state.selectedEndereco.cidade_id = data.id;
        getCidade(state.selectedEndereco.cidade.estado_id);
      } catch (error) {
        console.log("Erro ao carregar cidade");
      }
    }

    async function getEstados() {
      try {
        const { data } = await services.endereco.getEstados();
        state.estados = data;
      } catch {
        console.log("Erro ao buscar estados");
      }
    }

    async function getCidade(estado_id) {
      try {
        const { data } = await services.endereco.getCidade(estado_id);
        state.cidades = data;
      } catch {
        console.log("Erro ao buscar cidades");
      }
    }

    return {
      fecharModalError,
      getCidade,
      getEstados,
      fazerPedido,
      cepAtributes,
      fecharModal,
      abrirModal,
      setEnderecoSelecionado,
      state,
      Carousel,
      Slide,
      Pagination,
      Navigation,
      openModal,
      closeModal,
      updateEndereco,
      alterarFrete,
      alteraMetodoFrete,
      recalcularTotalCarrinho,
      buscarCupom,
      cancelarCupom,
    };
  },
};
</script>

<style scoped>
.div_img img {
  width: 80px;
}

.btn-end {
  font-family: "Poppins", sans-serif;
  background: transparent;
  color: #000;
  width: auto;
  transition: 0.5s;
  font-size: 10pt;
}

.btn-end:hover {
  background: transparent;
  color: var(--primary);
}

.endereco_principal {
  color: var(--primary);
  margin-bottom: 0;
  font-weight: 600;
}

.btn_save {
  padding: 5px;
  width: 100px;
  background: #00a000;
  border: solid 2px #000;
  border-radius: 5px;
  color: #000;
  transition: 0.2s;
}

.div_produto {
  width: 80%;
}

.div_titulos_pagamento {
  padding: 10px 0px;
}

.card_tipo_pagamento {
  padding: 10px;
  border: #dee2e6 solid 1px;
  border-radius: 10px;
  font-size: 10pt;
}

.card_tipo_pagamento p {
  margin-bottom: 0.2rem;
}

.card_tipo_pagamento select,
.card_tipo_pagamento input {
  font-size: 10pt;
}

.bold {
  font-weight: bold;
}

#sct_pedido {
  margin-top: 2rem;
  margin-bottom: 0;
}

.line_top {
  background: #000;
  border-bottom: solid 5px var(--primary);
}

.card {
  background: #fff;
  box-shadow: 4px 4px 5px 1px rgba(0, 0, 0, 0.26);
}

.card .card-header {
  color: var(--primary);
  background: #000;
  border-bottom: solid 2px var(--primary);
  padding: 1rem;
}

.card-text {
  color: #000;
  margin-bottom: 5px;
}

.card_endereco {
  margin-top: 1rem;
}

.card_carrosel {
  margin-top: 1rem;
}

.btn_transparent {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  width: 240px;
  padding: 5px;
  transition: 0.5s;
}

.btn_transparent:hover {
  background: #000;
  color: #fff;
}

.p-txt {
  color: #000;
  margin-bottom: 10px;
  font-size: 12pt;
  font-weight: 500;
}

.form {
  --width-of-input: 100%;
  --border-height: 1px;
  --border-before-color: rgba(221, 221, 221, 0.39);
  --border-after-color: rgb(255, 0, 0);
  --input-hovered-color: #e049491f;
  position: relative;
  width: var(--width-of-input);
}

.radio {
  margin-right: 10px;
}

.input {
  color: #000;
  font-size: 12pt;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5px;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  width: 0%;
  height: 2px;
  bottom: 0;
  left: 0;
  transition: 0.3s;
}

/* Hover on Input */
.input:hover {
  background: var(--input-hovered-color);
}

.input:focus {
  outline: none;
}

.input:focus ~ .input-border {
  width: 100%;
}

.form label {
  font-size: 14pt;
  margin-bottom: 0;
  color: #000;
}

.div_btn {
  text-align: right;
}

#togglePass {
  background: transparent;
  border: none;
}

#togglePass:hover {
  background: var(--input-hovered-color);
}

.btn_aplicar {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: #000;
  width: 100%;
  padding: 8px;
  font-size: 10pt;
  transition: 0.5s;
  font-weight: 400;
  margin-top: 25px;
}

.btn_comprar {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: #000;
  width: 100%;
  padding: 8px;
  transition: 0.5s;
  font-weight: 500;
}

.btn_gold {
  font-family: "Poppins", sans-serif;
  border-radius: 4px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  width: 200px;
  padding: 4px;
  transition: 0.5s;
}

.btn_gold:hover {
  background: var(--primary);
  color: #000;
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

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal_endereco {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

.modal-dialog {
  position: relative;
  width: 100%;
  margin: 10px;
  pointer-events: none;
  max-width: 700px;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: 0;
}

.modal-header {
  display: flex;
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

