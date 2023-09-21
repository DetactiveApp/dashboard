<script lang="ts">
  export let index: number;

  import BoardStore from "$lib/stores/BoardStore";

  import BaseCard from "./BaseCard.svelte";
  import PoiData from "$lib/assets/pois.json";
  import Anchor from "../Anchor.svelte";
</script>

<main>
  <BaseCard title="Step" id={index}>
    <div>
      <p>Title:</p>
      <input
        placeholder="Title"
        type="text"
        bind:value={$BoardStore.cards[index].data.title}
      />
    </div>
    <div>
      <p>Description:</p>
      <textarea
        placeholder="Description"
        bind:value={$BoardStore.cards[index].data.description}
      />
    </div>
    <div>
      <p>Media type:</p>
      <select
        name="Waypoints"
        class="mb-1"
        bind:value={$BoardStore.cards[index].data.mediaType}
      >
        <option value="NONE">NONE</option>
        <option value="AUDIO">AUDIO</option>
        <option value="VIDEO">VIDEO</option>
      </select>
      <div>
        {#if $BoardStore.cards[index].data.mediaType !== "NONE"}
          <input
            placeholder="{$BoardStore.cards[index].data.mediaType} ASSET ID"
            type="text"
            bind:value={$BoardStore.cards[index].data.assetId}
          />
        {/if}
      </div>
    </div>
    <div>
      <p>Waypoint:</p>
      <select
        name="Waypoints"
        bind:value={$BoardStore.cards[index].data.placeType}
      >
        {#each PoiData.pois as poi}
          <option value={poi}>{poi}</option>
        {/each}
      </select>
    </div>
    <div class="absolute w-full h-full flex justify-end items-center -z-50">
      <div class="justify-start">
        <Anchor type="OUTPUT" />
      </div>
    </div>
    <div class="absolute w-full h-full flex justify-start items-center -z-50">
      <div class="justify-start">
        <Anchor type="INPUT" />
      </div>
    </div>
  </BaseCard>
</main>
