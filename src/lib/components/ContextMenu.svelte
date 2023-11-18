<script lang="ts">
  import { onMount } from "svelte";
  import { cardMappings } from "$lib/utils/cardMappings";
  import BoardStore from "$lib/stores/BoardStore";
  import { initDecisionCard, initStepCard } from "$lib/utils/initCards";
  import type { Card } from "$lib/types";
  import titleCase from "$lib/utils/titleCase";

  export let clientX: number;
  export let clientY: number;
  export let boardX: number;
  export let boardY: number;

  let menu: HTMLElement;
  let cardTitles: string[] = Object.keys(cardMappings).splice(1);

  onMount(() => {
    menu.style.left = `${clientX}px`;
    menu.style.top = `${clientY}px`;
  });

  const initCardMapping: Record<string, Card> = {
    START: initStepCard,
    STEP: initStepCard,
    DECISION: initDecisionCard,
  };

  const createCard = (cardTitle: string) => {
    const initCard: Card = initCardMapping[cardTitle] || initStepCard;

    const newCard: Card = {
      ...JSON.parse(JSON.stringify(initCard)),
      offset: [clientX - boardX, clientY - boardY],
    };
    $BoardStore.cards.push(newCard);
  };
</script>

<main bind:this={menu} class="absolute overflow-hidden">
  <div
    class="flex flex-col w-32 h-36 bg-surface rounded-lg border-primary border-4"
  >
    {#each cardTitles as cardTitle}
      <div class="hover:text-primary w-full">
        <button
          class="w-full h-full text-left"
          on:mousedown={(e) => {
            if (e.buttons === 1) createCard(cardTitle);
          }}
        >
          {titleCase(cardTitle)}
        </button>
      </div>
    {/each}
  </div>
</main>
