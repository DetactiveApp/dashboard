<script lang="ts">
  export let index: number;

  import BoardStore from "$lib/stores/BoardStore";
  import Anchor from "../Anchor.svelte";

  import BaseCard from "./BaseCard.svelte";
</script>

<main>
  <BaseCard title="Decision" cardId={index}>
    <div class="absolute w-full h-full flex justify-start items-center -z-50">
      <Anchor type="INPUT" cardId={index} />
    </div>
    {#each $BoardStore.cards[index].data.titles as title, i}
      <p>{i + 1}. Decision:</p>
      <div class="flex justify-cemter items-center w-full -z-50">
        <input bind:value={title} placeholder="Title" type="text" />
        <div class="flex w-full justify-end">
          <Anchor type="OUTPUT" cardId={index} />
        </div>
      </div>
    {/each}
    <div>
      <button
        on:click={() => {
          $BoardStore.cards[index].data.titles = [
            ...$BoardStore.cards[index].data.titles,
            "",
          ];
        }}>+</button
      >
      {#if $BoardStore.cards[index].data.titles.length > 2}
        <button
          on:click={() => {
            $BoardStore.cards[index].data.titles =
              $BoardStore.cards[index].data.titles.splice(1);
          }}>-</button
        >
      {/if}
    </div>
  </BaseCard>
</main>
