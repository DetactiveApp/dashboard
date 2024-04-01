import { writable } from "svelte/store";
import type { AppStore } from "../types/AppStore";

export const appStore = writable<AppStore>(
    {
        itemEditor: {
            cItem: { id: null, name: "dtcoin", spawnProbability: 0 }
        }
    }
)