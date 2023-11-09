<template>
  <div class="header">
    <div class="header-logo">
      <span>Logo</span>
    </div>
    <!-- <Button label="OH" rounded @click="toggle" severity="secondary" /> -->
    <Avatar label="OH" class="mr-2" size="large" style="background-color: white; color: rgb(23, 141, 23)" shape="circle"
      @click="toggle" />
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
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping

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

.p-avatar-text {
  font-size: 1rem;
  cursor: pointer;
}
</style>