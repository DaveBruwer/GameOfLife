<template>
  <div class="container-fluid">
    <Header id="header" />
    <div>
      <CanvasComp canvasID="mainCanvas" :gridCount=25 />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import CanvasComp from "./components/Canvas.vue"
import Footer from "./components/Footer.vue"

export default {
  data() {
    return {
      
    }
  },
  components: {
    Header,
    CanvasComp,
    Footer,
  }
}
</script>

<style>

.container-fluid {
  padding: 0;
  margin: 0;
}

</style>
