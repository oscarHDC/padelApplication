<template>
  <h1>Main</h1>
  <section class="reservations-actions">
    <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
    <Button @click="showGameModal" label="Create game" icon="pi pi-users" iconPos="right" />
  </section>

  <section class="reservations">
    <h2 class="reservations-title">My reservations <i class="pi pi-bookmark"></i></h2>
    <h3 v-if="!reservationsRef.length" style="color: rgb(104, 102, 102);">No reservations available</h3>
    <div class="reservations-grid">
      <Reservation v-for="reservation in reservationsRef" :data="reservation" @remove-reservation="deleteReservation" />
    </div>
  </section>

  <section class="reservations">
    <h2 class="reservations-title">Games <i class="pi pi-bookmark"></i></h2>
    <h3 v-if="!gamesRef.length" style="color: rgb(104, 102, 102);">No reservations available</h3>
    <div class="reservations-grid">
      <GameCard v-for="game in gamesRef" :data="game" @remove-reservation="deleteReservation" />
    </div>
  </section>
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" @add-reservation="handleReservation" />

  <CreateGameForm :visible="showCreateGameModalRef" @on-close="() => showCreateGameModalRef = false"
    @create-game="createGame" />
  <Toast />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/appStore';
import { useToast } from 'primevue/usetoast';
import 'primeicons/primeicons.css'
import bookform from '../components/book-court-form/book-form.vue';
import Button from 'primevue/button';
import Reservation from '../components/Reservation/reservation.vue';
import Toast from 'primevue/toast';
import CreateGameForm from '../components/create-game-form/CreateGameForm.vue'
import GameCard from '../components/Game-Card/GameCard.vue';

const store = useAppStore()
const showBookModalRef = ref(false)
const showCreateGameModalRef = ref(false)
const reservationsRef = ref([])
const gamesRef = ref([])
const toast = useToast()

const showModal = () => {
  showBookModalRef.value = true
  const a = store.getReservations()
  console.log("STORE", a);
}

const showGameModal = () => {
  showCreateGameModalRef.value = true
}

const hideModal = () => {
  showBookModalRef.value = false
}

const handleReservation = (data) => {
  //Close modal
  hideModal();

  //Setting Id
  data.id = reservationsRef.value.length

  //Add reservation to array
  //reservationsRef.value.push(data)
  store.reservations.push(data)

  //Show toast
  showSuccess()

}

const createGame = (game) => {
  showCreateGameModalRef.value = false
  gamesRef.value.push(game)
  showSuccess()
}

const deleteReservation = ({ id }) => {
  reservationsRef.value.splice(id, 1)
  store.reservations.splice(id, 1)
}


const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Reservation has been successful', detail: 'Reservation confirmed', life: 3000 });
};

onMounted(() => {
  reservationsRef.value = store.getReservations()
})
</script>


<style lang="scss" scoped>
.reservations {
  padding: 2rem;
  margin-top: 1rem;
  border: 1px solid;
  border-radius: 7px;

  &-title {
    margin-bottom: 1rem;
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1.3rem;
  }

  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
}
</style>
