<script>
	import NavBar from "../../components/NavBar.svelte";

</script>

<svelte:head>
    <title>Item Editor</title>
</svelte:head>

<main class="overflow-hidden">
    <NavBar />
    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-primary font-bold">Item Editor</h1>
        <div class="flex justify-evenly mt-10 gap-5 w-3/4">
            <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" />
            <button class="btn">Push</button>
        </div>
    </div>
</main>