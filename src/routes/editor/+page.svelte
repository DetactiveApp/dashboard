<script lang="ts">
  import Board from "$lib/components/Board.svelte";
  import Nav from "$lib/components/Nav.svelte";

  import BoardStore from "$lib/stores/BoardStore";
  import { cardMappings } from "$lib/utils/cardMappings";
</script>

<svelte:head>
  <title>Detactive Storystudio</title>
</svelte:head>

{#if true}
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
{/if}
