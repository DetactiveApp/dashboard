import type { Card } from "$lib/types";

export const initStartCard: Card = { type: "START", data: { title: "", description: "", active: false }, offset: [0, 0], anchors: [], remote: null, deleted: false }
export const initStepCard: Card = { type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, waypoint: { placeType: "none", placeOverride: false } }, offset: [0, 0], anchors: [], remote: null, deleted: false };
export const initDecisionCard: Card = { type: "DECISION", data: { titles: ["", ""] }, offset: [0, 0], anchors: [], remote: null, deleted: false };