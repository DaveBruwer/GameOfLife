<template>
  <div class="container-fluid">
    <Header />
    <div>
      <CanvasComp canvasID="mainCanvas" :gridCount=25 :delay=1 />
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
  computed: {
   
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
