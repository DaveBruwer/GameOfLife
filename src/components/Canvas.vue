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
        canvasID: {
            type: String,
            required: true,
        },
        gridCount: {
            type: Number,
            required: true,
        }
    },
    methods: {
        setCanvasSize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-120; //manually compensating for the footer height for now.
            
            this.grid.gridSize = this.canvas.width > this.canvas.height ? this.canvas.height : this.canvas.width;
            
            this.grid.left = 0 + (this.canvas.width - this.grid.gridSize)/2;
            this.grid.top = 0 + (this.canvas.height - this.grid.gridSize)/2;
            

            this.ctx.fillStyle = "#f5f5f0";
            this.ctx.fillRect(this.grid.left, this.grid.top, this.grid.gridSize, this.grid.gridSize);

            this.gridInit();

        },
        gridInit() {
            this.grid.cellSize = this.grid.gridSize / Math.sqrt(this.grid.array.length);

            this.ctx.strokeStyle = "#3d3d29";

            this.grid.array.forEach((cell, i) => {
                cell.row = i%Math.sqrt(this.grid.array.length);
                cell.col = Math.floor(i/Math.sqrt(this.grid.array.length));

                cell.left = this.grid.left + this.grid.cellSize * (cell.row);
                cell.top = this.grid.top + this.grid.cellSize * (cell.col);
                
                this.ctx.strokeRect(
                    cell.left,
                    cell.top,
                    this.grid.cellSize,
                    this.grid.cellSize
                );
                    
                if (cell.row === cell.col) {
                    this.ctx.fillStyle = "#adad85";
                    this.ctx.fillRect(
                        cell.left,
                        cell.top,
                        this.grid.cellSize,
                        this.grid.cellSize
                    );
                    this.grid.array[i].alive = true;
                }
                // console.log(this.grid.array);
            });
            
            this.grid.array.forEach((cell, i) => {
                this.crowdSize(cell);
            })
                        
            // this.gridUpdate();

        },
        gridUpdate() {
            // Turns cells "on" or "off" based on their .alive property.
            for (let cell of this.grid.array) {
                if (cell.alive) {
                    this.ctx.fillStyle = "#adad85";
                    this.ctx.fillRect(
                        cell.left,
                        cell.top,
                        this.grid.cellSize,
                        this.grid.cellSize
                    );
                }
            }
        },
        lifeUpdate() {
            // updates cells .alive property based on the rules of the game.
            for(let cell of this.grid.array) {
                console.log(this.grid.array);
                this.crowdSize(cell);
            }
        },
        crowdSize(cell) {
            let crowdSize = 0;
            const idx = cell.col + cell.row*5;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    const thisCol = cell.col + j;
                    const thisRow = cell.row + i;
                    console.log(`cell row: ${cell.row}, cell col: ${cell.col}`);
                    console.log(`this row: ${thisRow}, this col: ${thisCol}`);
                    if (thisCol >= 0 && thisCol < 5) {
                        if (thisRow >= 0 && thisRow < 5) {
                            console.log(thisRow != cell.row || thisCol != cell.col);
                            if (thisRow != cell.row || thisCol != cell.col) {
                                const thisIdx = thisCol + thisRow*5;
                                console.log(thisIdx);
                                console.log(this.grid.array[thisIdx].alive);
                                console.log(this.grid.array[6].alive);
                                console.log(this.grid.array[6]);
                                console.log(this.grid.array[6].target);
                                if (this.grid.array[thisIdx].alive) {
                                    crowdSize++
                                    console.log("crowdSize: " + crowdSize);
                                }
                            }
                        }
                    }
                }
            }
            return crowdSize;
        },
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

        window.addEventListener("resize", this.setCanvasSize)
        
    }
}

</script>

<style>

</style>