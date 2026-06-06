import Toast from "vue-toastification";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    hideProgressBar: false,
  });
});
