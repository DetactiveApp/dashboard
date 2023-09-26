import type { Card } from "$lib/types";



export const initStartCard: Card = { type: "START", data: { title: "", description: "", active: false }, offset: [0, 0], anchors: [], deleted: false }
export const initStepCard: Card = { type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, placeType: "none" }, offset: [0, 0], anchors: [], deleted: false };
export const initDecisionCard: Card = { type: "DECISION", data: { titles: ["", ""] }, offset: [0, 0], anchors: [], deleted: false };