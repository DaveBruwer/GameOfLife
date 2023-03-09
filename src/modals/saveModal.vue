<template>
  <!-- Button trigger modal -->
  <button :disabled="stateStore.isPlaying" title="Save Grid" @click.prevent="saveBtn" type="button" class="mx-1 btn col btn-outline-dark btn-sm" v-html="saveSVG">
  </button>

  <!-- Modal -->                      
  <form @submit.prevent="submitModal" class="modal" :class="{ show: showModal }" id="saveModal" tabindex="-1" aria-labelledby="saveModalLabel" aria-hidden="true" :style="[showModal ? { 'display': 'block' } : { 'display': 'none' }]">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="saveModalLabel">Save Grid</h1>
          <button @click.prevent="() => {showModal = false}" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class="gridimg m-1 border border-dark" :src="stateStore.imgSrc" >
          <input type="text" v-model="v$.saveName.$model" placeholder="Name">
          <div v-if="v$.saveName.$errors.length">
            <div class="text-danger" v-for="error of v$.saveName.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click.prevent="() => {showModal = false}" type="button" class="btn btn-outline-dark" >Cancel</button>
          <button type="submit" :disabled="disableSumbit" class="btn btn-outline-dark">Save</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength } from '@vuelidate/validators'
  import { useStateStore } from '../store/stateStore';
  import { mapStores } from 'pinia';
  import {auth, db } from "../firebase"
  import { collection, addDoc, Timestamp } from '@firebase/firestore';

  export default {
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        saveName: "",
        saveSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg>',
        showModal: false,
        disableSumbit: false
      }
    },
  props: {
    gridSnapshot: {
      type: Function, 
      required: true
    },
    createPNG: {
      type: Function, 
      required: true
    }
  },
    validations() {
      return {
        saveName: {required, minlength: minLength(3)}
      }
    },
    methods: {
      saveBtn() {
        this.gridSnapshot()

        this.createPNG()

        // console.log(this.stateStore.startingArray)

        if(this.stateStore.loggedIn) {
          this.showModal = true
        } else {
          this.$router.push("/login")
        }

      },
      async submitModal() {
        const isFormCorrect = await this.v$.$validate()

        if (isFormCorrect) {
          this.disableSumbit = true
          await addDoc(collection(db, "grids"), {
            name: this.saveName,
            count: this.stateStore.count,
            random: this.stateStore.random,
            image: this.stateStore.imgSrc,
            uid: auth.currentUser.uid,
            grid: this.stateStore.startingArray,
            likes: [],
            creationDate: Timestamp.now()
          }).then(() => {
            this.showModal = false
            console.log("grid save successful")
          }).catch((error) => {
            console.log(error.message)
            alert(error.message)
            this.disableSumbit = false
          })
        } else {
          alert("Invalid form data.")
        }
      }
    }, 
    computed: {
      ...mapStores(useStateStore),
    }
  }
</script>

<style>
  .gridimg{
    width:300px;
    height:300px;
    object-fit:cover;
  }
</style>