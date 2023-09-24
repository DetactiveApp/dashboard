<script lang="ts">
  import { onMount } from "svelte";
  import BoardStore from "$lib/stores/BoardStore";

  export let title: string;
  export let cardId: number;

  let card: HTMLElement;
  let isDragging: boolean;
  let deltaMouse: [number, number] = [0, 0];

  onMount(() => {
    card.style.left = `${$BoardStore.cards[cardId].offset[0]}px`;
    card.style.top = `${$BoardStore.cards[cardId].offset[1]}px`;
    addEventListener("mousemove", (e) => {
      if (isDragging) {
        $BoardStore.cards[cardId].offset[0] = e.clientX - deltaMouse[0];
        $BoardStore.cards[cardId].offset[1] = e.clientY - deltaMouse[1];

        card.style.left = `${$BoardStore.cards[cardId].offset[0]}px`;
        card.style.top = `${$BoardStore.cards[cardId].offset[1]}px`;
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
    if (e.buttons === 1) {
      isDragging = true;
      deltaMouse = [
        e.clientX - $BoardStore.cards[cardId].offset[0],
        e.clientY - $BoardStore.cards[cardId].offset[1],
      ];
    }
  }}
  on:contextmenu={(e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    cardId !== 0 ? ($BoardStore.cards[cardId].deleted = true) : null;
  }}
  class="absolute flex flex-col items-center w-72 h-fit overflow-hidden bg-neutral-200 border-4 border-green-500 rounded-3xl drop-shadow-2xl pb-3"
>
  <header class="h-fit w-full flex justify-center">
    <h1 class="text-lg">{title}</h1>
  </header>
  <div
    on:mousedown={(e) => e.stopImmediatePropagation()}
    on:contextmenu={(e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
    }}
  >
    <slot />
  </div>
</main>
