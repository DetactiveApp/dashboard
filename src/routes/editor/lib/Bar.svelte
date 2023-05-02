<script lang="ts">
  import { version } from '$app/environment'

  const nodeTypes = ['StepNode', 'DecisionNode']
</script>

<main
  class="absolute w-1/6 h-screen m0 bg-stone-400 border-r-8 z-10 flex justify-center overflow-hidden flex-col text-center"
>
  <div>
    <h1 class="text-2xl mb-5">StoryStudio <span>{version}</span></h1>
  </div>
  <div class="w-full h-3/4 overflow-y-hidden">
    {#each nodeTypes as node}
      <div
        draggable={true}
        class=" bg-orange-400 hover:cursor-grab active:cursor-grabbing mb-1"
        on:dragstart={(event) => {
          event.dataTransfer?.setData('text/plain', node)
        }}
      >
        <h1>{node}</h1>
      </div>
    {/each}
  </div>
</main>
