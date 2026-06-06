<template>
  <button class="primary-btn">
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.primary-btn {
  background: $primary;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 6px;
  transition: 0.3s;

  &:hover {
    background-color: white;
    color: $primary;
    border-color: white;
  }
}
</style>
