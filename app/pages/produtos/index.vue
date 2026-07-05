<template>
  <main id="page_categoria" aria-labelledby="cat_heading">
    <div class="cat_container">
      <nav class="breadcrumb" aria-label="Navegação estrutural">
        <ol class="d-flex align-items-center">
          <li>
            <NuxtLink to="/" class="d-flex gap-1 align-items-center">
              <i
                class="bi bi-house-door"
                style="font-size: 0.75rem"
                aria-hidden="true"
              ></i>
              <p class="mb-0">Página inicial</p>
            </NuxtLink>
          </li>
          <li aria-hidden="true" class="breadcrumb_sep">
            <i class="bi bi-chevron-right" style="font-size: 0.75rem"></i>
          </li>
          <li aria-current="page">
            <button
              v-if="grupoAtivo && categoriaAtiva"
              class="breadcrumb_btn"
              @click="selecionarGrupo(grupoAtivo)"
            >
              {{ grupoAtivo.nome }}
            </button>
            <span v-else>{{ tituloPagina }}</span>
          </li>
          <template v-if="categoriaAtiva">
            <li aria-hidden="true" class="breadcrumb_sep">
              <i class="bi bi-chevron-right" style="font-size: 0.75rem"></i>
            </li>
            <li aria-current="page">{{ categoriaAtiva.nome }}</li>
          </template>
        </ol>
      </nav>

      <div class="cat_header">
        <h1 class="cat_title" id="cat_heading">{{ tituloPagina }}</h1>
        <p class="cat_resultados" aria-live="polite">
          Resultados: <strong>{{ paginacao.total }} produtos</strong>
        </p>
      </div>

      <div v-if="!nomeBusca" class="cat_toolbar mb-4">
        <nav aria-label="Filtrar por grupo">
          <ul class="cat_tabs">
            <li>
              <button
                class="cat_tab"
                :class="{ 'cat_tab--active': !grupoAtivo }"
                @click="navigateTo({ path: '/produtos' })"
                :aria-current="!grupoAtivo ? 'true' : undefined"
              >
                Ver todos
              </button>
            </li>
            <li v-for="grupo in grupos" :key="grupo.urn">
              <button
                class="cat_tab"
                :class="{ 'cat_tab--active': grupoAtivo?.urn === grupo.urn }"
                @click="selecionarGrupo(grupo)"
                :aria-current="
                  grupoAtivo?.urn === grupo.urn ? 'true' : undefined
                "
              >
                {{ grupo.nome }}
              </button>
            </li>
          </ul>
        </nav>

        <div v-if="marcas.length" class="cat_ordenar">
          <label for="select_marca" class="sr_only">Filtrar por marca</label>
          <select
            id="select_marca"
            :value="marcaAtivaId ?? ''"
            class="cat_select"
            aria-label="Filtrar por marca"
            @change="selecionarMarcaPorId($event.target.value)"
          >
            <option value="">Marcas</option>
            <option
              v-for="marca in marcas"
              :key="getMarcaId(marca)"
              :value="getMarcaId(marca)"
            >
              {{ getMarcaNome(marca) }}
            </option>
          </select>
          <i class="bi bi-chevron-down cat_select_icon" aria-hidden="true"></i>
        </div>
      </div>

      <div v-else class="cat_toolbar mb-4">
        <p class="cat_busca_info">
          <i class="bi bi-search me-1"></i>
          Buscando por: <strong>"{{ nomeBusca }}"</strong>
          <button class="cat_busca_limpar" @click="limparBusca">
            <i class="bi bi-x-circle"></i> Limpar busca
          </button>
        </p>
      </div>

      <nav
        v-if="!nomeBusca && grupoAtivo && categoriasDoGrupo.length > 1"
        class="cat_subtabs_nav"
        aria-label="Filtrar por categoria"
      >
        <ul class="cat_subtabs">
          <li>
            <button
              class="cat_subtab"
              :class="{ 'cat_subtab--active': !categoriaAtiva }"
              @click="selecionarCategoria(null)"
              :aria-current="!categoriaAtiva ? 'true' : undefined"
            >
              Todos
            </button>
          </li>
          <li v-for="cat in categoriasDoGrupo" :key="cat.id">
            <button
              class="cat_subtab"
              :class="{ 'cat_subtab--active': categoriaAtiva?.id === cat.id }"
              @click="selecionarCategoria(cat)"
              :aria-current="categoriaAtiva?.id === cat.id ? 'true' : undefined"
            >
              {{ cat.nome }}
            </button>
          </li>
        </ul>
      </nav>

      <section class="cat_products_section" aria-labelledby="cat_heading">
        <div class="cat_list_controls">
          <div class="cat_ordenar">
            <label for="select_ordem" class="sr_only">Ordenar por</label>
            <select
              id="select_ordem"
              v-model="ordem"
              class="cat_select"
              aria-label="Ordenar produtos"
              >
              <option value="menor_preco">Menor preço</option>
              <option value="maior_preco">Maior preço</option>
              <option value="a_z">Nome A–Z</option>
              <option value="z_a">Nome Z–A</option>
            </select>
            <i
              class="bi bi-chevron-down cat_select_icon"
              aria-hidden="true"
            ></i>
          </div>

          <Paginacao
            v-if="paginacao.lastPage > 1 && !isLoading.isLoading"
            :currentPage="paginacao.currentPage"
            :lastPage="paginacao.lastPage"
            :total="paginacao.total"
            :perPage="paginacao.perPage"
            :from="paginacao.from"
            :to="paginacao.to"
            @update:currentPage="mudarPagina"
          />
        </div>

        <ul
          class="produtos_grid"
          aria-label="Lista de produtos"
        >
          <ProdutoCard
            v-for="produto in produtos"
            :key="produto.id"
            :produto="produto"
            @adicionar-carrinho="adicionarCarrinho"
          />
        </ul>

        <div
          v-if="erroMsg && !isLoading.isLoading"
          class="cat_empty"
          role="alert"
        >
          <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
          <p>{{ erroMsg }}</p>
        </div>

        <div
          v-else-if="!produtos.length && !isLoading.isLoading"
          class="cat_empty"
          role="status"
        >
          <i class="bi bi-search" aria-hidden="true"></i>
          <p>Nenhum produto encontrado.</p>
        </div>

        <div
          v-if="isLoading.isLoading"
          class="cat_loading"
          role="status"
          aria-label="Carregando produtos"
        >
          <Loader />
        </div>
      </section>

      <Paginacao
        v-if="paginacao.lastPage > 1 && !isLoading.isLoading"
        :currentPage="paginacao.currentPage"
        :lastPage="paginacao.lastPage"
        :total="paginacao.total"
        :perPage="paginacao.perPage"
        :from="paginacao.from"
        :to="paginacao.to"
        @update:currentPage="mudarPagina"
      />
    </div>
  </main>
</template>

<script setup>
import ProdutoCard from "@/components/ProdutoCard.vue";
import Paginacao from "@/components/Paginacao.vue";
import services from "@/services/axios";

definePageMeta({ layout: "site" });

const route = useRoute();
const isLoading = useIsLoading();
const { grupos, carregarGruposSite } = useSiteData();

const ordem = ref("a_z");
const marcas = ref([]);
const produtos = ref([]);
const erroMsg = ref(null);

const paginacao = ref({
  currentPage: 1,
  lastPage: 1,
  total: 0,
  perPage: 16,
  from: 1,
  to: 0,
});

const nomeBusca = computed(() => route.query.nome?.trim() || null);
const marcaAtivaId = computed(() =>
  route.query.marca ? String(route.query.marca) : null,
);

const grupoAtivo = computed(
  () => grupos.value.find((g) => g.urn === route.query.grupo) ?? null,
);

const categoriasDoGrupo = computed(() =>
  Array.isArray(grupoAtivo.value?.categorias)
    ? grupoAtivo.value.categorias
    : [],
);

const categoriaAtiva = computed(() => {
  if (!route.query.categoria) return null;
  return (
    categoriasDoGrupo.value.find((c) => c.urn === route.query.categoria) ?? null
  );
});

const tituloPagina = computed(() => {
  if (nomeBusca.value) return `Busca: "${nomeBusca.value}"`;
  if (categoriaAtiva.value) return categoriaAtiva.value.nome;
  if (grupoAtivo.value) return grupoAtivo.value.nome;
  return "Produtos";
});

useHead({
  title: computed(() => `Casa Bonita Eletros - ${tituloPagina.value}`),
});

function setPaginacao(meta) {
  paginacao.value = {
    currentPage: meta.current_page ?? 1,
    lastPage: meta.last_page ?? 1,
    total: meta.total ?? 0,
    perPage: meta.per_page ?? 16,
    from: meta.from ?? 1,
    to: meta.to ?? 0,
  };
}

function resetPaginacao() {
  paginacao.value = {
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 16,
    from: 1,
    to: 0,
  };
}

const toArray = (v) => (Array.isArray(v) ? v : []);
const getMarcaId = (marca) => marca?.marca_id ?? marca?.id;
const getMarcaNome = (marca) => marca?.marca_nome ?? marca?.nome ?? "";

function normalizarMarcas(data) {
  return (
    [
      data?.marcas,
      data?.data?.marcas,
      data?.data?.data,
      data?.data,
      data,
    ].find(Array.isArray) ?? []
  );
}

const fetchGrupos = async () => {
  await carregarGruposSite();
};

const fetchMarcasAtivas = async () => {
  if (marcas.value.length) return;

  try {
    const { data } = await services.marcas.marcasAtivas();
    marcas.value = normalizarMarcas(data);
  } catch (e) {
    console.error(e);
  }
};

const fetchProdutos = async (page = 1, per_page = 16, ordem) => {
  isLoading.start();
  produtos.value = [];
  erroMsg.value = null;
  try {
    if (nomeBusca.value) {
      const { data } = await services.produtos.getProdutosPorNome({
        nome: nomeBusca.value,
      });

      const lista = toArray(data?.data ?? data?.produtos ?? data);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (categoriaAtiva.value && marcaAtivaId.value) {
      const { data } = await services.categoria.getProdutosCategoriaMarca({
        categoria_urn: categoriaAtiva.value.urn,
        marca_id: marcaAtivaId.value,
      });

      const lista = toArray(data?.produtos ?? data?.data ?? data);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (categoriaAtiva.value) {
      const { data } = await services.produtos.getAllProdutoCat(
        categoriaAtiva.value.id,
        page,
        per_page,
      );

      const lista = toArray(data?.produtos ?? data?.data ?? data);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (grupoAtivo.value && marcaAtivaId.value) {
      const { data } = await services.grupos.getProdutosPorGrupoMarca({
        grupo_urn: grupoAtivo.value.urn,
        marca_id: marcaAtivaId.value,
      });

      const lista = toArray(data?.produtos ?? data?.data ?? data);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (grupoAtivo.value) {
      const { data } = await services.grupos.getProdutosGrupoURN(
        grupoAtivo.value.urn,
        page,
        per_page,
      );

      const lista = toArray(data?.produtos ?? data?.data ?? []);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (marcaAtivaId.value) {
      const { data } = await services.marcas.produtosPorMarca(
        marcaAtivaId.value,
      );

      const lista = toArray(data?.produtos ?? data?.data ?? data);
      produtos.value = lista.map((p) => ({ ...p, favorito: false }));

      const meta = data?.meta ?? data;
      if (meta?.last_page) setPaginacao(meta);
      else {
        resetPaginacao();
        paginacao.value.total = meta?.total ?? lista.length;
      }
      return;
    }

    if (!marcas.value.length) await fetchMarcasAtivas();

    const { data } = await services.produtos.getAllProduto(page, per_page, ordem);
    const lista = toArray(data?.data ?? []);
    produtos.value = lista.map((p) => ({ ...p, favorito: false }));

    const meta = data?.meta ?? data;
    if (meta?.last_page) setPaginacao(meta);
    else resetPaginacao();
  } catch (error) {
    erroMsg.value =
      error?.response?.data?.erro ||
      error?.response?.data?.message ||
      error?.message;
    produtos.value = [];
    resetPaginacao();
  } finally {
    isLoading.stop();
  }
};

async function mudarPagina(page) {
  paginacao.value.currentPage = page;
  isLoading.start();
  await fetchProdutos(page, paginacao.value.perPage, ordem.value);
  await nextTick();
  isLoading.stop();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selecionarGrupo(grupo) {
  const query = { ...route.query, grupo: grupo.urn };
  delete query.nome;
  delete query.categoria;

  navigateTo({ path: "/produtos", query });
}

function selecionarCategoria(cat) {
  const query = { ...route.query, grupo: grupoAtivo.value?.urn };
  delete query.nome;

  if (!cat) {
    delete query.categoria;
    navigateTo({ path: "/produtos", query });
    return;
  }

  query.categoria = cat.urn;

  navigateTo({
    path: "/produtos",
    query,
  });
}

function selecionarMarca(marca) {
  const query = { ...route.query };
  delete query.nome;

  if (!marca) delete query.marca;
  else query.marca = getMarcaId(marca);

  navigateTo({ path: "/produtos", query });
}

function selecionarMarcaPorId(marcaId) {
  if (!marcaId) {
    selecionarMarca(null);
    return;
  }

  const marca =
    marcas.value.find((item) => String(getMarcaId(item)) === String(marcaId)) ??
    { id: marcaId };

  selecionarMarca(marca);
}

function limparBusca() {
  navigateTo({ path: "/produtos" });
}

function adicionarCarrinho(produto) {
  console.log("Adicionado ao carrinho:", produto);
}

watch(
  () => [
    route.query.grupo,
    route.query.categoria,
    route.query.nome,
    route.query.marca,
    ordem.value,
  ],
  async () => {
    produtos.value = [];
    erroMsg.value = null;
    resetPaginacao();
    isLoading.start();
    await fetchProdutos(1, paginacao.value.perPage, ordem.value);
    await nextTick();
    isLoading.stop();
  },
  { flush: "post", immediate: true},
);

onMounted(async () => {
  isLoading.start();
  await fetchGrupos();
  await fetchMarcasAtivas();
  isLoading.stop();
});
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#page_categoria {
  background: #f7f7f8;
  min-height: 80vh;
  padding: 2rem 0 5rem;
}

.cat_container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 32px;
}

.breadcrumb {
  margin-bottom: 17.6px;

  ol {
    display: flex;
    align-items: center;
    gap: 6.4px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.8125rem;
  }

  a {
    color: #666;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: color 0.2s;

    &:hover {
      color: var(--primary);
    }
  }

  li[aria-current="page"] {
    color: #111;
    font-weight: 500;
  }
}

.breadcrumb_btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.8125rem;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
}

.breadcrumb_sep {
  color: #bbb;
}

.cat_header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 8px;
}

.cat_title {
  font-size: 28px;
  font-weight: 700;
  color: #111;
}

.cat_resultados {
  font-size: 0.8125rem;
  color: #888;

  strong {
    color: #555;
    font-weight: 500;
  }
}

.cat_busca_info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #555;
  margin: 0;

  strong {
    color: #111;
  }
}

.cat_busca_limpar {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 4px;

  &:hover {
    border-color: #c0392b;
    color: #c0392b;
  }
}

.cat_toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.cat_tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.cat_tab {
  height: 2rem;
  padding: 0 0.75rem;
  border-radius: 62.4375rem;
  border: 0.0938rem solid #ddd;
  background: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  &.cat_tab--active {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
  }
}

.cat_subtabs_nav {
  margin-top: 12px;
  margin-bottom: 8px;
  border-bottom: 0.0938rem solid #e8e8e8;
  padding-bottom: 12px;
}

.cat_subtabs {
  display: flex;
  align-items: center;
  gap: 6.4px;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.cat_subtab {
  height: 1.875rem;
  padding: 0 0.875rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid lightgray;
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #f0f0f0;
    color: #333;
  }

  &.cat_subtab--active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    font-weight: 500;
  }
}

.cat_list_controls {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.cat_list_controls :deep(.pag-wrap) {
  padding: 0;
}

.cat_ordenar {
  position: relative;
  display: flex;
  align-items: center;
}

.cat_select {
  height: 2.25rem;
  padding: 0 2.25rem 0 0.875rem;
  border: 0.0938rem solid #ddd;
  border-radius: 0.5rem;
  background: #fff;
  font-size: 0.8125rem;
  color: #444;
  appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary);
  }
}

.cat_select_icon {
  position: absolute;
  right: 0.75rem;
  font-size: 0.75rem;
  color: #888;
  pointer-events: none;
}

.produtos_grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cat_empty {
  text-align: center;
  padding: 64px 32px;
  color: #999;

  i {
    font-size: 40px;
    margin-bottom: 16px;
    display: block;
  }
  p {
    font-size: 0.9375rem;
  }
}

.cat_loading {
  display: flex;
  justify-content: center;
  padding: 64px 0;
}

.sr_only {
  position: absolute;
  width: 0.0625rem;
  height: 0.0625rem;
  padding: 0;
  margin: -0.0625rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 64rem) {
  .produtos_grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 48rem) {
  .produtos_grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cat_header {
    flex-direction: column;
    align-items: flex-start;
  }
  .cat_list_controls {
    flex-direction: column;
    align-items: stretch;
  }
  .cat_list_controls :deep(.pag-wrap) {
    align-items: flex-start;
  }
}

@media (max-width: 30rem) {
  .produtos_grid {
    grid-template-columns: 1fr;
  }
  .cat_toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
