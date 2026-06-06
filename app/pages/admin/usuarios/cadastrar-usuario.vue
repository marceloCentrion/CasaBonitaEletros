<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Cadastrar Usuário</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <BaseInput
              id="nome"
              label="Nome"
              placeholder="Digite um nome:"
              v-model="state.nome"
              :isInvalid="!!state.errors.nome"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-3">
            <BaseInput
              id="email"
              type="email"
              label="Email"
              placeholder="Digite um email:"
              v-model="state.email"
              :isInvalid="!!state.errors.email"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-3">
            <BaseSelect
              label="Status"
              v-model="state.status"
              :options="[
                { value: 'ATIVO', label: 'Ativo' },
                { value: 'INATIVO', label: 'Inativo' }
              ]"
            />
          </div>
          <div class="col-md-3">
            <BaseInput
              id="senha"
              type="password"
              label="Senha"
              placeholder="Digite uma senha:"
              v-model="state.senha"
              :isInvalid="!!state.errors.senha"
              errorMessage="Preencha este campo"
            />
          </div>
        </div>
        <div class="mt-5 pt-3 d-flex justify-content-end gap-3">
          <NuxtLink class="no-link" to="/admin/usuarios">
            <OutlineButton type="button">Cancelar</OutlineButton>
          </NuxtLink>
          <SecButton class="w-fit-content px-8" @click="salvarUsuario" :disabled="state.isLoading">
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import services from "@/services/axios";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import SecButton from "~/components/SecButton.vue";
import OutlineButton from "~/components/OutlineButton.vue";
import { useToast } from "@/composables/useToast";

export default {
  components: { BaseInput, BaseSelect, SecButton, OutlineButton },
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Cadastrar Usuário",
    });
    
    const authStore = useAuthStore();
    const token = authStore.token;

    const router = useRouter();
    const toast = useToast();
    const state = reactive({
      id: "",
      nome: "",
      email: "",
      senha: "",
      status: "ATIVO",
      errors: {},
      isLoading: false,
    });
    onMounted(() => {});
    async function salvarUsuario() {
      state.errors = {};
      let erro = false;

      if (!state.nome) { state.errors.nome = true; erro = true; }
      if (!state.email) { state.errors.email = true; erro = true; }
      if (!state.senha) { state.errors.senha = true; erro = true; }

      if (erro) {
        toast.error("Por favor, preencha todos os campos obrigatórios destacados.");
        return;
      }

      if (state.isLoading) return;
      state.isLoading = true;

      let dados = {
        nome: state.nome,
        email: state.email,
        senha: state.senha,
        status: state.status,
      };
      try {
        await services.usuarios.save(dados, token);
        toast.success("Usuário cadastrado com sucesso!");
        router.push("/admin/usuarios");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || error.response?.data?.message || "Erro ao cadastrar usuário.");
      } finally {
        state.isLoading = false;
      }
    }
    return {
      salvarUsuario,
      router,
      state,
    };
  },
};
</script>

<style scoped>
h4 {
  color: #fff;
}

.card-header {
  background-color: #181818;
  color: #fff;
  border-radius: 0px;
}

label {
  color: #000;
  font-size: 12pt;
  margin-bottom: 0;
  margin-top: 5px;
}

input {
  border: solid 1px #000;
}

textarea {
  border: solid 1px #000;
  resize: none;
}

select {
  border: solid 1px #000;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.imagem {
  width: 100%;
  object-fit: cover;
  margin-top: 1em;
  height: auto;
}

.btn_remover {
  border: none;
  outline: none;
  background-color: #ff0000;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #f57171;
}

.btn_remover:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #f57171;
}

.div_btn_x {
  margin-left: 10px;
  margin-top: 20px;
}
</style>
