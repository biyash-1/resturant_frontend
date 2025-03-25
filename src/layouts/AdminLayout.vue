<template>
    <div class="admin-layout min-h-screen flex flex-col">
      <AdminNavbar />
      
      <div class="flex flex-1">
        <AdminSidebar :active-view="activeView" @update-view="updateView" />
        
        <main class="flex-1 p-6 bg-gray-50">
          <component :is="activeComponent" />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import AdminNavbar from '@/components/AdminNavbar.vue';
  import AdminSidebar from '@/components/AdminSidebar.vue';
  import Dashboard from '@/components/admin/Dashboard.vue';
  import Products from '@/components/admin/Products.vue';
  import AddProduct from '@/components/admin/AddProduct.vue';
  import Orders from '@/components/admin/Orders.vue';
  
  const views = {
    dashboard: Dashboard,
    products: Products,
    addProduct: AddProduct,
    orders: Orders
  };
  
  const activeView = ref('dashboard');
  
  const activeComponent = computed(() => views[activeView.value]);
  
  const updateView = (newView) => {
    activeView.value = newView;
  };
  </script>