<script lang="ts">
  import Board from "$lib/components/Board.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import Card from "$lib/components/cards/Card.svelte";
</script>

<main
  class="flex flex-col items-center justify-center overflow-hidden w-screen h-screen"
  on:contextmenu={(e) => {
    e.preventDefault();
  }}
>
  <Nav />
  <Board>
    <Card title="Test Card" />
  </Board>
</main>
