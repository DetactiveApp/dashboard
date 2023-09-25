<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "$lib/assets/branding/Detactive-Logo.svg";
  import BoardStore from "$lib/stores/BoardStore";
    import useApi from "$lib/hooks/useApi";


  function debugClick() {
    console.log("Board: ", $BoardStore);
  }
   
  let stories: {title: string, uuid: string}[] = [{title: "NEW", uuid: "-1"}]

  onMount(() => {
    useApi("");
  })
</script>

<nav
  class="flex text-2xl text-center justify-start items-center h-fit w-screen bg-white mt-9 z-50 border-green-500 border-b-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img on:click={debugClick} class="w-7 h-7" src={Logo} alt="Detactive Logo" />
  <select>
    <option>
      {#each stories as story}
        <select class="text-sm" value={story.uuid}>{story.title}</select>
      {/each}
    </option>
  </select>
</nav>
