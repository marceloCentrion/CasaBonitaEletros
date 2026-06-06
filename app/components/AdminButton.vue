<template>
  <button>
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

button {
  background: white;
  backdrop-filter: blur(4px);
  border: 1px solid #ffffff80;
  color: black;
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
    transform: scale(0.96);
  }
}
</style>
