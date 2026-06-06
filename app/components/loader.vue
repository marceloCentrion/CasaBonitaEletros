<template>
  <span class="loader"> C<span class="o-loader"></span>zinharte </span>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.loader {
  user-select: none;
  position: relative;
  font-size: 48px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: $primary;

  .o-loader {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  .o-loader::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 5px solid $primary;
    border-bottom-color: white;
    box-sizing: border-box;
    animation: rotation 0.6s linear infinite;
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
