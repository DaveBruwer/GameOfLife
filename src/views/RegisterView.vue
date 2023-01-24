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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import firebaseApp from "../firebase"

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
      userUID: ""
    }
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
      console.log("Registering new user.")

      const auth = getAuth(firebaseApp)
      const db = getFirestore(firebaseApp)
      await createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.userUID = user.uid
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          // ..
        }).then( () => {
            try {
              const docRef = addDoc(collection(db, "users"), {
                userID: this.userUID,
                userName: this.displayName
              });
              console.log("Document written");
              this.$router.push('/')
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }
        )
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