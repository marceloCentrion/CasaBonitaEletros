import { defineStore } from 'pinia'

export const useIsLoading = defineStore('isLoading', () => {
  const isLoading = ref(false)

  function stop() {
    isLoading.value = false
  }
  function start() {
    isLoading.value = true
  }
  return {
    isLoading,
    start,
    stop,
  }
})
