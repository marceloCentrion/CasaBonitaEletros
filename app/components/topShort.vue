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
            <div class="div_local">
              <span>Compre pelo WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services/axios";
export default {
  setup() {
    onMounted(() => {
      fetchEmpresa();
    });

    const state = reactive({
      empresa: {},
    });
    async function fetchEmpresa() {
      try {
        const { data } = await services.empresa.getSite();
        state.empresa = data;
      } catch (error) {
        console.log(error);
      }
    }
    return {
      state,
    };
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.div_line {
  background: $primary;
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
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}
</style>