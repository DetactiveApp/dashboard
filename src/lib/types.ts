export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    type: NodeType,
    data: any,
}

export interface Connection {
    inputAnchor: number,
    outputAnchor: number,
    inputCard: string,
    outputCard: string,
}

export interface BoardState {
    cards: (Card | null)[],
    connections: (Card | null)[],
}
