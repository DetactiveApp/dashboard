<script lang="ts">
  import Node from './Node.svelte'
  import { Anchor } from 'svelvet'

  export let position: { x: number; y: number }
  export let onRemove: () => void
</script>

<Node label="StepNode" {position} {onRemove}>
  <div class="flex flex-col text-center p-1">
    <section class="text-black resize-none">
      <h1 class="text-white">Step</h1>
      <input title="Step Title" placeholder="Step Title" type="text" />
      <input
        title="Step Description"
        placeholder="Step Description"
        type="text"
      />
    </section>
    <div class="absolute m-0 left-0 top-1/2 -translate-y-1/2">
      <Anchor input direction="west" />
    </div>
    <div class="absolute m-0 right-0 top-1/2 -translate-y-1/2">
      <Anchor output direction="east" />
    </div>
  </div>
</Node>
