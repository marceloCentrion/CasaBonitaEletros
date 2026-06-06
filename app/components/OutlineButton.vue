<template>
  <button class="outline_btn" :class="`outline_btn--${color}`" v-bind="$attrs" @click="$emit('click', $event)">
    <i v-if="icon" class="bi" :class="icon" aria-hidden="true" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  icon: {
    type: String,
    default: null,
  },
});

defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.outline_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 11px 22px;
  background: transparent;
  border: 1.5px solid currentColor;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;

  .bi {
    font-size: 15px;
  }

  &--primary {
    color: $primary;
    border-color: $primary;

    &:hover {
      background: $primary;
      color: #fff;
    }
  }

  &--success {
    color: #22863a;
    border-color: #22863a;

    &:hover {
      background: #22863a;
      color: #fff;
    }
  }

  &--danger {
    color: #d93025;
    border-color: #d93025;

    &:hover {
      background: #d93025;
      color: #fff;
    }
  }

  &--neutral {
    color: #555;
    border-color: #d0d0d0;

    &:hover {
      border-color: #555;
      color: #1a1a1a;
    }
  }
}
</style>