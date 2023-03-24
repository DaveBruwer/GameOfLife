<template>
  <!-- Button trigger modal -->
  <button :disabled="showModal" title="Update Password" @click.prevent="PasswordBtn" type="button" class="mx-1 btn col btn-outline-dark">Change Password</button>

  <!-- Modal -->                      
  <form @submit.prevent="submitModal" class="modal" :class="{ show: showModal }" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true" :style="[showModal ? { 'display': 'block' } : { 'display': 'none' }]">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="passwordModalLabel">Change Password</h1>
          <button @click.prevent="() => {showModal = false}" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>To update your password, Log Out of your account, and on the Log In page, click on "Forgot Password."</div>
        </div>
        <div class="modal-footer">
          <button @click.prevent="() => {showModal = false}" type="button" class="btn btn-outline-dark" >Cancel</button>
          <button type="submit" :disabled="disableSumbit" class="btn btn-outline-dark">Log OUt</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { auth } from "../firebase"
  import { signOut } from "firebase/auth"

  export default {
    data() {
      return {
        showModal: false,
        disableSumbit: false
      }
    },
    methods: {
      PasswordBtn() {
        this.showModal = true
      },
      async submitModal() {
        console.log("Logging out...")

        await signOut(auth)
        .then(() => {
          console.log("Logged out.")
          this.$router.push("/login")
        }).catch(() => {
          console.log(error)
          window.alert(error)
        })
      }
    }, 
  }
</script>

<style>
  .gridimg{
    width:300px;
    height:300px;
    object-fit:cover;
  }
</style>