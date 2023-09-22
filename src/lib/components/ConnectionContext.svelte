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
    };
  }[] = [];

  onMount(() => {
    // Anchor Events
    addEventListener("anchordown", (e) => {
      isDragging = true;

      const detail = (e as CustomEvent).detail;
      const cardId = +detail.id.substring(0, detail.id.indexOf(","));
      const anchorId = +detail.id.substring(detail.id.indexOf(",") + 1);

      connections.push({
        from: {
          cardId: cardId,
          anchorId: anchorId,
          anchorOffset: $BoardStore.cards[cardId].anchors[anchorId].offset,
        },
        to: {
          cardId: -1,
          anchorId: -1,
          anchorOffset: [0, 0],
        },
      });
    });

    addEventListener("anchormove", (e) => {
      const index = connections.findIndex(
        (connection) =>
          connection.to === null ||
          (connection.to?.cardId === -1 && connection.to?.anchorId === -1)
      );

      if (index !== -1) {
        const detail = (e as CustomEvent).detail;
        const cardId = -1;
        const anchorId = -1;

        connections[index].to = {
          cardId: cardId,
          anchorId: anchorId,
          anchorOffset: [detail.clientX, detail.clientY],
        };
      }
    });

    addEventListener("anchorup", (e) => {
      isDragging = false;
      const index = connections.findIndex(
        (connection) =>
          connection.to.cardId === -1 && connection.to.anchorId === -1
      );

      if (index !== -1) {
        const detail = (e as CustomEvent).detail;
        const cardId = +detail.id.substring(0, detail.id.indexOf(","));
        const anchorId = +detail.id.substring(detail.id.indexOf(",") + 1);

        connections[index].to = {
          cardId: cardId,
          anchorId: anchorId,
          anchorOffset: $BoardStore.cards[cardId].anchors[anchorId].offset,
        };
      }
    });

    addEventListener("mousemove", (e) => {
      if (e.buttons === 2) {
        for (let connection of connections) {
          $BoardStore.cards[connection.from.cardId].offset = [
            e.clientX,
            e.clientY,
          ];
          $BoardStore.cards[connection.to.cardId].offset = [
            e.clientX,
            e.clientY,
          ];
        }
      }
    });

    addEventListener("mouseup", (e) => {
      if (isDragging) {
        const index = connections.findIndex(
          (connection) =>
            connection.to.cardId === -1 && connection.to.anchorId === -1
        );

        if (index !== -1) {
          connections.splice(index, 1);
        }

        isDragging = false;
      }
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="absolute pointer-events-none z-50">
  <svg width={innerWidth} height={innerHeight}>
    {#each connections as connection}
      {#if !$BoardStore.cards[connection.from.cardId].deleted && $BoardStore.cards[connection.from.cardId].anchors[connection.from.anchorId]}
        <line
          x1={connection.from.anchorOffset[0]}
          y1={connection.from.anchorOffset[1]}
          x2={connection.to.anchorOffset[0]}
          y2={connection.to.anchorOffset[1]}
          style="stroke:rgb(255,0,0);stroke-width:5"
        />
      {/if}
    {/each}
  </svg>
</main>
