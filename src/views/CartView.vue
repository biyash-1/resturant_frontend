<template>
    <div class="container mx-auto py-2 px-4 md:px-8">
      <h1 class="text-3xl font-semibold mb-6 text-center">Shopping Cart</h1>
      <div v-if="cart.items.length > 0">
        <div class="space-y-4">
          <div
            v-for="(item, index) in cart.items"
            :key="index"
            class="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-cover rounded" />
              <div>
                <h2 class="text-lg font-semibold">{{ item.title }}</h2>
                <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                <p class="text-gray-600">Price: ${{ item.reviewCount }}</p>
              </div>
            </div>
            <button
              @click="removeItem(item.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Remove
            </button>
          </div>
  
          <!-- Cart Total Section -->
          <div class="border-t border-gray-300 mt-6 pt-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 class="text-xl font-semibold mb-2">Cart Total</h2>
            <hr class="border-gray-300 my-2" />
            <div class="flex flex-col space-y-2">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Delivery fee:</span>
                <span>${{ deliveryCharge.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
  
          <div class="flex items-center justify-start mt-4">
            <router-link to="/checkout">
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200">
                Proceed to Checkout
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-gray-600 text-center">Your cart is currently empty.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '@/stores/cart.js';
  
  const cart = useCartStore();
  const deliveryCharge = 5;
  const subtotal = computed(() => cart.totalPrice);
  const total = computed(() => subtotal.value + deliveryCharge);
  
  function removeItem(id) {
    cart.removeFromCart(id);
  }
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  