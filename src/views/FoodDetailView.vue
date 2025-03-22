<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFoodStore } from '@/stores/foodStore';
import Button from 'primevue/button';
import TodaySpecial from "../components/TodaySpecial.vue"

import {useCartStore} from "../stores/cart.js"
const cart = useCartStore();

const route = useRoute();
const router = useRouter();
const foodStore = useFoodStore();

const id = route.params.id;

onMounted(async () => {
  if (!foodStore.isLoaded) {
    await foodStore.fetchRecipes();
  }
});

const addToCart = () => {
  if (foodItem.value) {
    // Map foodItem properties to your cart's item shape.
    cart.addToCart({
      id: foodItem.value.id,
      title: foodItem.value.name,
      reviewCount: foodItem.value.reviewCount,
      quantity: value.value,
      image: foodItem.value.image,
    });
    // Redirect to cart page after adding
    router.push('/cart');
  }
};

const foodItem = computed(() => {
  return foodStore.recipes.find(item => String(item.id) === String(id));
});

// Dummy reactive quantity state and functions
const value = ref(1);
const increase = () => value.value++;
const decrease = () => {
  if (value.value > 1) value.value--;
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="container mx-auto p-4">
  
    <!-- Center the food detail content -->
    <div class="flex flex-col items-center py-4">
      <div v-if="foodItem" class="flex flex-col md:flex-row gap-6 justify-center items-center">
        <img
          :src="foodItem.image"
          :alt="foodItem.name"
          class="w-full md:w-1/6 rounded-lg object-cover"
        />
        <div class="md:w-1/3 flex flex-col items-start text-center">
          <h1 class="text-3xl font-bold mb-2">{{ foodItem.name }}</h1>
          <p class="mb-2">Rating: {{ foodItem.rating }} ⭐</p>
          <p class="mb-2">Price: ${{ foodItem.reviewCount }}</p>
          
          <!-- Quantity buttons aligned just below the review count -->
          <div class="flex items-center gap-2 justify-center mt-2">
            <span
              class="bg-red-600 text-white px-2 rounded-2xl cursor-pointer"
              @click="decrease"
            >
              -
            </span>
            <input
              type="text"
              class="w-8 rounded-lg border  text-center"
              :value="value"
              readonly
            />
            <span
              class="bg-green-600 text-white px-2 rounded-lg cursor-pointer"
              @click="increase"
            >
              +
            </span>
        </div>
        <div class="py-2">
            <Button @click="addToCart" label="Order now" severity="warn" raised />
        </div>
        
   
         
        </div>
      </div>
      <div v-else>
        <p>Food item not found.</p>
      </div>
    </div>

    <div class="mt-2 py-4">
  <h1 class="text-center text-2xl mb-4 mt-2">
    Todays <span class="text-yellow-600">special</span>
  </h1>
  <TodaySpecial />
</div>


  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
