<script lang="ts">
  import BaseCard from "./BaseCard.svelte";
  const emptyDecision: { title: string } = { title: "" };
  let decisions: (typeof emptyDecision)[] = [emptyDecision, emptyDecision];
</script>

<main>
  <BaseCard title="Decision">
    {#each decisions as decision, i}
      <div>
        <p>{i + 1}. Decision:</p>
        <input bind:value={decision.title} placeholder="Title" type="text" />
      </div>
    {/each}
    <div>
      <button
        on:click={() => {
          decisions = [...decisions, emptyDecision];
        }}>+</button
      >
      {#if decisions.length > 2}
        <button
          on:click={() => {
            decisions = decisions.splice(1);
          }}>-</button
        >
      {/if}
    </div>
  </BaseCard>
</main>
