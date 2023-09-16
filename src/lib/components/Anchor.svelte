<script lang="ts">
  export let type: "INPUT" | "OUTPUT";

  import { onMount } from "svelte";

  let isDragging: boolean = false;
  let isConnected: boolean = false;

  onMount(() => {
    addEventListener("mouseup", (e) => {
      isDragging = false;
    });
  });
</script>

<main
  on:mousedown={(e) => {
    if (e.buttons == 1) {
      isDragging = true;
    }
  }}
>
  <div class="w-5 h-5 bg-white rounded-full border-4 border-green-500" />

  {#if type == "OUTPUT" && (isDragging || isConnected)}
    <xml />
  {/if}
</main>
