<template>
<form class="container align-middle" id="loginform">
  <div class="m-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="m-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="m-3">
    <RouterLink to="/register">Register</RouterLink>
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