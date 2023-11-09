<template>
  <h1>Main</h1>

  <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" @add-reservation="handleReservation" />

  <h2>Mis reservas...</h2>
  <section class="reservations">
    <Reservation v-for="reservation in reservationsRef" :data="reservation" />
  </section>
  <Toast />
</template>


<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import bookform from '../components/book-court-form/book-form.vue';
import Reservation from '../components/Reservation/reservation.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';


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

  //Add reservation to array
  reservationsRef.value.push(data)

  //Show toast
  showSuccess()

}


const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Reservation has been successful', detail: 'Reservation confirmed', life: 3000 });
};
</script>


<style>
.reservations {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1.3rem;
}
</style>
