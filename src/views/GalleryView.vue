<template>
  <h1>This is the gallery view!</h1>
  <button @click="btnSort">Sort</button>
  <button @click="logGrid">log grid</button>
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
      // await getDocs(collection(db, "grids"))
      // .then(async (querySnapshot) => {
      //   querySnapshot.forEach(async (docSnap) => {
      //     await getDoc(doc(db, "users", docSnap.data().uid))
      //     .then((user) => {
      //       this.grids.push({...docSnap.data(), id: docSnap.id, userName: user.data().name})
      //     })
      //   })
      // }).then(() => {
      //   this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // DOES NOT WORK
      //   console.log("1")
      // }).catch((error) => {
      //   console.log(error.message)
      //   window.alert(error.message)
      // })

      // this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // DOES NOT WORK
      // console.log("2")

      await this.loadGrids()

    },
    // VUE LIFECYCLE HOOK
    mounted() {
      // this.grids.sort((a, b) => {return b.likes.length - a.likes.length})
      // console.log("3")
      // console.log(this.grids)
    },
    methods: {
      // FUNCTION THAT GETS CALLED WHEN BUTTON PRESSED.
      btnSort() {
        console.log("btnSort 1")
        this.grids.sort((a, b) => {return b.likes.length - a.likes.length}) // THIS WORKS FINE
        console.log("btnSort 2")
      },
      logGrid() {
        console.log(this.grids)
      },
      async loadGrids() {
        console.log("LoadGrids 1")
        const _query = await getDocs(collection(db, "grids"))
        console.log("LoadGrids 2")
        for(let i = 0; i< _query.size; i++) {
          console.log(_query.size)
          const docSnap = _query.docs[i].data()
          console.log(docSnap)
          await this.pushToGrid(docSnap)
        }
        // _query.forEach(async (docSnap) => {await this.pushToGrid(docSnap)})
        console.log("LoadGrids 3")
        this.btnSort()
        console.log("LoadGrids 4")
        // console.log(JSON.stringify(this.grids))

      },
      async pushToGrid(docSnap) {
        console.log("pushToGrid 1")
        const _user = await getDoc(doc(db, "users", docSnap.uid))
        this.grids.push({...docSnap, id: docSnap.id, userName: _user.name})
        console.log("pushToGrid 2")
        // console.log(JSON.stringify(this.grids))
      }
    }
    
}
</script>

<style>
  
</style>