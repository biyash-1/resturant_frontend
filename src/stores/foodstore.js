// stores/foodStore.js
import { defineStore } from 'pinia';

export const useFoodStore = defineStore('food', {
  state: () => ({
    recipes: [],
    isLoaded: false, // flag to check if data is already fetched
  }),
  actions: {
    async fetchRecipes() {
      // Only fetch if recipes are not loaded yet
      if (this.isLoaded) return;
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      this.recipes = data.recipes;
      this.isLoaded = true;
    }
  }
});
