import type { BoardState, Card } from "$lib/types";
import { writable } from "svelte/store";

const emptyStartCard: Card = { type: "START", data: { title: "", description: "", active: false } }
const emptyStepCard: Card = { type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, placeType: "none" } };
const emptyDecisionCard: Card = { type: "DECISION", data: { titles: ["", ""] } };

const BoardStore = writable<BoardState>({ cards: [emptyStartCard, emptyStepCard, emptyDecisionCard], connections: [] });

export default BoardStore;