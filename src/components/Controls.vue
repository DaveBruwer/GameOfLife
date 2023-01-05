<template>
  <div class="container-fluid">
    <div class="row justify-content-center mx-2">
      <button @click.prevent="playPauseBtn" class="mx-1 btn btn-outline-dark col btn-sm" v-html="playSVG"></button>
      <button @click.prevent="stepBtn" class="mx-1 btn btn-outline-dark col btn-sm" :disabled="isPlaying" v-html="stepSVG"></button>
      <button class="btn btn-outline-dark col btn-sm mx-1" @click.prevent="resetBtn" :disabled="(isPlaying || !hasStarted)" v-html="resetSVG"></button>
      <button @click.prevent="randomBtn" class="mx-1 btn col btn-sm" :disabled="(isPlaying || hasStarted)" :class="[randomOn ? darkButton : lightButton]" v-html="randomSVG"></button>
      <div class="col-4 text-center">
        <label for="speedRange" class="mx-1" v-html="speedSVG"></label>
        <div class="btn-group mx-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.speed = 0.25}">0.25 s</button>
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.speed = 0.5}">0.5 s</button>
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.speed = 1.0}">1.0 s</button>
        </div>
      </div>
      <div class="col-4 text-center">
        <label for="sizeSelection" class="mx-1" v-html="sizeSVG"></label>
        <div class="btn-group mx-1" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.sizeSelection = 20}">20</button>
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.sizeSelection = 40}">40</button>
          <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="() => {this.sizeSelection = 60}">60</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
        return {
            speed: 0.5,
            isPlaying: false,
            hasStarted: false,
            sizeSelection: null,
            randomOn: true,
            lightButton: 'btn-outline-dark',
            darkButton: 'btn-info',
            playSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stepSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-skip-end-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038L9.5 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>',
            stopSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/></svg>',
            resetSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
            sizeSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/><path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0v-3zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0v3z"/></svg>',
            speedSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2zM3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.945 11.945 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0z"/></svg>',
            randomSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/><path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/></svg>'
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
    toggleRandom: {
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
    },
    randomBtn() {
      this.randomOn = !this.randomOn;
      this.toggleRandom();
    }
  }
  
}
</script>

<style>
  
</style>