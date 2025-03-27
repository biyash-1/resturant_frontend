<script setup>
import { ref, computed, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";

const products = ref([]);
const currentPage = ref(0); // Zero-based index for PrimeVue Paginator
const itemsPerPage = 5;

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    // Assuming the API returns an array of recipes under "recipes"
    products.value = data.recipes;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});

// Compute the total number of records
const totalRecords = computed(() => products.value.length);

// Compute the products to be shown on the current page
const currentProducts = computed(() =>
  products.value.slice(currentPage.value * itemsPerPage, (currentPage.value + 1) * itemsPerPage)
);

// Handle page change event from the Paginator component
const onPageChange = (event) => {
  // event.page is the new page index (0-based)
  currentPage.value = event.page;
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">All Products</h1>
    <!-- DataTable displays the current products -->
    <DataTable :value="currentProducts" class="w-full">
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="slotProps.data.image"
            :alt="slotProps.data.name"
            class="w-12 h-12 object-cover"
          />
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column header="Price">
        <template #body="slotProps">
          ${{ slotProps.data.reviewCount }}
        </template>
      </Column>
      <Column header="Meal Type">
  <template #body="slotProps">
    {{
      Array.isArray(slotProps.data.mealType)
        ? slotProps.data.mealType[0]
        : slotProps.data.mealType
    }}
  </template>
</Column>

    </DataTable>
    <!-- Paginator component for pagination -->
    <div class="mt-4 flex justify-center">
      <Paginator
        :rows="itemsPerPage"
        :totalRecords="totalRecords"
        :first="currentPage * itemsPerPage"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add custom CSS styles if needed */
</style>
