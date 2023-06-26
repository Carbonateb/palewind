<script lang="ts">
	import { get } from "svelte/store";
	import { currentColorShade } from "./currentColorShade";
	import { currentColorSet, palette, type PalewindPaletteShade } from "./palette";

	export let shade: PalewindPaletteShade;

	function onDelete() {
		let p = get(palette);
		p[get(currentColorSet)].shades.splice(get(currentColorShade), 1);
		palette.set(p);
		currentColorShade.set(-1);
	}
</script>

<div>
	<h2>
		Shade name: {shade.id}
	</h2>
	<div>
		<div>Hex: <input type="text" bind:value={shade.color} class="interactive px-2 py-1" /></div>
	</div>
	<button class="interactive interactive-primary mt-2 bg-red-500 px-4 py-1" on:click={onDelete}
		>Delete Shade</button
	>
</div>
