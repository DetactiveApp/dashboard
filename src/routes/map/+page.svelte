<script lang="ts">
    import mapboxgl from 'mapbox-gl';
    import { onMount } from "svelte";
	import { PUBLIC_MAPBOX_KEY } from '$env/static/public';

    let map: mapboxgl.Map;
    let mapContainer: HTMLDivElement;
    let markers: mapboxgl.Marker[];

    const init = async () => {
        markers = []
        
        const mapContext = await getMap();

        for (const i in mapContext.items) {
            const item = mapContext.items[i]
            const popup = new mapboxgl.Popup({
                offset: 35
            }).setHTML(`<p>Name: ${item.name}</p><p>Probability: ${item.spawnProbability * 100}%</p><p>Minutes left: ${new Date(item.expiration).getMinutes() - new Date().getMinutes()}</p>`);
            const marker = new mapboxgl.Marker({color: 'orange'}).setPopup(popup)
            .setLngLat([item.position.longitude, item.position.latitude])
            .addTo(map);

            markers.push(marker)
        }
    }

    onMount(async () => {
        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken: PUBLIC_MAPBOX_KEY,
            style: `mapbox://styles/maxx19/clugre6ee00bz01ntdpxr0wf7`,
            center: [10.45411064478481, 51.164221896294045],
            zoom: 2,
            attributionControl: false,
        });

        await init();

        setInterval(async () => {
            await init();
        }, 10000);
    })

	async function getMap() {
		return await (await fetch('/api/map')).json();
	}
</script>

<main>
    <div class="absolute h-full w-full top-0 left-0" bind:this={mapContainer} />
</main>