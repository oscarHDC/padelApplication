<template>
  <Header />

  <div class="container">
    <RouterView />
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header/Header.vue';
</script>

<style scoped></style>
