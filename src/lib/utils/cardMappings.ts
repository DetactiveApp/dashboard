import type { NodeType } from "$lib/types";
import type { SvelteComponent } from "svelte";

import StepCard from "$lib/components/cards/StepCard.svelte";
import DecisionCard from "$lib/components/cards/DecisionCard.svelte";
import StartCard from "$lib/components/cards/StartCard.svelte";

export const cardMappings: Record<NodeType, typeof SvelteComponent> = {
    START: StartCard,
    STEP: StepCard,
    DECISION: DecisionCard,
};