<script lang="ts">
  import Anchor from "../Anchor.svelte";
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
    <div class="absolute w-full h-full flex justify-end items-center">
      <Anchor type="OUTPUT" />
    </div>
  </BaseCard>
</main>
