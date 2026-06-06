<template>
  <div class="nl_wrapper container mx-0" aria-labelledby="nl_heading">
    <span class="nl_tag">
      <i class="bi bi-envelope fs-6" aria-hidden="true"></i>
      FIQUE POR DENTRO
    </span>

    <h2 class="nl_titulo" id="nl_heading">
      Receba Novidades e Ofertas Exclusivas
    </h2>

    <p class="nl_desc">
      Cadastre seu e-mail e seja o primeiro a saber sobre lançamentos, promoções
      especiais e tendências para transformar sua cozinha.
    </p>

    <form class="nl_form" @submit.prevent="inscrever">
      <input v-model="email" type="email" class="nl_input" placeholder="Seu e-mail" required :disabled="carregando"
        aria-label="Seu e-mail" />
      <button type="submit" class="nl_btn" :disabled="carregando">
        {{ carregando ? 'Enviando...' : 'Inscrever-se' }}
      </button>
    </form>

    <p class="nl_privacidade">
      Seu e-mail será utilizado de acordo com nossa
      <a href="/politica-de-privacidade" class="nl_link">Política de Privacidade</a>
      para enviar novidades e ofertas exclusivas.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import services from "@/services/axios/index"; 
import { useToast } from "@/composables/useToast";

const email = ref("");
const carregando = ref(false);
const toast = useToast();

async function inscrever() {
  if (!email.value) return;

  try {
    carregando.value = true;
    
    const payload = { 
      email: email.value 
    };

    const { data } = await services.newsletters.enviar({ newsletter: payload });
    
    console.log("Sucesso:", data);
    toast.success("Inscrição realizada com sucesso!");
    email.value = ""; 
    
  } catch (error) {
    console.error("Erro ao inscrever:", error);
    toast.error("Não foi possível realizar a inscrição.");
  } finally {
    carregando.value = false;
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

#section_newsletter {
  width: 100%;
  padding: 60px 0 80px;
  background: #fff;
}

.nl_wrapper {
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nl_tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #d0d0d0;
  border-radius: 999px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.08em;
  width: fit-content;
}

.nl_titulo {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0;
}

.nl_desc {
  font-size: 14px;
  color: #555;
  line-height: 1.65;
  margin: 0;
}

.nl_form {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;

  @media screen and (max-width: 400px) {
    flex-direction: column;
  }
}

.nl_input {
  flex: 1;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: $primary;
  }
}

.nl_btn {
  background: $primary;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.88;
  }
}

.nl_privacidade {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.nl_link {
  color: #1a1a1a;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
