<script lang="ts">
  import { Anchor } from 'svelvet'
  import Node from './Node.svelte'

  export let position: { x: number; y: number }
  export let onRemove: () => void
</script>

<Node label="StepNode" {position} {onRemove}>
  <div class="flex flex-col text-center p-1">
    <section class="text-black resize-none">
      <h1 class="text-white">Decision</h1>
      <input title="Decision 1" placeholder="Decision 1" type="text" />
      <input title="Decision 2" placeholder="Decision 2" type="text" />
    </section>
    <div class="absolute m-0 left-0 top-1/2 -translate-y-1/2">
      <Anchor input direction="west" />
    </div>
    <div class="absolute m-0 right-0 top-1/4 -translate-y-1/4">
      <Anchor output direction="east" />
    </div>
    <div class="absolute m-0 right-0 top-3/4 -translate-y-3/4">
      <Anchor output direction="east" />
    </div>
  </div>
</Node>
