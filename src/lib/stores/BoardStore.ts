import type { BoardState } from "$lib/types";
import { writable } from "svelte/store";
import { initStartCard } from "$lib/utils/initCards";

export const initBoardState: BoardState = { cards: [initStartCard] }

const BoardStore = writable<BoardState>(JSON.parse(JSON.stringify(initBoardState)));

export default BoardStore;