<template>
    <div class="container mx-auto py-4 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Delivery Information Section -->
      <div class="p-4 rounded-lg mt-10 shadow">
        <h2 class="text-2xl text-center font-semibold mb-6">Delivery Information</h2>
        <div class="space-y-4">
          <!-- First and Last Name -->
          <div class="flex gap-2">
            <InputText v-model="deliveryInfo.firstName" placeholder="First Name" class="w-full" />
            <InputText v-model="deliveryInfo.lastName" placeholder="Last Name" class="w-full" />
          </div>
          <!-- Email -->
          <InputText v-model="deliveryInfo.email" type="email" placeholder="Email" class="w-full" />
          <!-- Address -->
          <InputText v-model="deliveryInfo.address" placeholder="Street Address" class="w-full" />
          <div class="flex gap-4">
            <InputText v-model="deliveryInfo.city" placeholder="City" class="w-full" />
            <InputText v-model="deliveryInfo.postalCode" placeholder="Postal Code" class="w-full" />
          </div>
          <!-- Phone -->
          <InputText v-model="deliveryInfo.phone" type="tel" placeholder="Phone Number" class="w-full" />
        </div>
      </div>
  
      <!-- Cart Total Section -->
      <div class="p-3 rounded-lg flex flex-col justify-center shadow">
        <h2 class="text-2xl font-semibold mb-6">Cart Total</h2>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Delivery fee:</span>
            <span>${{ deliveryCharge.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold">
            <span>Total:</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
        <router-link :to="isFormValid ? '/checkout/payment' : '#'">
          <Button
            class="mt-6 bg-green-500 hover:bg-green-600 text-white"
            :disabled="!isFormValid"
          >
            Proceed to Payment
          </Button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import { useDeliveryStore } from '@/stores/delivery';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  
  // Access Pinia stores
  const cartStore = useCartStore();
  const deliveryStore = useDeliveryStore();
  const { deliveryInfo } = deliveryStore;
  
  // Compute totals (delivery fee is fixed)
  const deliveryCharge = 5;
  const subtotal = computed(() => cartStore.totalPrice);
  const total = computed(() => subtotal.value + deliveryCharge);
  
  // Validate that every field in deliveryInfo is filled (after trimming)
  const isFormValid = computed(() => {
    return (
      deliveryInfo.firstName.trim() &&
      deliveryInfo.lastName.trim() &&
      deliveryInfo.email.trim() &&
      deliveryInfo.address.trim() &&
      deliveryInfo.city.trim() &&
      deliveryInfo.postalCode.trim() &&
      deliveryInfo.phone.trim()
    );
  });
  </script>
  
  <style scoped>
  /* Feel free to add additional styling if needed */
  </style>
  