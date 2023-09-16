<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
  import PoiData from "$lib/assets/pois.json";

  let mediaType: string = "NONE";
</script>

<main>
  <BaseCard title="Step">
    <div>
      <p>Title:</p>
      <input placeholder="Title" type="text" />
    </div>
    <div>
      <p>Description:</p>
      <textarea placeholder="Description" />
    </div>
    <div>
      <p>Media type:</p>
      <select bind:value={mediaType} name="Waypoints" class="mb-1">
        <option value="NONE">NONE</option>
        <option value="AUDIO">AUDIO</option>
        <option value="VIDEO">VIDEO</option>
      </select>
      <div>
        {#if mediaType !== "NONE"}
          <input placeholder="{mediaType} ASSET ID" type="text" />
        {/if}
      </div>
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
