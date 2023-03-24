<template>
  <div>
    <h3 class="m-2">{{ displayName }}</h3>
    <nameModal />
    <passwordModal />
    <!-- <button @click.prevent="btnP" class="btn btn-outline-dark m-1">Change Password</button> -->
  </div>
  <div>
    <div id="loadingModal" tabindex="-1"  :style="[showLoadingModal ? { 'display': 'block' } : { 'display': 'none' }]">
      <h1 id="loadingContent">. . . loading . . .</h1>
    </div>
    <div class="modal" :class="{ show: showDeleteModal }" id="deleteModal" tabindex="-1" :style="[showDeleteModal ? { 'display': 'block' } : { 'display': 'none' }]">
      <form>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" >
              <h1 class="modal-title fs-5" id="saveModalLabel">Delete Grid</h1>
              <button @click.prevent="() => {showDeleteModal = false}" type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div v-if="showDeleteModal" class="modal-body">
              <img class="gridimg m-1 border border-dark" :src="focussedGrid.image" >
              <h5>{{focussedGrid.name}}</h5>
              <div class="text-danger">Are you sure you want to permanently delet this grid?</div>
            </div>
            <div class="modal-footer">
              <button @click.prevent="() => {showDeleteModal = false}" type="button" id="cancelButton" class="btn btn-outline-dark m-1" >Cancel</button>
              <button type="button" @click.prevent="confirmDelete" :disabled="disableDelete" class="btn btn-outline-danger m-1">Delete</button>
            </div>
          </div>
        </div>
      </form>
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
        <button class="btn btn-outline-dark" :disabled="showDeleteModal" @click.prevent="() => {deleteGrid(grid)}" v-html="trashSVG"></button>
      </Grid>
    </div>
  </div>
</template>
  
<script>
  import Grid from "../components/Grid.vue"
  import nameModal from "../modals/nameModal.vue"
  import passwordModal from "../modals/passwordModal.vue"
  import { mapStores } from 'pinia'
  import { useStateStore } from "../store/stateStore"
  import { db } from "../firebase"
  import { collection, query, where, getDocs, doc, deleteDoc } from "@firebase/firestore"

  export default {
    data() {
      return {
        grids: [],
        disableDelete: true,
        focussedGrid: null,
        sortStrat: "likes",
        showLoadingModal: false,
        showDeleteModal: false,
        trashSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>'
      }
    },
    components: {
      Grid,
      nameModal,
      passwordModal,
    },
    mounted() {
      if(this.stateStore.user){
        this.loadGrids()
      }
    },
    methods: {
      btnP() {
        console.log(this.stateStore.user)
      },
      deleteGrid(grid){
        this.focussedGrid = grid
        this.showDeleteModal = true
        this.disableDelete = false
      },
      async confirmDelete() {
        this.disableDelete = true
        try{
          await deleteDoc(doc(db, "grids", this.focussedGrid.id))
          console.log("grid deleted!")
        }catch(error){
          this.disableDelete = true
          alert(error)
          console.log(error)
        }


        location.reload()

        
      },
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

#deleteModal {
  z-index: 1;
}

.gridimg{
    width:300px;
    height:300px;
    object-fit:cover;
  }
</style>