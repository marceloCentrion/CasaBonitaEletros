<script setup lang="ts">
import { ref } from "vue";
/*import tabler icons*/
import { TrashIcon, SendIcon, BellIcon } from "vue-tabler-icons";
import UiChildCard from "@/components/shared/UiChildCard.vue";
// icons
import { AccessPointIcon } from "vue-tabler-icons";
// buttons color data
const btnsColor = ref(["primary", "secondary", "success", "error", "warning"]);
</script>

// ===============================|| Ui Buttons
||=============================== //
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Base Buttons -->
        <v-col cols="12" sm="12">
          <UiChildCard title="Default">
            <BaseButtons />
          </UiChildCard>
        </v-col>
        <!-- Color Buttons -->
        <v-col cols="12" lg="6">
          <UiChildCard title="Colors">
            <ColorsButtons />
          </UiChildCard>
        </v-col>
        <!-- Outlined Buttons -->
        <v-col cols="12" lg="6">
          <UiChildCard title="Outlined">
            <OutlinedButtons />
          </UiChildCard>
        </v-col>
        <!-- Sizes -->
        <v-col cols="12" lg="12">
          <UiChildCard title="Size">
            <SizeButtons />
          </UiChildCard>
        </v-col>
        <!-- Text Buttons -->
        <v-col cols="12" lg="6">
          <UiChildCard title="Text Color">
            <TextButtons />
          </UiChildCard>
        </v-col>
        <!-- Icon Color Sizes -->
        <v-col cols="12" lg="6">
          <UiChildCard title="Icon Size">
            <IconColorSizes />
          </UiChildCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
