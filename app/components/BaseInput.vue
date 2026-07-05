<template>
  <div class="base_field_group" :class="{ 'base_field_group--sm': sm }">
    <label v-if="label" class="base_label" :for="inputId">{{ label }}</label>

    <div class="base_input_wrap">
      <input
        :id="inputId"
        v-bind="$attrs"
        :type="inputType"
        :value="modelValue"
        class="base_input"
        :class="{
          'is-invalid': isInvalid,
          'is-valid': isValid,
        }"
        :placeholder="placeholder"
        :required="required"
        :minlength="minlength"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="emit('blur', $event)"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="base_toggle_senha"
        :aria-label="mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'"
        @click="mostrarSenha = !mostrarSenha"
      >
        <i
          class="bi"
          :class="mostrarSenha ? 'bi-eye-slash' : 'bi-eye'"
          aria-hidden="true"
        />
      </button>
    </div>

    <div v-if="errorMessage && isInvalid" class="base_error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
  autocomplete?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  sm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  required: false,
  isInvalid: false,
  isValid: false,
  sm: false,
});

const emit = defineEmits(["update:modelValue", "blur"]);

const inputId = computed(
  () => props.id ?? `input-${Math.random().toString(36).slice(2, 7)}`,
);

const mostrarSenha = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return mostrarSenha.value ? "text" : "password";
  }
  return props.type;
});

function handleInput(event: any) {
  let value = event?.target?.value ?? event;

  if (value == null) value = "";

  emit("update:modelValue", value);
}
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.base_field_group {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 6px;

  &--sm {
    max-width: 90px;
    flex: 0 0 90px;

    @media (max-width: 540px) {
      max-width: 100%;
      flex: 1;
    }
  }
}

.base_label {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.base_input_wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
}

.base_input {
  width: 100%;
  flex: 1 1 100%;
  padding: 11px 14px;
  padding-right: 2.5rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #fff;
  transition: border-color 0.2s;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: var(--primary);
  }

  [data-password] & {
    padding-right: 4.5rem;
  }

  &.is-valid {
    border-color: #198754;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
  }

  &.is-invalid {
    border-color: #dc3545;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;

    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
    }
  }

  &.is-valid,
  &.is-invalid {
    .base_input_wrap:has(~ .base_toggle_senha) & {
      background-position: right 2.5rem center;
    }
  }
}

.base_toggle_senha {
  position: absolute;
  right: 13px;
  top: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
}

.base_error {
  font-size: 0.8rem;
  color: #dc3545;
  margin-top: 2px;
}
</style>