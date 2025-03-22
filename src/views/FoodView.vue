<script setup>
import { onMounted, computed, ref } from 'vue';
import { useFoodStore } from '@/stores/foodStore';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

const foodStore = useFoodStore();
const router = useRouter();

// Local states for search and filters
const search = ref("");
const selectedfood = ref();
const selectedprice = ref();

const foodItems = ref([
  { name: 'All', code: 'A' },
  { name: 'Breakfast', code: 'B' },
  { name: 'Lunch', code: 'L' },
  { name: 'Dinner', code: 'D' },
  { name: 'Dessert', code: 'DE' } 
]);

const prices = ref([
  { name: 'all prices', code: 0 },     
  { name: 'under 10$', code: 10 },
  { name: 'under 20$', code: 20 },
  { name: 'under 50$', code: 50 }
]);

// Fetch recipes on mount if not already fetched
onMounted(async () => {
  await foodStore.fetchRecipes();
});

// Computed property to filter the recipes
const filteredFood = computed(() => {
  let filtered = foodStore.recipes;

  // Filter by search term
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by meal type
  if (selectedfood.value?.name && selectedfood.value.name !== 'All') {
    filtered = filtered.filter(item =>
      item.mealType?.includes(selectedfood.value.name)
    );
  }

 
  if (selectedprice.value && selectedprice.value.code !== 0) {
    filtered = filtered.filter(item =>
      item.reviewCount <= selectedprice.value.code
    );
  }

  return filtered;
});


const gotoFoodDetail = (id) => {
  router.push({ name: 'foodDetail', params: { id } });
};
</script>

<template>
  <div class="min-h-screen pt-5 container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      <h1 class="text-xl w-full md:w-auto">All items</h1>
      <div class="w-full md:w-56">
        <InputText v-model="search" placeholder="Search items" class="w-full" />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto">
        <span class="whitespace-nowrap">Meal type:</span>
        <Select v-model="selectedfood" :options="foodItems" optionLabel="name" placeholder="Select meal type" class="w-full md:w-48" />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto">
        <Select v-model="selectedprice" :options="prices" optionLabel="name" placeholder="Filter by price" class="w-full md:w-48" />
      </div>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Card
        v-for="foodItem in filteredFood"
        :key="foodItem.id"
        class="card w-full max-w-[300px] h-[470px] flex flex-col shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer"
      >
        <template #header>
          <img :src="foodItem.image" :alt="foodItem.name" width="300" height="50" class="rounded-t-lg" style="object-fit: cover;" />
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
            <Button severity="success" label="Order now" @click="gotoFoodDetail(foodItem.id)" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
