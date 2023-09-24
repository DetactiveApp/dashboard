import type { BoardState } from "$lib/types";
import { writable } from "svelte/store";
import { initStartCard } from "$lib/utils/initCards";

const BoardStore = writable<BoardState>({ cards: [initStartCard] });

export default BoardStore;