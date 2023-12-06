import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

//import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primevue/resources/themes/md-light-indigo/theme.css'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'
import ConfirmationService from 'primevue/confirmationservice';


const pinia = createPinia()
const app = createApp(App)

app.use(ConfirmationService);
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.mount('#app')
