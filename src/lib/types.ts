export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    type: NodeType,
    data: any,
    anchors: Anchor[],
    deleted: boolean,
}

export interface Anchor {
    id: string,
    type: "INPUT" | "OUTPUT"
    offset: [number, number],
    connection: number | null,
}

export interface BoardState {
    cards: Card[]
}
