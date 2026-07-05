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
      Cadastre seu WhatsApp ou e-mail e seja o primeiro a saber sobre lançamentos,
      promoções especiais e tendências para transformar sua cozinha.
    </p>

    <form class="nl_form" @submit.prevent="inscrever">
      <div class="nl_contact_options" aria-label="Escolha como deseja receber novidades">
        <button
          type="button"
          class="nl_option"
          :class="{ 'nl_option--active': tipoContato === 'whatsapp' }"
          :disabled="carregando"
          @click="alterarTipoContato('whatsapp')"
        >
          <i class="bi bi-whatsapp" aria-hidden="true"></i>
          WhatsApp
        </button>
        <button
          type="button"
          class="nl_option"
          :class="{ 'nl_option--active': tipoContato === 'email' }"
          :disabled="carregando"
          @click="alterarTipoContato('email')"
        >
          <i class="bi bi-envelope" aria-hidden="true"></i>
          E-mail
        </button>
      </div>

      <div class="nl_submit_row">
        <input
          v-model="contato"
          :type="tipoContato === 'email' ? 'email' : 'tel'"
          class="nl_input"
          :placeholder="placeholderContato"
          required
          :disabled="carregando"
          :aria-label="labelContato"
          @input="formatarContato"
        />
        <button type="submit" class="nl_btn" :disabled="carregando">
          {{ carregando ? 'Enviando...' : 'Inscrever-se' }}
        </button>
      </div>
    </form>

    <p class="nl_privacidade">
      Seu contato será utilizado de acordo com nossa
      <a href="/politica-de-privacidade" class="nl_link">Política de Privacidade</a>
      para enviar novidades e ofertas exclusivas.
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import services from "@/services/axios/index";
import { useToast } from "@/composables/useToast";

const tipoContato = ref("whatsapp");
const contato = ref("");
const carregando = ref(false);
const toast = useToast();

const placeholderContato = computed(() =>
  tipoContato.value === "whatsapp" ? "Seu WhatsApp" : "Seu e-mail"
);

const labelContato = computed(() =>
  tipoContato.value === "whatsapp" ? "Seu WhatsApp" : "Seu e-mail"
);

function alterarTipoContato(tipo) {
  tipoContato.value = tipo;
  contato.value = "";
}

function formatarTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function formatarContato() {
  if (tipoContato.value === "whatsapp") {
    contato.value = formatarTelefone(contato.value);
  }
}

function contatoValido() {
  if (tipoContato.value === "whatsapp") {
    return contato.value.replace(/\D/g, "").length >= 10;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.value);
}

async function inscrever() {
  if (!contato.value) return;

  if (!contatoValido()) {
    toast.error(
      tipoContato.value === "whatsapp"
        ? "Informe um WhatsApp válido."
        : "Informe um e-mail válido."
    );
    return;
  }

  try {
    carregando.value = true;

    const payload =
      tipoContato.value === "whatsapp"
        ? {
            whatsapp: contato.value.replace(/\D/g, ""),
            telefone: contato.value.replace(/\D/g, ""),
            preferencia_contato: "whatsapp",
          }
        : {
            email: contato.value.trim(),
            preferencia_contato: "email",
          };

    const { data } = await services.newsletters.enviar({ newsletter: payload });

    console.log("Sucesso:", data);
    toast.success("Inscrição realizada com sucesso!");
    contato.value = "";
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
  flex-direction: column;
  gap: 0.75rem;
}

.nl_contact_options {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 4px;
  border: 1px solid #d8d8d8;
  border-radius: 999px;
  background: #fff;
}

.nl_option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 7px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #555;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    color: var(--primary);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  &--active {
    background: var(--primary);
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.nl_submit_row {
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
    border-color: var(--primary);
  }
}

.nl_btn {
  background: var(--primary);
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
