<template>
  <section class="user-information">
    <div class="user-image">
      <i class="pi pi-user" style="font-size: 4.5rem; border: 3px solid black; border-radius: 100%; padding: 1rem;"></i>
    </div>
    <div class="user-details">
      <h2>{{ store.currentUser?.name }}</h2>
      <h3>{{ store.currentUser?.level }}</h3>
      <h3>Matches played: {{ store.currentUser?.matches }}</h3>
      <div class="" style="display: flex; align-items: center; gap: .3rem;">
        <h3>Reviews</h3>
        <Rating v-model="reviewsRef" readonly :cancel="false" />
      </div>
    </div>
  </section>

  <section class="reservations-actions">
    <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
    <Button @click="showGameModal" label="Create game" icon="pi pi-users" iconPos="right" />
  </section>

  <section class="reservations">
    <h2 class="reservations-title">Join a game !</h2>
    <h3 v-if="!gamesRef.length" style="color: rgb(104, 102, 102);">No reservations available</h3>
    <div class="reservations-grid">
      <GameCard v-for="game in gamesRef" :data="game" @remove-reservation="deleteReservation"
        @join-game="handleJoinGame" />
    </div>
  </section>

  <section class="reservations">
    <h2 class="reservations-title">My reservations <i class="pi pi-bookmark"></i></h2>
    <h3 v-if="!reservationsRef.length" style="color: rgb(104, 102, 102);">No
      reservations available</h3>
    <div class="reservations-grid">
      <div v-for="reservation in reservationsRef" class="">
        <Reservation v-if="reservation !== undefined && reservation?.userID === store.currentUser.id" :data="reservation"
          @remove-reservation="deleteReservation" />
      </div>
    </div>
  </section>


  <section class="reservations">
    <h2 class="reservations-title">My games <i class="pi pi-bookmark"></i></h2>
    <h3 v-if="!myGamesRef.length" style="color: rgb(104, 102, 102);">No reservations available</h3>
    <div class="reservations-grid">
      <GameCard v-for="game in myGamesRef" :data="game" :editable="true" @remove-reservation="deleteGame" />
    </div>
  </section>
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" @add-reservation="handleReservation" />

  <CreateGameForm :visible="showCreateGameModalRef" @on-close="() => showCreateGameModalRef = false"
    @create-game="createGame" />
  <Toast />
  <ConfirmDialog />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAppStore } from '../stores/appStore';
import { useToast } from 'primevue/usetoast';
import 'primeicons/primeicons.css'
import bookform from '../components/book-court-form/book-form.vue';
import Button from 'primevue/button';
import Reservation from '../components/Reservation/reservation.vue';
import Toast from 'primevue/toast';
import CreateGameForm from '../components/create-game-form/CreateGameForm.vue'
import GameCard from '../components/Game-Card/GameCard.vue';
import { useRouter } from 'vue-router'
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from "primevue/useconfirm";
import Rating from 'primevue/rating';



const confirm = useConfirm();
const store = useAppStore()
const router = useRouter()
const showBookModalRef = ref(false)
const showCreateGameModalRef = ref(false)
const reservationsRef = ref([])
const gamesRef = ref([])
const toast = useToast()
const myGamesRef = ref([])
const reviewsRef = ref(4)

watch(store.getReservations(), () => {
  console.log("CAMBIO");
  reservationsRef.value = store.getReservations().map(reservation => {
    if (reservation.userID === store.currentUser.id) {
      return reservation
    }
  })
})

function handleJoinGame(currentGame) {

  confirm.require({
    message: 'Are you sure you want to join the game?',
    header: 'Confirmation',
    icon: 'pi pi-arrow-circle-right',
    accept: () => {
      store.updateGame(currentGame)
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }
  });


}

const showModal = () => {
  showBookModalRef.value = true
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
  data.id = store.getReservations.length

  //Add reservation to array
  //reservationsRef.value.push(data)

  //Add reservation to store
  store.reservations.push(data)

  //Show toast
  showSuccess()

}

const createGame = (game) => {
  showCreateGameModalRef.value = false
  gamesRef.value.push(game)
  store.addGame(game)
  gamesRef.value = store.getGames()
  myGamesRef.value = store.getMyGames()

  showSuccess()
}

const deleteReservation = ({ id }) => {
  //reservationsRef.value.splice(id, 1)
  store.reservations.splice(id, 1)
}

const deleteGame = (game) => {
  console.log("GAME", game);
  store.games.splice(game.id, 1)
  myGamesRef.value = store.getMyGames()
}

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Reservation has been successful', detail: 'Reservation confirmed', life: 3000 });
};

onMounted(() => {
  console.log("USER", store.currentUser);
  if (store.currentUser === undefined) {
    //Redirect
    router.push('/')
  }

  reservationsRef.value = store.getReservations().map(reservation => {
    if (reservation.userID === store.currentUser.id) {
      return reservation
    }

  })

  myGamesRef.value = store.getMyGames()
  gamesRef.value = store.getGames()
  console.log("MY RESERVATIONS", reservationsRef.value);
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
    row-gap: 1.3rem;
  }

  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
}

.user-information {
  display: flex;
  gap: 2.5rem;
  align-items: center;
  margin-bottom: 3rem;

}
</style>
