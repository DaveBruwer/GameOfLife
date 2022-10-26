<template>
    <canvas :id="canvasID" class="mainCanvas"></canvas>
</template>

<script>

export default {
    data() {
        return {
            canvas: undefined,
            ctx: undefined,
            gridArray: []
        }
    },
    props: {
        canvasID: {
            type: String,
            required: true,
        },
        gridSize: {
            type: Number,
            required: true,
        }
    },
    methods: {
        setCanvasSize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-130;
            
            this.ctx.fillStyle = "#f5f5f0";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.gridInit();

        },
        gridInit() {
            const cellWidth = this.canvas.width / this.gridSize;
            const cellHeight = this.canvas.height / this.gridSize;

            this.ctx.strokeStyle = "#3d3d29";

            let gridIndex = 0;

            this.gridArray = [];

            for (let i = 0; i < this.gridSize; i++ ) {
                for (let j = 0; j < this.gridSize; j++) {
                    this.gridArray.push({
                        startX: cellWidth * i,
                        startY: cellHeight * j,
                    });
                    this.ctx.strokeRect(
                        this.gridArray[gridIndex].startX,
                        this.gridArray[gridIndex].startY,
                        cellWidth,
                        cellHeight
                        );
                    gridIndex++;
                }
            }

            console.log(this.gridArray)
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