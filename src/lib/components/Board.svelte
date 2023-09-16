<script lang="ts">
  let board: HTMLElement;

  let isDragging = false;
  let initialMouseX: number;
  let initialMouseY: number;
  let initialCameraX: number;
  let initialCameraY: number;
  let boardPosition: [number, number] = [0, 0];
</script>

<main
  on:mousedown={(e) => {
    if (e.buttons == 2) {
      isDragging = true;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      initialCameraX = boardPosition[0];
      initialCameraY = boardPosition[1];
    }
  }}
  on:mousemove={(e) => {
    if (isDragging) {
      const deltaX = e.clientX - initialMouseX;
      const deltaY = e.clientY - initialMouseY;

      boardPosition[0] = initialCameraX + deltaX;
      boardPosition[1] = initialCameraY + deltaY;

      board.style.backgroundPositionX = `${boardPosition[0]}px`;
      board.style.backgroundPositionY = `${boardPosition[1]}px`;
    }
  }}
  on:mouseup={(e) => {
    if (e.button === 2) {
      isDragging = false;
    }
  }}
>
  <section bind:this={board}>
    <div
      style={`transform: translate(${boardPosition[0]}px, ${boardPosition[1]}px);`}
    >
      <slot />
    </div>
  </section>
</main>

<style>
  section {
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: #3b3b3b;
    background-image: url("$lib/assets/board/plus.svg");
    background-size: 4rem;
  }
</style>
