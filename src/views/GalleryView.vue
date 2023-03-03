<template>
  <h1>Gallery</h1>
  <form >
    <label for="sort">Sort by: </label>
    <select name="sort" id="sort" v-model="sortStrat">
      <option value="likes">likes</option>
      <option value="latest">latest</option>
    </select>
    <button @click.prevent="sort">Go</button>
  </form>
  <div class="container-fluid">
    <div calss="row">
      <Grid class="col-3" v-for="grid in grids" :grid="grid"/>
    </div>
  </div>
</template>

<script>
  import Grid from "../components/Grid.vue"
  import { db } from "../firebase"
  import { collection, getDocs, doc, getDoc } from '@firebase/firestore';

  export default {
    data() {
      return {
        grids: [],
        sortStrat: "likes"
      }
    },
    components: {
      Grid,
    },
    // VUE LIFECYCLE HOOK
    async beforeMount() {
      await this.loadGrids()
    },
    methods: {
      // FUNCTION THAT GETS CALLED WHEN BUTTON PRESSED.
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
      logGrid() {
        console.log(this.grids)
      },
      async loadGrids() {
        const _query = await getDocs(collection(db, "grids"))
        for(let i = 0; i< _query.size; i++) {
          const docSnap = _query.docs[i].data()
          await this.pushToGrid(docSnap)
        }
        this.sort()

      },
      async pushToGrid(docSnap) {
        const _user = await getDoc(doc(db, "users", docSnap.uid))
        this.grids.push({...docSnap, id: docSnap.id, userName: _user.data().name})
      }
    }
    
}
</script>

<style>
  
</style>