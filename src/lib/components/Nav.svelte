<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "$lib/assets/branding/Detactive-Logo.svg";
  import BoardStore from "$lib/stores/BoardStore";
  import useApi from "$lib/hooks/useApi";

  import load from "$lib/data/load";
  import reset from "$lib/data/reset";
  import save from "$lib/data/save";
  import remove from "$lib/data/remove";

  let storySelector: HTMLSelectElement;
  let stories: { title: string; uuid: string }[] = [];

  const debugClick = () => {
    console.log("Board: ", $BoardStore);
  };

  const updateStories = async () => {
    let streamedStories: { title: string; uuid: string }[] = await (
      await useApi("/storystudio/list/stories")
    ).json();
    stories = [{ title: "NEW STORY", uuid: "Creates a new story." }];
    stories = stories.concat(streamedStories);
  };

  const saveStory = async () => {
    let storyUuid = await save();
    await updateStories();
    storyUuid ? await load(storyUuid) : null;
    storySelector.value = storyUuid ?? stories[0].uuid;
  };

  onMount(async () => {
    await updateStories();

    addEventListener("keydown", async (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        await saveStory();
      }
    });
  });
</script>

<nav
  class="flex text-xl text-center justify-start items-center h-fit w-screen bg-white mt-9 z-50 border-green-500 border-b-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="flex flex-row justify-center items-center gap-10">
    <img
      on:click={debugClick}
      class="w-7 h-7"
      src={Logo}
      alt="Detactive Logo"
    />
    <select
      bind:this={storySelector}
      on:change={async () => {
        storySelector.value === stories[0].uuid
          ? await reset()
          : await load(storySelector.value);
      }}
    >
      {#each stories as story}
        <option value={story.uuid} title={story.uuid}>{story.title}</option>
      {/each}
    </select>

    <button
      class="ml-1 hover:bg-green-500 hover:text-white rounded-md"
      on:click={async () => {
        await saveStory();
      }}>SAVE STORY</button
    >

    <button
      class="ml-1 hover:bg-red-500 hover:text-white rounded-md"
      on:click={async () => {
        await remove();
        await reset();
        await updateStories();
      }}>REMOVE STORY</button
    >
  </div>
</nav>
