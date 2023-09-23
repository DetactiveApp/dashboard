<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  let id: number = 0;
  let anchor: HTMLElement;

  const rectCenter = (): [number, number] => {
    const rect = anchor.getBoundingClientRect();
    return [rect.left, rect.top];
  };

  onMount(() => {
    id = $BoardStore.cards[card].anchors.length;
    $BoardStore.cards[card].anchors[id] = {
      id: `${card},${id}`,
      type: type,
      offset: rectCenter(),
      connection: null,
    };

    addEventListener("mousemove", (e) => {
      if (e.buttons === 2) {
        $BoardStore.cards[card].anchors[id].offset = rectCenter();
      }
    });

    addEventListener("mouseup", (e) => {
      if ($BoardStore.cards[card].anchors[id].connection === "ON_CONNECT") {
        $BoardStore.cards[card].anchors[id].connection = null;
      }
    });
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
  bind:this={anchor}
  on:mousedown={(e) => {
    if (e.buttons === 1) {
      $BoardStore.cards[card].anchors[id].offset = [e.clientX, e.clientY];
      $BoardStore.cards[card].anchors[id].connection = "ON_CONNECT";
    }
  }}
  on:mouseup={(e) => {
    if (e.buttons === 0) {
      const connectionCardId = $BoardStore.cards.findIndex((card) =>
        card.anchors.find((anchor) => anchor.connection === "ON_CONNECT")
      );
      const connectionAnchorId = $BoardStore.cards[
        connectionCardId
      ].anchors.findIndex((anchor) => anchor.connection === "ON_CONNECT");

      $BoardStore.cards[card].anchors[id].connection = [
        connectionCardId,
        connectionAnchorId,
      ];
    }
  }}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
