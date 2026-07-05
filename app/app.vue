<script setup lang="ts">
import 'vue-toastification/dist/index.css'

const { loadColorTheme } = useColorTheme();

onMounted(() => {
  loadColorTheme();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
