<template>
  <div class="container-fluid">
    <button @click.prevent="playPauseBtn" class="btn btn-outline-dark col btn-sm" v-html="playSVG"></button>
    <button @click.prevent="stepBtn" class="btn btn-outline-dark col btn-sm" :disabled="isPlaying" v-html="stepSVG"></button>
    <!-- <button>Reset</button> -->
    <label for="speedRange" class="col ">Delay: 0.1s</label>
    <input type="range" id="speedRange" min="0.1" max="1" step="0.1" v-model="speed" class="col ">
    <label for="speedRange" class="col ">1.0s</label>
    <label for="sizeSelection" class="col " v-html="sizeSVG"></label>
    <select name="sizeSelection" id="sizeSelection" class="btn btn-outline-dark dropdown-toggle col " v-model="sizeSelection" :disabled="hasStarted">
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="60">60</option>
      <option value="80">80</option>
    </select>
    <button class="btn btn-outline-dark col btn-sm" @click.prevent="resetBtn" :disabled="(isPlaying || !hasStarted)" v-html="stopSVG"></button>
  </div>
</template>

<script>
export default {
  data() {
        return {
            speed: 0.5,
            isPlaying: false,
            hasStarted: false,
            playSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stepSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-skip-end-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038L9.5 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stopSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/></svg>',
            sizeSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/><path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/></svg>'
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
    },
    sizeSelection: {
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
    playPauseBtn() {
      this.hasStarted = true
      this.isPlaying = !this.isPlaying
      if (this.isPlaying) {
        this.playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/></svg>'
      } else {
        this.playSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>'
      }
      this.playPause()
    },
    resetBtn() {
      this.hasStarted = false;
      this.resetGrid();
    },
    stepBtn() {
      this.hasStarted = true;
      this.lifeUpdate();
    }
  }
  
}
</script>

<style>
  
</style>