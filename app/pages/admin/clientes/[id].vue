<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4>Alterar Cliente</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label for="nome">Nome</label>
            <input
              id="nome"
              type="text"
              class="form-control"
              v-model="state.cliente.nome"
              placeholder="Ex: João da Silva"
            />
          </div>
          <div class="col-md-4">
            <label for="email">Email</label>
            <input
              id="email"
              type="text"
              class="form-control"
              v-model="state.cliente.email"
              placeholder="Ex: joao@email.com"
            />
          </div>
          <div class="col-md-4" v-if="state.cliente.tipo_pessoa != 'JURIDICA'">
            <label for="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              class="form-control"
              v-model="state.cliente.cpf"
              placeholder="000.000.000-00"
              maxlength="14"
              @input="mascaraCPF"
            />
          </div>
          <div class="col-md-4" v-else>
            <label for="cnpj">CNPJ</label>
            <input
              id="cnpj"
              type="text"
              class="form-control"
              v-model="state.cliente.cnpj"
              placeholder="00.000.000/0000-00"
              maxlength="18"
              @input="mascaraCNPJ"
            />
          </div>
          <div class="col-md-4">
            <label for="tipo_pessoa">Tipo Pessoa</label>
            <select
              id="tipo_pessoa"
              class="form-select"
              v-model="state.cliente.tipo_pessoa"
            >
              <option value="" disabled>Selecione...</option>
              <option value="FISICA">Física</option>
              <option value="JURIDICA">Jurídica</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="status">Status</label>
            <select
              id="status"
              class="form-select"
              v-model="state.cliente.status"
            >
              <option value="" disabled>Selecione...</option>
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="data">Data de Nascimento</label>
            <input
              id="data"
              type="text"
              class="form-control"
              v-model="state.cliente.data_nascimento"
              placeholder="DD/MM/AAAA"
              maxlength="10"
              @input="mascaraData"
            />
          </div>
          <div class="col-md-4">
            <label for="tel">Telefone Principal</label>
            <input
              id="tel"
              type="text"
              class="form-control"
              v-model="state.cliente.telefone_principal"
              placeholder="(00) 99999-9999"
              maxlength="15"
              @input="mascaraTelefone($event, 'telefone_principal')"
            />
          </div>
          <div class="col-md-4">
            <label for="tel2">Telefone Alternativo</label>
            <input
              id="tel2"
              type="text"
              class="form-control"
              v-model="state.cliente.telefone_alternativo"
              placeholder="(00) 99999-9999"
              maxlength="15"
              @input="mascaraTelefone($event, 'telefone_alternativo')"
            />
          </div>
          <div class="col-md-4">
            <label for="senha">Senha</label>
            <input
              id="senha"
              type="password"
              class="form-control"
              v-model="state.cliente.password"
              placeholder="Digite uma nova senha"
            />
          </div>
        </div>
        <div class="mt-10 d-flex gap-2 justify-content-end">
          <SecButton
            class="w-fit-content px-4"
            type="button"
            @click="atualizarCliente()"
            :disabled="state.isLoading"
          >
            <i class="bi bi-check-circle me-1"></i>
            {{ state.isLoading ? "Salvando..." : "Salvar" }}
          </SecButton>
          <NuxtLink to="/admin/clientes">
            <OutlineButton type="button">
              <i class="bi bi-x-circle me-1"></i>
              Cancelar
            </OutlineButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "@/services/axios";
import { useToast } from "@/composables/useToast";
import OutlineButton from "~/components/OutlineButton.vue";

export default {
  setup() {
    useHead({
      title: "Casa Bonita Eletros - Alterar Cliente",
    });

    onMounted(() => {
      fetchCliente();
    });

    const authStore = useAuthStore();
    const token = authStore.token;
    const router = useRouter();
    const toast = useToast();

    const state = reactive({
      isLoading: false,
      cliente: {
        id: "",
        nome: "",
        email: "",
        status: "",
        tipo_pessoa: "",
        cpf: "",
        cnpj: "",
        data_nascimento: "",
        telefone_alternativo: "",
        telefone_principal: "",
        password: "",
      },
    });

    function mascaraCPF(event) {
      let v = event.target.value.replace(/\D/g, "").slice(0, 11);
      v = v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      state.cliente.cpf = v;
    }

    function mascaraCNPJ(event) {
      let v = event.target.value.replace(/\D/g, "").slice(0, 14);
      v = v
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
      state.cliente.cnpj = v;
    }

    function mascaraData(event) {
      let v = event.target.value.replace(/\D/g, "").slice(0, 8);
      v = v.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");
      state.cliente.data_nascimento = v;
    }

    function mascaraTelefone(event, campo) {
      let v = event.target.value.replace(/\D/g, "").slice(0, 11);
      if (v.length <= 10) {
        v = v
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
      } else {
        v = v
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
      }
      state.cliente[campo] = v;
    }

    function limparMascaras(cliente) {
      return {
        ...cliente,
        cpf: cliente.cpf?.replace(/\D/g, "") || "",
        cnpj: cliente.cnpj?.replace(/\D/g, "") || "",
        telefone_principal:
          cliente.telefone_principal?.replace(/\D/g, "") || "",
        telefone_alternativo:
          cliente.telefone_alternativo?.replace(/\D/g, "") || "",
      };
    }

    async function fetchCliente() {
      try {
        // BUG 1 FIX: usando router.currentRoute.value (API reativa correta do Vue Router)
        const id = router.currentRoute.value.params.id;
        const { data } = await services.clientes.getById({ id, token });
        state.cliente.id = data.id;
        state.cliente.nome = data.nome;
        state.cliente.email = data.email;
        state.cliente.status = data.status;
        state.cliente.tipo_pessoa = data.tipo_pessoa;
        state.cliente.cpf = data.cpf;
        state.cliente.cnpj = data.cnpj;
        state.cliente.data_nascimento = data.data_nascimento;
        state.cliente.telefone_principal = data.telefone_principal;
        state.cliente.telefone_alternativo = data.telefone_alternativo;
      } catch (error) {
        console.log(error);
      }
    }

    async function atualizarCliente() {
      try {
        state.isLoading = true;
        const payload = limparMascaras(state.cliente);

        // Envia todos os dados do cliente e o token no mesmo objeto
        const { data } = await services.clientes.update({
          ...payload,
          token
        });

        toast.success("Cliente atualizado com sucesso!");
        router.push("/admin/clientes");
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.msg || "Erro ao atualizar cliente.");
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      atualizarCliente,
      mascaraCPF,
      mascaraCNPJ,
      mascaraData,
      mascaraTelefone,
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

input,
textarea,
select {
  border: solid 1px #000;
}

textarea {
  resize: none;
}

.card {
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #fff;
}

.btn {
  display: inline-flex;
  align-items: center;
  margin: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #fff !important;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  transition:
    opacity 0.15s,
    background 0.15s;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-salvar {
  background-color: #28a745;
}

.btn-salvar:hover:not(:disabled) {
  background-color: #218838;
}

.btn-cancelar {
  background-color: #dc3545;
}

.btn-cancelar:hover {
  background-color: #c82333;
}
</style>