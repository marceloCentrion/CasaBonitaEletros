<script setup>
import { Logout2Icon } from "vue-tabler-icons";
import sidebarItems from "./sidebarItems";

const sidebarMenu = markRaw(sidebarItems);
const router = useRouter();
const storage = useAuthStore();
var nome = storage.nome;

async function deslogar() {
  if (confirm("Deseja realmente sair?")) {
    try {
      storage.id = null;
      storage.token = null;
      storage.nome = null;
      router.push("/login-sistema");
    } catch (error) {
      console.log(error);
    }
  } else {
    return;
  }
}

const state = reactive({
  nome: "",
});
onMounted(() => {
  state.nome = nome;
});
</script>

<template>
  <perfect-scrollbar class="scrollnavbar">
    <div class="sidebar-header">
      <div class="profile p-4">
        <div class="profile-pic" />
      </div>
      <div class="profile-name d-flex align-center px-3">
        <h5 class="text-surface font-weight-medium mb-0 ps-4">{{ state.nome }}</h5>
        <div class="ml-auto profile-logout">
          <v-btn variant="text" icon rounded="md" @click="deslogar()">
            <Logout2Icon size="22" color="white" />
          </v-btn>
        </div>
      </div>
    </div>
    <v-list class="py-5 px-4" density="compact">
      <template v-for="(item, i) in sidebarMenu">
        <LayoutSidebarNavGroup
          :item="item"
          v-if="item.header"
          :key="item.title"
        />
        <LayoutSidebarNavItem :item="item" v-else class="leftPadding" />
      </template>
    </v-list>

    <div>
      <LayoutSidebarBuynow />
    </div>
  </perfect-scrollbar>
</template>
