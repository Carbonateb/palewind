<script lang="ts">
	import { defaultPaletteString } from "./Palewind";
	import { currentColorSet, setPaletteFromString, currentColorShade } from "./Palewind";

	let inputText: string;

	function loadDefaultPalette() {
		inputText = defaultPaletteString;
	}

	function importPalette() {
		setPaletteFromString(inputText);
		$currentColorSet = -1;
		$currentColorShade = -1;
		inputText = "";
	}
</script>

<div class="custom-scrollbar overflow-auto p-4">
	<h1 class="text-2xl">Import</h1>
	<p class="mb-4">Paste the color object from your Tailwind config file here.</p>
	<p class="mb-8">
		<button class="text-orange-300 hover:underline" on:click={loadDefaultPalette}
			>Load default palette</button
		> for an example on what to paste.
	</p>

	<!-- svelte-ignore a11y-autofocus -->
	<textarea
		bind:value={inputText}
		spellcheck="false"
		autofocus
		class="custom-scrollbar highlight min-h-[16em] w-full rounded bg-slate-950 p-2 font-mono"
	/>
	<button on:click={importPalette} class="interactive interactive-primary px-8 py-1">
		Import
	</button>
</div>
