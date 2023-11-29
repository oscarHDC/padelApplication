import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('store', () => {
  const currentUser = ref()
  const reservations = ref([])
  const users = ref([
    {
      id: 1,
      name: 'Oscar Hernanz',
      password: 'a'
    },
    { 
      id: 2,
      name: 'Miguel Hernanz',
      password: 'b'
    }
  ])


  function getReservations() {
    return reservations.value
  }

  function setCurrentUser(user){
    currentUser.value = user
  }


  return {users, setCurrentUser, currentUser, reservations, getReservations}

})