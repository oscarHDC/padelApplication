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
import { ref, watch } from 'vue'
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import { formatDate, formatTime } from '../../helpers/date-utils'
import Rating from 'primevue/rating';
import { useAppStore } from '../../stores/appStore';

const store = useAppStore()
const day = ref()
const startHour = ref(new Date(2023, 9, 20, 18, 0));
const endHour = ref(new Date(2023, 9, 20, 19, 0));
const users = ref(1)
const levelRef = ref(3)
const levelDescription = ref('Intermediate')

watch(levelRef, () => {
  switch (levelRef.value) {
    case 1:
      levelDescription.value = 'Noob'
      break;
    case 2:
      levelDescription.value = 'Beginner'
      break;
    case 3:
      levelDescription.value = 'Intermediate'
      break;
    case 4:
      levelDescription.value = 'Pro'
      break;
    case 5:
      levelDescription.value = 'Master'
      break;

  }
})


const emit = defineEmits(['on-close'])

function hideModal() {
  emit('on-close')
  day.value = null
}

function submit() {

  const game = {
    id: store.games.length,
    users: users.value,
    level: levelRef.value,
    day: formatDate(day.value),
    startHour: formatTime(startHour.value),
    endHour: formatTime(endHour.value),
    userID: store.currentUser.id,
  }
  emit('create-game', game)
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