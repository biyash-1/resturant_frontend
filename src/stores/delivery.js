// src/stores/delivery.js
import { defineStore } from 'pinia';

export const useDeliveryStore = defineStore('delivery', {
  state: () => ({
    deliveryInfo: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      phone: ''
    }
  }),
  actions: {
    setDeliveryInfo(info) {
      this.deliveryInfo = info;
    }
  }
});
