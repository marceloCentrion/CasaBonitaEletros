<template>
  <span class="loader">Casa B<span class="o-loader" aria-label="o"></span>nita Eletros</span>
</template>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;

.loader {
  user-select: none;
  position: relative;
  font-size: 48px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: var(--primary);

  .o-loader {
    position: relative;
    display: inline-block;
    width: 0.66em;
    height: 0.66em;
    margin: 0 0.02em;
    vertical-align: -0.05em;
  }

  .o-loader::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 5px solid var(--primary);
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
