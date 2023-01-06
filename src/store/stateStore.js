import { defineStore } from "pinia";

export const useStateStore = defineStore('state', {
  state: () => ({
    random: true,
  }),
  getters: {
    randomOn(state) {
      return state.random;
    }
  },
  actions: {
    toggleRandom() {
      this.random = !this.random;
    }
  }
})