import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import type { StreamedDecision, StreamedStep, StreamedStory, StreamedWaypoint } from "$lib/types";
import { get } from "svelte/store";

const save = async () => {
    // SAVE STORY
    let board = get(BoardStore);


    let story: StreamedStory = {
        uuid: board.cards[0].remote,
        title: board.cards[0].data.title,
        description: board.cards[0].data.description,
        active: board.cards[0].data.active,
        assetId: board.cards[0].data.assetId,
    }

    story = await (await useApi("/storystudio/stories/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(story)
    })).json()

    board.cards[0].data = { title: story.title, description: story.description, active: story.active, assetId: story.assetId };
    board.cards[0].remote = story.uuid;

    for (let card of board.cards) {
        if (!card.active && card.deleted) continue;
        if (card.type === "STEP") {
            const waypoint: StreamedWaypoint | null = card.data.waypoint.placeType === "none" ? null : { uuid: card.data.waypoint.remote ?? null, placeType: card.data.waypoint.placeType, placeOverride: card.data.waypoint.placeOverride ?? false };

            let step: StreamedStep = {
                uuid: card.remote,
                storyUuid: story.uuid!,
                title: card.data.title,
                description: card.data.description,
                mediaType: card.data.mediaType === "NONE" ? null : card.data.mediaType,
                assetId: card.data.assetId,
                waypoint: waypoint,
                decisions: []
            }

            step = await (await useApi("/storystudio/steps/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(step)
            })).json()

            card.data = {
                title: step.title,
                description: step.description,
                mediaType: step.mediaType ?? "NONE",
                assetId: step.assetId,
                waypoint: {
                    remote: step.waypoint?.uuid,
                    placeType: step.waypoint?.placeType ?? "none",
                    placeOverride: card.data.waypoint.placeOverride,
                }
            };
            card.remote = step.uuid;
        }

        if (card.type === "DECISION") {
            // TODO
        }
    }
}

export default save;