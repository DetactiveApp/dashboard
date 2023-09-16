<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
</script>

<main>
  <BaseCard title="Start">
    <div>
      <p>Story Title:</p>
      <input type="text" placeholder="Title" />
    </div>
    <div>
      <p>Story Description:</p>
      <textarea placeholder="Description" />
    </div>
    <div>
      <p>Active:</p>
      <input type="checkbox" />
    </div>
  </BaseCard>
</main>
