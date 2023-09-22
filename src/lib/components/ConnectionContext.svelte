<script lang="ts">
  import { onMount } from "svelte";
  import BoardStore from "$lib/stores/BoardStore";

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
    });
  });
</script>

<main class="w-full h-full">
  {#each connections as connection}
    <svg />
  {/each}
</main>
