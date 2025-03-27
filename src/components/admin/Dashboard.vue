<script setup>

import DoughnutChart from "../DoughnutChart.vue"
import LineChart from "../LineChart.vue";
import { onMounted,ref } from "vue";
import axiosInstance from "../../axios";
const total_order = ref();
const total_income = ref();
const pending_count = ref()
const fetchOrder= async () =>{
    try{
        const response = await axiosInstance.get("/api/order/total_order");
       total_order.value = response.data.total_orders;
       console.log("total orders fetched is",response.data);
       

    }
    catch(error){
        console.log(err);
        
    }
}

const fetchIncome= async () =>{
    try{
        const response = await axiosInstance.get("/api/order/total_income");
       total_income.value = response.data.total_income;
       console.log("total income fetched is",response.data);
       

    }
    catch(error){
        console.log(err);
        
    }
}


const fetchpendingOrder= async () =>{
    try{
        const response = await axiosInstance.get("/api/order/pendingcount");
       pending_count.value = response.data.pendingOrders;
       console.log("total pending order fetched is",response.data);
       

    }
    catch(error){
        console.log(err);
        
    }
}
onMounted(()=>{
    fetchOrder();
    fetchIncome();
    fetchpendingOrder();
    
})

</script>


<template>
    <!-- Cards section -->
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-4 md:px-12 lg:px-20">
      <div class="grid grid-cols-12 gap-4">
        <!-- Card 1 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <div class="bg-slate-100  shadow p-4 rounded-border transition transform duration-600 ease-in-out hover:scale-110 hover:bg-slate-200">
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Orders</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">{{total_order}}</div>
              </div>
              <div class="flex items-center justify-center rounded-border w-10 h-10">
                <i class="pi pi-shopping-cart dark:text-blue-400 !text-xl" />
              </div>
            </div>
            <span class="text-green-500 font-medium">24 new </span>
            <span class="text-surface-500 dark:text-surface-300">since last visit</span>
          </div>
        </div>
        <!-- Card 2 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <div class="bg-slate-100  shadow p-4 rounded-border transition transform duration-600 ease-in-out hover:scale-110 hover:bg-slate-200">
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Revenue</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">${{ total_income }}</div>
              </div>
              <div class="flex items-center justify-center rounded-border w-10 h-10">
                <i class="pi pi-dollar text-orange-700 !text-xl" />
              </div>
            </div>
            <span class="text-green-500 font-medium">%52+ </span>
            <span class="text-surface-500 dark:text-surface-300">since last week</span>
          </div>
        </div>
        <!-- Card 3 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <div class="bg-slate-100  shadow p-4 rounded-border transition transform duration-600 ease-in-out hover:scale-110 hover:bg-slate-200">
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Customers</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">28441</div>
              </div>
              <div class="w-10 h-10 flex items-center justify-center rounded-border">
                <i class="pi pi-inbox text-cyan-500 !text-xl" />
              </div>
            </div>
            <span class="text-green-500 font-medium">520 </span>
            <span class="text-surface-500 dark:text-surface-300">newly registered</span>
          </div>
        </div>
        <!-- Card 4 -->
        <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <div class="bg-slate-100  shadow p-4 rounded-border transition transform duration-600 ease-in-out hover:scale-110 hover:bg-slate-200">
            <div class="flex justify-between mb-4">
              <div>
                <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Pending Orders</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium !text-xl">{{pending_count}}</div>
              </div>
              <div class="w-10 h-10 flex items-center justify-center rounded-border">
                <i class="pi pi-comment text-purple-500 !text-xl" />
              </div>
            </div>
            <span class="text-green-500 font-medium">10 </span>
            <span class="text-surface-500 dark:text-surface-300">responded</span>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9 px-8">
    <!-- Left Section: Line Chart -->
    <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border">
      <h2 class="text-lg font-medium mb-2">Line Chart</h2>
      <LineChart />
    </div>
      
      <!-- Right Section: Doughnut Chart -->
      <div class="bg-surface-0 dark:bg-surface-900 shadow p-6 rounded-border">
        <h2 class="text-lg font-medium mb-2">Top prdoucts</h2>
        <DoughnutChart/>
      </div>
    </div>
  </template>