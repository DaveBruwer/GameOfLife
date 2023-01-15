<template>
  <nav class="navbar navbar-expand-lg bg-outline-dark" >
    <div class="container-fluid">
      <div class="d-flex">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
          <a class="navbar-brand" href="#">Game of Life</a><span class="px-2">by</span><a target="_blank" rel="noopener noreferrer" href="https://github.com/davebruwer"> Dave Bruwer</a>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
            <!-- <a class="nav-link" aria-current="page" href="#">Home</a> -->
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gallery">Gallery</RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-success" type="submit">Login</button>
        </form>
      </div>
    </div>
  </nav> 
</template>
  
<script>
export default {

}
</script>

<style>



</style>

