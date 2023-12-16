import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('store', () => {
  const currentUser = ref()
  const reservations = ref([])
  const games = ref([
    {
      "id":0,
      "users":1,
      "level":3,
      "day":"06/12/2023",
      "startHour":"18:00",
      "endHour":"19:00",
      "userID":1
    }
  ])
  const users = ref([
    {
      id: 1,
      name: 'Oscar',
      password: 'password',
      level: 'Advanced level',
      matches: 16,
      reviews: 3,
    },
    { 
      id: 2,
      name: 'Miguel',
      password: 'password',
      level: 'Advanced level',
      matches: 11,
      reviews: 3,
    },
    { 
      id: 3,
      name: 'Hugo',
      password: 'password',
      level: 'Advanced level',
      matches: 23,
      reviews: 3,
    },
    { 
      id: 4,
      name: 'Javier',
      password: 'password',
      level: 'Advanced level',
      matches: 23,
      reviews: 3,
    }
  ])

  function getReservations() {
    return reservations.value
  }

  function setCurrentUser(user){
    currentUser.value = user
  }

  function addGame(game){
    games.value.push(game)
  }

  function getGames() {
    const data = games.value.filter((game) => game.userID !== currentUser.value?.id)
    return data
  }
  
  function getMyGames() {
    const data = games.value.filter((game) => game.userID === currentUser.value?.id)
    return data
  }

  function updateGame(selectedGame) {

      // Find the object in the array by its ID
    const updatedArray = games.value.map(obj => {
      if (obj.id === selectedGame.id) {
          // If the object's ID matches, update the fieldToUpdate
          return { ...obj, users: obj.users++ };
      }
      return obj; // Otherwise, return the object unchanged
    });

    console.log(updatedArray);

  }


  return {
    users,
    setCurrentUser,
    currentUser,
    reservations,
    getReservations,
    getGames,
    getMyGames,
    addGame,
    games,
    updateGame,
  }

})