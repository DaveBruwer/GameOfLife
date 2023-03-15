<template>
  <p>
    <h2>About this project</h2>
    <p>
      This is my spin on <a target="_blank" href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Conway's Game of Life</a>.<br>
      I have added the ability to create an account, save grids that you have discovered, and browse the gallery of grids saved by other people and replay them.
    </p>
    <p>
      This project has served as a sandbox for me to practice various aspects of developing a comprehensive web application from scratch.
      This was my first time developing a full scale web app with [almost] all the features you would expect.
      I know it is nowhere near perfect in its current state, but I feel it has reached a point of diminishing returns, and therefore my time is better spent focussing on other projects with more potential.
      I may continue to develop this project further in the future just for fun.
    </p>
    <h2>About Game of Life</h2>
    <p>
      In a nutshell, the <a target="_blank" href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">Game of Life</a> is a game or simulation, where you create a starting grid of cells that are either alive (dark), or dead (light).<br>
      When you press play, the cells will turn on or off based on a few simple rules.<br>
      <ul>
        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ul>
      Following just these few rules some truly complex and amazing patterns have been discovered over the years.<br>
      Read more on <a target="_blank" href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life">wikipedia</a>.
    </p>
  </p>
</template>

<script>
export default {
  
}
</script>

<style>

p {
  margin: 1em;
}
  
</style>