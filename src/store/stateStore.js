import { defineStore } from "pinia";

export const useStateStore = defineStore('state', {
  state: () => ({
    random: true,
    speed: 0.5,
  }),
  getters: {
    randomOn(state) {
      return state.random;
    },
    getSpeed(state) {
      return state.speed;
    }
  },
  actions: {
    toggleRandom() {
      this.random = !this.random;
    },
    updateSpeed(newSpeed) {
      this.speed = newSpeed;
    },
  }
})