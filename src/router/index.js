import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FoodView from '../views/FoodView.vue'
import FoodDetailView from '../views/FoodDetailView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import CartView from '@/views/CartView.vue'
import { useAuthStore } from '@/stores/auth'
import CheckoutView from '@/views/CheckoutView.vue'
import PaymentView from '@/views/PaymentView.vue'
import OrderConfirm from '@/views/OrderConfirm.vue'
import OrderView from '@/views/OrderView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import ContactView from '@/views/ContactView.vue'

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
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView,
    },
    {
      path: '/food/:id',
      name: 'foodDetail',
      component: FoodDetailView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout/payment',
      name: 'payment',
      component: PaymentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/orderconfirmation',
      name: 'orderconfirmation',
      component: OrderConfirm,
      meta: { requiresAuth: true },
    },
    {
      path: '/orderconfirmation/orders',
      name: 'orders',
      component: OrderView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'adminlayout',
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Existing checks
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({
      name: 'login',
      query: { redirectMessage: 'Please log in to access that page.' },
    })
  }
  // New admin check
  else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next({ name: 'home' }) // or show access denied
    toast.add({ severity: 'error', summary: 'Access Denied', detail: 'Admin privileges required' })
  }
  // Existing login/signup redirect
  else if ((to.name === 'login' || to.name === 'signup') && auth.isLoggedIn) {
    next({ name: 'food' })
  } else {
    next()
  }
})
export default router
