<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
  import PoiData from "$lib/assets/pois.json";
</script>

<main>
  <BaseCard title="Step">
    <div>
      <p>Title:</p>
      <input type="text" />
    </div>
    <div>
      <p>Description:</p>
      <textarea />
    </div>
    <div>
      <p>Waypoint:</p>
      <select name="Waypoints">
        {#each PoiData.pois as poi}
          <option value={poi}>{poi}</option>
        {/each}
      </select>
    </div>
  </BaseCard>
</main>
