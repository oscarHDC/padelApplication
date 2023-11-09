<template>
  <h1>Main</h1>

  <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" @add-reservation="handleReservation" />

  <h2>Mis reservas...</h2>
  <section class="reservations">
    <Reservation />
    <Reservation />
    <Reservation />
  </section>
</template>


<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import bookform from '../components/book-court-form/book-form.vue';
import Reservation from '../components/Reservation/Reservation.vue'


const showBookModalRef = ref(false)

const showModal = () => {
  showBookModalRef.value = true
}

const handleReservation = (data) => {
  console.log(data);
  showBookModalRef.value = false

  //Show toast

  //Add reservation to array
}
</script>


<style>
.reservations {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 1.3rem;
}
</style>
