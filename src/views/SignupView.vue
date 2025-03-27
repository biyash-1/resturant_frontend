<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

import { useRouter } from 'vue-router'
import axiosInstance from "../axios.js"
import { useToast } from 'primevue/usetoast';

const toast = useToast()

const router = useRouter();


const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);

const onFormSubmit = async () => {
    isLoading.value = true;

    const formData = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    try {
        const response = await axiosInstance.post('/api/user/signup', formData);
        toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'signup Successful',
      life: 3000
    });
     
        router.push('/')
    }
    catch (error) {
        console.log('error is', error);
        toast.error('Signup failed');
    } finally {
        isLoading.value = false;
    }
}

</script>

<template>
    <div class="px-6 py-2 md:px-8 lg:px-20">
        <form @submit.prevent="onFormSubmit" action="
    ">
            <div class="logincard bg-surface-0 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
                <div class="text-center ">
                    <!-- You can replace this SVG with one of your choice -->
                    <svg class=" mx-auto fill-surface-600 dark:fill-surface-200 h-16" viewBox="0 0 30 32"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M15 0C6.716 0 0 6.716 0 15s6.716 15 15 15 15-6.716 15-15S23.284 0 15 0zm0 28C8.373 28 3 22.627 3 16S8.373 4 15 4s12 4.373 12 12-4.373 12-12 12z" />
                        <path d="M15 8a4 4 0 100 8 4 4 0 000-8zM8 22a7 7 0 0114 0H8z" />
                    </svg>
                    <div class="text-surface-900 text-3xl font-medium mb-2">
                        Create <span class="text-yellow-500">Account</span>
                    </div>
                    <span class="text-surface-600 font-medium leading-normal">
                        Already have an account?
                    </span>
                    <a @click="router.push('/login')" class="font-medium no-underline ml-2 text-primary cursor-pointer text-blue-700">
                        Sign In
                    </a>
                </div>
                <div>
                    <label for="username" class="text-surface-900 font-medium mb-2 block">
                        Username
                    </label>
                    <InputText id="username" type="text" placeholder="Enter username" class="w-full mb-4"
                        v-model="username" />

                    <label for="email" class="text-surface-900 font-medium mb-2 block">
                        Email
                    </label>
                    <InputText id="email" type="text" placeholder="Email address" class="w-full mb-4" v-model="email" />

                    <label for="password" class="text-surface-900 font-medium mb-2 block">
                        Password
                    </label>
                    <InputText id="password" type="password" placeholder="Enter password" class="w-full mb-4"
                        v-model="password" />

                    <label for="confirmPassword" class="text-surface-900 font-medium mb-2 block">
                        Confirm Password
                    </label>
                    <InputText id="confirmPassword" type="password" placeholder="Confirm password" class="w-full mb-6"
                        v-model="confirmPassword" />

                    <Button type="submit" label="Sign Up" icon="pi pi-user-plus !text-xl !leading-none"
                        class="w-full" />
                </div>
            </div>
        </form>

    </div>
</template>
