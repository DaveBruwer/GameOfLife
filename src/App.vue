<template>
  <div class="container-fluid">
    <Header id="header" />
    <div>
      <CanvasComp canvasID="mainCanvas" />
    </div>
    <Footer id="footer"/>
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
  },
  computed: {
    // footerHeight() {
    //   let footer = document.getElementById("footer");
    //   console.log(footer);
    //   return footer.offsetHeight;
    // }
  }
}
</script>

<style>

.container-fluid {
  padding: 0;
  margin: 0;
}

</style>
