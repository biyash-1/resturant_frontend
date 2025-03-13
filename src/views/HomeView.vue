<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import TodaySpecial from "../components/TodaySpecial.vue"
const router = useRouter()
import Card  from 'primevue/card'
const handleStart = () => {
  router.push('/login')
}

const services = [
    {
      image: "/src/assets/delivery.jpg",
      title: "Fast Delivery",
      description: "Get your food delivered to your doorstep in record time. We prioritize speed without compromising quality.",
    },
    {
      image: "/src/assets/easypayment.jpg",
      title: "Easy Payment Methods",
      description: "Enjoy hassle-free payments with multiple options, including credit/debit cards, digital wallets, and cash on delivery.",
    },
    {
      image: "/src/assets/ordertracking.jpg",
      title: "Real-Time Order Tracking",
      description: "Track your order in real-time from the restaurant to your location. Know exactly when your food will arrive.",
    },
  ];
</script>

<template>
  <section class=" herosection min-h-screen flex items-center justify-center p-8">
    <div className=" flex flex-col justify-center items-center pt-9 md:pt-0 px-4 md:px-6">
      <section className="landing flex flex-col  md:flex-row justify-center items-center gap-6 w-full max-w-6xl">
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Enjoy the Best <span className="text-yellow-700">Burger</span> in <br className="md:hidden" /> the Town!
          </h1>
          <p className="text-base md:text-lg mb-4 max-w-[400px] mx-auto md:mx-0">
            Craving something delicious? Our burgers are made with the finest ingredients, crafted to perfection just
            for you. Come take a bite of the best flavors in town!
          </p>
          <Button className="bg-yellow-500">Explore now</Button>
        </div>
        <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
          <img src="/src/assets/burger.png" alt="Burger Image" className="max-w-full h-auto" />
        </div>
      </section>
    </div>
  </section>
  <section class="todays special min-h-[100vh]">
    <div class="mx-auto pt-4 mb-9">

      <h1 class="text-center text-2xl ">Todays <span class="text-yellow-500 font-bold">Special</span></h1>
    </div>
    <TodaySpecial />

  </section>

  <section class="py-16 px-4 md:px-6">
    <h1 class="text-center text-2xl font-semibold mb-8">Our Services</h1>
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="(service, index) in services"
        :key="index"
        v-motion
        :initial="{ opacity: 0, x: index % 2 === 0 ? -150 : 150 }"
        :enter="{ opacity: 1, x: 0 }"
        :viewport="{ once: false, amount: 0.3 }"
        :transition="{ duration: 1400, ease: 'easeInOut' }"
        class="w-full"
      >
        <Card
          class="h-[400px] mx-auto flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer"
        >
          <template #header>
            <div class=" h-[250px] w-full">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="rounded-t-lg w-full h-full object-cover"
              />
            </div>
          </template>
          <template #content>
            <div class="p-2">
              <h2 class="text-xl font-bold mb-2">{{ service.title }}</h2>
              <p class=" descriptionpara">{{ service.description }}</p>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>