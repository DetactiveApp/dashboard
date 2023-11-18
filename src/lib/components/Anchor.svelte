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
      id: [cardId, anchorId],
      type: type,
      offset: rectCenter(),
      connection: null,
      remote: null,
    };

    const mousemove = (e: MouseEvent) => {
      $BoardStore.cards[cardId].anchors[anchorId].offset = rectCenter();
    };
    addEventListener("mousemove", mousemove);

    addEventListener("mouseup", (e) => {
      if (
        $BoardStore.cards[cardId].anchors[anchorId].connection === "ON_CONNECT"
      ) {
        $BoardStore.cards[cardId].anchors[anchorId].connection = null;
      }
    });

    return () => {
      removeEventListener("mousemove", mousemove);

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
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
  bind:this={anchor}
  on:mousedown={(e) => {
    e.stopImmediatePropagation();
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
      let connectionCardId = $BoardStore.cards.findIndex((card) =>
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

      connectionCardId = $BoardStore.cards.findIndex((card) =>
        card.anchors.find((anchor) => anchor.connection === "ON_CONNECT")
      );

      const connectionAnchorId = $BoardStore.cards[
        connectionCardId
      ].anchors.findIndex(
        (anchor) => anchor.connection && anchor.connection === "ON_CONNECT"
      );

      if (cardId === connectionCardId) {
        $BoardStore.cards[cardId].anchors[anchorId].connection = null;
        $BoardStore.cards[connectionCardId].anchors[
          connectionAnchorId
        ].connection = null;
        return;
      }

      if (
        $BoardStore.cards[connectionCardId].anchors[connectionAnchorId].type ===
        $BoardStore.cards[cardId].anchors[anchorId].type
      ) {
        $BoardStore.cards[connectionCardId].anchors[
          connectionAnchorId
        ].connection = null;
        return;
      }

      $BoardStore.cards[connectionCardId].anchors[
        connectionAnchorId
      ].connection = [cardId, anchorId];

      $BoardStore.cards[cardId].anchors[anchorId].connection = [
        connectionCardId,
        connectionAnchorId,
      ];
    }
  }}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-primary" />
</main>
