<script lang="ts">
  import { browser, version } from "$app/environment";
  import { onMount } from "svelte";
  let inputElement: HTMLInputElement;

  onMount(() => {
    if (browser && document.cookie.includes("studio_key")) {
      window.location.href = "/editor";
    }

    addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submit();
      }
    });
  });

  const submit = async () => {
    if (browser) {
      document.cookie = `studio_key=${inputElement.value}`;
    }
    window.location.href = "/editor";
  };
</script>

<main
  class="w-full h-full flex flex-col items-center justify-center text-center"
>
  <div class="flex items-end gap-1">
    <h1 class="text-3xl m-auto">StoryStudio</h1>
    <p>v{version}</p>
  </div>
  <div class="border-black border-4 rounded-md p-0.5">
    <input
      bind:this={inputElement}
      class="outline-none"
      type="password"
      placeholder="Key"
    />
  </div>
</main>
