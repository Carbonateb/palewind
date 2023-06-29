<script lang="ts">
	import { onMount } from "svelte";
	import About from "./About.svelte";
	import Export from "./Export.svelte";
	import Import from "./Import.svelte";
	import NewColor from "./NewColor.svelte";
	import { windowName, palette } from "./Palewind";
	import ColorEditor from "./color-editor/ColorEditor.svelte";
	import Sidebar from "./sidebar/Sidebar.svelte";
	import { isPWA } from "$lib/detectPWA";
	import AppHome from "./AppHome.svelte";
	import { currentProjectID, projects } from "./Projects";

	onMount(() => {
		// Auto save palette
		palette.subscribe((newValue) => {
			let p = $projects[$currentProjectID];
			p.palette = newValue;
			localStorage.setItem(`project-${p.id}`, JSON.stringify(p));
			$projects[$currentProjectID] = p;
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
