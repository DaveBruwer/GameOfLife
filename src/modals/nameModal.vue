<template>
  <!-- Button trigger modal -->
  <button :disabled="showModal" title="Update Name" @click.prevent="nameBtn" type="button" class="mx-1 btn col btn-outline-dark">Udate Name</button>

  <!-- Modal -->                      
  <form @submit.prevent="submitModal" class="modal" :class="{ show: showModal }" id="nameModal" tabindex="-1" aria-labelledby="nameModalLabel" aria-hidden="true" :style="[showModal ? { 'display': 'block' } : { 'display': 'none' }]">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="nameModalLabel">Update Name</h1>
          <button @click.prevent="() => {showModal = false}" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input id="newName" type="text" v-model="v$.saveName.$model" placeholder="New name">
          <div v-if="v$.saveName.$errors.length">
            <div class="text-danger" v-for="error of v$.saveName.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click.prevent="() => {showModal = false}" type="button" class="btn btn-outline-dark" >Cancel</button>
          <button type="submit" :disabled="disableSumbit" class="btn btn-outline-dark">Submit</button>
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
  import { doc, setDoc } from "firebase/firestore"
  import { updateProfile } from "firebase/auth"

  export default {
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        saveName: "",
        showModal: false,
        disableSumbit: false
      }
    },
    validations() {
      return {
        saveName: {required, minlength: minLength(3)}
      }
    },
    methods: {
      nameBtn() {

        this.showModal = true

      },
      async submitModal() {
        const isFormCorrect = await this.v$.$validate()

        if (isFormCorrect) {
          this.disableSumbit = true

          await updateProfile(auth.currentUser, {displayName: this.saveName})
          .then(async () => {
            await setDoc(doc(db, "users", auth.currentUser.uid), {
              name: this.saveName
            })
          }).then( () => {
            this.stateStore.user.displayName = this.saveName
            console.log("Form Submitted! New name: " + this.saveName)
            window.alert("Name succesfully updated.")
            this.showModal = false
            location.reload()
          }).catch((error) => {
            console.log(error.message)
            window.alert(error.message)
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