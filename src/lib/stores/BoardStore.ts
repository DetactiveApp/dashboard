import type { BoardState, Card } from "$lib/types";
import { writable } from "svelte/store";

const nullStartCard: Card = { type: "START", data: { title: "", description: "", active: false }, anchors: [], deleted: false }
const nullStepCard: Card = { type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, placeType: "none" }, anchors: [], deleted: false };
const nullDecisionCard: Card = { type: "DECISION", data: { titles: ["", ""] }, anchors: [], deleted: false };

const BoardStore = writable<BoardState>({ cards: [nullStartCard, nullStepCard, nullDecisionCard] });

export default BoardStore;