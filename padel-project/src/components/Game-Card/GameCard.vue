<template>
  <div class="reservation">
    <div class="reservation-info">
      <h2 class="reservation-info__title">Court 1</h2>
      <p>{{ prop$$.data.day }}</p>
      <p>{{ prop$$.data.startHour }} - {{ prop$$.data.endHour }}</p>
      <p>{{ composeLevel(prop$$.data.level) }} level</p>

      <div class="reservation-users">
        <div v-for="(user, index) in 4">
          <ion-icon v-if="index > prop$$.data.users - 1" style="color: green;" name="person-outline"></ion-icon>
          <ion-icon v-else style="color: red;" name="person-outline"></ion-icon>
        </div>
      </div>
    </div>

    <div class="card flex justify-content-center" v-if="editable">
      <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>

    <div class="card flex justify-content-center" v-if="!editable">
      <Button type="button" icon="pi pi-angle-double-right" @click="joinGame" aria-haspopup="true"
        aria-controls="overlay_menu" />

    </div>


  </div>
</template>
<script setup>
// Importación de funciones y componentes necesarios desde Vue
import { ref } from 'vue'
import Button from 'primevue/button';
import Menu from 'primevue/menu';

// Propiedades esperadas para la información de la reserva y su modo editable
const prop$$ = defineProps({
  data: {
    type: Object,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  }
})

// Emisores de eventos para acciones como remover reserva o unirse a la partida
const emit = defineEmits(['remove-reservation', 'join-game'])

// Referencia al menú y definición de sus elementos
const menu = ref();
const items = ref([
  {
    items: [
      {
        label: 'Cancel reservation',
        icon: 'pi pi-trash',
        command: () => {
          emit("remove-reservation", prop$$.data)
        }
      },
    ]
  }
]);

// Función para unirse a la partida
const joinGame = () => {
  emit('join-game', prop$$.data)
}

// Función para alternar la visibilidad del menú
const toggle = (event) => {
  menu.value.toggle(event);
};

// Función para componer el nivel de habilidad a partir del número proporcionado
const composeLevel = (level) => {
  let levelDescription
  switch (level) {
    case 1:
      levelDescription = 'Noob'
      break;
    case 2:
      levelDescription = 'Beginner'
      break;
    case 3:
      levelDescription = 'Intermediate'
      break;
    case 4:
      levelDescription = 'Pro'
      break;
    case 5:
      levelDescription = 'Master'
      break;
  }

  return levelDescription
}
</script>

<style lang="scss" scoped>
.blue {
  color: blue;
}

.red {
  color: red;
}

ion-icon .p-button {
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

  &-users {
    display: flex;
    gap: .5rem;
  }

}
</style>