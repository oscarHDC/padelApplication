import './assets/main.scss' // Importa estilos globales de SCSS

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Importa Pinia para la gestión del estado
import PrimeVue from 'primevue/config'; // Configuración de PrimeVue

// Importa estilos de PrimeVue (tema MD Light Indigo)
import 'primevue/resources/themes/md-light-indigo/theme.css'

// Importa el servicio de Toast de PrimeVue
import ToastService from 'primevue/toastservice';

// Importa la aplicación principal, enrutador y servicio de confirmación de PrimeVue
import App from './App.vue'
import router from './router'
import ConfirmationService from 'primevue/confirmationservice';

// Crea una instancia de Pinia para la gestión del estado
const pinia = createPinia()

// Crea la aplicación Vue
const app = createApp(App)

// Usa el servicio de confirmación de PrimeVue
app.use(ConfirmationService);

// Usa Pinia para la gestión del estado
app.use(pinia)

// Usa el enrutador
app.use(router)

// Configura PrimeVue
app.use(PrimeVue)

// Usa el servicio de Toast de PrimeVue
app.use(ToastService);

// Monta la aplicación en el elemento con ID 'app'
app.mount('#app')