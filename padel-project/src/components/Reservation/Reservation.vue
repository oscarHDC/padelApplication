<template>
  <div class="reservation">
    <div class="reservation-info">
      <h2 class="reservation-info__title">Pista 1</h2>
      <p>{{ prop$$.data.day }}</p>
      <p>{{ prop$$.data.startHour }} - {{ prop$$.data.endHour }}</p>
    </div>

    <div class="card flex justify-content-center">
      <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
      <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
  </div>
</template>

<script setup>
// Importación de funciones y componentes necesarios desde Vue y PrimeVue
import { ref } from 'vue'
import Button from 'primevue/button';
import Menu from 'primevue/menu';

// Propiedades esperadas para la información de la reserva
const prop$$ = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

// Emisor de eventos para la acción de eliminar reserva
const emit = defineEmits(['remove-reservation'])

// Referencia al menú y definición de sus elementos
const menu = ref();
const items = ref([
  {
    items: [
      {
        // Opción para cancelar la reserva
        label: 'Cancel reservation',
        icon: 'pi pi-trash',
        command: () => {
          emit("remove-reservation", prop$$.data)
        }
      },
    ]
  }
]);

// Función para alternar la visibilidad del menú de opciones
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