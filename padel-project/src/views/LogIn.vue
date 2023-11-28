<template>
  <div class="login">
    <h1>LOG IN</h1>
    <div class="flex flex-column gap-2">
      <label for="username">Username</label>
      <InputText id="username" v-model="user" aria-describedby="username-help" />
    </div>
    <div class="flex justify-content-center">
      <label for="value">Password</label>
      <Password id="value" v-model="password" type="text" aria-describedby="text-error" :feedback="false" />
    </div>

    <div class="align">
      <Button @click="submit" class="align" label="Sign in" />
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref()
const password = ref()

const submit = () => {
  if (user.value !== '' && password.value != '') {
    //Redirect
    router.push('/home') // Navigate to the /about route
  }
}

</script>

<style lang="scss">
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