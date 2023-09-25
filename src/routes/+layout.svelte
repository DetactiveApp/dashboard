<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.ico";
</script>

<svelte:head>
  <link rel="icon" type="image/svg" href={favicon} />
</svelte:head>
<slot />
