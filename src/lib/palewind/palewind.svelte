<script lang="ts">
	import { onMount } from "svelte";
	import About from "./About.svelte";
	import Export from "./Export.svelte";
	import Import from "./Import.svelte";
	import NewColor from "./NewColor.svelte";
	import { defaultPaletteString, windowName, palette, setPaletteFromString } from "./Palewind";
	import ColorEditor from "./color-editor/ColorEditor.svelte";
	import Sidebar from "./sidebar/Sidebar.svelte";
	import { isPWA } from "$lib/detectPWA";
	import AppHome from "./AppHome.svelte";

	onMount(() => {
		let p = localStorage.getItem("palette");
		if (p) {
			palette.set(JSON.parse(p));
		} else {
			// First time startup
			setPaletteFromString(defaultPaletteString);
		}

		// Auto save palette
		palette.subscribe((newValue) => {
			localStorage.setItem("palette", JSON.stringify(newValue));
		});
	});
</script>

<main class:border-t={$isPWA}>
	<Sidebar />

	<div class="contents">
		{#if $windowName == ""}
			{#if $isPWA}
				<AppHome />
			{:else}
				<About />
			{/if}
		{:else if $windowName == "import"}
			<Import />
		{:else if $windowName == "export"}
			<Export />
		{:else if $windowName == "newcolor"}
			<NewColor />
		{:else if $windowName.startsWith("color/")}
			<ColorEditor />
		{:else}
			<div class="p-4">
				Unknown window location: "{$windowName}". How did we get here?
			</div>
		{/if}
	</div>
</main>

<style lang="postcss">
	main {
		@apply grid h-screen select-none overflow-hidden border-slate-600;
		grid-template-columns: 10em auto;
	}
</style>
