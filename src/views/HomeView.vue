<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import TodaySpecial from "../components/TodaySpecial.vue"


import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';


const faqs = [
    {
      question: "Do you offer vegetarian options?",
      answer: "Yes, we have a variety of vegetarian options available. You can find them in our menu under the 'Vegetarian' section.",
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you will receive a tracking link via SMS or email. You can also track your order directly on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, digital wallets like PayPal and Google Pay, and cash on delivery.",
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 5 minutes of placing it. After that, the order will be processed and cannot be canceled.",
    },
  ];

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
  ];</script>

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
          <Button @click = "router.push('/food')" severity="warn" class=" px-2 rounded-3xl">Explore now</Button>
        </div>
        <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
          <img src="/src/assets/burger.png" alt="Burger Image" className="max-w-full h-auto" />
        </div>
      </section>
    </div>
  </section>
  <section class="todays special min-h-[80vh]">
    <div class="mx-auto pt-4 mb-9">

      <h1 class="text-center text-2xl ">Todays <span class="text-yellow-500 font-bold">Special</span></h1>
    </div>
    <TodaySpecial />

  </section>

  <section class="py-16 px-4 md:px-6">
  <h1 class="text-center text-2xl font-semibold mb-8">Our <span class="text-yellow-600">Services</span></h1>
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="(service, index) in services"
      :key="index"
     
      class="w-full"
    >
      <Card
        class="card h-[400px] hover:shadow-xl transition-all duration-500 transform hover:scale-105 mx-auto flex flex-col justify-between shadow-lg  dark:hover:bg-slate-900 hover:bg-gray-300 cursor-pointer"
      >
        <template #header>
          <div class="h-[250px] w-full">
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
            <p class="descriptionpara">{{ service.description }}</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</section>

<section class=" py-15 px-4 md:px-6 max-w-4xl mx-auto mb-16">
  <h1 class="text-center font-bold text-2xl mb-3">Frequently asked questions</h1>
  <Accordion value="0">
  <AccordionPanel 
    v-for="(faq, index) in faqs" 
    :key="index" 
    :value="index">
    <AccordionHeader>{{ faq.question }}</AccordionHeader>
    <AccordionContent>
      <p class="m-0">{{ faq.answer }}</p>
    </AccordionContent>
  </AccordionPanel>
</Accordion>

      </section>

      <section class="py-20 px-4 md:px-6 min-h-[60vh] ">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p class=" mb-8">
            Get exclusive deals, updates, and delicious offers straight to your inbox!
          </p>
          <div class="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-700 w-full md:w-auto"
            />
            <Button severity="warn" class=" w-full md:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>


      <footer class=" footer py-12 px-4 md:px-6 bg-gray-100">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
    <div>
      <h3 class="text-xl font-bold mb-4">Burger Palace</h3>
      <p class="text-sm">
        Serving the best burgers since 2015. Quality ingredients, unforgettable taste.
      </p>
    </div>
    
    <div>
      <h4 class="font-semibold mb-4">Quick Links</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="transition-colors">Menu</a></li>
        <li><a href="#" class="transition-colors">About Us</a></li>
        <li><a href="#" class="transition-colors">Contact</a></li>
        <li><a href="#" class="transition-colors">Careers</a></li>
      </ul>
    </div>

    <div>
      <h4 class="font-semibold mb-4">Contact Us</h4>
      <ul class="space-y-2 text-sm">
        <li>123 Burger Street</li>
        <li>New York, NY 10001</li>
        <li>Tel: (555) 123-4567</li>
        <li>Email: info@burgerpalace.com</li>
      </ul>
    </div>

    <div>
      <h4 class="font-semibold mb-4">Follow Us</h4>
      <div class="flex space-x-4">
        <a href="#" class="transition-colors">Facebook</a>
        <a href="#" class="transition-colors">Instagram</a>
        <a href="#" class="transition-colors">Twitter</a>
      </div>
    </div>
  </div>

  <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
    <p>&copy;  Burger Palace. All rights reserved.</p>
  </div>
</footer>

</template>