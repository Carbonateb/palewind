<script lang="ts">
	import { get } from "svelte/store";
	import { hslToHex } from "$lib/utilities";
	import { windowName, palette, type PalewindPaletteShade } from "./Palewind";
	import { onMount } from "svelte";
	import ShadeEditor from "./color-editor/ShadeEditor.svelte";

	interface GeneratorProps {
		hue: number;
		hueShift: number;
		saturation: number;
	}

	let colorName: string = "unnamed";

	let generatorProperties: GeneratorProps = {
		hue: 0,
		hueShift: 0,
		saturation: 50,
	};

	const defaultShades = [
		"50",
		"100",
		"200",
		"300",
		"400",
		"500",
		"600",
		"700",
		"800",
		"900",
		"950",
	];

	$: previewShades = createShades(generatorProperties);

	onMount(() => {
		randomizeGenerator();
	});

	function randomizeGenerator() {
		generatorProperties.hue = Math.random() * 360;
		generatorProperties.hueShift = (Math.random() - 0.5) * 10;
		generatorProperties.saturation = Math.random() * 40 + 30;
	}

	function createShades(generator: GeneratorProps): PalewindPaletteShade[] {
		let result: PalewindPaletteShade[] = [];
		for (let i = 0; i < defaultShades.length; i++) {
			const shadeName = defaultShades[i];
			const fraction = (i + 0.5) / defaultShades.length;
			result.push({
				id: shadeName,
				color: hslToHex(
					generator.hue + generator.hueShift * (i - (defaultShades.length - 1) / 2),
					generator.saturation,
					(1 - fraction) * 100
				),
			});
		}
		return result;
	}

	function createColor() {
		let p = get(palette);
		let newIndex = p.push({ colorName: colorName, shades: previewShades }) - 1;
		palette.set(p);
		$windowName = `color/${newIndex}`;
	}
</script>

<div class="custom-scrollbar flex flex-col overflow-auto">
	<div class="p-4">
		<h1 class="mb-4 text-2xl">New Color</h1>
		<!-- svelte-ignore a11y-autofocus -->
		<input autofocus type="text" class="interactive px-2 py-1" bind:value={colorName} />
		<button on:click={createColor} class="interactive interactive-primary px-4 py-1"
			>Create Color</button
		>
		<div class="mb-4 mt-4 flex flex-col rounded-lg bg-slate-950 pb-4">
			<h2 class="my-2 pl-4 text-lg text-slate-400">Generator Properties</h2>
			<label class="flex gap-4">
				<div class="w-24 text-right">Hue</div>
				<input type="range" bind:value={generatorProperties.hue} max={360} />
			</label>
			<label class="flex gap-4">
				<div class="w-24 text-right">Hue Shift</div>
				<input
					type="range"
					bind:value={generatorProperties.hueShift}
					min={-20}
					max={20}
					step={0.1}
				/>
			</label>
			<label class="flex gap-4">
				<div class="w-24 text-right">Saturation</div>
				<input type="range" bind:value={generatorProperties.saturation} max={100} />
			</label>
			<button on:click={randomizeGenerator} class="interactive mx-4 mt-4 w-fit px-4 py-1"
				>Randomize</button
			>
		</div>
	</div>

	<ShadeEditor bind:shades={previewShades} />
</div>
