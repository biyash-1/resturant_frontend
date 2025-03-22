<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useDeliveryStore } from '@/stores/delivery'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import axiosInstance from '@/axios'

const toast = useToast()
const router = useRouter()
const cartStore = useCartStore()
const deliveryStore = useDeliveryStore()

const paymentMethod = ref('creditCard')
const cardDetails = ref({
  number: '',
  expiry: '',
  cvc: ''
})

const DELIVERY_CHARGE = 5
const totalAmount = computed(() => cartStore.totalPrice + DELIVERY_CHARGE)

const orderItems = computed(() =>
  cartStore.items.map(item => ({
    productId: item.id,
    title: item.title,
    reviewCount: item.reviewCount,
    quantity: item.quantity,
    image: item.image
  }))
)
console.log("order data",orderItems);


const handlePayment = async () => {
  try {
    // Base order data
    const orderData = {
      paymentMethod: paymentMethod.value,
      orderAmount: totalAmount.value,
      orderItems: orderItems.value,
      deliveryInfo: deliveryStore.info
    }

    // If payment is by credit card, include card details
    if (paymentMethod.value === 'creditCard') {
      orderData.cardDetails = cardDetails.value
    }

    const response = await axiosInstance.post("/api/order/create", orderData)
    
    // Check if the response status indicates success
    if (response.status !== 200) {
      throw new Error("Payment failed")
    }
    
    toast.add({
      severity: 'success',
      summary: 'Order Placed',
      detail: 'Your order was processed successfully',
      life: 3000
    })
    
    cartStore.clearCart()
    router.push({ name: 'orderconfirmation' })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Payment Failed',
      detail: 'Could not process your payment',
      life: 3000
    })
    console.error('Payment error:', error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-9">
    <!-- Using a div styled with Tailwind CSS -->
    <div class="w-full max-w-lg border rounded-lg shadow p-9">
      <div class="text-center text-2xl font-bold mb-4">
        Payment Information
      </div>

      <div class="flex flex-col gap-4">
        <!-- Payment Method Selector -->
        <div class="flex gap-3 mb-4">
          <Button 
            @click="paymentMethod = 'creditCard'"
            :severity="paymentMethod === 'creditCard' ? 'warn' : 'secondary'"
            class="flex-1"
          >
            <i class="pi pi-credit-card mr-2"></i>
            Credit Card
          </Button>
          
          <Button
            @click="paymentMethod = 'cashOnDelivery'"
            :severity="paymentMethod === 'cashOnDelivery' ? 'warn' : 'secondary'"
            class="flex-1"
          >
            <i class="pi pi-money-bill mr-2"></i>
            Cash on Delivery
          </Button>
        </div>

        <!-- Credit Card Form -->
        <div v-if="paymentMethod === 'creditCard'" class="space-y-4">
          <div class="field">
            <label class="block font-medium mb-2">Card Number</label>
            <InputText 
              v-model="cardDetails.number"
              placeholder="1234 5678 9012 3456"
              class="w-full"
            />
          </div>

          <div class="flex gap-3">
            <div class="field flex-1">
              <label class="block font-medium mb-2">Expiry Date</label>
              <InputText 
                v-model="cardDetails.expiry"
                placeholder="MM/YY"
                class="w-full"
              />
            </div>
            
            <div class="field flex-1">
              <label class="block font-medium mb-2">CVC</label>
              <InputText 
                v-model="cardDetails.cvc"
                placeholder="123"
                class="w-full"
              />
            </div>
          </div>

          <Button 
            label="Pay Now" 
            icon="pi pi-lock" 
            class="w-full" 
            @click="handlePayment"
          />
        </div>

        <!-- Cash on Delivery -->
        <div v-if="paymentMethod === 'cashOnDelivery'" class="text-center">
          <p class="text-gray-600 mb-4">
            You will pay <strong>${{ totalAmount.toFixed(2) }}</strong> when your order arrives
          </p>
          <Button
            label="Confirm Order"
            icon="pi pi-check"
            class="w-full"
            @click="handlePayment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
