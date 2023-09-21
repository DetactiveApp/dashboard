<script lang="ts">
  import Board from "$lib/components/Board.svelte";
  import Nav from "$lib/components/Nav.svelte";

  import BoardStore from "$lib/stores/BoardStore";
  import type { NodeType } from "$lib/types";
  import type { SvelteComponent } from "svelte";

  import StepCard from "$lib/components/cards/StepCard.svelte";
  import DecisionCard from "$lib/components/cards/DecisionCard.svelte";
  import StartCard from "$lib/components/cards/StartCard.svelte";

  const cardMappings: Record<NodeType, typeof SvelteComponent> = {
    START: StartCard,
    STEP: StepCard,
    DECISION: DecisionCard,
  };
</script>

<svelte:head>
  <title>Detactive Storystudio</title>
</svelte:head>

<main
  class="flex flex-col items-center justify-center overflow-hidden w-screen h-screen"
  on:contextmenu={(e) => {
    e.preventDefault();
  }}
>
  <Nav />
  <Board>
    {#each $BoardStore.cards as card, i}
      {#if !card.deleted}
        <svelte:component this={cardMappings[card.type]} index={i} />
      {/if}
    {/each}
  </Board>
</main>
