<script lang="ts">
  import { onMount } from "svelte";

  let contextMenu: HTMLElement;
  let onOpen: boolean = false;

  onMount(() => {
    addEventListener("contextmenu", (e) => {
      if (e.target === contextMenu.parentElement) {
        console.log("yo");
      }
    });
  });
</script>

<main bind:this={contextMenu}>
  {#if onOpen}{/if}
</main>
