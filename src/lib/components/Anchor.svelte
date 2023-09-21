<script lang="ts">
  export let type: "INPUT" | "OUTPUT";
  export let card: number;

  import BoardStore from "$lib/stores/BoardStore";
  import type { Anchor } from "$lib/types";
  import { onMount } from "svelte";

  onMount(() => {
    const id = $BoardStore.cards[card].anchors.length;
    $BoardStore.cards[card].anchors[id] = {
      id: id,
      type: "INPUT",
      offset: [0, 0],
      connection: null,
    };
  });
</script>

<main id="anchor">
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />
</main>
