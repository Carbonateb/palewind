<script lang="ts">
	import { get } from "svelte/store";
	import { currentColorShade, palette, type PalewindPaletteShade } from "./Palewind";
	import Vector3Editor from "./Vector3Editor.svelte";
	import { ColorConvert } from "$lib/utilities";
	import type { ColorSpace } from "./settings/ColorSpace";

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

	function getRGB(hex: string) {
		let result = ColorConvert.hexToRGB(hex);
		result[0] *= 255;
		result[1] *= 255;
		result[2] *= 255;
		return result;
	}

	function getHSL(hex: string) {
		let result = ColorConvert.hexToRGB(hex);
		result = ColorConvert.RGBtoHSL(result);
		result[0] *= 360;
		result[1] *= 100;
		result[2] *= 100;
		return result;
	}

	function getHSV(hex: string) {
		let result = ColorConvert.hexToRGB(hex);
		result = ColorConvert.RGBToHSV(result);
		result[0] *= 360;
		result[1] *= 100;
		result[2] *= 100;
		return result;
	}

	function onVectorEdited(event: CustomEvent, type: ColorSpace) {
		// Event.detail is bound to the value, changing it will change the value in the box
		let newValue = event.detail as number[];

		switch (type) {
			case "rgb":
				// This also updates the value in Vector3Editor
				newValue[0] = Math.min(newValue[0], 255);
				newValue[1] = Math.min(newValue[1], 255);
				newValue[2] = Math.min(newValue[2], 255);

				let r = newValue[0] / 255;
				let g = newValue[1] / 255;
				let b = newValue[2] / 255;
				shades[currentIndex].color = ColorConvert.RGBToHex([r, g, b]);
				break;

			case "hsl":
				{
					// This also updates the value in Vector3Editor
					newValue[0] = Math.min(newValue[0], 360);
					newValue[1] = Math.min(newValue[1], 100);
					newValue[2] = Math.min(newValue[2], 100);

					let h = newValue[0] / 360;
					let s = newValue[1] / 100;
					let l = newValue[2] / 100;
					shades[currentIndex].color = ColorConvert.RGBToHex(ColorConvert.HSLtoRGB([h, s, l]));
				}
				break;

			case "hsv":
				{
					// This also updates the value in Vector3Editor
					newValue[0] = Math.min(newValue[0], 360);
					newValue[1] = Math.min(newValue[1], 100);
					newValue[2] = Math.min(newValue[2], 100);

					let h = newValue[0] / 360;
					let s = newValue[1] / 100;
					let v = newValue[2] / 100;
					shades[currentIndex].color = ColorConvert.RGBToHex(ColorConvert.HSVToRGB([h, s, v]));
				}
				break;

			default:
				break;
		}
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
	<div class="flex h-full flex-grow flex-col flex-wrap content-start justify-center gap-4">
		<label class="flex w-fit items-center">
			<div class="w-10 text-slate-400">Hex</div>
			<input type="text" bind:value={shades[currentIndex].color} class="interactive px-2 py-1" />
		</label>
		<div class="flex w-fit items-center">
			<div class="w-10 text-slate-400">RGB</div>
			<Vector3Editor
				vector={getRGB(shades[currentIndex].color)}
				on:changed={(ev) => onVectorEdited(ev, "rgb")}
			/>
		</div>
		<div class="flex w-fit items-center">
			<div class="w-10 text-slate-400">HSL</div>
			<Vector3Editor
				vector={getHSL(shades[currentIndex].color)}
				on:changed={(ev) => onVectorEdited(ev, "hsl")}
			/>
		</div>
		<div class="flex w-fit items-center">
			<div class="w-10 text-slate-400">HSV</div>
			<Vector3Editor
				vector={getHSV(shades[currentIndex].color)}
				on:changed={(ev) => onVectorEdited(ev, "hsv")}
			/>
		</div>
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
