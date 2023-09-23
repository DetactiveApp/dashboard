<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let cardId: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  let anchorId: number = 0;
  let anchor: HTMLElement;

  const rectCenter = (): [number, number] => {
    const rect = anchor.getBoundingClientRect();
    const centerX = (rect.left + rect.right) * 0.5;
    const centerY = (rect.top + rect.bottom) * 0.5;
    return [centerX, centerY];
  };

  onMount(() => {
    anchorId = $BoardStore.cards[cardId].anchors.length;
    $BoardStore.cards[cardId].anchors[anchorId] = {
      id: `${cardId},${anchorId}`,
      type: type,
      offset: rectCenter(),
      connection: null,
    };

    addEventListener("mousemove", (e) => {
      $BoardStore.cards[cardId].anchors[anchorId].offset = rectCenter();
    });

    addEventListener("mouseup", (e) => {
      if (
        $BoardStore.cards[cardId].anchors[anchorId].connection === "ON_CONNECT"
      ) {
        $BoardStore.cards[cardId].anchors[anchorId].connection = null;
      }
    });
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
  bind:this={anchor}
  on:mousedown={(e) => {
    if (e.buttons === 1) {
      const connectionCardId = $BoardStore.cards.findIndex((card) =>
        card.anchors.find(
          (anchor) =>
            anchor.connection &&
            anchor.connection[0] === cardId &&
            anchor.connection[1] === anchorId
        )
      );

      if (connectionCardId !== -1) {
        const connectionAnchorId = $BoardStore.cards[
          connectionCardId
        ].anchors.findIndex(
          (anchor) =>
            anchor.connection &&
            anchor.connection[0] === cardId &&
            anchor.connection[1] === anchorId
        );

        $BoardStore.cards[connectionCardId].anchors[
          connectionAnchorId
        ].connection = null;
      }

      $BoardStore.cards[cardId].anchors[anchorId].connection = "ON_CONNECT";
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

      if (cardId === connectionCardId) {
        return;
      }

      $BoardStore.cards[cardId].anchors[anchorId].connection = [
        connectionCardId,
        connectionAnchorId,
      ];
    }
  }}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
