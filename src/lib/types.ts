export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    type: NodeType,
    data: any,
    offset: [number, number],
    anchors: Anchor[],
    remote: string | null,
    deleted: boolean,
}

export interface Anchor {
    id: string,
    type: "INPUT" | "OUTPUT"
    offset: [number, number],
    connection: [number, number] | null | "ON_CONNECT",
}

export interface BoardState {
    cards: Card[]
}
