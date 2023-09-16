<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
</script>

<main>
  <BaseCard title="Start">
    <div>
      <p>Story Title:</p>
      <input type="text" />
    </div>
    <div>
      <p>Story Description:</p>
      <textarea />
    </div>
    <div>
      <p>Active:</p>
      <input type="checkbox" />
    </div>
  </BaseCard>
</main>
