<template>
  <Dialog v-model:visible="visible" modal header="Create a game" :style="{ width: '50rem' }">
    <div class="book-form">

      <span class="p-float-label">
        <InputNumber id="number-input" v-model="users" showButtons :min="1" :max="3" />
        <label for="number-input">How many people are you?</label>
      </span>

      <div class="card flex justify-content-center">
        <span style="margin-left: 10px;"> {{ levelDescription }} level</span>
        <Rating v-model="levelRef" :cancel="false" />
      </div>

      <span class="p-float-label w-full">
        <Calendar v-model="day" inputId="day" showIcon dateFormat="dd/mm/yy" />
        <label for="day">Day</label>
      </span>
      <span class="p-float-label">
        <Calendar id="calendar-timeonly" v-model="endHour" timeOnly inputId="startHour" showIcon />
        <label for="startHour">Start hour</label>
      </span>
      <span class="p-float-label">
        <Calendar id="calendar-timeonly" v-model="startHour" timeOnly inputId="endHour" showIcon />
        <label for="endHour">End hour</label>
      </span>

      <div class="book-form-actions">
        <Button @click="hideModal" label="Cancel" severity="danger" rounded />
        <Button label="Create game" rounded @click="submit" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
// Importación de funciones y componentes necesarios desde Vue y PrimeVue
import { ref, watch, defineEmits } from 'vue';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { formatDate, formatTime } from '../../helpers/date-utils';
import Rating from 'primevue/rating';
import { useAppStore } from '../../stores/appStore';

// Uso del store de la aplicación para almacenar los datos de las partidas y usuarios
const store = useAppStore();

// Declaración de variables reactivas utilizando ref()
const day = ref(); // Variable reactiva para almacenar la fecha seleccionada
const startHour = ref(new Date(2023, 9, 20, 18, 0)); // Hora de inicio predefinida
const endHour = ref(new Date(2023, 9, 20, 19, 0)); // Hora de finalización predefinida
const users = ref(1); // Número de personas participantes
const levelRef = ref(3); // Nivel de habilidad seleccionado
const levelDescription = ref('Intermediate'); // Descripción del nivel por defecto

// Observador para cambiar la descripción del nivel según la selección del usuario
watch(levelRef, () => {
  switch (levelRef.value) {
    case 1:
      levelDescription.value = 'Noob';
      break;
    case 2:
      levelDescription.value = 'Beginner';
      break;
    case 3:
      levelDescription.value = 'Intermediate';
      break;
    case 4:
      levelDescription.value = 'Pro';
      break;
    case 5:
      levelDescription.value = 'Master';
      break;
  }
});

// Función para emitir evento de cierre del modal
const emit = defineEmits(['on-close']);

function hideModal() {
  emit('on-close'); // Emite el evento 'on-close' para cerrar el modal
  day.value = null; // Reinicia el valor de la fecha seleccionada
}

// Función para crear y emitir información del juego al hacer click en "Create game"
function submit() {
  const game = {
    id: store.games.length, // Asigna un ID a la nueva partida
    users: users.value, // Número de usuarios en el juego
    level: levelRef.value, // Nivel de habilidad
    day: formatDate(day.value), // Formatea la fecha
    startHour: formatTime(startHour.value), // Formatea la hora de inicio
    endHour: formatTime(endHour.value), // Formatea la hora de finalización
    userID: store.currentUser.id, // ID del usuario actual
  };
  emit('create-game', game); // Emite el evento 'create-game' con los datos de la partida
}
</script>


<style lang="scss">
.book-form {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-actions {
    display: flex;
    justify-content: flex-end;
    gap: .8rem;
  }
}

.p-calendar {
  width: 100% !important;
}

.p-inputnumber {
  width: 100% !important;
}
</style>