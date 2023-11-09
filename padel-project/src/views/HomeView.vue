<template>
  <h1>Main</h1>

  <Button @click="showModal" label="Book court" icon="pi pi-plus" iconPos="right" />
  <bookform :visible="showBookModalRef" @on-close="() => showBookModalRef = false" />
</template>


<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import bookform from '../components/book-court-form/book-form.vue';


const showBookModalRef = ref(false)

const showModal = () => {
  showBookModalRef.value = true
}
</script>

