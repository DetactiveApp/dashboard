<script lang="ts">
  export let index: number;

  import BoardStore from "$lib/stores/BoardStore";
  import Anchor from "../Anchor.svelte";

  import BaseCard from "./BaseCard.svelte";
</script>

<main>
  <BaseCard title="Decision" id={index}>
    {#each $BoardStore.cards[index].data.titles as title, i}
      <p>{i + 1}. Decision:</p>
      <div class="flex justify-start items-center w-full -z-50">
        <input bind:value={title} placeholder="Title" type="text" />
        <Anchor type="OUTPUT" />
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
    <div class="absolute w-full h-full flex justify-start items-center -z-50">
      <div class="justify-start">
        <Anchor type="INPUT" />
      </div>
    </div>
  </BaseCard>
</main>
