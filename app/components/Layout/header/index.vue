<script setup>
const userprofile = ref([
  {
    title: "My Profile",
    desc: "Account Settings",
  },
  {
    title: "My Inbox",
    desc: "Messages & Emails",
  },
  {
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
  },
]);
</script>

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <!-- <img src="./../../../public/images/admin/code_icon_centrion.png" width="35" alt="Centrion Web" /> -->
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="250" elevation="10">
      <v-list class="pa-4" elevation="10" rounded="md">
        <div class="text-center">
          <h5 class="title-card">Nos Alcance</h5>
        </div>
        <div class="row mt-5 ">
          <div class="col-md-12 text-center"><a class="mb-0 btn btn-dark me-2"
              href="https://www.instagram.com/centrionweb?igsh=dTE0ZGphN2tjaXcw" target="_blank"><i
                class="bi bi-instagram m-1"></i>Instagram</a></div>
          <div class="col-md-12 text-center mt-2"><a class="mb-0 btn btn-dark me-2"
              href="https://pt-br.facebook.com/centrionweb/" target="_blank"><i
                class="bi bi-facebook me-2"></i>Facebook</a></div>
          <div class="col-md-12 text-center mt-2"><a class="mb-0 btn btn-dark me-2"
              href="https://br.linkedin.com/company/centrionweb?trk=public_profile_experience-item_profile-section-card_image-click&original_referer=https%3A%2F%2Fwww.google.com%2F"
              target="_blank"><i class="bi bi-linkedin me-3"></i>Linkedin </a></div>
        </div>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

