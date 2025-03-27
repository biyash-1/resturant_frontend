<template>
    <nav class="bg-gray-100 shadow-md w-full h-20 flex items-center justify-between px-4">
      <h2 class="text-2xl font-semibold"><span class="text-yellow-500">Welcome</span> Back Admin! </h2>
      <Button @click="logout" label="logout" severity="Danger"/>
     </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/auth';
  import { useToast } from 'primevue/usetoast';
  const toast = useToast();
  import { useRouter } from 'vue-router';
  import  Button  from 'primevue/button';
  
  const auth = useAuthStore();
  const router = useRouter();
  
  const logout = () => {
    auth.logout();

    toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'logout sucesfull',
            life: 3000
        });
    auth.setUser(null);
    router.push('/login');
  };
  </script>
  