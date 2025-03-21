import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalItems(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice(state) {
      return state.items.reduce((total, item) => total + item.reviewCount * item.quantity, 0);
    },
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        this.items.push({ ...product });
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(item => item.id !== id);
    },
    updateQuantity(id, quantity) {
      if (quantity <= 0) {
        this.removeFromCart(id);
      } else {
        const item = this.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart',
        storage: localStorage,
      },
    ],
  },
});
