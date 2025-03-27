<template>
    <div class="p-4 rounded shadow w-full">
      <h3 class="text-2xl font-semibold mb-4">Orders List</h3>
      <div class="overflow-x-auto border border-gray-300 rounded w-full">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class=" bg-gray-300">
              <th class="border border-gray-300 px-4 py-2">Order ID</th>
              <th class="border border-gray-300 px-4 py-2">User</th>
              <th class="border border-gray-300 px-4 py-2">Payment</th>
              <th class="border border-gray-300 px-4 py-2">Total</th>
              <th class="border border-gray-300 px-4 py-2">Order Date</th>
              <th class="border border-gray-300 px-4 py-2">Delivery Info</th>
              <th class="border border-gray-300 px-4 py-2">Order Items</th>
              <th class="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="orders.length > 0">
              <tr v-for="order in orders" :key="order._id">
                <td class="border border-gray-300 px-4 py-2">
                  {{ order._id.slice(0, 6) + '...' }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.deliveryInfo.firstName }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.paymentMethod }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.orderAmount }} {{ order.currency }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ new Date(order.createdAt).toLocaleDateString() }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  {{ order.deliveryInfo.address }}, {{ order.deliveryInfo.city }}
                </td>
                <td class="border border-gray-300 px-4 py-2">
                  <table class="w-full">
                    <thead>
                      <tr>
                        <th class="border border-gray-300 px-2 py-1">Product</th>
                        <th class="border border-gray-300 px-2 py-1">Qty</th>
                        <th class="border border-gray-300 px-2 py-1">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in order.orderItems" :key="item.productId">
                        <td class="border border-gray-300 px-2 py-1">
                          {{ item.title }}
                        </td>
                        <td class="border border-gray-300 px-2 py-1">
                          {{ item.quantity }}
                        </td>
                        <td class="border border-gray-300 px-2 py-1">
                          {{ item.reviewCount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                  <template v-if="order.status === 'accepted'">
                    <p class="bg-green-300 px-2 rounded-3xl">Accepted</p>
                  </template>
                  <template v-else-if="order.status === 'rejected'">
                    <p class="bg-red-300 px-2 rounded-3xl">Rejected</p>
                  </template>
                  <template v-else>
                    <div class="flex gap-2">
                      <button
                        class="bg-green-500 hover:bg-green-600 text-white px-2 rounded"
                        @click="handleAccept(order._id)"
                      >
                        Accept
                      </button>
                      <button
                        class="bg-red-500 hover:bg-red-600 text-white px-2 rounded"
                        @click="handleReject(order._id)"
                      >
                        Reject
                      </button>
                    </div>
                  </template>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="8" class="text-center py-4">No orders found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast"
  const toast = useToast();
  
  const orders = ref([]);
  
  onMounted(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/order/listadmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
     
        const sortedOrders = data.orders.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        console.log("Orders fetched:", data);
        orders.value = sortedOrders;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
  
    fetchOrders();
  });
  
  const handleAccept = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/accept/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      await response.json();
      toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'order accepted Successful',
            life: 3000
        });
      orders.value = orders.value.map((order) =>
        order._id === orderId ? { ...order, status: "accepted" } : order
      );
    } catch (error) {
      console.error("Failed to accept order:", error);
    }
  };
  
  const handleReject = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/reject/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      await response.json();
      toast.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'order rejected Successful',
            life: 3000
        });
      orders.value = orders.value.map((order) =>
        order._id === orderId ? { ...order, status: "rejected" } : order
      );
    } catch (error) {
      console.error("Failed to reject order:", error);
    }
  };
  </script>
  
