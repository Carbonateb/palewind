<script lang="ts">
	import { get } from "svelte/store";
	import { currentColorShade, palette, type PalewindPaletteShade } from "./Palewind";

	export let shades: PalewindPaletteShade[];
	export let currentIndex: number;

	function cloneShade() {
		shades.splice(currentIndex, 0, { ...shades[currentIndex] });
		shades = shades;
	}

	function onDelete() {
		let p = get(palette);
		shades.splice(currentIndex, 1);
		// p[get(currentColorSet)].shades.splice(get(currentColorShade), 1);
		palette.set(p);
		currentColorShade.set(-1);
	}
</script>

<div class="flex h-full items-center gap-4">
	<!-- Color chip -->
	<div
		class="highlight relative h-full w-16 items-center justify-center overflow-clip border-r border-slate-600"
		style="background-color: {shades[currentIndex].color}; box-shadow: inset 0 2px 6px black"
	>
		<!-- style="writing-mode: vertical-lr; text-orientation: upright; letter-spacing: -6px;" -->
		<h2 class="vertical-text absolute top-2 text-2xl text-black">
			{shades[currentIndex].id}
		</h2>
		<h2 class="vertical-text absolute bottom-2 right-0 text-2xl text-white">
			{shades[currentIndex].id}
		</h2>
	</div>

	<!-- Manual input area -->
	<div class="flex flex-grow flex-col gap-2">
		<label>
			Hex: <input
				type="text"
				bind:value={shades[currentIndex].color}
				class="interactive px-2 py-1"
			/>
		</label>
	</div>

	<!-- Buttons -->
	<div class="flex h-full flex-col justify-evenly border-l border-zinc-700 p-4">
		<button class="interactive px-4 py-1 hover:bg-sky-500" on:click={cloneShade}>Clone</button>
		<button class="interactive px-4 py-1 hover:bg-red-500" on:click={onDelete}>Delete</button>
	</div>
</div>

<style lang="postcss">
	.vertical-text {
		writing-mode: vertical-lr;
		text-orientation: upright;
		letter-spacing: -6px;
	}
</style>
