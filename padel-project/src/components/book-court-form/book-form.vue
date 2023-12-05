<template>
  <Dialog v-model:visible="visible" modal header="Book a court" :style="{ width: '50rem' }">
    <div class="book-form">

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
        <Button label="Book" rounded @click="bookCourt" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { formatDate, formatTime } from '../../helpers/date-utils'
import { useAppStore } from '../../stores/appStore';

const day = ref()
const startHour = ref(new Date(2021, 9, 20, 18, 0));
const endHour = ref(new Date(2021, 9, 20, 19, 0));
const store = useAppStore()


const emit = defineEmits(['on-close'])

function hideModal() {
  emit('on-close')
  day.value = null
}

function bookCourt() {
  const reservation = {
    day: formatDate(day.value),
    startHour: formatTime(startHour.value),
    endHour: formatTime(endHour.value),
    userID: store.currentUser.id
  }
  emit('add-reservation', reservation)
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
</style>