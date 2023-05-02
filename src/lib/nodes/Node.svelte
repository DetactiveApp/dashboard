<script lang="ts">
  import { Node } from 'svelvet'

  export let label: string
  export let position: { x: number; y: number }
  export let onRemove: () => void
</script>

<Node bgColor="darkorange" {label} {position} on:nodeClicked={onRemove}>
  <slot />
</Node>
