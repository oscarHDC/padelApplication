<template>
  <div class="header">
    <div class="header-logo">
      <span>Logo</span>
    </div>
    <Button label="OH" rounded @click="toggle" severity="secondary" />
    <OverlayPanel ref="panel">
      <div class="header-user-panel">
        <div class="">
          <strong>Óscar Hernanz de Castro</strong>
          <br>
          <span>Valladolid</span>
        </div>
        <Button label="Sign off" severity="danger" rounded />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'
import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';

const panel = ref()

const toggle = (event) => {
  panel.value.toggle(event);
}
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

  &-user-panel {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>