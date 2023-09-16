<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
  import PoiData from "$lib/assets/pois.json";

  let poiSelector: HTMLSelectElement;
</script>

<main>
  <BaseCard title="Step">
    <div>
      <p>Title:</p>
      <input type="text" />
    </div>
    <div>
      <p>Description:</p>
      <input type="text" />
    </div>
    <div>
      <p>Waypoint:</p>
      <select bind:this={poiSelector} name="Waypoints">
        {#each PoiData.pois as poi}
          <option value={poi}>{poi}</option>
        {/each}
      </select>
      {#if poiSelector && poiSelector.value !== "none"}
        <input type="checkbox" />
      {/if}
    </div>
  </BaseCard>
</main>
