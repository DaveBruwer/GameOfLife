<template>
    <canvas :id="canvasID" class="mainCanvas"></canvas>
    <Controls :playPause="playPause" :lifeUpdate="lifeUpdate" />
</template>

<script>
import Controls from "./Controls.vue"

export default {
    data() {
        return {
            canvas: undefined,
            ctx: undefined,
            grid: {
                array: [],
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
        gridCount: { // Determines the size of the grid, aka the number of squares in a row.
            type: Number,
            required: true,
        },
        delay: { // Delay time in seconds between grid updates.
            type: Number,
            default: 1,
        }
    },
    mounted() {
        for (let i = 0; i < this.gridCount*this.gridCount; i++) {
            this.grid.array.push({
                top: 0,
                left: 0,
                alive: false,
                nextAlive: Math.random() > 0.5 ? true : false,
                crowd: 0,

            });
        }

        this.canvas = document.getElementById(this.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();

        this.grid.playing = false;

        window.addEventListener("resize", this.setCanvasSize);
    },
    methods: {
        setCanvasSize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-120; //manually compensating for the footer height for now.
            
            this.grid.gridSize = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width;

            // Starting coordinates of the grid.
            this.grid.left = 0 + (this.canvas.width - this.grid.gridSize)/2;
            this.grid.top = 0 + (this.canvas.height - this.grid.gridSize)/2;

            this.gridInit();
        },
        gridInit() {
        // Determines the coordinates of each cell in the grid.
            this.grid.cellSize = this.grid.gridSize / Math.sqrt(this.grid.array.length);

            this.grid.array.forEach((cell, i) => {
                cell.row = i%Math.sqrt(this.grid.array.length);
                cell.col = Math.floor(i/Math.sqrt(this.grid.array.length));
                
                cell.left = this.grid.left + this.grid.cellSize * (cell.row);
                cell.top = this.grid.top + this.grid.cellSize * (cell.col);

            });
            
            this.gridUpdate();
        },
        gridUpdate() {
        // Turns cells "on" or "off" based on their .nextAlive property and then updates the .alive property to reflect current state.

            this.grid.array.forEach((cell, i) => {

                // Clear all pixels on cell.
                this.ctx.clearRect(
                    cell.left,
                    cell.top,
                    this.grid.cellSize,
                    this.grid.cellSize
                );

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

                // draw the borders of each cell to prevent fading borders.
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

            });

            setTimeout(() => { if(this.grid.playing) {this.lifeUpdate()}}, this.delay*1000);

        },
        lifeUpdate() {
            // updates cells .alive property based on the rules of the game.

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
            requestAnimationFrame(this.gridUpdate);
        },
        crowdSize(cell, idx) {
            let crowdSize = 0;
            // const idx = cell.col + cell.row*this.gridCount;

            // const neighbours = [-26, -25, -24, -1, 1, 24, 25, 26];
            const neighbours = [];

            if (cell.row > 0) {neighbours.push(-1)};
            if (cell.col > 0) {neighbours.push(-25)};
            if (cell.row > 0 && cell.col > 0) {neighbours.push(-26)};
            if (cell.row < this.gridCount-1 && cell.col > 0) {neighbours.push(-24)};
            if (cell.row < this.gridCount-1) {neighbours.push(1)};
            if (cell.row > 0 && cell.col < this.gridCount-1) {neighbours.push(24)};
            if (cell.col < this.gridCount-1) {neighbours.push(25)};
            if (cell.row < this.gridCount-1 && cell.col < this.gridCount-1) {neighbours.push(26)};

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

            // for (let i = -1; i < 2; i++) {
            //     for (let j = -1; j < 2; j++) {
            //         const thisCol = cell.col + j;
            //         const thisRow = cell.row + i;
            //         if (thisCol >= 0 && thisCol < this.gridCount) {
            //             if (thisRow >= 0 && thisRow < this.gridCount) {
            //                 if (thisRow != cell.row || thisCol != cell.col) {
            //                     const thisIdx = thisCol + thisRow*this.gridCount;
            //                     if (this.grid.array[thisIdx].alive) {
            //                         crowdSize++
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
            return crowdSize;
        }, 
        playPause() {
            this.grid.playing = !this.grid.playing;

            if (this.grid.playing) {
                this.lifeUpdate();
            }
        }
    }
}

</script>

<style>

</style>