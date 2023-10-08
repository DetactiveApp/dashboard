import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import type { StreamedStep, Card } from "$lib/types";
import { get } from "svelte/store";
import reset from "./reset";

const CARDS_X_OFFSET = 400;

const load = async (storyUuid: string) => {
    const stepsList: { title: string; uuid: string }[] = await (await useApi(`/storystudio/list/stories/${storyUuid}/steps`)).json();
    reset();

    let connections: [string, string][] = [];
    let board = get(BoardStore);

    // LOAD START CARD
    const story = await (await useApi(`/storystudio/stories/${storyUuid}/load`)).json();
    board.cards[0].data = { title: story.title, description: story.description, active: story.active, assetId: story.assetId };
    board.cards[0].remote = story.uuid;

    // LOAD STEP CARDS
    for (const [x, listStep] of stepsList.entries()) {
        let step: StreamedStep = await (await useApi(`/storystudio/steps/${listStep.uuid}/load`)).json();
        const cardPosition: [number, number] = [board.cards[0].offset[0] + (x + 1) * CARDS_X_OFFSET, board.cards[0].offset[1]];
        const stepCard: Card = {
            active: false,
            type: "STEP",
            data: { title: step.title, description: step.description, mediaType: step.mediaType ?? "NONE", assetId: step.assetId, waypoint: { placeType: step.waypoint?.placeType ?? "none", placeOverride: step.waypoint?.placeOverride } },
            offset: cardPosition,
            anchors: [],
            remote: step.uuid,
            deleted: false
        };

        for (const decision of step.decisions) {
            connections.push([decision.stepInputUuid, decision.stepOutputUuid!]);
        }

        board.cards.push(stepCard);

        if (step.decisions.length > 1) {
            const decisionCard: Card = {
                active: false,
                type: "DECISION",
                data: { titles: step.decisions.map((decision) => decision.title) },
                offset: cardPosition,
                anchors: [],
                remote: step.uuid,
                deleted: false
            };
            board.cards.push(decisionCard);
        }
    }
    // Update data & get anchors
    BoardStore.set(board);
    board = await get(BoardStore);

    for (const connection of connections) {
        const inputCardIndex = board.cards.findIndex((card) => card.remote === connection[0]);
        const outputCardIndex = board.cards.findIndex((card) => card.remote === connection[1]);
        if (inputCardIndex !== -1 && outputCardIndex !== -1) {
            const outputAnchorIndex = board.cards[inputCardIndex].anchors.findIndex((anchor) => anchor.type === "OUTPUT");
            const inputAnchorIndex = board.cards[outputCardIndex].anchors.findIndex((anchor) => anchor.type === "INPUT");

            console.log(board.cards[inputCardIndex].anchors)
            board.cards[inputCardIndex].anchors[outputAnchorIndex].connection = [outputCardIndex, inputAnchorIndex]
        }
    }

    const first = board.cards.findIndex(
        (card) =>
            card.anchors.findIndex(
                (anchor) => anchor.type === "OUTPUT" && anchor.connection === null
            ) && card.deleted === false
    );
    board.cards[0].anchors[0].connection = [first, 0];
}

export default load;
