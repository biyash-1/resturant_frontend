

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'
import "./assets/base.css"
import Aura from '@primeuix/themes/aura';
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(MotionPlugin)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
});



app.use(createPinia())
app.use(router)

app.mount('#app')
