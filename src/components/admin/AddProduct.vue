<template>
    <form @submit="handleSubmit" class="p-4 rounded shadow max-w-md mx-auto">
      <h3 class="text-2xl font-semibold mb-4">Add Product</h3>
      <div class="mb-4">
        <label class="block mb-1">Name</label>
        <InputText v-model="formData.name" placeholder="Product name" class="w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Price</label>
        <InputText v-model="formData.price" placeholder="Price" class="w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Meal Type</label>
        <Dropdown 
          v-model="meal" 
          :options="mealOptions" 
          optionLabel="label" 
          optionValue="value" 
          placeholder="Select a meal type" 
          class="w-full"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
          ref="fileInputRef"
          class="border p-2 rounded w-full"
        />
      </div>
      <Button type="submit" label="Add Product" class="w-full p-button" />
      <div v-if="message" class="mt-2 text-red-500">{{ message }}</div>
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";
  import Dropdown from "primevue/dropdown";
  import axiosInstance from "../../axios";
  
  // Form state
  const formData = ref({
    name: "",
    price: "",
    image: null,
  });
  const meal = ref("lunch");
  const message = ref("");
  const fileInputRef = ref(null);
  
  // Options for the meal type dropdown
  const mealOptions = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
    { label: "Dessert", value: "dessert" },
  ];
  
  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      formData.value.image = files[0];
    }
  };
  
  // Handle form submission using axiosInstance
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.value.name);
    formDataObj.append("price", formData.value.price);
    if (formData.value.image) {
      formDataObj.append("image", formData.value.image);
    }
    formDataObj.append("meal", meal.value);
  
    try {
      const res = await axiosInstance.post("/api/food/add", formDataObj);
     
      message.value = "Food added successfully!";
      // Reset the form
      formData.value.name = "";
      formData.value.price = "";
      formData.value.image = null;
      meal.value = "lunch";
      if (fileInputRef.value) {
        fileInputRef.value.value = "";
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        message.value = `Error: ${error.response.data.error}`;
      } else {
        message.value = error.message || "An unknown error occurred";
      }
    }
  };
  </script>
  
  <style scoped>
  /* You can further enhance the styling as needed */
  </style>
  