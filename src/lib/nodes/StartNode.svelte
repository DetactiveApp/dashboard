<script lang="ts">
  import Node from './Node.svelte'
  import { Anchor } from 'svelvet'

  export let onRemove: () => void

  let title = ''
  let description = ''
</script>

<Node label="StepNode" position={{ x: 500, y: 350 }} onRemove={() => {}}>
  <div class="flex flex-col text-center p-1">
    <section class="text-black resize-none">
      <h1 class="text-white">Start</h1>
      <input
        bind:value={title}
        title="Story Title"
        placeholder="Story Title"
        type="text"
      />
      <input
        bind:value={description}
        title="Story Description"
        placeholder="Story Description"
        type="text"
        height="200"
      />
    </section>
    <div class="absolute m-0 right-0 top-1/2 -translate-y-1/2">
      <Anchor output direction="east" />
    </div>
  </div>
</Node>
