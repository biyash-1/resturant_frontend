<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center p-3 min-h-screen">
      <div class="w-full max-w-md shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4 text-center">Order Placed Successfully!</h2>
        <p class=" text-center mb-6">
          Your order has been placed successfully. Thank you for shopping with us!
        </p>
        <div>

        <button @click="router.push({ name: 'orders' })" class="w-full bg-green-400 p-2 rounded-4xl"  severity = "success">view all orders</button>
        </div>
      </div>
    </div>
</template>