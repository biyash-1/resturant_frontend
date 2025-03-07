<template>
    <nav class="p-4 sticky top-0 shadow-sm dark:bg-slate-950 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <template v-if="role === 'admin'">
          <div class="flex w-full justify-end items-center">
            <div class="flex items-center space-x-4">
              <Button
                label="Logout"
                class="p-button-text hover:bg-blue-500 hover:text-white transition duration-300"
                @click="handleLogout"
              />
              <ModeToggle />
            </div>
          </div>
        </template>
        <template v-else>
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
            <div class="relative">
              <router-link to="/cart" class="text-2xl relative">
                <i class="pi pi-shopping-cart"></i>
                <Badge
                  v-if="isLoggedIn && cartStore.totalItems > 0"
                  :value="cartStore.totalItems"
                  severity="danger"
                  class="absolute -top-2 -right-3"
                />
              </router-link>
            </div>
            <Button
              v-if="isLoggedIn"
              label="Logout"
              class="p-button-text hover:bg-blue-500 hover:text-white transition duration-300"
              @click="handleLogout"
            />
            <template v-else>
              <Button
                label="Login"
                class="p-button-text hover:bg-blue-500 hover:text-white transition duration-300"
                @click="handleLogin"
              />
              <Button
                label="Signup"
                class="p-button-text hover:bg-blue-500 hover:text-white transition duration-300"
                @click="handleSignup"
              />
            </template>
            <ModeToggle />
          </div>
        </template>
  
        <!-- Mobile Menu -->
        <Button
          icon="pi pi-bars"
          class="p-button-text md:hidden"
          @click="isSidebarVisible = true"
        />
  
        <Sidebar
          v-model:visible="isSidebarVisible"
          position="right"
          class="w-64"
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
              <template v-if="isLoggedIn">
                <Button
                  label="Logout"
                  class="p-button-text w-full"
                  @click="handleLogout"
                />
              </template>
              <template v-else>
                <Button
                  label="Login"
                  class="p-button-text w-full"
                  @click="handleLogin"
                />
                <Button
                  label="Signup"
                  class="p-button-text w-full"
                  @click="handleSignup"
                />
              </template>
            </div>
          </div>
        </Sidebar>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCartStore } from '@/stores/cartStore';
  import { useAuthStore } from '@/stores/authStore';
  import Button from 'primevue/button';
  import Sidebar from 'primevue/sidebar';
  import Badge from 'primevue/badge';
  import ModeToggle from './ModeToggle.vue';
  
  const router = useRouter();
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const isSidebarVisible = ref(false);
  
  const isLoggedIn = authStore.isLoggedIn;
  const role = authStore.role;
  
  const handleLogin = () => {
    router.push('/login');
    isSidebarVisible.value = false;
  };
  
  const handleSignup = () => {
    router.push('/signup');
    isSidebarVisible.value = false;
  };
  
  const handleLogout = () => {
    authStore.logout();
    cartStore.clearCart();
    router.push('/');
    isSidebarVisible.value = false;
  };
  </script>