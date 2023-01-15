<template>
  <div class="container-fluid">
    <Header id="header" />
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  data() {
    return {
      
    }
  },
  components: {
    Header
  }
}
</script>

<style>

.container-fluid {
  padding: 0;
  margin: 0;
}

</style>
