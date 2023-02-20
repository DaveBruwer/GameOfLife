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
  import { collection, getDocs, doc, getDoc } from '@firebase/firestore';

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
      await getDocs(collection(db, "grids"))
      .then((querySnapshot) => {
        querySnapshot.forEach(async (docSnap) => {
          await getDoc(doc(db, "users", docSnap.data().uid))
          .then((user) => {
            this.grids.push({...docSnap.data(), id: docSnap.id, userName: user.data().name})
          })
        })
        // console.log(this.grids)
      }).catch((error) => {
        console.log(error.message)
        window.alert(error.message)
      })

    }
    
}
</script>

<style>
  
</style>