<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import { onMount } from "svelte";

  const id = $BoardStore.cards[card].anchors.length;

  onMount(() => {
    $BoardStore.cards[card].anchors[id] = {
      id: id,
      type: "INPUT",
      offset: [0, 0],
      connection: null,
    };
  });

  const anchorDownEvent: CustomEvent = new CustomEvent("anchordown", {
    detail: { id: id },
  });
</script>

<main on:mousedown={() => dispatchEvent(anchorDownEvent)}>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
