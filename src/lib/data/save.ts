import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import type { StreamedDecision, StreamedStep, StreamedStory, StreamedWaypoint } from "$lib/types";
import { get } from "svelte/store";

const save = async () => {
    // SAVE STORY
    let storyUuid: string | null;
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
    board.cards[0].storyRemote = story.uuid;
    board.cards[0].remote = null;
    storyUuid = story.uuid;

    // SAVE CARDS
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
    }

    // SAVE ALL DECISIONS
    BoardStore.set(board);
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

            for (const anchor of card.anchors) {
                if (anchor.type === "OUTPUT" && anchor.connection && step.uuid && anchor.connection[0] !== 0) {
                    const connectedCard = board.cards[anchor.connection[0] as number];
                    if (connectedCard.type === "DECISION") {
                        for (const nextAnchor of connectedCard.anchors) {
                            if (nextAnchor.type === "OUTPUT" && nextAnchor.connection && nextAnchor.connection[0] !== 0) {
                                const decision: StreamedDecision = {
                                    uuid: connectedCard.remote,
                                    title: connectedCard.data.titles[nextAnchor.id[1] - 1],
                                    stepInputUuid: step.uuid,
                                    stepOutputUuid: board.cards[nextAnchor.connection[0] as number].remote ?? null,
                                }
                                console.log(decision);
                                step.decisions.push(decision);
                            }
                        }
                    } else {
                        const decision: StreamedDecision = {
                            uuid: anchor.remote,
                            title: card.data.title,
                            stepInputUuid: step.uuid,
                            stepOutputUuid: board.cards[anchor.connection[0] as number].remote ?? null,
                        }
                        step.decisions.push(decision);
                    }
                }
            }

            await (await useApi("/storystudio/steps/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(step)
            })).json()
        }
    }

    return storyUuid;
}

export default save;