<script lang="ts">
	import { hexToHSL, hslToHex } from "$lib/utilities";
	import Slider from "./Slider.svelte";
	import { currentColorShade } from "../currentColorShade";
	import type { PalewindPaletteShade } from "../palette";

	export let shade: PalewindPaletteShade;
	export let index: number;

	let isSliderPressed = [false, false, false];

	let color = hexToHSL(shade.color);

	$: color, onSliderMoved();
	function onSliderMoved() {
		shade.color = hslToHex(color.hue, color.sat, color.val);
	}

	function onEditorClicked(ev: MouseEvent) {
		currentColorShade.set(index);
	}

	$: shade.color, onShadeUpdated();
	function onShadeUpdated() {
		// Only move sliders if user is not moving them already
		if (isSliderPressed[0] || isSliderPressed[1] || isSliderPressed[2]) {
			return;
		}
		color = hexToHSL(shade.color);
	}
</script>

<div
	class="color-shade highlight relative flex w-0 min-w-fit flex-grow flex-col items-center gap-1 overflow-clip"
	style="background-color: {shade.color};"
	class:light-color={color.val >= 50}
	on:mousedown={onEditorClicked}
	role="button"
	tabindex="-1"
>
	<input
		bind:value={shade.id}
		class="mx-2 w-10 border-b border-transparent bg-transparent text-center font-bold text-white focus:border-white focus:outline-none"
		tabindex="0"
	/>
	<div class="mx-1 mb-1 flex flex-grow justify-center gap-1">
		<Slider bind:value={color.hue} max={360} color="#f97316" bind:isPressed={isSliderPressed[0]} />
		<Slider bind:value={color.sat} max={100} color="#94a3b8" bind:isPressed={isSliderPressed[1]} />
		<Slider bind:value={color.val} max={100} color="#0f172a" bind:isPressed={isSliderPressed[2]} />
	</div>
</div>

<style lang="postcss">
	.color-shade {
		box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 10%), inset 0 -1px 0 0 rgb(0 0 0 / 15%);
	}

	.color-shade:first-child {
		@apply rounded-l-lg;
	}
	.color-shade:last-child {
		@apply rounded-r-lg;
	}

	.light-color > input {
		@apply text-black focus:border-black;
	}

	.delete:focus,
	div:hover > .delete {
		@apply opacity-100;
	}
</style>
