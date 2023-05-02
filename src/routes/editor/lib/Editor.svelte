<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { writable } from "svelte/store";
  import { Svelvet } from "svelvet";

  // COMPONENTS
  import Bar from "./Bar.svelte";

  //NODES
  import StartNode from "../../../lib/nodes/StartNode.svelte";
  import StepNode from "../../../lib/nodes/StepNode.svelte";
  import DecisionNode from "../../../lib/nodes/DecisionNode.svelte";
  import Layout from "../../+layout.svelte";

  const nodeMap: Record<string, typeof SvelteComponent> = {
    StepNode,
    DecisionNode,
  };

  const nodes = writable<{ node: typeof SvelteComponent; props: {} }[]>([
    {
      node: StartNode,
      props: {},
    },
  ]);

  function addNode(nodeName: string, props: {}) {
    const node = nodeMap[nodeName];
    nodes.update((currentNodes) => [...currentNodes, { node, props }]);
  }

  function removeNode(node: { node: typeof SvelteComponent; props: {} }) {
    nodes.update((currentNodes) => currentNodes.filter((n) => n !== node));
  }
</script>

<svelte:head>
  <title>Editor</title>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
  class="h-screen w-screen overflow-hidden cursor-grab"
  on:dragover={(event) => event.preventDefault()}
  on:drop={(event) => {
    const nodeName = event.dataTransfer?.getData("text/plain");
    if (nodeName != "" && nodeName) {
      addNode(nodeName, {
        position: { x: event.clientX, y: event.clientY },
      });
    }
  }}
>
  <Bar />
  <Svelvet theme="dark">
    <div class="active:cursor-grabbing">
      {#each $nodes as { node, props }}
        <div>
          <svelte:component
            this={node}
            {...props}
            onRemove={() => {
              removeNode({ node: node, props: props });
            }}
          />
        </div>
      {/each}
    </div>
  </Svelvet>
</main>

<svelte:body on:contextmenu={(e) => e.preventDefault()} />
