<template>
  <h1>This is the gallery view!</h1>
  <div class="container-fluid">
    <div calss="row">
      <Grid class="col-3" v-for="grid in grids" :grid="grid"/>
    </div>
  </div>
</template>

<script>
  import Grid from "../components/Grid.vue"
  import {auth, db } from "../firebase"
  import { collection, getDocs } from '@firebase/firestore';

  export default {
    data() {
      return {
        grids: []
      }
    },
    components: {
      Grid,
    },
    async beforeMount() {
      const querySnapshot = await getDocs(collection(db, "grids"))

      querySnapshot.forEach((doc) => {
        this.grids.push({...doc.data(), id: doc.id})
      })
    }
    
}
</script>

<style>
  
</style>