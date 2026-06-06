<template>
  <div>
    <div class="container">
      <div class="quad">
        <div class="row">
          <div class="col-xl-2 col-lg-3 col-md-4 col-6 mt-2">
            <a href="/produtos">
              <button class="btn principal" type="button">
                Todos os Artigos
              </button>
            </a>
            <!-- <div class="dropdown">
              <button
                class="btn principal dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Todos os Artigos
              </button>
              <ul class="dropdown-menu">
                <li v-for="grupo in state.grupos" :key="grupo.id">
                  <a class="dropdown-item" :href="'/categoria/' + grupo.urn">{{
                    grupo.nome
                  }}</a>
                </li>
              </ul>
            </div>
            -->
          </div>
          <div
            class="col-xl-2 col-lg-3 col-md-4 col-6 mt-2"
            v-for="grupo in state.grupos"
            :key="grupo.id"
          >
            <div class="dropdown">
              <button
                class="btn secundario dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ grupo.nome }}
              </button>
              <ul class="dropdown-menu">
                <li
                  v-for="categoria in grupo.categorias"
                  :key="categoria.id"
                  :value="categoria.id"
                >
                  <a class="dropdown-item">
                    <a :href="'/produtos/' + categoria.urn">
                      {{ categoria.nome }}</a
                    >
                  </a>
                </li>
              </ul>
            </div>
            <!--
            <select class="form-select secundario border-0" aria-label="Default select example">
              <option selected>{{ categoria.nome }}</option>
              <option v-for="produto in categoria.produtos" :key="produto.id" :value="produto.id">
                <a :href="'/produto/' + produto.urn"> 
                  {{ produto.nome }}</a>
              </option>
            </select>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { asyncServices } from "../services/fetch";

const state = reactive({
  grupos: [{}],
});

fetchGrupo();

async function fetchGrupo() {
  try {
    const { data } = await asyncServices.grupos.getGruposAtivos();
    state.grupos = data;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.dropdown-item.active,
.dropdown-item:active {
  background-color: var(--primary) !important;
}
.quad {
  padding: 10px 10rem;
}

.principal {
  width: 100%;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: #ffffff;
  background-color: #2F225C;
  border: 1px solid #2F225C;
  border-radius: 18px;
  padding: 10px;
}

.principal:hover {
  color: #ffffff;
  background-color: #2F225C !important;
  border: 1px solid #2F225C;
}

.principal:focus {
  background-color: #2F225C !important;
  border: 1px solid #2F225C;
}

.secundario {
  width: 100%;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: var(--primary);
  color: #000;
  border-radius: 18px;
  padding: 10px;
  transition: 0.5s;
}

.secundario:hover {
  background-color: var(--primary);
  color: #000;
}

.secundario:focus {
  background-color: var(--primary) !important;
  border: solid 1px #000;
}

.dropdown-item:focus {
  background: var(--primary);
  color: #000;
}

.dropdown-item a {
  color: #000;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  font-weight: 100;
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .principal,
  .secundario {
    font-size: 8pt;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .quad {
    padding: 10px 8rem;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .quad {
    padding: 10px 5rem;
  }
}

@media (max-width: 575px) {
  .quad {
    padding: 10px 1rem;
  }
}
</style>

