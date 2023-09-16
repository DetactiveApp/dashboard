<script lang="ts">
  import { onMount } from "svelte";
  import { prevent_default } from "svelte/internal";

  export let title: string;

  let card: HTMLElement;
  let isDragging: boolean;
  let deltaCard: [number, number] = [0, 0];
  let deltaMouse: [number, number] = [0, 0];

  onMount(() => {
    addEventListener("mousemove", (e) => {
      if (isDragging) {
        deltaCard[0] = e.clientX - deltaMouse[0];
        deltaCard[1] = e.clientY - deltaMouse[1];

        card.style.left = `${deltaCard[0]}px`;
        card.style.top = `${deltaCard[1]}px`;
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
    e.preventDefault();
    if (e.buttons == 2) {
      isDragging = true;
      deltaMouse = [e.clientX - deltaCard[0], e.clientY - deltaCard[1]];
    }
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
