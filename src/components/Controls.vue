<template>
  <div class="container-fluid">
    <button @click.prevent="playPause" class="col ">Play / Pause</button>
    <button @click.prevent="lifeUpdate" class="col ">Step</button>
    <button>Reset</button>
    <input type="range" min="0.25" max="1">
  </div>
</template>

<script>
export default {
  props: {
    playPause: {
      type: Function,
      required: true,
    },
    lifeUpdate: {
      type: Function,
      required: true
    }
  }
  
}
</script>

<style>
  
</style>