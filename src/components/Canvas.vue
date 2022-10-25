<template>
    <canvas :id="canvasID">{{canvasID}}</canvas>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    props: ['canvasID']
}

// console.log(this.canvasID);    

// const canvas = document.getElementById('gofCanvas');
// console.log(canvas);

// const ctx = canvas.getContext('2d');

// console.log(ctx);
</script>

<style>

</style>