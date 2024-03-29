<template>
  <div class="control-container">
    <div class="button-container">
      <button :title="[isPlaying ? 'Pause' : 'Play']" @click.prevent="playPauseBtn" class="m-1 btn btn-outline-dark btn-sm" v-html="playSVG"></button>
      <button title="Step" @click.prevent="stepBtn" class="m-1 btn btn-outline-dark btn-sm" :disabled="isPlaying" v-html="stepSVG"></button>
      <button title="Reset Grid" class="btn btn-outline-dark btn-sm m-1" @click.prevent="resetBtn" :disabled="(isPlaying || !hasStarted)" v-html="resetSVG"></button>
      <button title="Toggle Random Grid" @click.prevent="randomBtn" class="m-1 btn btn-sm" :disabled="(isPlaying || hasStarted)" :class="[ stateStore.randomOn ? darkButton : lightButton]" v-html="randomSVG"></button>
      <saveModal :createPNG="createPNG" :gridSnapshot="gridSnapshot" />
    </div>
    <div class="control-container">
      <div title="Playback Speed" class="button-container">
        <label for="speedRange" class="m-1" v-html="speedSVG"></label>
        <div class="btn-group m-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-sm" :class="[ stateStore.speed == 0.2 ? darkButton : lightButton ]" @click.prevent="() => {stateStore.updateSpeed(0.2)}">0.2 s</button>
          <button type="button" class="btn btn-sm" :class="[ stateStore.speed == 0.5 ? darkButton : lightButton ]" @click.prevent="() => {stateStore.updateSpeed(0.5)}">0.5 s</button>
          <button type="button" class="btn btn-sm" :class="[ stateStore.speed == 1.0 ? darkButton : lightButton ]" @click.prevent="() => {stateStore.updateSpeed(1.0)}">1.0 s</button>
        </div>
      </div>
      <div title="Grid Size" class="button-container">
        <label for="sizeSelection" class="m-1" v-html="sizeSVG"></label>
        <div class="btn-group m-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-sm" :class="[ stateStore.count == 20 ? darkButton : lightButton ]" @click.prevent="() => {this.sizeSelection = 20}">20</button>
          <button type="button" class="btn btn-sm" :class="[ stateStore.count == 40 ? darkButton : lightButton ]" @click.prevent="() => {this.sizeSelection = 40}">40</button>
          <button type="button" class="btn btn-sm" :class="[ stateStore.count == 60 ? darkButton : lightButton ]" @click.prevent="() => {this.sizeSelection = 60}">60</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStateStore } from '../store/stateStore';
import { mapStores } from 'pinia';
import saveModal from "../modals/saveModal.vue"

export default {
  data() {
        return {
            isPlaying: false,
            hasStarted: false,
            sizeSelection: null,
            lightButton: 'btn-outline-dark',
            darkButton: 'btn-dark',
            playSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stepSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-skip-end-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038L9.5 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stopSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/></svg>',
            resetSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
            sizeSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/><path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/></svg>',
            speedSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg>',
            randomSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/><path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/></svg>',
            saveSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16"><path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/></svg>'
        }
    },
  components: {
    saveModal,
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
    toggleRandom: {
      type: Function, 
      required: true
    },
    gridSnapshot: {
      type: Function, 
      required: true
    },
    createPNG: {
      type: Function, 
      required: true
    }
  },
  watch: {
    sizeSelection(newSize, oldSize) {
      this.$emit("sizeUpdate", newSize);
    }
  },
  methods: {
    playPauseBtn() {
      this.hasStarted = true
      this.isPlaying = !this.isPlaying
      this.stateStore.isPlaying = this.isPlaying
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
    },
    randomBtn() {
      this.stateStore.toggleRandom();
      this.toggleRandom();
    }
  },
  computed: {
    ...mapStores(useStateStore),
  }
  
}
</script>

<style>

.control-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.button-container {
  display: flex;
  
}
  
</style>