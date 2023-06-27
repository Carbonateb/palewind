<script>
	import ColorShadeInfo from "../ColorShadeInfo.svelte";
	import { windowName } from "../Palewind";
	import { currentColorShade } from "../currentColorShade";
	import { palette } from "../palette";
	import ShadeEditor from "./ShadeEditor.svelte";

	$: colorID = parseInt($windowName.replace("color/", ""));
	// $: currentColor = ;

	function createShade() {
		let shades = $palette[colorID].shades;
		if (shades.length > 0) {
			shades.push({ ...shades[shades.length - 1] });
		} else {
			shades.push({ color: "#888888", id: "400" });
		}
		$palette[colorID].shades = shades;
	}
</script>

<div class="flex flex-col">
	<div class="flex justify-between p-4">
		<input
			type="text"
			class="bg-transparent text-2xl focus:outline-none"
			bind:value={$palette[colorID].colorName}
		/>
		<button class="interactive hover:interactive-primary px-4 py-1" on:click={createShade}
			>New Shade</button
		>
	</div>
	<ShadeEditor bind:shades={$palette[colorID].shades} />
	<div class="h-32 border-t border-slate-50/20">
		{#if $currentColorShade >= 0}
			<ColorShadeInfo
				bind:shades={$palette[colorID].shades}
				bind:currentIndex={$currentColorShade}
			/>
		{:else}
			<div
				class="m-auto flex h-full items-center justify-center pb-1 text-center text-lg text-slate-600"
			>
				Select a color above to see more info.
			</div>
		{/if}
	</div>
</div>
