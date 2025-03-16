<script setup>
import Card  from 'primevue/card';
import { onMounted,ref } from 'vue';
const food = ref([]);
import Button  from 'primevue/button';
onMounted(async () =>{

    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    food.value = data.recipes;


})

</script>



<template>
    <!-- Add top padding and horizontal padding (using container to center the content) -->
    <div class="min-h-screen pt-12 container mx-auto px-4">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card
  v-for="foodItem in food"
  :key="foodItem.id"
  class="card w-full max-w-[300px] h-[470px] flex flex-col shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer"
>
  <template #header>
    <img
      :src="foodItem.image"
      :alt="foodItem.name"
      width="300"
      height="50"
      class="rounded-t-lg"
      style="object-fit: cover;"
    />
  </template>

  <template #content>
    <div class="text-center">
      <div class="text-xl w-full">{{ foodItem.name }}</div>
      <p class="text-lg font-bold dark:text-yellow-400">${{ foodItem.reviewCount }}</p>
      <p class="text-sm">⭐ {{ foodItem.rating }} ({{ foodItem.reviewCount }} reviews)</p>
    </div>
  </template>

  <template #footer>
    <div class="flex justify-center  mb-2">
      <Button severity="success" label="Order now"  />
    </div>
  </template>
</Card>

      </div>
    </div>
  </template>
  