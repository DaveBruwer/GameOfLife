<template>
  <div class="container-fluid">
    <Header />
    <div id="grid" class="container-fluid">
      <div v-for="n in gridRowCount" class="gridRow" >
        <span v-for="n in gridColCount" class="gridCell" ></span>
      </div>
    </div>
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header.vue"

export default {
  data() {
    return {
      gridCount: 50,
    }
  },
  computed: {
    gridClass() {
      return `row-cols-${this.gridCount}`
    },
    gridRowCount() {
      return this.gridCount;
    },
    gridColCount() {
      return this.gridCount;
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
#grid {
  padding: 0px;
  margin: 1px;
  display: flex;
  flex-direction: column;
  border-left: solid 1px grey;
  border-top: solid 1px grey;
}
.gridRow{
  background-color: yellow;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.gridCell{
  background-color: lightgrey;
  color: lightgrey;
  padding: 0;
  margin: 0;
  border-right: solid 1px grey;
  border-bottom: solid 1px grey;
  flex-grow: 1;
  aspect-ratio: 1/1;
}
</style>
