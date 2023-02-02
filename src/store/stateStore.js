import { defineStore } from "pinia"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"

export const useStateStore = defineStore('state', {
  state: () => ({
    random: false,
    speed: 0.5,
    userDisplayName: "",
    loggedIn: false,
  }),
  getters: {
    randomOn(state) {
      return state.random
    },
    getSpeed(state) {
      return state.speed
    }
  },
  actions: {
    toggleRandom() {
      this.random = !this.random
    },
    updateSpeed(newSpeed) {
      this.speed = newSpeed
    },
  }
})