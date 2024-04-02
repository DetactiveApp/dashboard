<script lang="ts">
	import NavBar from "../../components/NavBar.svelte";
	import { appStore } from "../../stores/appStore";
	import type { Item } from "../../types";

    const getItemsByName = async (name: string) => {
        const items = await (await fetch(`/api/items?nameQuery=${name}`)).json();
        return items
    }

    const pushItem =  async () => {
        $appStore.itemEditor.cItem = await (await fetch("/api/items", {method: "POST", body: JSON.stringify($appStore.itemEditor.cItem)})).json();
    }

    const deleteItem =  async () => {
        await fetch("/api/items", {method: "DELETE", body: JSON.stringify($appStore.itemEditor.cItem)});
        $appStore.itemEditor.cItem.id = null
        $appStore.itemEditor.cItem.name = ""
        $appStore.itemEditor.cItem.spawnProbability = 0.0
    }

    let sortedItems: Item[] = []
    let nameInput: HTMLInputElement;
    let pInput: HTMLInputElement;
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
                <input type="text" placeholder="Name" title="Name of the item" class="input input-bordered w-full max-w-xs" bind:value={$appStore.itemEditor.cItem.name} bind:this={nameInput} on:input={async () => {
                    if (nameInput.value === '') {
                        sortedItems = []
                        $appStore.itemEditor.cItem.id = null
                        return
                    }
                    sortedItems = await getItemsByName(nameInput.value)
                }} />
                {#each sortedItems as item}
				<button
					on:click={() => {
						$appStore.itemEditor.cItem = item;
						nameInput.value = item.name
                        pInput.value = String(item.spawnProbability)
                        sortedItems = []
					}}
					class="btn flex-0">{item.name}</button
				>
			    {/each}
                <p>Spawn Probability: {Math.round($appStore.itemEditor.cItem?.spawnProbability * 100)}%</p>
                <input type="range" min={0} max="100" value="0" class="range range-xs" title="Set the value for the spawn probability from 0.0 to 1.0" bind:this={pInput} on:input={() => $appStore.itemEditor.cItem.spawnProbability = +pInput.value / 100} />
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