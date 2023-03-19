<template>
  <h1>Gallery</h1>
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
    <Grid v-for="grid in grids" :grid="grid">
      <p class="paragraph">by: {{ grid.userName }}</p>
    </Grid>
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
        sortStrat: "likes",
        showLoadingModal: false
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
      async loadGrids() {
        this.showLoadingModal = true
        const _query = await getDocs(collection(db, "grids"))
        for(let i = 0; i< _query.size; i++) {
          const docSnap = _query.docs[i].data()
          docSnap.id = _query.docs[i].id
          await this.pushToGrid(docSnap)
        }
        this.sort()
        this.showLoadingModal = false

      },
      async pushToGrid(docSnap) {
        const _user = await getDoc(doc(db, "users", docSnap.uid))
        this.grids.push({...docSnap, id: docSnap.id, userName: _user.data().name})
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