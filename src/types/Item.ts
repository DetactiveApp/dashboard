export interface Item {
    id: string | null,
    name: string,
    spawnProbability: number,
    minExpiration: number,
    maxExpiration: number
}