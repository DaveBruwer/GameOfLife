<template>
    <canvas :id="canvasID" class="mainCanvas"></canvas>
</template>

<script>

export default {
    data() {
        return {
            canvas: undefined,
            ctx: undefined
        }
    },
    props: {
        canvasID: {
            type: String,
            required: true,
        }
    },
    methods: {
        setCanvasSize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight-200;
            
            this.ctx.fillStyle = "#f5f5f0";
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight-200);
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