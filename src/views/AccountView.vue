<template>
  <div>
    <h3 class="m-2">{{ displayName }}</h3>
    <button class="btn btn-outline-dark m-1">Update Name</button>
    <button class="btn btn-outline-dark m-1">Change Password</button>
  </div>
  <div>
    <div id="loadingModal" tabindex="-1"  :style="[showLoadingModal ? { 'display': 'block' } : { 'display': 'none' }]">
      <h1 id="loadingContent">. . . loading . . .</h1>
    </div>
    <form class="form m-2" >
      <label for="sort" class="form-label">Sort by: </label>
      <select class="btn btn-outline-dark mx-1" name="sort" id="sort" v-model="sortStrat">
        <option value="likes">likes</option>
        <option value="latest">latest</option>
      </select>
      <button class="btn btn-outline-dark mx-1" @click.prevent="sort">Go</button>
    </form>
    <div class="flexcontainer text-center">
      <Grid v-for="grid in grids" :grid="grid"/>
    </div>
  </div>
</template>
  
<script>
  import Grid from "../components/Grid.vue"
  import { mapStores } from 'pinia'
  import { useStateStore } from "../store/stateStore"
  import {auth, db } from "../firebase"
  import { collection, query, where, getDocs } from "@firebase/firestore"

  export default {
    data() {
      return {
        grids: [],
        sortStrat: "likes",
        showLoadingModal: false
      }
    },
    components: {
      Grid,
    },
    mounted() {
      if(this.stateStore.user){
        this.loadGrids()
      }
    },
    methods: {
      sort() {
        console.log("Sort strategy: " + this.sortStrat)

        switch(this.sortStrat) {
          case "likes":
            console.log("likes sort")
            this.grids.sort((a, b) => {return b.likes.length - a.likes.length})
            break
          case "latest":
            console.log("latest sort")
            this.grids.sort((a, b) => {return b.creationDate - a.creationDate})
            break
          default:
            console.log("Sort strategy not recognised.")
            break
        }
      },
      async loadGrids() {
        this.showLoadingModal = true
        const _query = await getDocs(query(collection(db, "grids"), where("uid", "==", this.stateStore.user.uid)))
        for(let i = 0; i< _query.size; i++) {
          const docSnap = _query.docs[i].data()
          docSnap.id = _query.docs[i].id
          await this.pushToGrid(docSnap)
        }
        this.sort()
        this.showLoadingModal = false
      },
      async pushToGrid(docSnap) {
        this.grids.push({...docSnap, id: docSnap.id, userName: this.displayName})
      }
    },
    computed: {
      ...mapStores(useStateStore),
      displayName() {
        if(this.stateStore.user) {
          return this.stateStore.user.displayName
        } else {
          return "Loading..."
        }
      }
    },
    watch: {
      displayName() {
        if(this.stateStore.user){
          this.loadGrids()
        }
      }
    }
  }
</script>

<style>
.flexcontainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

#loadingModal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
}

#loadingContent {
  align-items: center;
  text-align: center;
  margin: auto;
  background-color: lightgrey;
  opacity: 0.4;
  margin: 1em;
  padding: 50% 0;
}
</style>