export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    id: number,
    type: NodeType,
    data: any,
}

export interface Connection {
    id: number
    inputAnchor: number,
    outputAnchor: number,
    inputCard: string,
    outputCard: string,
}

export interface BoardState {
    cards: Card[],
    connections: Connection[],
}
