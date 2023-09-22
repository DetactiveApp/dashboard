<script lang="ts">
  import { onMount } from "svelte";
  import BoardStore from "$lib/stores/BoardStore";

  $: innerWidth = 0;
  $: innerHeight = 0;

  let isDragging: boolean = false;
  let connections: {
    from: { cardId: number; anchorId: number; anchorOffset: [number, number] };
    to: {
      cardId: number;
      anchorId: number;
      anchorOffset: [number, number];
    } | null;
  }[] = [];

  onMount(() => {
    // Anchor Events
    addEventListener("anchordown", (e) => {
      isDragging = true;

      const detail = (e as CustomEvent).detail;
      const anchorId = +detail.id.substring(0, detail.id.indexOf(","));
      const cardId = +detail.id.substring(detail.id.indexOf(",") + 1);

      console.log(detail);

      connections.push({
        from: {
          cardId: cardId,
          anchorId: anchorId,
          anchorOffset: $BoardStore.cards[cardId].anchors[anchorId].offset,
        },
        to: null,
      });
    });

    addEventListener("anchormove", (e) => {});

    addEventListener("anchorup", (e) => {
      isDragging = false;
      console.log(connections);
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svg
  class="absolute pointer-events-none"
  width={innerWidth}
  height={innerHeight}
>
  {#each connections as connection}
    <line
      x1={connection.from.anchorOffset[0]}
      y1={connection.from.anchorOffset[1]}
      x2={1000}
      y2={1090}
      style="stroke:rgb(255,0,0);stroke-width:5"
    />
  {/each}
</svg>
