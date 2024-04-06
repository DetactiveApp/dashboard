import { writable } from "svelte/store";
import type { AppStore } from "../types/AppStore";

export const appStore = writable<AppStore>(
    {
        itemEditor: {
            cItem: { id: null, name: "", spawnProbability: 0, minExpiration: 10, maxExpiration: 60 }
        }
    }
)