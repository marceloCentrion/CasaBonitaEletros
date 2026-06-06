<template>
  <topShort class="hide-on-mobile" />
  <top />
  <btnWhatsapp />
  <slot />
  <bottom />
</template>

<style>
@media (max-width: 768px) {
  .hide-on-mobile {
    display: none !important;
  }
}
</style>
