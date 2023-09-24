<script lang="ts">
  import { onMount } from "svelte";
  import { cardMappings } from "$lib/utils/cardMappings";
  import BoardStore from "$lib/stores/BoardStore";
  import { initDecisionCard, initStepCard } from "$lib/utils/initCards";
  import type { Card, NodeType } from "$lib/types";

  export let clientX: number;
  export let clientY: number;

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

  const titleCase = (str: string) => {
    return str.replace(/\w\S*/g, (t) => {
      return t.charAt(0).toUpperCase() + t.substring(1).toLowerCase();
    });
  };

  const createCard = (cardTitle: string) => {
    const initCard: Card = initCardMapping[cardTitle] || initStepCard;

    const newCard: Card = {
      ...JSON.parse(JSON.stringify(initCard)),
      offset: [clientX, clientY],
    };
    $BoardStore.cards.push(newCard);
  };
</script>

<main bind:this={menu} class="absolute overflow-hidden">
  <div
    class="flex flex-col w-32 h-36 bg-neutral-200 rounded-lg border-green-500 border-4"
  >
    {#each cardTitles as cardTitle}
      <div class="hover:bg-neutral-300 w-full">
        <button
          on:mouseup={() => {
            createCard(cardTitle);
          }}
        >
          {titleCase(cardTitle)}
        </button>
      </div>
    {/each}
  </div>
</main>
