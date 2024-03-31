<script lang="ts">
    import NavBar from "../../components/NavBar.svelte";
	import { appStore } from "../../stores/appStore";

    const getItems =  async () => {
        const items = await (await fetch("/api/items")).json();
        return items
    }

    const pushItem =  async () => {
        $appStore.itemEditor.cItem = await (await fetch("/api/items", {method: "POST", body: JSON.stringify($appStore.itemEditor.cItem)})).json();
    }

    const deleteItem =  async () => {
        await fetch("/api/items", {method: "DELETE", body: JSON.stringify($appStore.itemEditor.cItem)});
        $appStore.itemEditor.cItem = {"id": null, "name": null, "spawnProbability": null }
    }

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
        <div class="flex flex-col justify-evenly mt-10 gap-5 w-3/4">
            <div class="flex gap-5">
                <input type="text" placeholder="Name" title="Name of the item" class="input input-bordered w-full max-w-xs" bind:this={nameInput} on:input={() => $appStore.itemEditor.cItem.name = nameInput.value} />
                <input type="number"  placeholder="Probability" title="Set the value for the spawn probability from 0.0 to 1.0" class="input input-bordered w-32" bind:this={pInput} on:input={async() => {
                    if (+pInput.value > 1.0) {
                        pInput.value = String(1.0)
                    } else if (+pInput.value < 0.0) {
                        pInput.value = String(0.0)
                    }

                    $appStore.itemEditor.cItem.spawnProbability = +pInput.value
                }} />
            </div>
            <div class="flex flex-row items-start justify-start">
                <button class="btn w-fit" on:click={pushItem}>{$appStore.itemEditor.cItem.id ? "Update" : "Push"}</button>
                {#if $appStore.itemEditor.cItem.id != null}
                    <button class="btn w-fit">Delete</button>
                {/if}
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