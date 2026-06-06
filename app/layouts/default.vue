<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";

useHead({
  title: "Casa Bonita Eletros - Admin",
});

const drawer = ref(true);
const { mdAndUp, mdAndDown } = useDisplay();

onMounted(() => {
  if (window.innerWidth < 950) {
    drawer.value = !drawer.value;
  }
});
</script>

<template>
  <v-app>
    <v-app-bar elevation="0" color="primary">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      :permanent="mdAndUp"
      :temporary="mdAndDown"
      class="leftSidebar"
      elevation="10"
      v-model="drawer"
    >
      <LayoutSidebar />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="page-wrapper">
        <div class="maxWidth">
          <NuxtPage />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
body {
  background-color: #181818;
}
</style>
