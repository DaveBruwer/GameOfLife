<template>
  <h1>This is the gallery view!</h1>
  <button @click="btnSort">Sort</button>
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
        grids: []
      }
    },
    components: {
      Grid,
    },
    // VUE LIFECYCLE HOOK
    async beforeMount() {
      await getDocs(collection(db, "grids"))
      .then((querySnapshot) => {
        querySnapshot.forEach(async (docSnap) => {
          await getDoc(doc(db, "users", docSnap.data().uid))
          .then((user) => {
            this.grids.push({...docSnap.data(), id: docSnap.id, userName: user.data().name})
          })
        })
      }).then(() => {
        this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // DOES NOT WORK
      }).catch((error) => {
        console.log(error.message)
        window.alert(error.message)
      })

      this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // DOES NOT WORK

    },
    // VUE LIFECYCLE HOOK
    mounted() {
      this.grids.sort((a, b) => {return b.likes.length - a.likes.length})
      console.log(this.grids)
    },
    methods: {
      // FUNCTION THAT GETS CALLED WHEN BUTTON PRESSED.
      btnSort() {
        this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // THIS WORKS FINE
        console.log(this.grids)
      }
    }
    
}
</script>

<style>
  
</style>