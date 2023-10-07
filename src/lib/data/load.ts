import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import type { StreamedStep, Card } from "$lib/types";
import reset from "./reset";

const CARDS_X_OFFSET = 400;

const load = async (storyUuid: string) => {
    const steps: { title: string; uuid: string }[] = await (await useApi(`/storystudio/list/stories/${storyUuid}/steps`)).json();
    reset();

    BoardStore.update((board) => {
        const startPosition = board.cards[0].offset;

        // LOAD START CARD
        useApi(`/storystudio/stories/${storyUuid}/load`)
            .then((res) => res.json())
            .then((story) => {
                board.cards[0].data = { title: story.title, description: story.description, active: story.active, assetId: story.assetId };
                board.cards[0].remote = story.uuid;
            });

        // LOAD STEP CARDS
        for (const [i, step] of steps.entries()) {
            useApi(`/storystudio/steps/${step.uuid}/load`)
                .then((res) => res.json())
                .then((step: StreamedStep) => {
                    const card: Card = {
                        type: "STEP",
                        data: { title: step.title, description: step.description, mediaType: step.mediaType ?? "NONE", assetId: step.assetId, waypoint: { placeType: step.waypoint?.placeType ?? "none", placeOverride: step.waypoint?.placeOverride } },
                        offset: [startPosition[0] + (CARDS_X_OFFSET * (i + 1)), startPosition[1]],
                        anchors: [],
                        remote: step.uuid,
                        deleted: false
                    }

                    board.cards.push(card);
                });
        }

        return board;
    });
}

export default load;