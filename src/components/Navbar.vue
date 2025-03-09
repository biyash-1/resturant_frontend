<template>
  <nav class="p-4 sticky top-0 shadow-sm  z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="logo text-2xl font-bold">
        Burger<span class="text-yellow-500">hub</span>
      </div>
      <div class="hidden flex-1 md:flex justify-center space-x-6 text-sm">
        <router-link
          to="/"
          class="hover:text-blue-500 transition duration-300"
        >
          Home
        </router-link>
        <router-link
          to="/food"
          class="hover:text-blue-500 transition duration-300"
        >
          Items
        </router-link>
        <router-link
          to="/contact"
          class="hover:text-blue-500 transition duration-300"
        >
          Contact
        </router-link>
        <router-link
          to="/orderconfirmation/orderhistory"
          class="hover:text-blue-500 transition duration-300"
        >
          Orders
        </router-link>
      </div>
      <div class="hidden md:flex items-center space-x-4 mr-6">
        
        
      </div>

      <!-- Mobile Menu -->
       <div class="md:hidden">
         <Button
          icon="pi pi-bars"
          
           class=""
           @click="isSidebarVisible = true"
         />

       </div>

      <Sidebar
        v-model:visible="isSidebarVisible"
        position="right"
        

        
        class="w-64 bg-gray-400"
      >
        <div class="flex flex-col space-y-6 text-lg items-center">
          <router-link
            to="/"
            class="hover:text-blue-500"
            @click="isSidebarVisible = false"
          >
            Home
          </router-link>
          <router-link
            to="/food"
            class="hover:text-blue-500"
            @click="isSidebarVisible = false"
          >
            Items
          </router-link>
          <router-link
            to="/contact"
            class="hover:text-blue-500"
            @click="isSidebarVisible = false"
          >
            Contact
          </router-link>
          <router-link
            to="/orderconfirmation/orderhistory"
            class="hover:text-blue-500"
            @click="isSidebarVisible = false"
          >
            Orders
          </router-link>
          
          <div class="flex flex-col items-center space-y-4">
            <Button
              label="Login"
              class="p-button-text w-full"
          
            />
          
          </div>
        </div>
      </Sidebar>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Badge from 'primevue/badge';

const router = useRouter();
const isSidebarVisible = ref(false);
import 'primeicons/primeicons.css';


</script>