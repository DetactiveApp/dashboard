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

  // LOAD SELECETED STORY
  const load = async (storyUuid: string) => {
    reset();

    const cardGap = 400;
    const initPosition = $BoardStore.cards[0].offset;

    const fillStore = async () => {
      let streamedStory = await (
        await useApi(`/storystudio/load/${storyUuid}`)
      ).json();

      // Load Story
      $BoardStore.cards[0].data.title = streamedStory.story.title;
      $BoardStore.cards[0].data.description = streamedStory.story.description;
      $BoardStore.cards[0].data.active = streamedStory.story.active;
      $BoardStore.cards[0].remote = streamedStory.story.uuid;

      // Load Cards
      for (const [index, step] of streamedStory.steps.entries()) {
        $BoardStore.cards.push({
          type: "STEP",
          data: {
            title: step.title,
            description: step.description,
            mediaType: step.mediaType ? step.mediaType : "NONE",
            assetId: step.assetId,
            waypoint: {
              placeType: step.waypoint ? step.waypoint.placeType : "none",
              placeOverride: step.waypoint
                ? step.waypoint.placeOverride
                : false,
            },
          },
          offset: [initPosition[0] + (index + 1) * cardGap, initPosition[1]],
          anchors: [],
          remote: step.uuid,
          deleted: false,
        });
      }

      return streamedStory;
    };

    const connectCards = async (streamedStory: any) => {
      for (const step of streamedStory.steps) {
        const cCardIndex = $BoardStore.cards.findIndex(
          (card) => card.remote === step.uuid && card.deleted === false
        );

        const cCardOutputAnchorIndex = $BoardStore.cards[
          cCardIndex
        ].anchors.findIndex((anchor) => anchor.type === "OUTPUT");

        for (const decision of step.decisions) {
          const nCardIndex = $BoardStore.cards.findIndex(
            (card) =>
              card.remote === decision.stepOutputUuid && card.deleted === false
          );

          if (nCardIndex === -1) continue;

          const nCardInputAchorIndex = $BoardStore.cards[
            nCardIndex
          ].anchors.findIndex((anchor) => anchor.type === "INPUT");

          if (nCardInputAchorIndex === -1) continue;

          $BoardStore.cards[cCardIndex].anchors[
            cCardOutputAnchorIndex
          ].connection = [nCardIndex, nCardInputAchorIndex];
        }
      }

      const firstConnectionCard = $BoardStore.cards.findIndex(
        (card) =>
          card.anchors.findIndex(
            (anchor) => anchor.type === "OUTPUT" && anchor.connection === null
          ) && card.deleted === false
      );

      $BoardStore.cards[0].anchors[0].connection = [firstConnectionCard, 0];
    };

    // Load store and render cards in order
    const streamedStory = await fillStore();
    // Load Connections/Decisions
    await connectCards(streamedStory);
  };

  // SAVE SELECETED STORY
  const save = async () => {};
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
      <option value={story.uuid} title={story.uuid}>{story.title}</option>
    {/each}
  </select>
</nav>
