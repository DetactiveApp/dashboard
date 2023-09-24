<script lang="ts">
  import Logo from "$lib/assets/branding/Detactive-Logo.svg";
  import BoardStore from "$lib/stores/BoardStore";
  import { each } from "svelte/internal";

  function debugClick() {
    console.log("Board: ", $BoardStore);
  }
</script>

<nav
  class="flex text-2xl text-center h-fit items-center w-screen bg-white mt-6 z-50 border-green-500 border-b-4"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img on:click={debugClick} class="w-7 h-7" src={Logo} alt="Detactive Logo" />
  <select>
    <option>
      {#each [] as story}{/each}
    </option>
  </select>
</nav>
