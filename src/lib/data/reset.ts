import BoardStore from "$lib/stores/BoardStore";
import { initStartCard } from "$lib/utils/initCards";
import type { Anchor } from "$lib/types";
import { get } from "svelte/store";

const reset = async () => {
    let board = get(BoardStore);
    for (let card of board.cards) {
        if (card.type === "START") continue;
        card.deleted = true;
        card.active = false;
    }

    board.cards[0].remote = null;
    board.cards[0].storyRemote = null;

    board.cards[0].data = JSON.parse(JSON.stringify(initStartCard)).data;
    board.cards[0].anchors.forEach(
        (anchor: Anchor) => (anchor.connection = null)
    );

    BoardStore.set(board);
}

export default reset;