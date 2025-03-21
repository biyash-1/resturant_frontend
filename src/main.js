import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia'
import "./assets/base.css"
import Aura from '@primeuix/themes/aura';
import { MotionPlugin } from '@vueuse/motion'
import ToastService from 'primevue/toastservice';
import persistedState from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'

const pinia = createPinia();
pinia.use(persistedState);

const app = createApp(App);

app.use(ToastService);
app.use(MotionPlugin);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  }
});

// Use the configured pinia instance here
app.use(pinia);
app.use(router);

app.mount('#app');
