<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  let id: number = 0;
  let anchor: HTMLElement;

  let anchorDownEvent: CustomEvent = new CustomEvent("anchordown", {});
  let anchorMoveEvent: CustomEvent = new CustomEvent("anchormove", {});
  let anchorUpEvent: CustomEvent = new CustomEvent("anchorup", {});

  onMount(() => {
    const rect = anchor.getBoundingClientRect();
    id = $BoardStore.cards[card].anchors.length;
    $BoardStore.cards[card].anchors[id] = {
      id: `${card},${id}`,
      type: type,
      offset: [rect.left, rect.top],
      connection: null,
    };

    anchorDownEvent = new CustomEvent("anchordown", {
      detail: {
        id: `${card},${id}`,
        offset: $BoardStore.cards[card].anchors[id].offset,
      },
    });

    anchorMoveEvent = new CustomEvent("anchormove", {
      detail: {
        clientX: 0,
        clientY: 0,
      },
    });

    anchorUpEvent = new CustomEvent("anchorup", {
      detail: {
        id: `${card},${id}`,
        offset: $BoardStore.cards[card].anchors[id].offset,
      },
    });

    function mousemove(e: MouseEvent) {
      if (e.buttons === 1) {
        const rect = anchor.getBoundingClientRect();
        $BoardStore.cards[card].anchors[id].offset = [rect.left, rect.top];
        anchorMoveEvent.detail.clientX = e.clientX;
        anchorMoveEvent.detail.clientY = e.clientY;
        dispatchEvent(anchorMoveEvent);
      }
    }

    addEventListener("mousemove", mousemove);

    return () => {
      removeEventListener("mousemove", mousemove);
    };
  });
</script>

<main
  bind:this={anchor}
  on:mousedown={(e) => {
    if (e.buttons === 1) {
      anchorDownEvent.detail.offset =
        $BoardStore.cards[card].anchors[id].offset;
      dispatchEvent(anchorDownEvent);
    }
  }}
  on:mouseup={(e) => {
    if (e.buttons === 0) {
      anchorUpEvent.detail.offset = $BoardStore.cards[card].anchors[id].offset;
      dispatchEvent(anchorUpEvent);
    }
  }}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
