<template>
  <nav class="p-4 sticky top-0 shadow-sm z-50 bg-white">
    <div class="container mx-auto flex justify-between items-center">
      <div class="logo text-2xl font-bold">
        Burger<span class="text-yellow-500">hub</span>
      </div>
      <div class="hidden flex-1 md:flex justify-center space-x-6 text-sm">
        <router-link
          to="/"
          class="hover:text-blue-500 transition duration-300 text-yellow-500 font-bold"
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
        <!-- Additional content can go here -->
      </div>
      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button
          @click="isSidebarVisible = true"
          class="text-gray-700 focus:outline-none"
        >
          <i class="pi pi-bars text-2xl"></i>
        </button>
      </div>
    </div>
  </nav>

  <!-- Overlay -->
  <div
    v-if="isSidebarVisible"
    @click="isSidebarVisible = false"
    class="fixed inset-0 bg-black opacity-50 z-40"
  ></div>

  <!-- Sidebar -->
  <div
    :class="[
      'fixed top-0 right-0 h-full w-64 bg-gray-400 z-50 transform transition-transform duration-300',
      isSidebarVisible ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <!-- Close Button -->
    <button
      @click="isSidebarVisible = false"
      class="absolute top-4 right-4 text-gray-700 focus:outline-none"
    >
      <i class="pi pi-times text-2xl"></i>
    </button>

    <!-- Sidebar Content -->
    <div class="flex flex-col mt-12 space-y-6 text-lg items-center">
      <router-link
        to="/"
        class="hover:text-blue-500 text-xl text-yellow-500"
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
      <button
        @click="handleLogin"
        class="text-blue-500 hover:underline"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isSidebarVisible = ref(false);
const router = useRouter();
import 'primeicons/primeicons.css';

const handleLogin = () => {
  // Implement your login logic here
  console.log('Login button clicked');
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
