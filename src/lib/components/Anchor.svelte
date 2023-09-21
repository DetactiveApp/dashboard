<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  let id: number = 0;
  let anchorDownEvent: CustomEvent = new CustomEvent("anchordown", {});
  let anchorMoveEvent: CustomEvent = new CustomEvent("anchormove", {});
  let anchorUpEvent: CustomEvent = new CustomEvent("anchorup", {});

  onMount(() => {
    id = $BoardStore.cards[card].anchors.length;
    $BoardStore.cards[card].anchors[id] = {
      id: id,
      type: "INPUT",
      offset: [0, 0],
      connection: null,
    };

    anchorDownEvent = new CustomEvent("anchordown", {
      detail: { id: id },
    });
  });
</script>

<main on:mousedown={() => dispatchEvent(anchorDownEvent)}>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
