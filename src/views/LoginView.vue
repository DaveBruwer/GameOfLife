<template>
<form @submit.prevent="signInUser" class="container align-middle" id="loginform">
  <div class="m-3">
    <input v-model="v$.exampleInputEmail1.$model" name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
    <div v-if="v$.exampleInputEmail1.$errors.length">
      <div class="text-danger" v-for="error of v$.exampleInputEmail1.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
    <div v-else id="emailHelp" class="form-text">(We'll never share your email with anyone else.)</div>
  </div>
  <div class="m-3">
    <input v-model="v$.exampleInputPassword1.$model" type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password" />
    <div v-if="v$.exampleInputPassword1.$errors.length">
      <div class="text-danger" v-for="error of v$.exampleInputPassword1.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
  </div>
  <div class="link-container m-3">
    <RouterLink to="/register">Register</RouterLink>
    <a href="#" :disabled="disableSumbit" @click.prevent="forgotPassword">Forgot Password</a>
  </div>
  <button type="submit" :disabled="disableSumbit" class="btn btn-primary m-3">Submit</button>
</form>
</template>

<script>

import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { auth } from "../firebase"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from '@firebase/auth'
import { mapStores } from 'pinia'
import { useStateStore } from "../store/stateStore"

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      exampleInputEmail1: "",
      exampleInputPassword1: "",
      disableSumbit: false
    }
  },
  validations() {
    return {
      exampleInputEmail1: {required, email},
      exampleInputPassword1: {required, minlength: minLength(6)}
    }
  },
  computed: {
    ...mapStores(useStateStore)
  },
  methods: {
    async signInUser() {
      this.disableSumbit = true

      const isFormCorrect = await this.v$.$validate()

      if (isFormCorrect) {
        console.log("signing in new user...")
  
        await signInWithEmailAndPassword(auth, exampleInputEmail1.value, exampleInputPassword1.value)
        .then(() => {
          this.stateStore.loggedIn = true
          this.$router.push("/")
        })
        .catch((error) => {
          console.log(error.message)
          alert(error.message)
        })
      } else {
        alert("Invalid form data.")
        this.disableSumbit = false
      }
    },
    async forgotPassword() {
      this.disableSumbit = true
      sendPasswordResetEmail(auth, exampleInputEmail1.value)
        .then(() => {
          alert("An email has been sent with instructions to reset your password.")
        })
        .catch((error) => {
          alert(error.message)
          this.disableSumbit = false
      })
    }
  }
}
</script>

<style>
  #loginform {
    max-width: 25em;
    min-width: 15em;
  }
  .link-container {
    display: flex;
    justify-content: space-between;
  }
</style>