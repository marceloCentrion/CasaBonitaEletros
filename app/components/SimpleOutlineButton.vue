<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

button {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
  font-size: 14px;
  font-weight: 500;
  padding: 14px 24px;
  border-radius: 6px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;
  margin-left: 1rem;

  :deep(a) {
    text-decoration: none;
  }

  &:hover {
    background-color: var(--primary);
    color: white;
  }
}
</style>
