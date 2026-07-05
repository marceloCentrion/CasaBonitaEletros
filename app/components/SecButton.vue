<template>
  <NuxtLink v-if="to" :to="to" class="sec_btn" :class="{ 'sec_btn--flex': flex }" v-bind="$attrs" @click="$emit('click', $event)">
    <slot />
  </NuxtLink>
  <button v-else class="sec_btn" :class="{ 'sec_btn--flex': flex }" v-bind="$attrs" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  flex: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: null,
  }
});

defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.sec_btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 13px;
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &--flex {
    width: 100%;
  }
}
</style>