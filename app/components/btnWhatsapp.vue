<template>
  <div>
    <NuxtLink :to="whatsappLink" target="_blank">
      <!-- <img id="whatsapp" src="/public/images/site/whatsapp.png" alt="whatsapp" /> -->
    </NuxtLink>
  </div>
</template>

<script setup>
const { empresa, carregarEmpresaSite } = useSiteData();

onMounted(() => {
  carregarEmpresaSite();
});

const whatsappLink = computed(() => {
  const telefone = empresa.value.telefone || "";

  const cleanedNumber = telefone.replace(/[()\-\s]/g, "");

  return `https://wa.me/${cleanedNumber}?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20M%C3%ADstica%20e%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20compra%20de%20produtos%20e%20do%20site.`;
});
</script>

<style scoped>
#whatsapp {
  width: 70px;
  height: 70px;
  position: fixed;
  right: 50px;
  bottom: 10px;
  opacity: 0.5;
}
</style>

