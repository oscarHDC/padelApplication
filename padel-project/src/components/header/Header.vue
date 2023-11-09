<template>
  <div class="header">
    <div class="header-logo">
      <span>Logo</span>
    </div>
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'

</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  background-color: green;
  padding: 2rem;

  &-logo {
    color: white;
  }
}
</style>