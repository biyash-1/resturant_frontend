<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Toast from 'primevue/toast';


const route = useRoute();

const isAdminRoute = computed(() => {
  const result = route.path.startsWith('/admin');
  console.log('Current route:', route.path, 'isAdminRoute:', result);
  return result;
});

watch(() => route.path, (newPath) => {
  console.log('Route changed to:', newPath);
});
</script>

<template>
  <div>
    <!-- Place cursor effect component here -->
    <vue-cursor-fx />

    <!-- Navbar shows only when not on an admin route -->
    <Navbar v-if="!isAdminRoute" />
    <Toast />
    <RouterView />
  </div>
</template>