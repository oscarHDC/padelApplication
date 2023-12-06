<template>
  <div class="login">
    <h1>LOG IN</h1>
    <div class="flex flex-column gap-2">
      <label for="username">Username</label>
      <InputText id="username" v-model="userRef" aria-describedby="username-help" />
    </div>
    <div class="flex justify-content-center">
      <label for="value">Password</label>
      <Password id="value" v-model="password" type="text" aria-describedby="text-error" :feedback="false"
        style="width: 100%;" toggleMask />
    </div>

    <div class="align">
      <Button @click="submit" class="align" label="Sign in" />
    </div>

  </div>
</template>

<script setup>
// Importación de módulos y componentes necesarios desde Vue y PrimeVue
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore';

// Inicialización de variables y referencias
const router = useRouter()
const userRef = ref("")
const password = ref()
const store = useAppStore();

// Función para enviar el formulario de inicio de sesión
const submit = () => {
  // Buscar al usuario por nombre y contraseña
  const user = store.users.find(user => user.name === userRef.value)
  // Verificar si el usuario existe y la contraseña es correcta
  if (user && user.password === password.value) {
    store.setCurrentUser(user) // Establecer usuario actual
    router.push('/home') // Redirigir a la ruta /home
  }
}
</script>


<style lang="scss">
.p-password-input {
  width: 100% !important;
}

.login {
  max-width: 700px;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5rem;
}

.flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
}

.align {
  display: flex;
  justify-content: flex-end;
}
</style>