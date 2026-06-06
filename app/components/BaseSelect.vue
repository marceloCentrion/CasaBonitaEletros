<template>
  <div class="base_field_group" :class="{ 'base_field_group--sm': sm }">
    <label v-if="label" class="base_label" :for="selectId">{{ label }}</label>

    <div class="base_select_wrap">
      <select
        :id="selectId"
        v-bind="$attrs"
        :value="modelValue"
        class="base_select"
        :class="{
          'is-invalid': isInvalid,
          'is-valid': isValid,
          'is-placeholder': !modelValue,
        }"
        :required="required"
        @change="
          $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
        @blur="$emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <span class="base_select_icon" aria-hidden="true">
        <i class="bi bi-chevron-down" />
      </span>
    </div>

    <div v-if="errorMessage && isInvalid" class="base_error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue?: string | number;
  id?: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
  isInvalid?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  sm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  options: () => [],
  required: false,
  isInvalid: false,
  isValid: false,
  sm: false,
});

defineEmits(["update:modelValue", "blur"]);

const selectId = computed(
  () => props.id ?? `select-${Math.random().toString(36).slice(2, 7)}`,
);
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
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
}

.base_select_wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.base_select {
  width: 100%;
  padding: 11px 40px 11px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background: #fff;
  transition: border-color 0.2s;
  outline: none;
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;

  option {
    color: #1a1a1a;
  }

  &.is-placeholder {
    color: #bbb;
  }

  &:focus {
    border-color: $primary;
  }

  &:disabled {
    background-color: lightgray;
    color: black;
  }

  &.is-valid {
    border-color: #198754;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 2.5rem center;
    background-size: 1rem;
  }

  &.is-invalid {
    border-color: #dc3545;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 2.5rem center;
    background-size: 1rem;

    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
    }
  }
}

.base_select_icon {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 14px;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;

  .base_select:focus ~ & {
    color: $primary;
  }
}

.base_error {
  font-size: 0.8rem;
  color: #dc3545;
  margin-top: 2px;
}
</style>
