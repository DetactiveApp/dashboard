import BoardStore from "$lib/stores/BoardStore";
import { initStartCard } from "$lib/utils/initCards";
import type { Anchor } from "$lib/types";

const reset = () => {
    BoardStore.update((board) => {
        for (let card of board.cards) {
            if (card.type === "START") continue;
            card.deleted = true;
        }

        board.cards[0].data = JSON.parse(JSON.stringify(initStartCard)).data;
        board.cards[0].anchors.forEach(
            (anchor: Anchor) => (anchor.connection = null)
        );

        return board;
    });
}

export default reset;