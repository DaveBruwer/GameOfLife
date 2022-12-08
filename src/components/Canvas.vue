<template>
    <div align="center">
        <canvas :id="canvasID" class="mainCanvas" @click.prevent="toggleCell"></canvas>
        <div :style="{width: this.controlsWidth}">
            <Controls :resetGrid="resetGrid" :playPause="playPause" :lifeUpdate="lifeUpdate" @speedUpdate="speedUpdate" @sizeUpdate="sizeUpdate" :sizeSelection="grid.count"/>
        </div>
    </div>
</template>

<script>
import Controls from "./Controls.vue"

export default {
    data() {
        return {
            canvas: undefined,
            controlsWidth: "741px",
            ctx: undefined,
            delay: 0.5,
            grid: {
                array: [],
                playing: false,
                started: false,
                firstInit: false,
                count: 40,
                startingArray: [],
            },
        }
    },
    components: {
        Controls,
    },
    props: {
        canvasID: { // The canvas ID passed down from parent component.
            type: String,
            required: true,
        },
    },
    mounted() {
        this.gridCreate();
        this.canvas = document.getElementById(this.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();

        window.addEventListener("resize", this.setCanvasSize);

        // this.gridInit();
    },
    computed: {
        canvasTop() {
            const _canvas = document.getElementById(this.canvasID);

            return _canvas.offsetTop;
        },
        canvasLeft() {
            const _canvas = document.getElementById(this.canvasID);

            return _canvas.offsetLeft;
        },
        numOfCells() {
            return this.grid.count * this.grid.count;
        }
    },
    methods: {
        setCanvasSize() {

            requestAnimationFrame(()=> {
                this.canvas.width = window.innerWidth;
                // this.canvas.height = window.innerHeight- this.canvasTop; //manually compensating for the footer height for now.
                this.canvas.height = window.innerHeight - this.canvasTop - 62;

                this.grid.gridSize = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width;
    
                this.controlsWidth = this.grid.gridSize + "px";
                console.log(this.controlsWidth);

                // Starting coordinates of the grid.
                this.grid.left = 0 + (this.canvas.width - this.grid.gridSize)/2;
                this.grid.top = 0 + (this.canvas.height - this.grid.gridSize)/2;

                this.ctx.strokeStyle = "#3d3d29";
                this.ctx.strokeRect(
                    this.grid.left,
                    this.grid.top,
                    this.grid.gridSize,
                    this.grid.gridSize
                );
                
                this.gridInit();
            })
        },
        gridCreate() {

            this.grid.array = [];

            for (let i = 0; i < this.numOfCells; i++) {
                this.grid.array.push({
                    row: null,
                    col: null,
                    top: null,
                    left: null,
                    alive: false,
                    nextAlive: false,
                    crowd: 0,
                });
            }
        },
        gridInit() {
            // Determines the coordinates of each cell in the grid.

            this.grid.cellSize = this.grid.gridSize / this.grid.count;

            this.grid.array.forEach((cell, i) => {
                const _col = Math.floor(i/this.grid.count);
                const _row = i%this.grid.count;

                cell.row = _row;
                cell.col = _col;
                cell.top = this.grid.top + this.grid.cellSize * (_col);
                cell.left = this.grid.left + this.grid.cellSize * (_row);

                if(!this.grid.firstInit) {
                    cell.nextAlive = Math.random() > 0.5 ? true : false;
                }


            })
            
            if (!this.grid.firstInit) {
                    this.grid.firstInit = true;
                }

            this.gridUpdate();
        },
        gridSnapshot() {
            this.grid.startingArray = [];
            this.grid.array.forEach((cell) => {
                if (cell.nextAlive == true) {
                    this.grid.startingArray.push(true)
                } else {
                    this.grid.startingArray.push(false)
                }
            });
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

            setTimeout(() => { if(this.grid.playing) {this.lifeUpdate()}}, this.delay*1000);

        },
        cellUpdate(cell, i) {
            // Clear all pixels on cell.
            // this.ctx.clearRect(
            //     cell.left,
            //     cell.top,
            //     this.grid.cellSize,
            //     this.grid.cellSize
            // );

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
            
            // if (cell.alive) {
            //     this.ctx.strokeText("a", cell.left + 7, cell.top+15);
            // } else {
            //     this.ctx.strokeText("", cell.left + 7, cell.top+15);
            // }

            // this.ctx.strokeText(cell.crowd, cell.left + 7, cell.top+15);
            // this.ctx.strokeText(i, cell.left + 3, cell.top+22);
            // this.ctx.strokeText(`${cell.row}/${cell.col}`, cell.left + 1, cell.top+10);
        },
        lifeUpdate() {
            // updates cells .alive property based on the rules of the game.

            requestAnimationFrame(() => {
                if (!this.grid.started) {
                    this.gridSnapshot();
                    this.grid.started = true;
                }
    
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
            // const idx = cell.col + cell.row*this.grid.count;

            // const neighbours = [-26, -25, -24, -1, 1, 24, 25, 26];
            const neighbours = [];

            if (cell.row > 0) {neighbours.push(-1)};
            if (cell.col > 0) {neighbours.push(-25)};
            if (cell.row > 0 && cell.col > 0) {neighbours.push(-26)};
            if (cell.row < this.grid.count-1 && cell.col > 0) {neighbours.push(-24)};
            if (cell.row < this.grid.count-1) {neighbours.push(1)};
            if (cell.row > 0 && cell.col < this.grid.count-1) {neighbours.push(24)};
            if (cell.col < this.grid.count-1) {neighbours.push(25)};
            if (cell.row < this.grid.count-1 && cell.col < this.grid.count-1) {neighbours.push(26)};

            // console.log(cell.row);
            // console.log(cell.col);

            neighbours.forEach((neighbour) => {
                // console.log(neighbours);
                // console.log(neighbour);
                const thisIdx = idx + neighbour;
                // console.log(`${idx} : ${thisIdx}`);
                
                if (this.grid.array[thisIdx].alive) {
                    crowdSize++;
                }
            })

            return crowdSize;
        }, 
        playPause() {

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

            if (_col >= 0 && _col < this.grid.count) {
                if (_row >= 0 && _row < this.grid.count) {
                    const _indx = _row*this.grid.count + _col;
        
                    this.grid.array[_indx].nextAlive = !this.grid.array[_indx].nextAlive;
        
                    this.cellUpdate(this.grid.array[_indx], _indx);
                }
            }
        },
        resetGrid() {
            this.grid.started = false;

            this.grid.startingArray.forEach((status, i) => {
                this.grid.array[i].nextAlive = status;
            })

            this.gridUpdate();
        },
        speedUpdate(e) {
            this.delay = e;
        },
        sizeUpdate(e) {
            this.grid.count = e;
            this.gridCreate();
            this.grid.firstInit = false;
            this.gridInit();
        }
    }
}

</script>

<style>

</style>