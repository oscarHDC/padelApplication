<template>
  <h1>Main</h1>

  <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
  <section class="reservations">
    <h2 class="reservations-title">My reservations <i class="pi pi-bookmark"></i></h2>
    <h3 v-if="!reservationsRef.length" style="color: rgb(104, 102, 102);">No reservations available</h3>
    <div class="reservations-grid">
      <Reservation v-for="reservation in reservationsRef" :data="reservation" @remove-reservation="deleteReservation" />
    </div>
  </section>
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" @add-reservation="handleReservation" />
  <Toast />
</template>


<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import bookform from '../components/book-court-form/book-form.vue';
import Reservation from '../components/Reservation/reservation.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import 'primeicons/primeicons.css'


const showBookModalRef = ref(false)
const reservationsRef = ref([])
const toast = useToast();

const showModal = () => {
  showBookModalRef.value = true
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
  reservationsRef.value.push(data)

  //Show toast
  showSuccess()

}

const deleteReservation = ({ id }) => {
  reservationsRef.value.splice(id, 1)
}


const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Reservation has been successful', detail: 'Reservation confirmed', life: 3000 });
};
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
}
</style>
