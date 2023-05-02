<script lang="ts">
  import Editor from './lib/Editor.svelte'

  let api_connection: boolean = true
</script>

{#if api_connection}
  <Editor />
{:else}
  <h1>Server Offline</h1>
{/if}
