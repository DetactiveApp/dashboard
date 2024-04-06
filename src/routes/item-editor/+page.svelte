<script lang="ts">
	import NavBar from "../../components/NavBar.svelte";
	import { appStore } from "../../stores/appStore";
	import type { Item } from "../../types";

    const getItemsByName = async (name: string) => {
        const items = await (await fetch(`/api/items?nameQuery=${name}`)).json();
        return items
    }

    const pushItem = async () => {
        $appStore.itemEditor.cItem = await (await fetch("/api/items", {method: "POST", body: JSON.stringify($appStore.itemEditor.cItem)})).json();
    }

    const deleteItem =  async () => {
        await fetch("/api/items", {method: "DELETE", body: JSON.stringify($appStore.itemEditor.cItem)});
        reset()
    }

    const reset = () => {
        sortedItems = []
        $appStore.itemEditor.cItem.id = null
        $appStore.itemEditor.cItem.name = ""
        $appStore.itemEditor.cItem.spawnProbability = 0.0
        $appStore.itemEditor.cItem.minExpiration = 10.0
        $appStore.itemEditor.cItem.minExpiration = 60.0
    }

    let sortedItems: Item[] = []
</script>

<svelte:head>
    <title>Item Editor</title>
</svelte:head>

<main class="overflow-hidden">
    <NavBar />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-primary font-bold">Item Editor</h1>
        <div class="flex flex-col justify-evenly mt-10 gap-5 w-1/4">
            <div class="flex flex-col gap-5">
                <input type="text" placeholder="Name" title="Name of the item" class="input input-bordered w-full max-w-xs" bind:value={$appStore.itemEditor.cItem.name} on:input={async () => {
                    if ($appStore.itemEditor.cItem.name === '') {
                        reset()
                        return
                    }
                    sortedItems = await getItemsByName($appStore.itemEditor.cItem.name)
                }} />
                {#each sortedItems as item}
				<button
					on:click={() => {
						$appStore.itemEditor.cItem = item;
                        sortedItems = []
					}}
					class="btn flex-0">{item.name}</button
				>
			    {/each}

                <p>Spawn Probability: {Math.round($appStore.itemEditor.cItem?.spawnProbability * 100)}%</p>
                <input type="range" bind:value={$appStore.itemEditor.cItem.spawnProbability} min="0" max="1" step="0.01" class="range range-xs" title="Set the value for the spawn probability from 0.0 to 1.0" />

                <p>Min Expiration</p>
                <input type="number" bind:value={$appStore.itemEditor.cItem.minExpiration} min="0" class="input" title="Set the minimum expiration of the item in minutes"/>    

                <p>Max Expiration</p>  
                <input type="number"  bind:value={$appStore.itemEditor.cItem.maxExpiration} min="0" class="input" title="Set the maximum expiration of the item in minutes"/>    

                <div class="flex flex-row items-start justify-start gap-5">
                    <button class="btn w-fit" on:click={pushItem}>{$appStore.itemEditor.cItem?.id ? "Update" : "Push"}</button>
                    {#if $appStore.itemEditor.cItem?.id != null}
                        <button class="btn w-fit" on:click={deleteItem}>Delete</button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    text-align: center;
    }
</style>