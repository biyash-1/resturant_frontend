<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 justify-items-center">

    <Card v-for="foodItem in food" :key="foodItem.id"
      class="card w-full max-w-[300px] h-[360px] flex flex-col shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105  hover:bg-gray-500 cursor-pointer">
      <template #header>
        <img :src="foodItem.image" :alt="foodItem.name" class="rounded-t-lg w-full h-50 object-cover" />
      </template>
      <template #content>
        <div class="text-center">
          <div class="text-xl w-full">{{ foodItem.name }}</div>
          <p class="text-lg font-bold dark:text-yellow-400">${{ foodItem.reviewCount }}</p>
          <p class="text-sm">⭐ {{ foodItem.rating }} ({{ foodItem.reviewCount }} reviews)</p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center mb-2">
          <Button severity="success" label="Order now" @click="router.push(`/food/${foodItem.id}`)" />

        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
const router = useRouter();
const food = ref([]);

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();
  food.value = data.recipes.slice(0, 3);
});
</script>