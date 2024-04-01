<script lang="ts">
	import NavBar from '../components/NavBar.svelte';
	import Stats from '../components/Stats.svelte';

	let innerWidth: number;
	let innerHeight: number;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svelte:head>
    <title>Detactive Dashboard</title>
</svelte:head>


<main>
	<NavBar />
	<div class="flex justify-center">
		<div class="flex flex-col items-center justify-center w-3/4" >
			<iframe class="rounded-xl" title="map" src="/map" width={innerWidth / 1.5} height={innerHeight / 1.3} />
			<Stats />
		</div>
	</div>
</main>