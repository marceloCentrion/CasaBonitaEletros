<template>
  <div>
    <!-- Header principal: logo + busca + ícones -->
    <div class="header-main">
      <div class="container px-4">
        <div class="header-main__inner">

          <!-- Logo -->
          <NuxtLink to="/" class="header-main__logo">
            <NuxtImg src="/logo/blackLogo.svg" class="logo" alt="Casa Bonita Eletros" />
          </NuxtLink>

          <!-- Busca centralizada (desktop) -->
          <div class="header-main__search d-none d-lg-flex">
            <input
              v-model="state.searchTerm"
              type="text"
              class="header-main__search-input"
              placeholder="Olá, o que você procura?"
              @keydown.enter="handleSearch"
            />
            <button class="header-main__search-btn" @click="handleSearch" aria-label="Buscar">
              <i class="bi bi-search"></i>
            </button>
          </div>

          <!-- Ícones (desktop) -->
          <div class="header-main__icons d-none d-lg-flex align-items-center gap-3">

            <!-- Minha Conta -->
            <template v-if="auth.logado.value">
              <div
                class="user_menu_wrapper"
                @mouseenter="showUserMenu = true"
                @mouseleave="showUserMenu = false"
              >
                <button class="btn-account" aria-label="Menu do usuário">
                  <i class="bi bi-person-fill-check"></i>
                  <span>Minha conta</span>
                </button>
                <transition name="dropdown_fade">
                  <div v-if="showUserMenu" class="user_dropdown" role="menu">
                    <NuxtLink to="/perfil" class="user_dropdown_item" role="menuitem">
                      <i class="bi bi-person" aria-hidden="true"></i>
                      Meu Perfil
                    </NuxtLink>
                    <NuxtLink to="/perfil?aba=pedidos" class="user_dropdown_item" role="menuitem">
                      <i class="bi bi-bag" aria-hidden="true"></i>
                      Meus Pedidos
                    </NuxtLink>
                    <NuxtLink to="/favoritos" class="user_dropdown_item" role="menuitem">
                      <i class="bi bi-heart" aria-hidden="true"></i>
                      Favoritos
                    </NuxtLink>
                    <button
                      class="user_dropdown_item user_dropdown_item--sair"
                      @click="auth.sair()"
                      role="menuitem"
                      type="button"
                    >
                      <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
                      Sair da conta
                    </button>
                  </div>
                </transition>
              </div>
            </template>

            <template v-else>
              <NuxtLink to="/login" class="btn-account" aria-label="Entrar na conta">
                <i class="bi bi-person"></i>
                <span>Minha conta</span>
              </NuxtLink>
            </template>

            <!-- Favoritos -->
            <NuxtLink to="/favoritos" class="icon-btn" aria-label="Favoritos">
              <i class="bi bi-heart"></i>
              <span class="icon-btn__badge">0</span>
            </NuxtLink>

            <!-- Carrinho -->
            <NuxtLink to="/carrinho" class="icon-btn" aria-label="Carrinho">
              <i class="bi bi-cart3"></i>
              <span class="icon-btn__badge">
                {{ isCarrinho.itens.length || 0 }}
              </span>
            </NuxtLink>
          </div>

          <!-- Mobile: busca + toggler -->
          <div class="d-flex align-items-center gap-2 d-lg-none ms-auto">
            <button class="mobile-icon-btn" @click="mobileSearchOpen = !mobileSearchOpen" aria-label="Buscar">
              <i class="bi bi-search"></i>
            </button>
            <NuxtLink to="/carrinho" class="mobile-icon-btn position-relative" aria-label="Carrinho">
              <i class="bi bi-cart3"></i>
              <span v-if="isCarrinho.itens.length" class="mobile-badge">
                {{ isCarrinho.itens.length }}
              </span>
            </NuxtLink>
            <button class="mobile-icon-btn" @click="drawerOpen = true" aria-label="Abrir menu">
              <i class="bi bi-list"></i>
            </button>
          </div>
        </div>

        <!-- Busca mobile expansível -->
        <transition name="search_slide">
          <div v-if="mobileSearchOpen" class="mobile-search d-lg-none">
            <input
              v-model="state.searchTerm"
              type="text"
              placeholder="Pesquisar produto..."
              @keydown.enter="handleSearch"
              autofocus
            />
            <button @click="handleSearch" aria-label="Buscar">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Barra de categorias (desktop) -->
    <nav class="navbar navbar-expand-lg d-none d-lg-block" :class="{ 'navbar--sticky': isScrolled }">
      <div class="container px-4">
        <div class="d-flex align-items-center w-100">

          <!-- Categorias com dropdown (Esquerda) -->
          <div class="d-flex flex-grow-1">
            <div
              class="categorias_wrapper"
              @mouseenter="showCategorias = true"
              @mouseleave="showCategorias = false"
            >
              <button class="btn-categorias">
                <i class="bi bi-list"></i>
                CATEGORIAS
              </button>

              <transition name="dropdown_fade">
                <div v-if="showCategorias" class="categorias_dropdown" role="menu">
                  <NuxtLink
                    v-for="grupo in grupos"
                    :key="grupo.urn"
                    class="categorias_item"
                    :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
                    role="menuitem"
                    @click="showCategorias = false"
                  >
                    <i class="bi bi-chevron-right" aria-hidden="true"></i>
                    {{ grupo.nome }}
                  </NuxtLink>
                </div>
              </transition>
            </div>
          </div>

          <!-- Links de grupos -->
          <ul class="navbar-nav d-flex flex-row">
            <li class="nav-item" v-for="grupo in gruposVisiveis" :key="grupo.urn">
              <NuxtLink
                class="nav-link"
                :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
              >
                {{ grupo.nome }}
              </NuxtLink>
            </li>
            <li
              v-if="gruposExtras.length"
              class="nav-item nav_more_wrapper"
              @mouseenter="showMoreMenu = true"
              @mouseleave="showMoreMenu = false"
            >
              <button
                type="button"
                class="nav-link nav_more_btn"
                :aria-expanded="showMoreMenu"
                @click="showMoreMenu = !showMoreMenu"
              >
                Ver Mais
                <i class="bi bi-chevron-down" aria-hidden="true"></i>
              </button>
              <transition name="dropdown_fade">
                <div v-if="showMoreMenu" class="nav_more_dropdown" role="menu">
                  <NuxtLink
                    v-for="grupo in gruposExtras"
                    :key="grupo.urn"
                    class="nav_more_item"
                    :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
                    @click="showMoreMenu = false"
                  >
                    {{ grupo.nome }}
                  </NuxtLink>
                </div>
              </transition>
            </li>
          </ul>

          <!-- Espaçador (Direita) para manter o centro exato -->
          <div class="d-flex flex-grow-1"></div>

        </div>
      </div>
    </nav>

    <!-- Drawer mobile -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="drawerOpen" class="drawer-overlay" @click="drawerOpen = false" />
      </Transition>

      <Transition name="slide">
        <div v-if="drawerOpen" class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div class="drawer-header">
            <NuxtLink to="/" @click="drawerOpen = false">
              <NuxtImg src="/logo/blackLogo.svg" class="drawer-logo" alt="Casa Bonita Eletros" />
            </NuxtLink>
            <button class="drawer-close" @click="drawerOpen = false" aria-label="Fechar menu">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <div class="drawer-search">
            <input
              v-model="state.searchTerm"
              type="search"
              placeholder="Pesquisar produto..."
              autocomplete="off"
              @keydown.enter="handleDrawerSearch"
            />
            <button @click="handleDrawerSearch" aria-label="Buscar">
              <i class="bi bi-search"></i>
            </button>
          </div>

          <hr class="drawer-divider" />

          <ul class="drawer-nav">
            <li v-for="grupo in grupos" :key="grupo.urn">
              <NuxtLink
                :to="{ path: '/produtos', query: { grupo: grupo.urn } }"
                @click="drawerOpen = false"
              >
                {{ grupo.nome }}
              </NuxtLink>
            </li>
          </ul>

          <hr class="drawer-divider" />

          <ul class="drawer-nav drawer-nav--actions">
            <li>
              <NuxtLink to="/favoritos" @click="drawerOpen = false">
                <i class="bi bi-heart"></i>
                Favoritos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/carrinho" @click="drawerOpen = false">
                <i class="bi bi-cart3"></i>
                Carrinho
                <span v-if="isCarrinho.itens.length" class="drawer-badge">
                  {{ isCarrinho.itens.length }}
                </span>
              </NuxtLink>
            </li>

            <template v-if="auth.logado.value">
              <li>
                <NuxtLink to="/perfil" @click="drawerOpen = false">
                  <i class="bi bi-person"></i>
                  Meu Perfil
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/perfil?aba=pedidos" @click="drawerOpen = false">
                  <i class="bi bi-bag"></i>
                  Meus Pedidos
                </NuxtLink>
              </li>
              <li>
                <button
                  class="drawer-nav-btn drawer-nav-btn--sair"
                  @click="auth.sair(); drawerOpen = false;"
                >
                  <i class="bi bi-box-arrow-right"></i>
                  Sair da conta
                </button>
              </li>
            </template>

            <template v-else>
              <li>
                <NuxtLink to="/login" @click="drawerOpen = false">
                  <i class="bi bi-person"></i>
                  Entrar / Cadastrar
                </NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const isCarrinho = useCarrinhoStore();
const showUserMenu = ref(false);
const showMoreMenu = ref(false);
const showCategorias = ref(false);
const auth = useAuth();
const drawerOpen = ref(false);
const mobileSearchOpen = ref(false);
const isScrolled = ref(false);
const { grupos, carregarGruposSite } = useSiteData();

const state = reactive({
  searchTerm: "",
});

function onScroll() {
  isScrolled.value = window.scrollY > 80;
}

onMounted(() => {
  carregarGruposSite();
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("scroll", onScroll);
});

function onKeydown(e) {
  if (e.key === "Escape") {
    drawerOpen.value = false;
    showMoreMenu.value = false;
    showUserMenu.value = false;
    showCategorias.value = false;
    mobileSearchOpen.value = false;
    state.searchTerm = "";
  }
}

watch(drawerOpen, (val) => {
  document.body.style.overflow = val ? "hidden" : "";
});

const handleSearch = () => {
  if (state.searchTerm.trim()) {
    router.push({ path: "/produtos", query: { nome: state.searchTerm.trim() } });
    state.searchTerm = "";
    mobileSearchOpen.value = false;
  }
};

const handleDrawerSearch = () => {
  if (state.searchTerm.trim()) {
    router.push({ path: "/produtos", query: { nome: state.searchTerm.trim() } });
    drawerOpen.value = false;
    state.searchTerm = "";
  }
};

const gruposVisiveis = computed(() => grupos.value.slice(0, 7));
const gruposExtras = computed(() => grupos.value.slice(7));

watch(
  () => auth.logado.value,
  (val) => { if (!val) showUserMenu.value = false; }
);
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

/* ── Header principal ── */
.header-main {
  background: #eef0f3;
  border-bottom: 1px solid #dde0e5;
  padding: 14px 0;
}

.header-main__inner {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  width: 220px;
}

/* ── Busca centralizada ── */
.header-main__search {
  flex: 1;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d0d3d9;
  border-radius: 8px;
  overflow: hidden;
  height: 44px;
}

.header-main__search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #aaa;
  }
}

.header-main__search-btn {
  background: none;
  border: none;
  border-left: 1px solid #d0d3d9;
  padding: 0 14px;
  height: 100%;
  cursor: pointer;
  color: #555;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: color 0.15s;

  &:hover {
    color: $primary;
  }
}

/* ── Ícones direita ── */
.header-main__icons {
  flex-shrink: 0;
}

.btn-account {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #d8dce4;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  color: #1a1a1a;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s;

  i {
    font-size: 16px;
  }

  &:hover {
    background: #cdd1da;
    color: $primary;
  }
}

.icon-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  font-size: 22px;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: $primary;
  }
}

.icon-btn__badge {
  position: absolute;
  top: -7px;
  right: -9px;
  background: $primary;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 0 0 2px #eef0f3;
}

/* ── Barra de categorias ── */
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  min-height: 48px;
}

.navbar--sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.25s ease;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ── Categorias dropdown ── */
.categorias_wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 48px;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 10px;
  }
}

.btn-categorias {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  color: #1a1a1a;
  letter-spacing: 0.5px;
  padding: 0 16px 0 0;
  border-right: 1px solid #e8e8e8;
  margin-right: 8px;
  height: 48px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s;

  i {
    font-size: 20px;
  }

  &:hover {
    color: $primary;
  }
}

.categorias_dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 220px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 999;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 24px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    transform: rotate(45deg);
  }
}

.categorias_item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  i {
    font-size: 11px;
    color: #aaa;
    transition: color 0.15s;
  }

  &:hover {
    background: #f5f5f5;
    color: $primary;

    i {
      color: $primary;
    }
  }
}

/* ── Ver Mais dropdown ── */
.nav_more_wrapper {
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 14px;
  }
}

.nav_more_btn {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  cursor: pointer;

  i {
    font-size: 11px;
    transition: transform 0.18s ease;
  }

  &[aria-expanded="true"] i {
    transform: rotate(180deg);
  }
}

.nav_more_dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 210px;
  max-width: 280px;
  padding: 6px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
  z-index: 999;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    width: 10px;
    height: 10px;
    background: #fff;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    transform: translateX(-50%) rotate(45deg);
  }
}

.nav_more_item {
  display: block;
  border-radius: 6px;
  padding: 10px 12px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.15s, color 0.15s;

  &:hover,
  &.router-link-active {
    background: #f5f5f5;
    color: $primary;
  }
}

.navbar-nav .nav-link {
  color: #1a1a1a;
  font-size: 13px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  padding: 0 14px;
  white-space: nowrap;
  line-height: 48px;

  &:hover,
  &.router-link-active {
    color: $primary;
  }
}

/* ── User dropdown ── */
.user_menu_wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.user_dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  min-width: 190px;
  padding: 6px 0;
  z-index: 999;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 18px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    transform: rotate(45deg);
  }
}

.user_dropdown_item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 16px;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  i {
    font-size: 14px;
    color: gray;
  }

  &:hover {
    background: #f5f5f5;
    color: $primary;
  }

  &--sair {
    color: #c0392b;
    border-top: 1px solid #f0f0f0;
    margin-top: 4px;

    i { color: #c0392b; }

    &:hover {
      background: #fff5f5;
      color: #c0392b;
    }
  }
}

/* ── Mobile ── */
.mobile-icon-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  padding: 4px;

  &:hover {
    color: $primary;
  }
}

.mobile-badge {
  position: absolute;
  top: -2px;
  right: -4px;
  background: $primary;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}

.mobile-search {
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: 1px solid #d0d3d9;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  height: 40px;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 14px;
    font-size: 14px;
    color: #333;
    background: transparent;

    &::placeholder { color: #aaa; }
  }

  button {
    background: none;
    border: none;
    border-left: 1px solid #d0d3d9;
    padding: 0 12px;
    height: 100%;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    display: flex;
    align-items: center;

    &:hover { color: $primary; }
  }
}

/* ── Drawer ── */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1040;
  cursor: pointer;
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100dvh;
  background: #fff;
  z-index: 1050;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}

.drawer-logo { width: 120px; }

.drawer-close {
  background: none;
  border: none;
  padding: 0.25rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;

  &:hover { color: #000; }
}

.drawer-nav {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;

  li {
    border-bottom: 1px solid #f5f5f5;
    &:last-child { border-bottom: none; }
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.25rem;
    color: #222;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 400;
    transition: background 0.15s;

    &:hover {
      background: #f9f9f9;
      color: $primary;
    }

    i {
      font-size: 1rem;
      color: #666;
    }
  }
}

.drawer-nav-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;

  i { font-size: 1rem; }

  &--sair {
    color: #c0392b;
    i { color: #c0392b; }
    &:hover { background: #fff5f5; }
  }
}

.drawer-badge {
  margin-left: auto;
  background: $primary;
  color: #fff;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 999px;
  font-weight: 600;
}

.drawer-divider {
  margin: 0.25rem 1.25rem;
  border-color: #eee;
}

.drawer-search {
  display: flex;
  align-items: center;
  margin: 0.75rem 1.25rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;

  input {
    flex: 1;
    border: none;
    padding: 0.6rem 0.75rem;
    font-size: 0.875rem;
    outline: none;
    color: #333;
    background: #fff;
    appearance: none;

    &::placeholder { color: #aaa; }
  }

  button {
    background: #222;
    border: none;
    color: #fff;
    padding: 0.6rem 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    display: flex;
    align-items: center;

    &:hover { background: #000; }
  }
}

/* ── Transitions ── */
.dropdown_fade-enter-active,
.dropdown_fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.dropdown_fade-enter-from,
.dropdown_fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.search_slide-enter-active,
.search_slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.search_slide-enter-from,
.search_slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>