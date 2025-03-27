<template>
  <nav class="p-4 sticky top-0 shadow-sm z-50 bg-gray-100 ">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left: Logo -->
      <div class="logo text-2xl font-bold">
        Burger<span class="text-yellow-500">hub</span>
      </div>
      <!-- Center: Navigation Links -->
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
          to="/orderconfirmation/orders"
          class="hover:text-blue-500 transition duration-300"
        >
          Orders
        </router-link>
      </div>
      <div class="relative mr-6">
        <i class="pi pi-cart-plus" style="font-size: 1.5rem" @click="router.push('/cart')"></i>
        <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {{ cart.totalItems }}
        </span>
      </div>
      <div class= " hidden md:flex items-center  mr-4">
        <Button v-if="!auth.isLoggedIn" @click="router.push('/login')" label="Login" severity="success" rounded />
        <Button  @click="handleLogout" v-if="auth.isLoggedIn" label="logout" severity="danger" rounded />

      </div>
      <!-- Right: Dark Mode Toggle Button -->
      <div class="hidden md:flex items-center space-x-4 mr-6">
        <Button
          label=""
          icon="pi pi-moon"
          severity="secondary"
          raised
          @click="toggleDarkMode()"
        />
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

  <!-- Overlay for mobile sidebar -->
  <div
    v-if="isSidebarVisible"
    @click="isSidebarVisible = false"
    class="fixed inset-0 bg-black opacity-50 z-40"
  ></div>

  <!-- Mobile Sidebar -->
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
        to="/"
        class="hover:text-blue-500"
        @click="isSidebarVisible = false"
      >
        Items
      </router-link>
      <router-link
        to="/"
        class="hover:text-blue-500"
        @click="isSidebarVisible = false"
      >
        Contact
      </router-link>
      <router-link
        to="/"
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
import Button from "primevue/button";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import 'primeicons/primeicons.css';
import {useAuthStore} from "../stores/auth.js"
import {useCartStore} from "../stores/cart.js"
import { useToast } from "primevue/usetoast";
const cart = useCartStore();
const toast = useToast();


const auth = useAuthStore();

function toggleDarkMode() {
  document.documentElement.classList.toggle('my-app-dark');
}

const isSidebarVisible = ref(false);


const handleLogin = () => {
  console.log('Login button clicked');
};

const handleLogout = async () => {
  const success = await auth.logout();
  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logout Successful',
      life: 3000
    });
 
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Logout Failed',
      life: 3000
    });
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
