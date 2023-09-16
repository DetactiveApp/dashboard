<script lang="ts">
  import Board from "$lib/components/Board.svelte";
  import Nav from "$lib/components/Nav.svelte";

  import StepCard from "$lib/components/cards/StepCard.svelte";
  import DecisionCard from "$lib/components/cards/DecisionCard.svelte";
  import StartCard from "$lib/components/cards/StartCard.svelte";
</script>

<main
  class="flex flex-col items-center justify-center overflow-hidden w-screen h-screen"
  on:contextmenu={(e) => {
    e.preventDefault();
  }}
>
  <Nav />
  <Board>
    <StartCard />
    <StepCard />
    <DecisionCard />
  </Board>
</main>
