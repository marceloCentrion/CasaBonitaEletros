<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Empresa</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <BaseInput
              id="facebook"
              label="Facebook"
              v-model="state.facebook"
              placeholder="Insira um link:"
              maxlength="120"
              :isInvalid="!!state.errors.facebook"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="instagram"
              label="Instagram"
              v-model="state.instagram"
              placeholder="Insira um link:"
              maxlength="120"
              :isInvalid="!!state.errors.instagram"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="twitter"
              label="Twitter"
              v-model="state.twitter"
              placeholder="Insira um link:"
              maxlength="45"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="endereco"
              label="Logradouro"
              v-model="state.endereco"
              placeholder="Insira um endereço:"
              maxlength="80"
              :isInvalid="!!state.errors.endereco"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="numero"
              label="Número"
              v-model="state.numero"
              placeholder="Número de endereço:"
              maxlength="4"
              :isInvalid="!!state.errors.numero"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="cep"
              label="CEP"
              v-model="state.cep"
              placeholder="Insira um cep:"
              v-maska
              data-maska="#####-###"
              maxlength="9"
              :isInvalid="!!state.errors.cep"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="cidade"
              label="Cidade"
              v-model="state.cidade"
              placeholder="Insira uma cidade:"
              maxlength="80"
              :isInvalid="!!state.errors.cidade"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="telefone"
              label="Telefone Empresa"
              v-model="state.telefone"
              placeholder="Insira um telefone:"
              v-maska
              data-maska="['(##) ####-####', '(##) #####-####']"
              maxlength="15"
              :isInvalid="!!state.errors.telefone"
              errorMessage="Preencha este campo"
            />
            <label class="same_phone_check mt-2" for="whatsappMesmoTelefone">
              <input
                id="whatsappMesmoTelefone"
                v-model="state.whatsappMesmoTelefone"
                type="checkbox"
              />
              Usar este numero tambem como WhatsApp
            </label>
          </div>
          <div v-if="!state.whatsappMesmoTelefone" class="col-md-4">
            <BaseInput
              id="whatsapp"
              label="WhatsApp Empresa"
              v-model="state.whatsapp"
              placeholder="Insira o WhatsApp:"
              v-maska
              data-maska="['(##) ####-####', '(##) #####-####']"
              maxlength="15"
              :isInvalid="!!state.errors.whatsapp"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-4">
            <BaseInput
              id="email"
              type="email"
              label="Email"
              v-model="state.email"
              placeholder="Digite um email:"
              maxlength="255"
              :isInvalid="!!state.errors.email"
              errorMessage="Preencha este campo"
            />
          </div>
          <div class="col-md-12 mt-3">
            <label class="mb-1 d-block fw-bold text-dark" style="font-size: 14px;">Resumo</label>
            <editor v-model="state.sobre_nos" />
            <span v-if="state.errors.sobre_nos" class="text-danger" style="font-size: 11px; display: block; margin-top: 4px;">Preencha este campo</span>
          </div>
        </div>
        <div class="mt-5 pt-3 d-flex justify-content-end gap-3">
          <SecButton class="w-fit-content px-8" @click="upEmpresa" :disabled="state.isLoading">
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, watch } from "vue";
import services from "@/services/axios";
import BaseInput from "@/components/BaseInput.vue";
import SecButton from "~/components/SecButton.vue";
import OutlineButton from "~/components/OutlineButton.vue";
import { useToast } from "@/composables/useToast";

export default {
  components: { BaseInput, SecButton, OutlineButton },
  setup() {
    useHead({});
    const toast = useToast();

    onMounted(() => {
      fetchEmpresa();
    });
    const state = reactive({
      id: "",
      endereco: "",
      numero: "",
      cep: "",
      cidade: "",
      estado: "",
      telefone: "",
      whatsapp: "",
      whatsappMesmoTelefone: false,
      facebook: "",
      instagram: "",
      twitter: "",
      sobre_nos: "",
      email: "",
      errors: {},
      isLoading: false,
    });
    const authStore = useAuthStore();
    const token = authStore.token;

    function normalizarTelefone(valor) {
      return String(valor || "").replace(/\D/g, "");
    }

    async function fetchEmpresa() {
      try {
        const { data } = await services.empresa.getEmpresa({ token });
        state.id = data.id;
        state.endereco = data.endereco;
        state.numero = data.numero;
        state.cep = data.cep;
        state.cidade = data.cidade_uf;
        state.estado = data.estado;
        state.telefone = data.telefone;
        state.whatsapp = data.whatsapp || data.telefone || "";
        state.whatsappMesmoTelefone =
          !data.whatsapp ||
          normalizarTelefone(data.whatsapp) === normalizarTelefone(data.telefone);
        state.facebook = data.facebook;
        state.instagram = data.instagram;
        state.twitter = data.twitter;
        state.sobre_nos = data.sobre_nos;
        state.texto_resumido = data.texto_resumido;
        state.email = data.email;
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar dados da empresa.");
      }
    }

    watch(
      () => state.telefone,
      (telefone) => {
        if (state.whatsappMesmoTelefone) {
          state.whatsapp = telefone;
        }
      },
    );

    watch(
      () => state.whatsappMesmoTelefone,
      (usarMesmoNumero) => {
        if (usarMesmoNumero) {
          state.whatsapp = state.telefone;
          delete state.errors.whatsapp;
        }
      },
    );

    async function upEmpresa() {
      state.errors = {};
      let erro = false;

      if (state.whatsappMesmoTelefone) {
        state.whatsapp = state.telefone;
      }

      const obrigatorios = [
        "endereco", "numero",
        "cidade", "telefone", "whatsapp", "cep", "email", "sobre_nos"
      ];

      obrigatorios.forEach((campo) => {
        if (!state[campo]) {
          state.errors[campo] = true;
          erro = true;
        }
      });

      if (erro) {
        toast.error("Por favor, preencha todos os campos obrigatórios destacados.");
        return;
      }

      if (state.isLoading) return;
      state.isLoading = true;

      let dados = {
        id: state.id,
        endereco: state.endereco,
        numero: state.numero,
        cep: state.cep,
        cidade_uf: state.cidade,
        estado: state.estado,
        telefone: state.telefone,
        whatsapp: state.whatsapp,
        facebook: state.facebook,
        instagram: state.instagram,
        twitter: state.twitter,
        texto_resumido: state.texto_resumido,
        sobre_nos: state.sobre_nos,
        email: state.email,
      };
      try {
        await services.empresa.update(dados, token);
        toast.success("Empresa atualizada com sucesso!");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || error.response?.data?.message || "Erro ao atualizar os dados.");
      } finally {
        state.isLoading = false;
      }
    }
    return {
      upEmpresa,
      state,
    };
  },
};
</script>

<style scoped>
h4 {
  color: #fff;
}

select {
  border: solid 1px #000;
}

select:focus {
  outline: none !important;
}

textarea {
  border: solid 1px #000;
}

textarea:focus {
  outline: none !important;
}

.card-header {
  border-bottom: none;
  background-color: #181818;
  color: #fff;
}

.card {
  border: solid 2px #000;
  border-radius: 10px;
  background-color: #fff;
}

.same_phone_check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.same_phone_check input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
