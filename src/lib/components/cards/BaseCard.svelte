<script lang="ts">
  import { onMount } from "svelte";
  import BoardStore from "$lib/stores/BoardStore";

  export let title: string;
  export let id: number;

  let card: HTMLElement;
  let isDragging: boolean;
  let deltaMouse: [number, number] = [0, 0];

  onMount(() => {
    addEventListener("mousemove", (e) => {
      if (isDragging) {
        $BoardStore.cards[id].offset[0] = e.clientX - deltaMouse[0];
        $BoardStore.cards[id].offset[1] = e.clientY - deltaMouse[1];

        card.style.left = `${$BoardStore.cards[id].offset[0]}px`;
        card.style.top = `${$BoardStore.cards[id].offset[1]}px`;
      }
    });

    addEventListener("mouseup", () => {
      isDragging = false;
    });
  });
</script>

<main
  bind:this={card}
  on:mousedown={(e) => {
    if (e.buttons === 2) {
      isDragging = true;
      deltaMouse = [
        e.clientX - $BoardStore.cards[id].offset[0],
        e.clientY - $BoardStore.cards[id].offset[1],
      ];
    }

    if (e.buttons === 4)
      id !== 0 ? ($BoardStore.cards[id].deleted = true) : null;
  }}
  class="absolute flex flex-col items-center w-72 h-fit overflow-hidden bg-neutral-200 border-4 border-green-500 rounded-3xl drop-shadow-2xl pb-3"
>
  <header class="h-fit w-full flex justify-center">
    <h1 class="text-lg">{title}</h1>
  </header>
  <div>
    <slot />
  </div>
</main>
