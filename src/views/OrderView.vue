<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-6">
      <div class="w-full max-w-6xl p-6  rounded-lg shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center ">Your Orders</h2>
        <div v-if="loading" class="flex justify-center items-center h-48">
          <ProgressSpinner class="w-16 h-16" />
        </div>
        <div v-else>
          <div v-if="orders.length === 0" class="text-center ">
            You have no orders yet.
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="order in orders"
              :key="order._id"
              class="border p-4 rounded-md shadow-sm  hover:shadow-md transition duration-200"
            >
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 class="text-xl font-semibold">
                    Order ID: {{ order._id.slice(0, 5) }}
                    <span class="text-sm text-gray-500">(Track using this ID)</span>
                  </h3>
                  <p class="text-gray-600">
                    Order Date: {{ new Date(order.createdAt).toLocaleDateString() }}
                  </p>
                </div>
                <div class="flex items-center gap-2 mt-2 md:mt-0">
                  <span class="font-medium">Order Status:</span>
                  <span :class="statusClass(order.status)" class="px-3 py-1 text-sm rounded-lg">
                    {{ order.status }}
                  </span>
                </div>
              </div>
              <div class="mb-4">
                <h4 class="font-semibold text-base text-gray-700">
                  Payment Method: <span class="capitalize">{{ order.paymentMethod }}</span>
                </h4>
              </div>
              <div>
                <h4 class="font-semibold text-lg mb-2 text-gray-800">Order Items:</h4>
                <table class="min-w-full table-auto">
                  <thead>
                    <tr class="bg-gray-200 darktr">
                      <th class="px-4 py-2 text-left text-sm font-medium">Item Name</th>
                      <th class="px-4 py-2 text-left text-sm font-medium">Quantity</th>
                      <th class="px-4 py-2 text-left text-sm font-medium">Price</th>
                      <th class="px-4 py-2 text-left text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, idx) in order.orderItems"
                      :key="idx"
                      class="border-t hover:bg-gray-50"
                    >
                      <td class="px-4 py-2 text-sm">{{ item.title }}</td>
                      <td class="px-4 py-2 text-sm">{{ item.quantity }}</td>
                      <td class="px-4 py-2 text-sm">${{ item.reviewCount }}</td>
                      <td class="px-4 py-2 text-sm">
                        ${{ (item.reviewCount * item.quantity).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="px-4 py-2 text-right font-semibold text-sm">
                        Total Amount:
                      </td>
                      <td class="px-4 py-2">
                        ${{ order.orderAmount.toFixed(2) }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast";
  import ProgressSpinner from "primevue/progressspinner";
import axiosInstance from "@/axios";
  
  const toast = useToast();
  const orders = ref([]);
  const loading = ref(true);
  
  
  
  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/api/order/list")
        
    
      const data = await response.data;
      console.log("Orders fetched:", data);
      // Sort orders by creation date in descending order
      orders.value = data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch orders. Please try again.",
        life: 3000,
      });
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchOrders();
  });
  
  const statusClass = (status) => {
    if (status === "pending") {
      return "bg-yellow-500 text-white";
    } else if (status === "accepted") {
      return "bg-green-500 text-white";
    } else {
      return "bg-red-500 text-white";
    }
  };
  </script>
  
  <!--
    Tailwind CSS is assumed to be configured in your project.
    You can further customize styles as needed.
  -->
  