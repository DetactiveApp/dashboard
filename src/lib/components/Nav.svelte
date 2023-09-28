<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "$lib/assets/branding/Detactive-Logo.svg";
  import BoardStore, { initBoardState } from "$lib/stores/BoardStore";
  import useApi from "$lib/hooks/useApi";
  import { initStartCard } from "$lib/utils/initCards";

  let storySelector: HTMLSelectElement;
  let stories: { title: string; uuid: string }[] = [
    { title: "NEW", uuid: "Creates a new story." },
  ];

  const debugClick = () => {
    console.log("Board: ", $BoardStore);
  };

  const updateStories = async () => {
    let streamedStories: { title: string; uuid: string }[] = await (
      await useApi("/storystudio/list")
    ).json();
    stories = stories.concat(streamedStories);
  };

  onMount(async () => {
    await updateStories();
  });

  const reset = () => {
    // Soft delete
    for (let card of $BoardStore.cards) {
      if (card.type === "START") continue;
      card.deleted = true;
    }

    $BoardStore.cards[0].data = JSON.parse(JSON.stringify(initStartCard)).data;
    $BoardStore.cards[0].anchors.forEach(
      (anchor) => (anchor.connection = null)
    );
  };

  const load = async (storyUuid: string) => {
    reset();

    let streamedStory = await (
      await useApi(`/storystudio/load/${storyUuid}`)
    ).json();

    // Load Story
    $BoardStore.cards[0].data.title = streamedStory.story.title;
    $BoardStore.cards[0].data.description = streamedStory.story.description;
    $BoardStore.cards[0].data.active = streamedStory.story.active;

    // Load Cards
  };
</script>

<nav
  class="flex text-xl text-center justify-start items-center h-fit w-screen bg-white mt-9 z-50 border-green-500 border-b-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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
