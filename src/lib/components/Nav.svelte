<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "$lib/assets/branding/Detactive-Logo.svg";
  import BoardStore from "$lib/stores/BoardStore";
  import useApi from "$lib/hooks/useApi";
  import load from "$lib/data/load";
  import reset from "$lib/data/reset";

  let storySelector: HTMLSelectElement;
  let stories: { title: string; uuid: string }[] = [
    { title: "NEW", uuid: "Creates a new story." },
  ];

  const debugClick = () => {
    console.log("Board: ", $BoardStore);
  };

  const updateStories = async () => {
    let streamedStories = await (await useApi("/storystudio/list")).json();
    stories = stories.concat(streamedStories);
  };

  onMount(async () => {
    await updateStories();
  });
</script>

<nav
  class="flex text-xl text-center justify-start items-center h-fit w-screen bg-white mt-9 z-50 border-green-500 border-b-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img on:click={debugClick} class="w-7 h-7" src={Logo} alt="Detactive Logo" />
  <select
    bind:this={storySelector}
    on:change={() =>
      storySelector.value === stories[0].uuid
        ? reset()
        : load(storySelector.value)}
  >
    {#each stories as story}
      <option value={story.uuid} title={story.uuid}>{story.title} </option>
    {/each}
  </select>
</nav>
