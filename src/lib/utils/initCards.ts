import type { Card } from "$lib/types";

const initWaypoint = { placeType: "none", placeOverride: false, remote: null };

const initStartData = {
    title: "", description: "", assetId: "", active: false
}

const initStepData = {
    title: "", description: "", mediaType: "NONE", assetId: null, waypoint: initWaypoint
}

const initDecisionData = {
    titles: ["", ""]
}

export const initStartCard: Card = { active: false, type: "START", data: initStartData, offset: [0, 0], anchors: [], remote: null, storyRemote: null, deleted: false }
export const initStepCard: Card = { active: false, type: "STEP", data: initStepData, offset: [0, 0], anchors: [], remote: null, storyRemote: null, deleted: false };
export const initDecisionCard: Card = { active: false, type: "DECISION", data: initDecisionData, offset: [0, 0], anchors: [], remote: null, storyRemote: null, deleted: false };