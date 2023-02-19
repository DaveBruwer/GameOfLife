import { defineStore } from "pinia"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"

export const useStateStore = defineStore('state', {
  state: () => ({
    imgSrc: '',
    isPlaying: false,
    random: true,
    speed: 0.5,
    userDisplayName: "Guest",
    loggedIn: false,
    count: 40,
    startingArray: [],
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