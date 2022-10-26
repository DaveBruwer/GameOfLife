<template>
  <div class="container-fluid">
    <Header />
    <CanvasComp canvasID="mainCanvas" :gridSize=50 />
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import CanvasComp from "./components/Canvas.vue"

export default {
  data() {
    return {
      
    }
  },
  computed: {
   
  },
  components: {
    Header,
    CanvasComp,
  }
}
</script>

<style>

.container-fluid {
  padding: 0;
  margin: 0;
}

</style>
