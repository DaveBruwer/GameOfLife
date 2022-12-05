<template>
  <div class="container-fluid">
    <button @click.prevent="playPause" class="btn btn-primary col btn-sm">{{playPauseStrig}}</button>
    <button @click.prevent="lifeUpdate" class="btn btn-primary col btn-sm" :disabled="isPlaying">Step</button>
    <!-- <button>Reset</button> -->
    <label for="speedRange" class="col ">Delay: 0.1s</label>
    <input type="range" id="speedRange" min="0.1" max="1" step="0.1" v-model="speed" class="col ">
    <label for="speedRange" class="col ">1.0s</label>
    <label for="sizeSelection" class="col ">Grid Size:</label>
    <select name="sizeSelection" id="sizeSelection" class="col " v-model="sizeSelection" :disabled="hasStarted">
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
    <button class="btn btn-primary col btn-sm" @click.prevent="resetGrid" :disabled="isPlaying">Reset</button>
  </div>
</template>

<script>
export default {
  data() {
        return {
            speed: 0.5,
            isPlaying: false,
            sizeSelection: "20",
            hasStarted: false,
            playPauseStrig: " Play ",
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
    },
    resetGrid: {
      type: Function,
      required: true
    }
  },
  watch: {
    speed(newSpeed, oldSpeed) {
      this.$emit("speedUpdate", newSpeed);
    },
    sizeSelection(newSize, oldSize) {
      this.$emit("sizeUpdate", newSize);
    }
  },
  methods: {
    playPause() {
      this.hasStarted = true
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.playPauseStrig = "Pause"
      } else {
        this.playPauseStrig = " Play "
      }
      this.playPause()
    }
  }
  
}
</script>

<style>
  
</style>