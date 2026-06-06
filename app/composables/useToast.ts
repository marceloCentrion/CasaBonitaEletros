import { useToast as useVueToast } from "vue-toastification";

export function useToast() {
  const toast = useVueToast();

  function success(message: string) {
    toast.success(message);
  }

  function error(message: string) {
    toast.error(message);
  }

  function warning(message: string) {
    toast.warning(message);
  }

  function info(message: string) {
    toast.info(message);
  }

  return { success, error, warning, info };
}
