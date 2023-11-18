import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import type { StreamedDecision, StreamedStep, StreamedStory, StreamedWaypoint } from "$lib/types";
import titleCase from "$lib/utils/titleCase";
import { get } from "svelte/store";

const save = async () => {
    // SAVE STORY
    let board = get(BoardStore);

    let connectedCards: number = 0;
    for (let card of board.cards) {
        if (card.active && !card.deleted) {
            for (let anchor of card.anchors) {
                if (anchor.type === "INPUT" && anchor.connection === null) {
                    return alert("Please connect all anchors before saving.");
                }
                if (anchor.connection && anchor.type == "OUTPUT") connectedCards++;
            }
        }
    }

    if (board.cards[0].anchors[0].connection?.[0] && board.cards[board.cards[0].anchors[0].connection?.[0] as number] && board.cards[board.cards[0].anchors[0].connection?.[0] as number].type !== "STEP") {
        return alert("The first card of a story must be a step.");
    }

    if (board.cards[0].data.active) {
        if (connectedCards < 2) {
            return alert("A story needs a minimun of 2 connected steps to be playable (active).");
        }

        if (board.cards[0].data.assetId === "") {
            return alert("The story needs a background image to be playable (active).");
        }
    }

    let story: StreamedStory = {
        uuid: board.cards[0].remote,
        title: board.cards[0].data.title,
        description: board.cards[0].data.description,
        active: board.cards[0].data.active,
        assetId: board.cards[0].data.assetId,
    };

    story = await (await useApi("/storystudio/stories/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(story),
    })).json();

    board.cards[0].data = { title: story.title, description: story.description, active: story.active, assetId: story.assetId };
    board.cards[0].storyRemote = story.uuid;
    board.cards[0].remote = story.uuid;

    // SAVE CARDS
    for (let card of board.cards) {
        if (!card.active) continue;
        if (card.deleted) {
            if (card.remote) {
                await useApi(`/storystudio/steps/${card.remote}/remove`, { method: "DELETE" });
            }
            continue;
        };
        if (card.type === "STEP") {
            const waypoint: StreamedWaypoint | null = card.data.waypoint.placeType === "none" ? null : { uuid: card.data.waypoint.remote ?? null, placeType: card.data.waypoint.placeType, placeOverride: card.data.waypoint.placeOverride ?? false };
            let step: StreamedStep = {
                uuid: card.remote,
                storyUuid: story.uuid!,
                title: card.data.title,
                description: card.data.description,
                mediaType: card.data.mediaType === "NONE" ? null : titleCase(card.data.mediaType),
                assetId: card.data.assetId,
                waypoint: waypoint,
                decisions: [],
            };

            step = await (await useApi("/storystudio/steps/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(step),
            })).json();

            card.data = {
                title: step.title,
                description: step.description,
                mediaType: step.mediaType?.toUpperCase() ?? "NONE",
                assetId: step.assetId,
                waypoint: {
                    remote: step.waypoint?.uuid,
                    placeType: step.waypoint?.placeType ?? "none",
                    placeOverride: card.data.waypoint.placeOverride,
                },
            };
            card.remote = step.uuid;
        }
    }

    BoardStore.set(board);

    // SAVE ALL DECISIONS
    for (let stepCard of board.cards) {
        if (stepCard.deleted) continue;
        if (stepCard.type === "STEP") {
            if (!stepCard.active && stepCard.remote != null) {
                await (await useApi(`/storystudio/steps/remove/${stepCard.remote}`, { method: "DELETE" })).json();
                continue;
            }

            const waypoint: StreamedWaypoint | null = stepCard.data.waypoint.placeType === "none" ? null : { uuid: stepCard.data.waypoint.remote ?? null, placeType: stepCard.data.waypoint.placeType, placeOverride: stepCard.data.waypoint.placeOverride ?? false };
            let step: StreamedStep = {
                uuid: stepCard.remote,
                storyUuid: story.uuid!,
                title: stepCard.data.title,
                description: stepCard.data.description,
                mediaType: stepCard.data.mediaType === "NONE" ? null : stepCard.data.mediaType,
                assetId: stepCard.data.assetId,
                waypoint: waypoint,
                decisions: [],
            };

            for (const anchor of stepCard.anchors) {
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
                                };
                                step.decisions.push(decision);
                            }
                        }
                    } else {
                        const decision: StreamedDecision = {
                            uuid: anchor.remote,
                            title: stepCard.data.title,
                            stepInputUuid: step.uuid,
                            stepOutputUuid: board.cards[anchor.connection[0] as number].remote ?? null,
                        };
                        step.decisions.push(decision);
                    }
                }
            }

            await (await useApi("/storystudio/steps/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(step),
            })).json();
        }

    }

    return story.uuid;
};

export default save;
