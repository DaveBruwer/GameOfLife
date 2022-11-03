<template>
    <canvas :id="canvasID" class="mainCanvas"></canvas>
</template>

<script>

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
            });
        }

        this.canvas = document.getElementById(this.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();

        window.addEventListener("resize", this.setCanvasSize);

        this.gridUpdate();
        
    },
    methods: {
        setCanvasSize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-120; //manually compensating for the footer height for now.
            
            this.grid.gridSize = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width;

            // Starting coordinates of the grid.
            this.grid.left = 0 + (this.canvas.width - this.grid.gridSize)/2;
            this.grid.top = 0 + (this.canvas.height - this.grid.gridSize)/2;

        },
        gridInit() {
        // Determines the coordinates of each cell in the grid.
            this.grid.cellSize = this.grid.gridSize / Math.sqrt(this.grid.array.length);

            
            this.grid.array.forEach((cell, i) => {
                cell.row = i%Math.sqrt(this.grid.array.length);
                cell.col = Math.floor(i/Math.sqrt(this.grid.array.length));
                
                cell.left = this.grid.left + this.grid.cellSize * (cell.row);
                cell.top = this.grid.top + this.grid.cellSize * (cell.col);

                // Randomly turns cells on. Will take this out later.
                if (this.grid.init) {
                    if (Math.random() > 0.5) {
                        this.grid.array[i].nextAlive = true;
                    }
                    this.grid.init = true;
                }
            });
        },
        gridUpdate() {
        // Turns cells "on" or "off" based on their .nextAlive property and then updates the .alive property to reflect current state.

            // Initialize the grid if not yet done.
            this.gridInit();

            for (let cell of this.grid.array) {

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
            }

            setTimeout(this.lifeUpdate, this.delay*1000);
        },
        lifeUpdate() {
            // updates cells .alive property based on the rules of the game.
            for(let cell of this.grid.array) {
                const crowd = this.crowdSize(cell);

                if (cell.alive) {
                    if (crowd < 2 || crowd > 3) {
                        cell.nextAlive = false;
                    } else {
                        cell.nextAlive = true;
                    }
                } else {
                    if (crowd == 3) {
                        cell.nextAlive = true;
                    }
                }
            }
            requestAnimationFrame(this.gridUpdate);
        },
        crowdSize(cell) {
            let crowdSize = 0;
            const idx = cell.col + cell.row*this.gridCount;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const thisCol = cell.col + j;
                    const thisRow = cell.row + i;
                    if (thisCol >= 0 && thisCol < this.gridCount) {
                        if (thisRow >= 0 && thisRow < this.gridCount) {
                            if (thisRow != cell.row || thisCol != cell.col) {
                                const thisIdx = thisCol + thisRow*this.gridCount;
                                if (this.grid.array[thisIdx].alive) {
                                    crowdSize++
                                }
                            }
                        }
                    }
                }
            }
            return crowdSize;
        }
    }
}

</script>

<style>

</style>