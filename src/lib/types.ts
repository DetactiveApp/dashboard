export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    type: NodeType,
    data: any,
    offset: [number, number],
    anchors: Anchor[],
    deleted: boolean,
}

export interface Anchor {
    id: string,
    type: "INPUT" | "OUTPUT"
    offset: [number, number],
    connection: [number, number] | null,
}

export interface BoardState {
    cards: Card[]
}
