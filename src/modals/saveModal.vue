<template>
  <!-- Button trigger modal -->
  <button type="button" class="mx-1 btn col btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" v-html="saveSVG">
  </button>

  <!-- Modal -->                      
  <form @submit.prevent="submitModal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" v-model="v$.saveName.$model" placeholder="Name">
          <div v-if="v$.saveName.$errors.length">
            <div class="text-danger" v-for="error of v$.saveName.$errors" :key="error.$uid">{{ error.$message }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-outline-dark">Save changes</button>
          <!-- <button type="submit" class="btn btn-outline-dark" data-bs-dismiss="modal">Save changes</button> -->
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength } from '@vuelidate/validators'
  // import * as bootstrap from "bootstrap"
  // import { Modal } from 'bootstrap'

  export default {
    setup () {
      return { v$: useVuelidate() }
    },
    data() {
      return {
        saveName: "",
        saveSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg>'

      }
    },
    validations() {
      return {
        saveName: {required, minlength: minLength(3)}
      }
    },
    methods: {
      async submitModal() {
        const isFormCorrect = await this.v$.$validate()

        if (isFormCorrect) {
          // const myModal = document.querySelector('#exampleModal')
          console.log(this.saveName)
          // alert(this.saveName + " saved.")
          // const myModal = new bootstrap.Modal('#exampleModal')
          // console.log(myModal)
          // console.log(Modal)
          // myModal.Modal.hide()
          // myModal.hide()
          document.querySelector('#exampleModal').style.display = 'none'
          document.querySelector('#exampleModal').setAttribute('aria-hidden', 'true')
          document.querySelector('#exampleModal').removeAttribute('aria-modal')
          document.querySelector('#exampleModal').removeAttribute('role')
          document.querySelector('#exampleModal').classList.remove('show')
          document.querySelector('.modal-backdrop').classList.remove('show')
          document.querySelector('.modal-backdrop').remove()
          document.querySelector('body').style.removeProperty("overflow")
          document.querySelector('body').style.removeProperty("padding-right")
          document.querySelector('body').classList.remove('modal-open')
          // document.querySelector('.modal-backdrop').style.display = 'none'

          
        } else {
          alert("Invalid form data.")
        }

      }
    }
    
  }
</script>

<style>
  
</style>