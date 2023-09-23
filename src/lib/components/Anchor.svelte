<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { json } from "@sveltejs/kit";
  import { stringify } from "postcss";
  import { onMount } from "svelte";

  let id: number = 0;
  let anchor: HTMLElement;

  const rectCenter = (rect: DOMRect): [number, number] => {
    return [rect.left, rect.top];
  };

  onMount(() => {
    const rect = anchor.getBoundingClientRect();

    id = $BoardStore.cards[card].anchors.length;
    $BoardStore.cards[card].anchors[id] = {
      id: `${card},${id}`,
      type: type,
      offset: rectCenter(rect),
      connection: null,
    };

    function mousemove(e: MouseEvent) {
      const rect = anchor.getBoundingClientRect();
      if (e.buttons === 2) {
        $BoardStore.cards[card].anchors[id].offset = rectCenter(rect);
      }
    }

    addEventListener("mousemove", mousemove);

    return () => {
      removeEventListener("mousemove", mousemove);
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
  bind:this={anchor}
  on:mousedown={(e) => {
    if (e.buttons === 1) {
      $BoardStore.cards[card].anchors[id].offset = [e.clientX, e.clientY];
      $BoardStore.cards[card].anchors[id].connection = [card, NaN];
    }
  }}
  on:mousemove={(e) => {
    const connection = $BoardStore.cards[card].anchors[id].connection;
    if (connection && !isNaN(connection[1])) {
      $BoardStore.cards[card].anchors[id].offset = [e.clientX, e.clientY];
    }
  }}
  on:click={() => console.log(card, id)}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
