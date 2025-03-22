<script setup>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ref ,onMounted} from 'vue';
import { useToast } from 'primevue/usetoast';
import axiosInstance from "../axios.js";
import { useAuthStore } from "../stores/auth.js";
import {useRoute, useRouter } from "vue-router";


import ProgressSpinner from 'primevue/progressspinner';

const route = useRoute();
const toast = useToast();
const router = useRouter();
const auth = useAuthStore();

const checked1 = ref(true);
const isLoading = ref(false);
const email = ref('');
const password = ref('');
onMounted(() => {
  if (route.query.redirectMessage) {
    toast.add({
      severity: 'info',
      summary: 'Attention',
      detail: route.query.redirectMessage,
      life: 5000
    });
  }
});

const onFormSubmit = async () => {
    isLoading.value = true;
    const formData = {
        email: email.value,
        password: password.value
    };
    console.log("fomrdata is",formData)
    try {
        const response = await axiosInstance.post('/api/user/login', formData);
        console.log("response from server", response.data);
        const data = response.data;
        auth.setUser({
            username: data.username,
            email: data.email,
            password: data.password
        });
        router.push('/food');
        console.log(auth);

        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successful',
            life: 3000
        });
    } catch (error) {
        console.log("error is", error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login failed',
            life: 3000
        });
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="px-6 py-10 md:px-8 lg:px-20">
        <form @submit.prevent="onFormSubmit">
            <div class="logincard bg-surface-0 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
                <div v-if="isLoading"
                    class="absolute inset-0 bg-surface-100/50 rounded-border flex items-center justify-center z-10">
                    <ProgressSpinner class="w-16 h-16" />
                </div>

                <div class="text-center mb-8">
                    <!-- SVG and header content -->
                    <svg class="mb-4 mx-auto fill-surface-600 dark:fill-surface-200 h-16" viewBox="0 0 30 32"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z" />
                    </svg>
                    <div class="text-surface-900 text-3xl font-medium mb-4">
                        Welcome <span class="text-yellow-500">Back</span>
                    </div>
                    <span class="text-surface-600 font-medium leading-normal">Don't have an account?</span>
                    <a class="font-medium no-underline ml-2 text-primary cursor-pointer text-blue-700">
                        Create today!
                    </a>
                </div>

                <div>
                    <label for="email1" class="text-surface-900 font-medium mb-2 block">Email</label>
                    <InputText required v-model="email" id="email1" type="text" placeholder="Email address"
                        class="w-full mb-4" />

                    <label for="password1" class="text-surface-900 font-medium mb-2 block">Password</label>
                    <InputText required v-model="password" id="password1" type="password" placeholder="Password"
                        class="w-full mb-4" />

                    <div class="flex items-center justify-between mb-12">
                        <div class="flex items-center">
                            <Checkbox id="rememberme1" v-model="checked1" :binary="true" class="mr-2" />
                            <label for="rememberme1">Remember me</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" label="Sign In" icon="pi pi-user text-xl leading-none" class="w-full" />

                </div>
            </div>
        </form>

    </div>
</template>
