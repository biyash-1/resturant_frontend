<template>
    <aside class="w-64 bg-white shadow-md h-full p-4">
      <nav>
        <ul class="space-y-2">
          <li v-for="(view, key) in views" :key="key">
            <button
              @click="selectView(key)"
              :class="[
                'w-full text-left p-2 hover:bg-gray-100 rounded',
                activeView === key ? 'bg-blue-100 font-semibold' : ''
              ]"
            >
              {{ view.label }}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    activeView: String
  });
  
  const emit = defineEmits(['update-view']);
  
  const views = {
    dashboard: { label: 'Dashboard' },
    products: { label: 'Products' },
    addProduct: { label: 'Add Product' },
    orders: { label: 'Orders' }
  };
  
  const selectView = (viewKey) => {
    emit('update-view', viewKey);
  };
  </script>