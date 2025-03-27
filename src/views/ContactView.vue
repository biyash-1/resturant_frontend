<script setup>
import { ref } from 'vue';
import  InputText  from 'primevue/inputtext';
import  Textarea  from 'primevue/textarea';
import  Button  from 'primevue/button';

import { useToast } from 'primevue/usetoast';


import { useRoute } from 'vue-router';

const formData = ref({
  name: '',
  email: '',
  message: '',
});

const toast = useToast();
const route = useRoute();

const handleChange = (e) => {
  formData.value = { ...formData.value, [e.target.name]: e.target.value };
};

const handleSubmit = (e) => {
  e.preventDefault();
  toast.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully!', life: 3000 });
  formData.value = { name: '', email: '', message: '' };
};
</script>


<template>
    <section class="max-w-6xl mx-auto py-16 px-6">
      <h1 class="text-4xl font-extrabold text-center mb-12 ">
        Get In Touch 📞
      </h1>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <form @submit="handleSubmit" class="space-y-6  backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          <h2 class="text-2xl font-semibold  text-center mb-4">
            Send Us a Message ✉️
          </h2>
  
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-2">
              <i class="pi pi-user"></i>
            </span>
            <InputText
              v-model="formData.name"
              name="name"
              placeholder="Your Full Name"
              required
            />
          </div>
  
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-2">
              <i class="pi pi-envelope"></i>
            </span>
            <InputText
              v-model="formData.email"
              name="email"
              type="email"
              placeholder="Your Email Address"
              required
            />
          </div>
  
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-2">
              <i class="pi pi-comment"></i>
            </span>
            <Textarea
              v-model="formData.message"
              name="message"
              placeholder="Write your message here..."
              required
              rows="5"
            />
          </div>
  
          <Button type="submit" label="Send Message 🚀" class="w-full bg-yellow-500 hover:bg-yellow-600 transition-all" />
        </form>
  
        <!-- Google Maps Location -->
        <div class="overflow-hidden rounded-2xl shadow-xl border border-gray-300 dark:border-gray-700">
            <iframe
    className="w-full h-[450px] rounded-2xl"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3749495906504!2d85.32043907525376!3d27.705707276183556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a54a78b935%3A0x1ccc90ceebec3cba!2sBurger%20Hub%20Nepal!5e0!3m2!1sen!2snp!4v1739359998023!5m2!1sen!2snp"
    allowFullScreen
    loading="lazy"
  />
 
        </div>
      </div>
    </section>
  </template>
  