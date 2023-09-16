import type { BoardState, Card } from "$lib/types";
import { writable } from "svelte/store";

const emptyStartCard: Card = {
    id: 0, type: "START", data: {
        title: "",
        description: "",
        active: false,
    }
}
const emptyStepCard: Card = { id: 1, type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, placeType: "none" } };
const emptyDecisionCard: Card = { id: 2, type: "DECISION", data: { titles: ["", ""] } };

const BoardStore = writable<BoardState>({ cards: [emptyStartCard, emptyStepCard, emptyDecisionCard], connections: [] });

export default BoardStore;