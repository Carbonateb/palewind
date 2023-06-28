<script lang="ts">
	import { onMount } from "svelte";
	import "../app.postcss";
	import { pwaInfo } from "virtual:pwa-info";

	let ReloadPrompt: any;
	onMount(async () => {
		pwaInfo && (ReloadPrompt = (await import("$lib/ReloadPrompt.svelte")).default);
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div>
	<slot />
</div>

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
