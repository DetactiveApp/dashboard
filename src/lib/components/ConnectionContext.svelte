<script lang="ts">
  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  $: innerWidth = 0;
  $: innerHeight = 0;

  let clientX: number = 0;
  let clientY: number = 0;

  onMount(() => {
    addEventListener("mousemove", (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="absolute pointer-events-none z-10">
  <svg width={innerWidth} height={innerHeight}>
    {#each $BoardStore.cards as card, cardId}
      {#each $BoardStore.cards[cardId].anchors as anchor, anchorId}
        {#if !$BoardStore.cards[cardId].deleted && anchor.connection}
          {#if anchor.connection === "ON_CONNECT"}
            <line
              x1={$BoardStore.cards[cardId].anchors[anchorId].offset[0]}
              y1={$BoardStore.cards[cardId].anchors[anchorId].offset[1]}
              x2={clientX}
              y2={clientY}
              class="stroke-green-500"
              style="stroke-width: 8;"
            />
          {:else}
            <line
              x1={$BoardStore.cards[cardId].anchors[anchorId].offset[0]}
              y1={$BoardStore.cards[cardId].anchors[anchorId].offset[1]}
              x2={$BoardStore.cards[anchor.connection[0]].anchors[
                anchor.connection[1]
              ].offset[0]}
              y2={$BoardStore.cards[anchor.connection[0]].anchors[
                anchor.connection[1]
              ].offset[1]}
              class="stroke-green-500"
              style="stroke-width: 8;"
            />
          {/if}
        {/if}
      {/each}
    {/each}
  </svg>
</main>
