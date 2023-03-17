<template>
  <nav class="navbar navbar-expand-lg bg-outline-dark" >
    <div class="container-fluid">
      <div class="d-flex">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
          <RouterLink class="navbar-brand" to="/">Game of Life</RouterLink><span class="author">by</span><a class="author" target="_blank" rel="noopener noreferrer" href="https://github.com/davebruwer"> Dave Bruwer</a>
        </div>
      </div>
      <div class="collapse navbar-collapse px-2" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gallery">Gallery</RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <div v-if="stateStore.loggedIn">
            <button class="btn btn-outline-dark m-1" type="button" @click.prevent="toAccount">{{displayName}}</button>
            <button class="btn btn-outline-dark m-1" type="button" @click.prevent="logOut">Log out</button>
          </div>
          <div v-else>
            <RouterLink class="btn btn-outline-dark m-1" to="/login">Log in</RouterLink>
            <RouterLink class="btn btn-outline-dark m-1" to="/register">Register</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </nav> 
</template>
  
<script>

import { mapStores } from 'pinia'
import { useStateStore } from "../store/stateStore"
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from '@firebase/auth';

export default {
  data() {
    return {
      displayedName: "Guest",
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.stateStore.loggedIn = true
        this.stateStore.user = user
      } else {
        this.stateStore.loggedIn = false
        this.stateStore.user = null
      }
    })
  },
  computed: {
    ...mapStores(useStateStore),
    displayName() {
      if(this.stateStore.user) {
        return this.stateStore.user.displayName
      } else {
        return "Account"
      }
    }
  },
  methods: {
    async logOut() {
      console.log("Logging out...")
      try {
        await signOut(auth)
        console.log("Logged out.")
      } catch (error) {
        console.log(error)
        window.alert(error)
      }
    },
    toAccount() {
      if(this.stateStore.loggedIn) {
        this.$router.push("/account")
      } else {
        this.$router.push("/login")
      }      
    }
  }

}
</script>

<style>
.author {
  font-size: 0.75em;
}


</style>

