<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h3>Cadastrar Produto</h3>
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
              id="image-tab"
              data-bs-toggle="tab"
              data-bs-target="#image-tab-pane"
              type="button"
              role="tab"
              aria-controls="image-tab-pane"
              aria-selected="false"
            >
              Imagens
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="arquivo3d-tab"
              data-bs-toggle="tab"
              data-bs-target="#arquivo3d-tab-pane"
              type="button"
              role="tab"
              aria-controls="arquivo3d-tab-pane"
              aria-selected="false"
            >
              Arquivos 3D
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
              <div class="col-md-3">
                <BaseInput
                  id="ref"
                  label="REF"
                  v-model="state.produto.ref"
                  placeholder="Ex: ABC123D4EFG"
                  :isInvalid="!!state.errors.ref"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseSelect
                  label="Grupo"
                  v-model="state.produto.grupo_id"
                  placeholder="Selecione..."
                  :options="
                    state.grupos.map((g) => ({ value: g.id, label: g.nome }))
                  "
                  :isInvalid="!!state.errors.grupo_id"
                  errorMessage="Preencha este campo"
                  @update:modelValue="fetchCategoria"
                />
              </div>
              <div class="col-md-3">
                <BaseSelect
                  :label="
                    state.produto.grupo_id
                      ? 'Categorias'
                      : 'Categorias (selecione um grupo)'
                  "
                  v-model="state.produto.categoria_id"
                  placeholder="Selecione..."
                  :options="
                    state.categorias.map((c) => ({
                      value: c.id,
                      label: c.nome,
                    }))
                  "
                  :disabled="!state.produto.grupo_id"
                  :isInvalid="!!state.errors.categoria_id"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseSelect
                  label="Marca"
                  v-model="state.produto.marca_id"
                  placeholder="Selecione..."
                  :options="
                    state.marcas.map((m) => ({ value: m.id, label: m.nome }))
                  "
                  :isInvalid="!!state.errors.marca_id"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-4">
                <BaseInput
                  id="nome"
                  label="Nome"
                  v-model="state.produto.nome"
                  placeholder="Nome do produto"
                  :isInvalid="!!state.errors.nome"
                  errorMessage="Preencha este campo"
                  @blur="carregarURN($event.target.value)"
                />
              </div>
              <div class="col-md-4">
                <BaseInput
                  id="urn"
                  label="URN"
                  v-model="state.produto.urn"
                  placeholder="Ex: nome-do-produto"
                  :isInvalid="!!state.errors.urn"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-12">
                <br />
                <input
                  style="cursor: pointer"
                  type="checkbox"
                  id="unico"
                  v-model="state.check_item_unico"
                  @change="
                    state.produto.item_unico = $event.target.checked
                      ? 'SIM'
                      : 'NAO'
                  "
                />
                <label style="cursor: pointer" class="ms-1" for="unico"
                  >Item Único</label
                >
              </div>
            </div>

            <h4>Preços praticados</h4>
            <div>
              <input
                style="cursor: pointer"
                type="checkbox"
                id="tem_desconto"
                v-model="state.produto.check_tem_desconto"
                @change="
                  if ($event.target.checked) {
                    state.produto.tem_desconto = 'SIM';
                  } else {
                    state.produto.tem_desconto = 'NAO';
                    state.produto.preco_desconto = '';
                  }
                "
              />
              <label style="cursor: pointer" for="tem_desconto">
                Produto com desconto.
                <button
                  title="Marque se o produto tiver desconto."
                  type="button"
                ></button>
              </label>
            </div>
            <div class="row">
              <div class="col-md-2">
                <div
                  class="input-cifrao-wrapper"
                  :class="{ 'is-invalid': !!state.errors.preco }"
                >
                  <span class="cifrao">R$</span>
                  <BaseInput
                    label="Preço"
                    :modelValue="state.produto.preco"
                    @update:modelValue="(val) => atualizarPreco('preco', val)"
                    placeholder="0,00"
                  />
                </div>
                <span v-if="state.errors.preco" class="text-danger" style="font-size: 11px; margin-top: 4px; display: block;">Preencha este campo</span>
              </div>
              <div class="col-md-2">
                <div
                  class="input-cifrao-wrapper"
                  :class="{
                    'is-invalid': !!state.errors.preco_desconto,
                    disabled: !state.produto.check_tem_desconto,
                  }"
                >
                  <span class="cifrao">R$</span>
                  <BaseInput
                    label="Preço Desconto"
                    :modelValue="state.produto.preco_desconto"
                    @update:modelValue="(val) => atualizarPreco('preco_desconto', val)"
                    placeholder="0,00"
                    :disabled="!state.produto.check_tem_desconto"
                  />
                </div>
                <span v-if="state.errors.preco_desconto" class="text-danger" style="font-size: 11px; margin-top: 4px; display: block;">Preencha este campo</span>
              </div>
              <div class="col-md-2">
                <div
                  class="input-cifrao-wrapper"
                  :class="{ 'is-invalid': !!state.errors.preco_pix }"
                >
                  <span class="cifrao">R$</span>
                  <BaseInput
                    label="Preço PIX"
                    :modelValue="state.produto.preco_pix"
                    @update:modelValue="(val) => atualizarPreco('preco_pix', val)"
                    placeholder="0,00"
                  />
                </div>
                <span v-if="state.errors.preco_pix" class="text-danger" style="font-size: 11px; margin-top: 4px; display: block;">Preencha este campo</span>
              </div>
              <div class="col-md-2">
                <BaseSelect
                  label="Parcelas"
                  v-model="state.produto.parcelas"
                  placeholder="Selecione..."
                  :options="
                    Array.from({ length: 12 }, (_, i) => ({
                      value: String(i + 1),
                      label: String(i + 1),
                    }))
                  "
                  :isInvalid="!!state.errors.parcelas"
                  errorMessage="Preencha este campo"
                />
              </div>
            </div>

            <h4>Medidas</h4>
            <div class="row">
              <div class="col-md-3">
                <BaseInput
                  label="Peso (kg)"
                  type="number"
                  step="any"
                  min="0"
                  v-model="state.produto.peso"
                  placeholder="0.000"
                  :isInvalid="!!state.errors.peso"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Altura (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.medida_altura"
                  placeholder="0"
                  :isInvalid="!!state.errors.medida_altura"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Largura (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.medida_largura"
                  placeholder="0"
                  :isInvalid="!!state.errors.medida_largura"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Profundidade (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.medida_profundidade"
                  placeholder="0"
                  :isInvalid="!!state.errors.medida_profundidade"
                  errorMessage="Preencha este campo"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Peso Embalado (kg)"
                  type="number"
                  step="any"
                  min="0"
                  v-model="state.produto.peso_embalado"
                  placeholder="0.000"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Altura Embalado (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.altura_embalado"
                  placeholder="0"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Largura Embalado (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.largura_embalado"
                  placeholder="0"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="Profundidade Embalado (mm)"
                  type="number"
                  step="1"
                  min="0"
                  v-model="state.produto.profundidade_embalado"
                  placeholder="0"
                />
              </div>
            </div>

            <h4>Dados Fiscais</h4>
            <div class="row">
              <div class="col-md-3">
                <BaseInput
                  label="NCM"
                  v-model="state.produto.ncm"
                  placeholder="Digite o NCM"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  label="EAN"
                  v-model="state.produto.ean"
                  placeholder="Digite o EAN"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <label>Descrição</label>
                <editor v-model="state.produto.descricao" />
              </div>
              <div class="col-md-2">
                <BaseSelect
                  label="Status"
                  v-model="state.produto.status"
                  :options="[
                    { value: 'ATIVO', label: 'Ativo' },
                    { value: 'INATIVO', label: 'Inativo' },
                  ]"
                />
              </div>
              <div class="col-md-2">
                <BaseSelect
                  label="Mais Vendidos"
                  v-model="state.produto.destaque1"
                  :options="[
                    { value: 'SIM', label: 'Sim' },
                    { value: 'NAO', label: 'Não' },
                  ]"
                />
              </div>
              <div class="col-md-2">
                <BaseSelect
                  label="Seleção Premium"
                  v-model="state.produto.destaque2"
                  :options="[
                    { value: 'SIM', label: 'Sim' },
                    { value: 'NAO', label: 'Não' },
                  ]"
                />
              </div>
              <div class="col-md-2">
                <BaseSelect
                  label="Lançamentos"
                  v-model="state.produto.destaque3"
                  :options="[
                    { value: 'SIM', label: 'Sim' },
                    { value: 'NAO', label: 'Não' },
                  ]"
                />
              </div>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="image-tab-pane"
            role="tabpanel"
            aria-labelledby="image-tab"
            tabindex="0"
          >
            <div class="div_imagens">
              <draggable
                :list="state.imagens"
                :disabled="!state.enabled"
                item-key="name"
                class="list-group list-group-horizontal"
                ghost-class="ghost"
                :move="checkMove"
                @start="state.dragging = true"
                @end="state.dragging = false"
              >
                <template #item="{ element, index }">
                  <div
                    v-if="element.nova"
                    class="list-group-item"
                    :class="{ 'not-draggable': !element.draggable }"
                  >
                    <div class="file-upload">
                      <input
                        id="file-input-imagem"
                        type="file"
                        class="form-control"
                        multiple
                        accept="image/*"
                        @change="adicionarImagens"
                      />
                      <label for="file-input-imagem">
                        <div
                          class="adicionar_imagem"
                          @dragover.prevent
                          @drop.prevent="onDropImagem"
                        >
                          <div class="icones">
                            <i class="bi bi-card-image i1"></i>
                            <i class="bi bi-plus i2"></i>
                          </div>
                          <span class="drop-hint">Arraste ou clique</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div
                    v-else
                    class="list-group-item"
                    :class="{ 'not-draggable': !element.draggable }"
                  >
                    <img :src="element.imagem" class="img_produto" />
                    <button
                      class="btn_remover"
                      @click="removerImagem(index)"
                      type="button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </template>
              </draggable>
            </div>
          </div>

          <div
            class="tab-pane fade"
            id="arquivo3d-tab-pane"
            role="tabpanel"
            aria-labelledby="arquivo3d-tab"
            tabindex="0"
          >
            <div class="div_imagens">
              <div class="list-group list-group-horizontal flex-wrap">
                <div class="list-group-item">
                  <div class="file-upload">
                    <input
                      id="file-input-3d"
                      type="file"
                      class="form-control"
                      multiple
                      accept=".glb,.gltf,.obj,.fbx,.stl,.ply,.3ds,.dae"
                      @change="adicionarArquivos3D"
                    />
                    <label for="file-input-3d">
                      <div
                        class="adicionar_imagem"
                        @dragover.prevent
                        @drop.prevent="onDrop3D"
                      >
                        <div class="icones">
                          <i class="bi bi-box i1"></i>
                          <i class="bi bi-plus i2"></i>
                        </div>
                        <span class="drop-hint">Arraste ou clique</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div
                  v-for="(arquivo, index) in state.arquivos_3d"
                  :key="index"
                  class="list-group-item arquivo3d-item"
                >
                  <div class="arquivo3d-card">
                    <i class="bi bi-box-fill arquivo3d-icon"></i>
                    <span class="arquivo3d-nome" :title="arquivo.nome">{{
                      arquivo.nome
                    }}</span>
                    <button
                      class="btn_remover"
                      @click="removerArquivo3D(index)"
                      type="button"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="text-right mt-10 d-flex flex-row-reverse justify-content-between"
          >
            <SecButton class="w-fit-content px-8" @click="salvarProduto" :disabled="state.isLoading">
              {{ state.isLoading ? "Salvando..." : "Salvar" }}
            </SecButton>
            <NuxtLink class="no-link" to="/admin/produtos">
              <OutlineButton type="button">Cancelar</OutlineButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services/axios";
import draggable from "vuedraggable";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import SecButton from "~/components/SecButton.vue";
import OutlineButton from "~/components/OutlineButton.vue";
import { useToast } from "@/composables/useToast";

export default {
  components: { draggable, BaseInput, BaseSelect, SecButton, OutlineButton },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const token = authStore.token;
    const toast = useToast();

    const state = reactive({
      isLoading: false,
      produto: {
        ref: "",
        grupo_id: "",
        categoria_id: "",
        marca_id: "",
        nome: "",
        urn: "",
        item_unico: "NAO",
        check_tem_desconto: false,
        tem_desconto: "NAO",
        preco: "",
        preco_desconto: "",
        preco_pix: "",
        parcelas: "",
        peso: "",
        medida_altura: "",
        medida_largura: "",
        medida_profundidade: "",
        peso_embalado: "",
        altura_embalado: "",
        largura_embalado: "",
        profundidade_embalado: "",
        ncm: "",
        ean: "",
        descricao: "",
        status: "ATIVO",
        destaque1: "NAO",
        destaque2: "NAO",
        destaque3: "NAO",
      },
      errors: {},
      check_item_unico: false,
      grupos: [],
      categorias: [],
      marcas: [],
      enabled: true,
      dragging: false,
      imagens: [{ imagem: null, nova: true, draggable: false }],
      arquivos_3d: [],
    });

    function applyMoneyMask(val) {
      if (!val) return "";
      let v = String(val).replace(/\D/g, "");
      if (!v) return "";
      v = Number(v).toString();
      v = v.padStart(3, "0");
      v = v.slice(0, -2) + "," + v.slice(-2);
      v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return v;
    }

    function atualizarPreco(campo, val) {
      const masked = applyMoneyMask(val);
      if (state.produto[campo] === masked) {
        state.produto[campo] = masked + " ";
        nextTick(() => {
          state.produto[campo] = masked;
        });
      } else {
        state.produto[campo] = masked;
      }
    }

    function parseMoney(val) {
      if (!val && val !== 0) return null;
      return parseFloat(String(val).replace(/\./g, "").replace(",", "."));
    }

    onMounted(() => {
      fetchGrupos();
      fetchMarcas();
    });

    async function fetchGrupos() {
      try {
        const { data } = await services.grupos.getGruposAtivos({ token });
        state.grupos = data;
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCategoria(grupo_id) {
      state.produto.categoria_id = "";
      state.categorias = [];
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

    async function fetchMarcas() {
      try {
        const { data } = await services.marcas.marcasAtivas();
        state.marcas = data;
      } catch (error) {
        console.log(error);
      }
    }

    function carregarURN(nome) {
      state.produto.urn = nome.replace(/\s+/g, "-").toLowerCase();
    }

    function checkMove() {}

    async function adicionarImagens(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        state.imagens.push({
          id: Date.now() + i,
          file,
          draggable: true,
          imagem: URL.createObjectURL(file),
          nova: false,
        });
      }
    }

    function onDropImagem(event) {
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        state.imagens.push({
          id: Date.now() + i,
          file,
          draggable: true,
          imagem: URL.createObjectURL(file),
          nova: false,
        });
      }
    }

    async function removerImagem(index) {
      state.imagens.splice(index, 1);
      const fileInput = document.querySelector("#file-input-imagem");
      if (fileInput) fileInput.value = null;
    }

    async function adicionarArquivos3D(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        state.arquivos_3d.push({ id: Date.now() + i, file, nome: file.name });
      }
    }

    function onDrop3D(event) {
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        state.arquivos_3d.push({
          id: Date.now() + i,
          file: files[i],
          nome: files[i].name,
        });
      }
    }

    function removerArquivo3D(index) {
      state.arquivos_3d.splice(index, 1);
      const fileInput = document.querySelector("#file-input-3d");
      if (fileInput) fileInput.value = null;
    }

    async function salvarProduto() {
      state.errors = {};
      let erro = false;

      const obrigatorios = [
        "ref",
        "categoria_id",
        "marca_id",
        "nome",
        "urn",
        "preco",
        "preco_pix",
        "parcelas",
        "peso",
        "medida_altura",
        "medida_largura",
        "medida_profundidade",
      ];

      obrigatorios.forEach((campo) => {
        if (!state.produto[campo]) {
          state.errors[campo] = true;
          erro = true;
        }
      });

      if (
        state.produto.tem_desconto === "SIM" &&
        !state.produto.preco_desconto
      ) {
        state.errors.preco_desconto = true;
        erro = true;
      }

      if (erro) {
        toast.error("Por favor, preencha todos os campos obrigatórios destacados.");
        return;
      }
      
      if (state.isLoading) return;
      state.isLoading = true;

      const formData = new FormData();
      formData.append("ref", state.produto.ref);
      formData.append("categoria_id", state.produto.categoria_id);
      formData.append("marca_id", state.produto.marca_id);
      formData.append("nome", state.produto.nome);
      formData.append("urn", state.produto.urn);
      formData.append("item_unico", state.produto.item_unico);
      formData.append("tem_desconto", state.produto.tem_desconto);
      formData.append("preco", parseMoney(state.produto.preco) ?? "");
      formData.append("preco_desconto", parseMoney(state.produto.preco_desconto) ?? "");
      formData.append("preco_pix", parseMoney(state.produto.preco_pix) ?? "");
      formData.append("parcelas", state.produto.parcelas);
      formData.append("peso", state.produto.peso);
      formData.append("medida_altura", state.produto.medida_altura);
      formData.append("medida_largura", state.produto.medida_largura);
      formData.append("medida_profundidade", state.produto.medida_profundidade);
      formData.append("peso_embalado", state.produto.peso_embalado ?? "");
      formData.append("altura_embalado", state.produto.altura_embalado ?? "");
      formData.append("largura_embalado", state.produto.largura_embalado ?? "");
      formData.append(
        "profundidade_embalado",
        state.produto.profundidade_embalado ?? "",
      );
      formData.append("ncm", state.produto.ncm ?? "");
      formData.append("ean", state.produto.ean ?? "");
      formData.append("descricao", state.produto.descricao ?? "");
      formData.append("status", state.produto.status);
      formData.append("destaque1", state.produto.destaque1);
      formData.append("destaque2", state.produto.destaque2);
      formData.append("destaque3", state.produto.destaque3);

      state.arquivos_3d.forEach((arquivo, i) => {
        formData.append(`arquivos_3d[${i}]`, arquivo.file);
      });

      try {
        const data_produto = await services.produtos.save({
          produto: formData,
          token,
        });
        const produto_id = data_produto.data.id;

        for (let i = 0; i < state.imagens.length; i++) {
          if (!state.imagens[i].file) continue;
          const formImagem = new FormData();
          formImagem.append("produto_id", produto_id);
          formImagem.append("numero", i + 1);
          formImagem.append("imagem", state.imagens[i].file);
          await services.produtos.salvarImagem({ formImagem, token });
        }

        toast.success("Produto cadastrado com sucesso!");
        await navigateTo("/admin/produtos");
      } catch (error) {
        if (error.response?.data?.errors) {
          const valores = Object.values(error.response.data.errors);
          valores.forEach((msgs) => msgs.forEach((msg) => toast.error(msg)));
        } else {
          toast.error(error.response?.data?.erro || error.response?.data?.message || "Erro ao cadastrar produto.");
          console.error(error);
        }
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      atualizarPreco,
      applyMoneyMask,
      salvarProduto,
      adicionarImagens,
      onDropImagem,
      removerImagem,
      adicionarArquivos3D,
      onDrop3D,
      removerArquivo3D,
      carregarURN,
      checkMove,
      fetchCategoria,
      router,
    };
  },
};
</script>

<style scoped>
h4 {
  color: #000;
  margin-top: 20px;
}
.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
}
h3 {
  color: #fff;
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
label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}
input[type="checkbox"],
textarea {
  border: solid 1px #000;
}
textarea {
  resize: none;
}
.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}
.txt_vermelho {
  color: #dc3545;
  font-size: 11px;
}
#tem_desconto {
  margin-right: 5px;
}

.input-cifrao-wrapper {
  display: flex;
  align-items: flex-end;
}

.input-cifrao-wrapper .cifrao {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border: 1px solid #9d9d9d;
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  white-space: nowrap;
  min-width: 38px;
  height: 45px;
  flex-shrink: 0;
  margin-bottom: 0;
}

.input-cifrao-wrapper.disabled .cifrao {
  background-color: #f5f5f5;
  color: #aaa;
}

.input-cifrao-wrapper :deep(input) {
  border-radius: 0 4px 4px 0 !important;
  border-left: none !important;
}

.input-cifrao-wrapper.is-invalid .cifrao {
  border-color: #dc3545;
}
.input-cifrao-wrapper.is-invalid :deep(input) {
  border-color: #dc3545 !important;
}

.btn_remover {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
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
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
.list-group-horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.div_imagens {
  margin-top: 20px;
}
.list-group-item {
  padding: 0;
  width: 150px;
  height: 150px;
  border: none;
  position: relative;
}
.list-group-item img {
  width: 150px;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
}
.file-upload {
  display: inline-block;
  position: relative;
}
#file-input-imagem,
#file-input-3d {
  display: none;
}
.adicionar_imagem {
  width: 150px;
  height: 150px;
  border: var(--primary) 2px dashed;
  text-align: center;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.adicionar_imagem:hover {
  background-color: #f0efff;
}
.adicionar_imagem .icones {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: var(--primary);
}
.adicionar_imagem .icones .i1 {
  font-size: 28px;
}
.adicionar_imagem .icones .i2 {
  font-size: 18px;
  margin-left: 2px;
}
.drop-hint {
  font-size: 10px;
  color: #999;
  margin-top: 6px;
}
.arquivo3d-item {
  width: 150px;
  height: 150px;
}
.arquivo3d-card {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  position: relative;
  padding: 10px;
  overflow: hidden;
}
.arquivo3d-icon {
  font-size: 36px;
  color: var(--primary);
  margin-bottom: 8px;
}
.arquivo3d-nome {
  font-size: 10px;
  color: #333;
  text-align: center;
  word-break: break-all;
  max-height: 50px;
  overflow: hidden;
}
</style>
