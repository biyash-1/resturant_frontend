import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FoodView from "../views/FoodView.vue"
import FoodDetailView from "../views/FoodDetailView.vue"
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import CartView from "@/views/CartView.vue"
import { useAuthStore } from '@/stores/auth'
import CheckoutView from '@/views/CheckoutView.vue'
import PaymentView from "@/views/PaymentView.vue"
import OrderConfirmationView from  "@/views/OrderConfirmationView.vue"
import OrderView from "@/views/OrderView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: "login",
      component: LoginView
    },
    {
      path: "/signup",
      name: 'signup',
      component: SignupView
    },
   
    
    {
      path: '/food',
      name: 'food',
      component: FoodView
    },
    {
      path:'/food/:id',
      name: 'foodDetail',
      component: FoodDetailView
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: {requiresAuth:true}
    },
     {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
      meta: {requiresAuth:true}
    },
    {
      path: '/checkout/payment',
      name: "payment",
      component: PaymentView,
      meta: {requiresAuth:true}
    },
    {
      path: '/orderconfirmation',
      name: "orderconfirmation",
      component: OrderConfirmationView
    },
    {
      path: '/orderconfirmation/orders',
      name: "orders",
      component: OrderView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({
       name: 'login',
      query: { redirectMessage: 'Please log in to access that page.' }
     });
  } else if ((to.name === 'login' || to.name === 'signup') && auth.isLoggedIn) {
    next({ name: 'food' });
  } else {
    next();
  }
});

export default router;
