import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('store', () => {
  const reservations = ref([])

  function getReservations() {
    return reservations.value
  }

  return {reservations, getReservations}

})