<template>
  <div class="auth_page">
    <aside class="auth_visual" aria-hidden="true">
      <NuxtImg
        src="/images/loginImage.png"
        alt="Cozinha moderna com refrigerador"
        class="auth_visual_img"
      />
      <div class="auth_visual_overlay">
        <div class="auth_visual_content">
          <span class="auth_visual_tag">PAINEL ADMINISTRATIVO</span>
          <h2 class="auth_visual_title">Área Restrita</h2>
          <p class="auth_visual_desc">
            Acesso exclusivo para administradores<br />
            da plataforma Casa Bonita Eletros.
          </p>
        </div>
      </div>
    </aside>

    <main class="auth_form_panel">
      <div class="auth_form_wrapper">
        <div class="auth_heading text-center">
          <NuxtLink to="/">
            <NuxtImg
              src="/logo/logo.svg"
              alt="Logo Casa Bonita Eletros"
              style="cursor: pointer; max-width: 400px"
              class="p-5"
            />
          </NuxtLink>
          <h1 class="auth_title">Acesse o painel</h1>
          <p class="auth_subtitle">
            Entre com suas credenciais de administrador para gerenciar a
            plataforma.
          </p>
        </div>

        <div class="auth_fields">
          <BaseInput
            id="login_email"
            v-model="state.email"
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            autocomplete="email"
            :is-invalid="(validated && !state.email) || credentialError"
            :is-valid="validated && !!state.email && !credentialError"
            :error-message="credentialError ? ' ' : 'Preencha o e-mail.'"
          />

          <BaseInput
            id="login_senha"
            v-model="state.senha"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            autocomplete="current-password"
            :is-invalid="(validated && !state.senha) || credentialError"
            :is-valid="validated && !!state.senha && !credentialError"
            :error-message="
              credentialError
                ? 'E-mail ou senha incorretos.'
                : 'Preencha a senha.'
            "
          />

          <button class="auth_btn" @click="logar">Entrar</button>
          <p class="text-end" style="font-size: 14px">
            Voltar para a
            <NuxtLink to="/" class="text-dark">Página Inicial</NuxtLink>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useToast } from "@/composables/useToast";
import services from "@/services/axios";

useHead(() => ({
  title: "Casa Bonita Eletros - Login Admin",
}));

const toast = useToast();
const authStorage = useAuthStore();

definePageMeta({
  layout: "blank",
  ssr: false,
});

onMounted(() => {
  try {
    if (authStorage.token) router.push("/admin/dashboard");
  } catch (e) {
    console.error("erro no onMounted:", e);
  }
});

const router = useRouter();
const validated = ref(false);

const state = reactive({
  email: "",
  senha: "",
});

const credentialError = ref(false);

watch(
  () => state.email,
  () => {
    credentialError.value = false;
  },
);
watch(
  () => state.senha,
  () => {
    credentialError.value = false;
  },
);

async function logar() {
  validated.value = true;
  credentialError.value = false;

  if (!state.email || !state.senha) {
    toast.error("Preencha todos os campos.");
    return;
  }

  try {
    const results = await services.login.logarSistema({
      email: state.email,
      password: state.senha,
    });

    if (results?.data?.token) {
      authStorage.token = results.data.token;
      authStorage.id = results.data.id;
      authStorage.nome = results.data.nome;
      toast.success("Login realizado com sucesso!");
      router.push("/admin/dashboard");
    } else {
      credentialError.value = true;
      toast.error("Credenciais inválidas.");
    }
  } catch (error) {
    credentialError.value = true;
    toast.error(
      error?.response?.data?.erro ?? "Erro ao fazer login. Tente novamente.",
    );
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.auth_page {
  display: grid;
  grid-template-columns: 50% 1fr;
  min-height: 100vh;
  background: #fff;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.auth_visual {
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }
}

.auth_visual_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.auth_visual_overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 2.5rem;
}

.auth_visual_content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth_visual_tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 999px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #fff;
  width: fit-content;
}

.auth_visual_title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  margin: 0;
}

.auth_visual_desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.auth_form_panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
}

.auth_form_wrapper {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.auth_heading {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: center;
}

.auth_title {
  font-size: 1.9rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

.auth_subtitle {
  font-size: 13.5px;
  color: #666;
  line-height: 1.65;
  margin: 0;
}

.auth_fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth_btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 0.25rem;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
}

@media (max-width: 540px) {
  .auth_form_panel {
    padding: 2.5rem 1.25rem;
    align-items: flex-start;
    padding-top: 3rem;
  }

  .auth_title {
    font-size: 1.5rem;
  }
}
</style>
