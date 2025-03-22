<script setup>
import {  RouterView } from 'vue-router'
import Navbar from  "./components/Navbar.vue"

import Toast from 'primevue/toast';


</script>

<template>
 <Navbar/>
 <Toast />
  <RouterView />
</template>

