<template>
  <div class="reservation">
    <div class="reservation-info">
      <h2 class="reservation-info__title">Pista 1</h2>
      <p>10/11/2023</p>
      <p>18:00 - 19:30</p>
    </div>

    <div class="card flex justify-content-center">
      <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button';
import Menu from 'primevue/menu';


const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Cancel reservation',
        icon: 'pi pi-times',
        command: () => {
          console.log("MODAL ELIMINAR")
        }
      },
      {
        label: 'Edit reservation',
        icon: 'pi pi-pencil'
      }
    ]
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

</script>

<style lang="scss" scoped>
.p-button {
  background-color: transparent;
  color: green;
}

.reservation {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 7px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &-info {
    display: flex;
    flex-direction: column;

    &__title {
      margin-bottom: .5rem;
    }

  }

}
</style>