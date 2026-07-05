<template>
  <a
    :href="whatsappLink"
    class="whatsapp_float"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Atendimento pelo WhatsApp"
    title="Atendimento pelo WhatsApp"
  >
    <i class="bi bi-whatsapp" aria-hidden="true"></i>
  </a>
</template>

<script setup>
const { empresa, carregarEmpresaSite } = useSiteData();

onMounted(() => {
  carregarEmpresaSite();
});

const whatsappLink = computed(() => {
  const numeroAtendimento = empresa.value.whatsapp || empresa.value.telefone || "";
  const cleanedNumber = numeroAtendimento.replace(/\D/g, "");
  const numeroComPais = cleanedNumber.startsWith("55")
    ? cleanedNumber
    : `55${cleanedNumber}`;
  const message = encodeURIComponent(
    "Olá! Vim através do site Casa Bonita Eletros e gostaria de atendimento pelo WhatsApp."
  );

  return cleanedNumber
    ? `https://wa.me/${numeroComPais}?text=${message}`
    : "/contato";
});
</script>

<style scoped>
.whatsapp_float {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1200;
  width: 58px;
  height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 12px 28px rgba(37, 211, 102, 0.34);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.whatsapp_float i {
  font-size: 30px;
  line-height: 1;
}

.whatsapp_float:hover {
  background: #20bd5a;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 16px 34px rgba(37, 211, 102, 0.42);
}

.whatsapp_float:focus-visible {
  outline: 3px solid rgba(37, 211, 102, 0.35);
  outline-offset: 4px;
}

@media (max-width: 540px) {
  .whatsapp_float {
    right: 16px;
    bottom: 16px;
    width: 52px;
    height: 52px;
  }

  .whatsapp_float i {
    font-size: 27px;
  }
}
</style>
