<script lang="ts">
	import defaultPalette from "./default-palette.txt?raw";
	import {
		currentColorSet,
		setPaletteFromString,
		currentColorShade,
		readPaletteFromString,
		palette,
	} from "./Palewind";

	let inputText: string;

	function loadDefaultPalette() {
		inputText = defaultPalette;
	}

	function importPalette() {
		setPaletteFromString(inputText);
		$currentColorSet = -1;
		$currentColorShade = -1;
		inputText = "";
	}

	function appendPalette() {
		let newPalette = readPaletteFromString(inputText);
		$palette = $palette.concat(newPalette);
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
		Import (Replace Existing)
	</button>
	<button on:click={appendPalette} class="interactive px-8 py-1"> Import (Append) </button>
</div>
