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
        <Button @click="signOff" label="Sign off" severity="danger" rounded />
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
// Importación de funciones y componentes necesarios desde Vue y PrimeVue
import { ref } from 'vue'
import 'primeicons/primeicons.css' // Importación opcional para iconos
import OverlayPanel from 'primevue/overlaypanel';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import { useRouter } from 'vue-router'

// Definición de enrutador (opcional, dependiendo del uso del enrutado)
const router = useRouter()

// Referencia al panel de superposición y función para alternar su visibilidad
const panel = ref()
const toggle = (event) => {
  panel.value.toggle(event);
}

// Función para cerrar sesión y redirigir a la página de inicio
const signOff = () => {
  router.push('/') // Redirección a la página de inicio al cerrar sesión
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