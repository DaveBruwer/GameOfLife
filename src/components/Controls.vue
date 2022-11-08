<template>
  <div class="container-fluid">
    <button @click.prevent="playPause" class="col ">Play / Pause</button>
    <button @click.prevent="lifeUpdate" class="col ">Step</button>
    <!-- <button>Reset</button> -->
    <label for="speedRange">Delay: 0.1s</label>
    <input type="range" id="speedRange" min="0.1" max="1" step="0.1" v-model="speed">
    <label for="speedRange">1.0s</label>
  </div>
</template>

<script>
export default {
  data() {
        return {
            speed: 0.5,
        }
    },
  props: {
    playPause: {
      type: Function,
      required: true,
    },
    lifeUpdate: {
      type: Function,
      required: true
    }
  },
  watch: {
    speed(newSpeed, oldSpeed) {
      // console.log(newSpeed);
      this.$emit("speedUpdate", newSpeed);
    }
  }
  
}
</script>

<style>
  
</style>