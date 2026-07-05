<template>
  <div>
    <div class="div_line">
      <div class="container px-4">
        <div class="row align-items-center">
          <div class="col-auto">
            <ul class="div_p list-unstyled d-flex gap-3 mb-0">
              <li>
                <NuxtLink to="/quem-somos">Quem Somos</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/trocas-devolucoes">Trocas e Devoluções</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="col-auto ms-auto">
            <a
              :href="whatsappLink"
              class="div_local"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Compre pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.div_line {
  background: var(--primary);
  height: 40px;
}

.div_p li {
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}

.div_local {
  display: flex;
  align-items: center;
  height: 40px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    color: #ffffff;
  }
}
</style>