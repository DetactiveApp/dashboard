import useApi from "$lib/hooks/useApi";
import BoardStore from "$lib/stores/BoardStore";
import { get } from "svelte/store";

const remove = async () => {
    const board = get(BoardStore);
    const storyUuid = board.cards[0].storyRemote;
    if (storyUuid) {
        await useApi(`/storystudio/stories/${storyUuid}/remove`, {
            method: "DELETE"
        });
    }
};

export default remove;