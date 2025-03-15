<script setup>
import { ref, onMounted } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

const food = ref([]);

onMounted(async () => {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    food.value = data.recipes.slice(0, 3);
});
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
        
        <Card v-for="foodItem in food" :key="foodItem.id"
            class="w-full border-b border-b-slate-400 max-w-[300px] h-[500px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer">
            <template #header>
                <img :src="foodItem.image" :alt="foodItem.name" width="300" height="100" class="rounded-t-lg"
                    style="object-fit: cover;" />
            </template>

            <!-- Wrap content in #content slot -->
            <template #content>
                <div class="text-center p-4">
                    <div class="text-xl w-full ">{{ foodItem.name }}</div>
                    <p class="text-lg font-bold dark:text-yellow-400">${{ foodItem.reviewCount }}</p>
                    <p class="text-sm ">⭐ {{ foodItem.rating }} ({{ foodItem.reviewCount }} reviews)</p>
                </div>
            </template>

            <template #footer>
                <div class="flex justify-center p-2">
                    <Button label="Order now" />
                </div>
            </template>
        </Card>
    </div>
</template>