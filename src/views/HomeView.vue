<template>
  <div align="center">
    <canvas :id="canvasID" class="mainCanvas" @click.prevent="toggleCell"></canvas>
    <div :style="{width: this.controlsWidth}">
        <Controls :createPNG="createPNG" :gridSnapshot="gridSnapshot" :toggleRandom="toggleRandom" :resetGrid="resetGrid" :playPause="playPause" :lifeUpdate="lifeUpdate" @sizeUpdate="sizeUpdate" :sizeSelection="grid.count"/>
    </div>
  </div>
</template>

<script>
import Controls from "../components/Controls.vue"
import { useStateStore } from '../store/stateStore';
import { mapStores } from 'pinia';

export default {
  data() {
    return {
        displayImg: false,
        imgSrc: '',
      canvasID: "mainCanvas",
      canvas: undefined,
      controlsWidth: "741px",
      ctx: undefined,
      grid: {
          array: [],
          playing: false,
          started: false,
          firstInit: false,
      },
    }
  },
  components: {
      Controls,
  },
  mounted() {
      this.gridCreate();
      this.canvas = document.getElementById(this.canvasID);
      this.ctx = this.canvas.getContext('2d');
      this.setCanvasSize();

      window.addEventListener("resize", this.setCanvasSize);

  },
  computed: {
      ...mapStores(useStateStore),
      canvasTop() {
          const _canvas = document.getElementById(this.canvasID);

          return _canvas.offsetTop;
      },
      canvasLeft() {
          const _canvas = document.getElementById(this.canvasID);

          return _canvas.offsetLeft;
      },
      numOfCells() {
          return this.stateStore.count * this.stateStore.count;
      }
  },
  methods: {
      setCanvasSize() {

          const _width = window.innerWidth
          const _height = window.innerHeight - this.canvasTop - 62

          if(_width < _height) {
            this.canvas.width = _width
            this.canvas.height = _width
          } else {
            this.canvas.width = _height
            this.canvas.height = _height
          }

          this.grid.gridSize = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width;

          this.controlsWidth = this.grid.gridSize + "px";

          // Starting coordinates of the grid.
          this.grid.left = 0
          this.grid.top = 0

          this.ctx.strokeStyle = "#3d3d29";
          this.ctx.strokeRect(
              this.grid.left,
              this.grid.top,
              this.grid.gridSize,
              this.grid.gridSize
          );
          
          this.gridInit();
      },
      gridCreate() {
        let _nextAlive = false

        if(this.stateStore.startingArray.length > 0) {
            this.gridRestore()
        } else {
            // console.log("creating new grid")
            // console.log("random grid: " + this.stateStore.random)
            this.grid.array = [];
            
            for (let i = 0; i < this.numOfCells; i++) {

                if(this.stateStore.randomOn) {
                    _nextAlive = Math.random() > 0.7 ? true : false
                }
                
                this.grid.array.push({
                    row: i%this.stateStore.count,
                    col: Math.floor(i/this.stateStore.count),
                    top: null,
                    left: null,
                    alive: false,
                    nextAlive: _nextAlive,
                    crowd: 0,
                });
            }
        }
      },
      gridInit() {
          // Determines the coordinates of each cell in the grid.

          this.grid.cellSize = this.grid.gridSize / this.stateStore.count;

          this.grid.array.forEach((cell, i) => {
              cell.top = this.grid.top + this.grid.cellSize * (cell.col);
              cell.left = this.grid.left + this.grid.cellSize * (cell.row);
          })

          if (!this.grid.firstInit) {
                  this.grid.firstInit = true;
              }

          this.gridUpdate();
      },
      gridSnapshot() {
        console.log("grid snapshot")
        this.stateStore.startingArray = JSON.stringify(this.grid.array)
      },
      gridRestore() {
        console.log("restoring grid")
        this.grid.array = JSON.parse(this.stateStore.startingArray)
      },
      gridUpdate() {
      // Turns cells "on" or "off" based on their .nextAlive property and then updates the .alive property to reflect current state.

          this.ctx.clearRect(
              this.grid.left,
              this.grid.top,
              this.grid.width,
              this.grid.height
          );

          this.grid.array.forEach((cell, i) => {

              if (cell.alive != cell.nextAlive || !this.grid.started) {
                  this.cellUpdate(cell, i);                
              }
          });

          setTimeout(() => { if(this.grid.playing) {this.lifeUpdate()}}, this.stateStore.speed*1000);

      },
      cellUpdate(cell, i) {
            // Fills the cell colour based on the cell.nextAlive attribute.
            if (cell.nextAlive) {
                this.ctx.fillStyle = "#adad85";
                this.ctx.fillRect(
                    cell.left,
                    cell.top,
                    this.grid.cellSize,
                    this.grid.cellSize
                );
            } else {
                this.ctx.fillStyle = "#f5f5f0";
                this.ctx.fillRect(
                    cell.left,
                    cell.top,
                    this.grid.cellSize,
                    this.grid.cellSize
                );
            }

            // Updates the cell.alive property to match updated state.
            cell.alive = cell.nextAlive;

            // draw the borders of the cell to prevent fading borders.
            this.ctx.strokeStyle = "#3d3d29";
            this.ctx.strokeRect(
                cell.left,
                cell.top,
                this.grid.cellSize,
                this.grid.cellSize
            );
        },
      lifeUpdate() {
          // updates cells .alive property based on the rules of the game.
          requestAnimationFrame(() => {
  
              this.grid.array.forEach((cell, i) => {
                  cell.crowd = this.crowdSize(cell, i);
  
                  if (cell.alive) {
                      if (cell.crowd < 2 || cell.crowd > 3) {
                          cell.nextAlive = false;
                      } else {
                          cell.nextAlive = true;
                      }
                  } else {
                      if (cell.crowd == 3) {
                          cell.nextAlive = true;
                      }
                  }
              });

              this.gridUpdate();
          });
      },
      crowdSize(cell, idx) {
          let crowdSize = 0;

          const neighbours = [];

          if (cell.row > 0) {neighbours.push(-1)};
          if (cell.col > 0) {neighbours.push(-this.stateStore.count)};
          if (cell.row > 0 && cell.col > 0) {neighbours.push(-(this.stateStore.count + 1))};
          if (cell.row < this.stateStore.count-1 && cell.col > 0) {neighbours.push(-(this.stateStore.count - 1))};
          if (cell.row < this.stateStore.count-1) {neighbours.push(1)};
          if (cell.row > 0 && cell.col < this.stateStore.count-1) {neighbours.push(this.stateStore.count - 1)};
          if (cell.col < this.stateStore.count-1) {neighbours.push(this.stateStore.count)};
          if (cell.row < this.stateStore.count-1 && cell.col < this.stateStore.count-1) {neighbours.push(this.stateStore.count + 1)};

          neighbours.forEach((neighbour) => {
              const thisIdx = idx + neighbour;
              
              if (this.grid.array[thisIdx].alive) {
                  crowdSize++;
              }
          })

          return crowdSize;
      }, 
      playPause() {
        if(!this.grid.started) {
            this.gridSnapshot()
            this.grid.started = true
        }

          this.grid.playing = !this.grid.playing;

          if (this.grid.playing) {
              this.lifeUpdate();
          }
      },
      toggleCell(e) {
          const clickx = e.x - this.grid.left - this.canvasLeft;
          const clicky = e.y - this.grid.top - this.canvasTop;

          const _col = Math.ceil(clickx / this.grid.cellSize) -1;
          const _row = Math.ceil(clicky / this.grid.cellSize) -1;

          if (_col >= 0 && _col < this.stateStore.count) {
              if (_row >= 0 && _row < this.stateStore.count) {
                  const _indx = _row*this.stateStore.count + _col;
      
                  this.grid.array[_indx].nextAlive = !this.grid.array[_indx].nextAlive;
      
                  this.cellUpdate(this.grid.array[_indx], _indx);
              }
          }
      },
      resetGrid() {
            this.grid.started = false;

            this.gridRestore()

          this.gridUpdate();
      },
      sizeUpdate(e) {
          this.stateStore.count = e;
          this.gridCreate();
          this.grid.firstInit = false;
          this.gridInit();
      }, 
      toggleRandom() {
          this.grid.firstInit = false;
          this.stateStore.startingArray = []

          this.gridCreate();
          this.gridInit();
      },
      createPNG() {
        this.stateStore.imgSrc = this.canvas.toDataURL('image/png')
      }
  }
}

</script>

<style>


</style>