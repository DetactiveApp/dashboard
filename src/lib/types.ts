export type NodeType = "START" | "STEP" | "DECISION";

export interface Card {
    type: NodeType,
    data: any,
    deleted: boolean
}

export interface Connection {
    inputAnchor: number,
    outputAnchor: number,
    inputCard: string,
    outputCard: string,
}


export interface BoardState {
    cards: Card[],
    connections: Card[],
}
