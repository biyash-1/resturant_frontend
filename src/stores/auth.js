import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axiosInstance from "@/axios";

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null);
    const isLoggedIn = computed(() => user.value !== null);
    // New computed property to quickly check if the logged-in user is an admin
    const isAdmin = computed(() => user.value && user.value.role === 'admin');

    function setUser(userData) {
      user.value = userData;
    }

    async function logout() {
      try {
        const response = await axiosInstance.post("/api/user/logout");
        if (response.status === 200) {
          user.value = null;
          return true;
          
          
        }
        return false;
      } catch (error) {
        console.error("Logout error:", error);
        return false; // Indicate failure
      }
    }

    return { user, isLoggedIn, isAdmin, setUser, logout };
  },
  {
    persist: {
      key: 'auth',
      storage: localStorage,
    },
  }
);
