<script lang="ts">
  export let index: number;

  import BoardStore from "$lib/stores/BoardStore";

  import Anchor from "../Anchor.svelte";
  import BaseCard from "./BaseCard.svelte";
</script>

<main>
  <BaseCard title="Start" id={0}>
    <div>
      <p>Story Title:</p>
      <input
        type="text"
        placeholder="Title"
        bind:value={$BoardStore.cards[index].data.title}
      />
    </div>
    <div>
      <p>Story Description:</p>
      <textarea
        placeholder="Description"
        bind:value={$BoardStore.cards[index].data.description}
      />
    </div>
    <div>
      <p>Active:</p>
      <input
        type="checkbox"
        bind:value={$BoardStore.cards[index].data.active}
      />
    </div>
    <div class="absolute w-full h-full flex justify-end items-center -z-50">
      <Anchor type="OUTPUT" cardId={index} />
    </div>
  </BaseCard>
</main>
