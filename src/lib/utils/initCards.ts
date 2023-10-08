import type { Card } from "$lib/types";

export const initStartCard: Card = { active: false, type: "START", data: { title: "", description: "", active: false }, offset: [0, 0], anchors: [], remote: null, deleted: false }
export const initStepCard: Card = { active: false, type: "STEP", data: { title: "", description: "", mediaType: "NONE", assetId: null, waypoint: { placeType: "none", placeOverride: false } }, offset: [0, 0], anchors: [], remote: null, deleted: false };
export const initDecisionCard: Card = { active: false, type: "DECISION", data: { titles: ["", ""] }, offset: [0, 0], anchors: [], remote: null, deleted: false };