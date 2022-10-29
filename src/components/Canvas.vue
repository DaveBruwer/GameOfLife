<template>
    <canvas :id="canvasID" class="mainCanvas"></canvas>
</template>

<script>

export default {
    data() {
        return {
            canvas: undefined,
            ctx: undefined,
            grid: {},
            gridArray: [],
            gridWidth: undefined
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
            this.grid.cellSize = this.grid.gridSize / this.gridCount;

            this.ctx.strokeStyle = "#3d3d29";

            let gridIndex = 0;

            this.grid.array = [];

            for (let i = 0; i < this.gridCount; i++ ) {
                for (let j = 0; j < this.gridCount; j++) {
                    this.grid.array.push({
                        startX: this.grid.left + this.grid.cellSize * i,
                        startY: this.grid.top + this.grid.cellSize * j,
                    });
                    this.ctx.strokeRect(
                        this.grid.array[gridIndex].startX,
                        this.grid.array[gridIndex].startY,
                        this.grid.cellSize,
                        this.grid.cellSize
                        );
                    gridIndex++;
                }
            }
        }
    },
    mounted() {
        this.canvas = document.getElementById(this.canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();

        window.addEventListener("resize", this.setCanvasSize)


        
    }
}

</script>

<style>

</style>