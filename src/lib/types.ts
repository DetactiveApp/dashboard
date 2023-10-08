export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    active: boolean;
    type: NodeType,
    data: any,
    offset: [number, number],
    anchors: Anchor[],
    remote: string | null,
    deleted: boolean,
}

export interface Anchor {
    id: [number, number],
    type: "INPUT" | "OUTPUT"
    offset: [number, number],
    connection: [number, number] | null | "ON_CONNECT",
}

export interface BoardState {
    cards: Card[],
}

// Streamed
export interface StreamedStory {
    uuid: string | null,
    title: string,
    description: string,
    active: boolean,
    assetId: string | null,
}

export interface StreamedWaypoint {
    uuid: string | null,
    placeType: string,
    placeOverride: boolean,
}

export interface StreamedDecision {
    uuid: string | null,
    title: string | null,
    stepInputUuid: string,
    stepOutputUuid: string | null,
}

export interface StreamedStep {
    uuid: string | null,
    title: string,
    description: string,
    mediaType: string | null,
    assetId: string | null,
    waypoint: StreamedWaypoint | null,
    decisions: StreamedDecision[],
}
