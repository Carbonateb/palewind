<script lang="ts">
	import { hexToHSL, hslToHex, ColorConvert } from "$lib/utilities";
	import Slider from "./Slider.svelte";
	import { currentColorShade, type PalewindPaletteShade } from "../Palewind";
	import { colorSpace } from "../settings/ColorSpace";

	export let shade: PalewindPaletteShade;
	export let index: number;

	let isSliderPressed = [false, false, false];

	// Color, in whatever space we are using
	let color = hexToCurrentSpace(shade.color);

	$: shade.color = currentSpaceToHex(color);

	function onEditorClicked(ev: MouseEvent) {
		currentColorShade.set(index);
	}

	$: shade.color, onShadeUpdated();
	function onShadeUpdated() {
		// Only move sliders if user is not moving them already
		if (isSliderPressed[0] || isSliderPressed[1] || isSliderPressed[2]) {
			return;
		}
		color = hexToCurrentSpace(shade.color);
	}

	$: $colorSpace, onColorSpaceUpdated();
	function onColorSpaceUpdated() {
		color = hexToCurrentSpace(shade.color);
	}

	function hexToCurrentSpace(hex: string) {
		let result = ColorConvert.hexToRGB(shade.color);
		switch ($colorSpace) {
			case "hsl":
				return ColorConvert.RGBtoHSL(result);
			case "hsv":
				return ColorConvert.RGBToHSV(result);
		}
		return result;
	}

	function currentSpaceToHex(currentColor: number[]) {
		let rgb: number[];
		switch ($colorSpace) {
			case "hsl":
				rgb = ColorConvert.HSLtoRGB(currentColor);
				break;
			case "hsv":
				rgb = ColorConvert.HSVToRGB(currentColor);
				break;
			case "rgb":
				rgb = currentColor;
				break;
		}
		return ColorConvert.RGBToHex(rgb);
	}

	// Read only
	$: rgb = ColorConvert.hexToRGB(shade.color);

	// Read only
	$: luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
</script>

<div
	class="color-shade highlight relative flex w-0 min-w-fit flex-grow flex-col items-center gap-1 overflow-clip"
	style="background-color: {shade.color};"
	class:light-color={luminance >= 0.5}
	on:mousedown={onEditorClicked}
	role="button"
	tabindex="-1"
>
	<input
		bind:value={shade.id}
		class="mx-2 w-10 border-b border-transparent bg-transparent text-center font-bold text-white transition-colors focus:border-white focus:outline-none"
		tabindex="0"
	/>
	<div class="mx-1 mb-1 flex flex-grow justify-center gap-1">
		<Slider
			bind:value={color[0]}
			max={1}
			color={$colorSpace == "rgb" ? "#dc2626" : "#f97316"}
			bind:isPressed={isSliderPressed[0]}
		/>
		<Slider
			bind:value={color[1]}
			max={1}
			color={$colorSpace == "rgb" ? "#16a34a" : "#94a3b8"}
			bind:isPressed={isSliderPressed[1]}
		/>
		<Slider
			bind:value={color[2]}
			max={1}
			color={$colorSpace == "rgb" ? "#2563eb" : "#0f172a"}
			bind:isPressed={isSliderPressed[2]}
		/>
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
