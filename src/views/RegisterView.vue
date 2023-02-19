<template>
<form @submit.prevent="registerNewUser" class="container align-middle" id="loginform">
  <div class="m-3">
    <input v-model="v$.displayName.$model" type="text" class="form-control" id="displayName" aria-describedby="dispNameHelp" placeholder="Enter Display Name">
    <div v-if="v$.displayName.$errors.length">
      <div class="text-danger" v-for="error of v$.displayName.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
    <div v-else id="dispNameHelp" class="form-text">(The name that will be shown to other users.)</div>
  </div>
  <div class="m-3">
    <input v-model="v$.registerEmail.$model" type="email" class="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter Email">
    <div v-if="v$.registerEmail.$errors.length">
      <div class="text-danger" v-for="error of v$.registerEmail.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
    <div v-else id="emailHelp" class="form-text">(We'll never share your email with anyone else.)</div>
  </div>
  <div class="m-3">
    <input v-model="v$.registerPassword.$model" type="password" class="form-control" id="RegisterPassword1" placeholder="Enter Password">
    <div v-if="v$.registerPassword.$errors.length">
      <div class="text-danger" v-for="error of v$.registerPassword.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
  </div>
  <div class="m-3">
    <input v-model="v$.confirmPassword.$model" type="password" class="form-control" id="ConfirmPassword1" placeholder="Confirm Password">
    <div v-if="v$.confirmPassword.$errors.length">
      <div class="text-danger" v-for="error of v$.confirmPassword.$errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
  </div>
  <div class="m-3">
    <RouterLink to="/login">Login</RouterLink>
  </div>
  <button type="submit" class="btn btn-primary m-3">Submit</button>
</form>
</template>

<script>

import { useVuelidate } from "@vuelidate/core"
import { required, email, minLength, maxLength, sameAs, helpers} from "@vuelidate/validators"
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { mapStores } from 'pinia'
import { useStateStore } from "../store/stateStore"

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      displayName: "",
      registerEmail: "",
      registerPassword: "",
      confirmPassword: "",
    }
  },
  computed: {
    ...mapStores(useStateStore)
  },
  validations() {
    return {
      displayName: {required, minLength: minLength(3), maxLength: maxLength(20)},
      registerEmail: {required, email},
      registerPassword: {required, minLength: minLength(6)},
      confirmPassword: {required, sameAs: helpers.withMessage("This field must match the password above.", sameAs(this.registerPassword))}
    }
  },
  methods: {
    async registerNewUser() {
      const isFormCorrect = await this.v$.$validate()

      if (isFormCorrect) {
        console.log("Registering new user.")

        await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
        .then(async () => {
          await updateProfile(auth.currentUser, {displayName: this.displayName})
        }).then( () => {
          this.stateStore.userDisplayName = this.displayName
          this.stateStore.loggedIn = true
          this.$router.push('/')
        }).catch((error) => {
          console.log(error.message)
          window.alert(error.message)
        })
      } else {
        alert("Invalid form data.")
      }
    }
  }
}
</script>

<style>
  #loginform {
    max-width: 25em;
    min-width: 15em;
  }
</style>