<template>
<form class="container align-middle" id="loginform">
  <div class="m-3">
    <label for="displayName" class="form-label">Display Name</label>
    <input type="text" class="form-control" id="displayName" aria-describedby="dispNameHelp">
    <div id="dispNameHelp" class="form-text">The name that will be shown to other users.</div>
  </div>
  <div class="m-3">
    <label for="RegisterEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="RegisterEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="m-3">
    <label for="RegisterPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="RegisterPassword1">
  </div>
  <div class="m-3">
    <label for="ConfirmPassword1" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="ConfirmPassword1">
  </div>
  <div class="m-3">
    <RouterLink to="/login">Login</RouterLink>
  </div>
  <button type="submit" class="btn btn-primary m-3">Submit</button>
</form>
</template>

<script>
export default {
  
}
</script>

<style>
  #loginform {
    max-width: 25em;
    min-width: 15em;
  }
</style>