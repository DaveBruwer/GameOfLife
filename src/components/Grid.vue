<template>
  <div class="card" style="width: 18rem;">
    <img :src="grid.image" class="card-img-top" :alt="grid.name">
    <div class="card-body">
      <h5 class="card-title">{{grid.name}}</h5>
      <p class="card-text">by: {{ grid.uid }}</p>
      <button @click="buttonPress" class="btn btn-primary">Button</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    grid: {
      type: Object, 
      required: true
    }
  },
  methods: {
    buttonPress() {
      console.log(this.grid)
    }
  }
  
}
</script>

<style>
  
</style>