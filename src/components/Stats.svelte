<script lang="ts">
	import { onMount } from 'svelte';
	import type { Stats } from '../types/Stats';

	let stats: Stats | null = null;

	onMount(async () => {
		stats = await getStats();
		setInterval(async () => {
			stats = await getStats();
		}, 5000);
	});

	async function getStats() {
		return await (await fetch('/api/stats')).json();
	}
</script>

<main class="flex justify-center w-full">
	<div class="stats">
		<div class="stat">
			<div class="stat-title">Total Users</div>
			{#if stats}
				<div class="stat-value text-primary">{stats.totalUsers}</div>
			{:else}
				<span class="loading loading-infinity loading-lg text-primary" />
			{/if}
		</div>
		<div class="stat">
			<div class="stat-title">Spawned Items</div>
			{#if stats}
				<div class="stat-value text-primary">{stats.spawnedItems}</div>
			{:else}
				<span class="loading loading-infinity loading-lg text-primary" />
			{/if}
		</div>
	</div>
</main>
