<script lang="ts">
	import { get } from "svelte/store";
	import {
		currentColorSet,
		palette,
		setPaletteFromJson,
		type PalewindColorSet,
		type PalewindPaletteShade,
		exportColorsToJson,
	} from "./palette";
	import PalewindColorEditor from "./PalewindColorEditor.svelte";
	import { currentColorShade } from "./currentColorShade";
	import ColorShadeInfo from "./ColorShadeInfo.svelte";
	import { hslToHex, prettyPrint } from "$lib/utilities";
	import { onMount } from "svelte";

	function onCreateNewColor() {
		let p = get(palette);
		let shades: PalewindPaletteShade[] = [];
		let defaultShades = [
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

		const randomHue = Math.random() * 360;
		const hueShift = (Math.random() - 0.5) * 10;
		const randomSat = Math.random() * 40 + 30;

		for (let i = 0; i < defaultShades.length; i++) {
			const shadeName = defaultShades[i];
			const fraction = (i + 0.5) / defaultShades.length;
			shades.push({
				id: shadeName,
				color: hslToHex(randomHue + hueShift * i, randomSat, (1 - fraction) * 100),
			});
		}
		p.push({ colorName: "unnamed", shades: shades });
		palette.set(p);
	}

	function selectColor(index: number) {
		currentColorSet.set(index);
		currentColorShade.set(-1);
	}

	function createShade() {
		let shades = $palette[$currentColorSet].shades;
		if (shades.length > 0) {
			shades.push({ ...shades[shades.length - 1] });
		} else {
			shades.push({ color: "#888888", id: "400" });
		}
		$palette[$currentColorSet].shades = shades;
	}

	function deletePalette() {
		$palette.splice($currentColorSet, 1);
		palette.set($palette);
		currentColorSet.set(-1);
	}

	let saveDialog: HTMLDialogElement;

	const defaultPalette = `{
		transparent: "transparent",
		current: "currentColor",
		white: "#ffffff",
		black: "#000",
		gray: {
			50: "#f9fafb",
			100: "#f1f5f9",
			200: "#e2e8f0",
			300: "#cbd5e1",
			400: "#94a3b8",
			500: "#64748b",
			600: "#475569",
			700: "#334155",
			800: "#1e293b",
			900: "#0f172a",
			950: "#020617",
		},
		sky: {
			50: "#f0f9ff",
			100: "#e0f2fe",
			200: "#bae6fd",
			300: "#7dd3fc",
			400: "#38bdf8",
			500: "#0ea5e9",
			600: "#0284c7",
			700: "#0369a1",
			800: "#075985",
			900: "#0c4a6e",
			950: "#082f49",
		},
		green: {
			50: "#f0fdf4",
			100: "#dcfce7",
			200: "#bbf7d0",
			300: "#86efac",
			400: "#4ade80",
			500: "#22c55e",
			600: "#16a34a",
			700: "#15803d",
			800: "#166534",
			900: "#14532d",
			950: "#052e16",
		},
		orange: {
			50: "#fff7ed",
			100: "#ffedd5",
			200: "#fed7aa",
			300: "#fdba74",
			400: "#fb923c",
			500: "#f97316",
			600: "#ea580c",
			700: "#c2410c",
			800: "#9a3412",
			900: "#7c2d12",
			950: "#431407",
		},
	}`;

	let paletteJson: string = defaultPalette;

	setPaletteFromJson(paletteJson);

	function onOpenSaveDialog() {
		paletteJson = exportColorsToJson();
		saveDialog.showModal();
	}

	function onImportPaletteJson() {
		setPaletteFromJson(paletteJson);
		currentColorSet.set(-1);
		currentColorShade.set(-1);
		saveDialog.close();
	}

	onMount(() => {
		let p = localStorage.getItem("palette");
		if (p) {
			palette.set(JSON.parse(p));
		}

		// Auto save palette
		palette.subscribe((newValue) => {
			localStorage.setItem("palette", JSON.stringify(newValue));
		});
	});
</script>

<dialog class="highlight max-w-lg rounded-lg bg-slate-800 text-slate-50" bind:this={saveDialog}>
	<div class="flex flex-col gap-2">
		<div class="text-sm text-slate-300">
			Paste your colors object (from tailwind config) here.
			<br />
			Copy it back to your config once you are done editing.
			<br />
			<span class="italic">The colors are also automatically saved to localStorage!</span>
			<br />
			<button
				class="text-orange-300"
				on:click={() => {
					paletteJson = defaultPalette;
					onImportPaletteJson();
				}}>Reset to default</button
			>
		</div>
		<textarea
			bind:value={paletteJson}
			spellcheck="false"
			onclick="this.focus();this.select()"
			class="custom-scrollbar h-64 rounded bg-slate-950 p-2 font-mono shadow focus:outline-none"
		/>
		<div class="flex gap-2">
			<button class="interactive interactive-primary h-8 flex-grow" on:click={onImportPaletteJson}
				>Import</button
			>
			<button
				class="interactive h-8 flex-grow bg-slate-600"
				on:click={() => {
					saveDialog.close();
				}}>Cancel</button
			>
		</div>
	</div>
</dialog>

<main
	class="grid h-screen w-full select-none overflow-clip bg-slate-900 text-slate-300"
	style="grid-template-columns: 10em auto;"
>
	<!-- Color select -->
	<div
		class="custom-scrollbar flex h-full flex-col gap-2 overflow-y-auto border-r border-slate-50/20"
	>
		<!-- Load/save -->
		<div>
			<div class="px-2 py-4">
				<button class="interactive interactive-primary w-full p-1" on:click={onOpenSaveDialog}
					>Load / Save</button
				>
			</div>
		</div>

		<div class="px-2 text-sm text-slate-500">Colors in palette</div>
		{#if $palette}
			{#each $palette as colorSet, i}
				{#if colorSet.singleColor == undefined}
					<button
						on:click={() => selectColor(i)}
						class="palette-selector flex items-center gap-2 px-2 py-1 text-left text-slate-400 hover:bg-slate-700 hover:text-slate-50"
						class:active={i == $currentColorSet}
					>
						<div
							class="flex min-h-[0.75rem] w-3 flex-wrap overflow-hidden rounded-sm outline outline-1 outline-slate-300"
						>
							{#each colorSet.shades as shade}
								<div
									class="min-h-[0.25rem] w-1 flex-grow"
									style="background-color: {shade.color};"
								/>
							{/each}
						</div>
						<div class="text-sm text-inherit">
							{prettyPrint(colorSet.colorName)}
						</div>
					</button>
				{/if}
			{/each}
			{#each $palette as colorSet, i}
				{#if colorSet.singleColor != undefined}
					<div
						class="mx-2 flex items-center gap-2"
						title="Single colors cannot be edited yet, change them in the config manually"
					>
						<div
							style="background-color: {colorSet.singleColor}; box-shadow: inset 0 0 4px #00000060"
							class="h-3 w-3 rounded-full border border-slate-300"
						/>
						<div class="text-sm text-slate-500">
							{prettyPrint(colorSet.colorName)}
						</div>
					</div>
				{/if}
			{/each}
			<!-- Create new color -->
			<button class="interactive interactive-primary mx-2 p-1" on:click={onCreateNewColor}
				>+ New Color</button
			>
		{/if}
	</div>

	<!-- Main editor -->
	{#if $currentColorSet != -1 && $palette}
		<div class="mt-4 flex flex-grow flex-col">
			<!-- Color info (name, create shade, delete) -->
			<div class="mx-4 mb-4 flex h-8 gap-4">
				<input
					class="interactive border-b-2 border-transparent
						  px-2"
					bind:value={$palette[$currentColorSet].colorName}
				/>

				<button class="interactive interactive-primary w-fit px-4" on:click={createShade}
					>+ Create Shade</button
				>

				<button
					class="interactive interactive-primary w-fit bg-red-500 px-4"
					on:click={deletePalette}>Delete Palette</button
				>
			</div>

			<!-- Colors -->
			<div class="custom-scrollbar flex max-w-full flex-grow gap-1 overflow-x-auto px-4 pb-4">
				{#each $palette[$currentColorSet].shades as shade, index}
					<PalewindColorEditor bind:shade {index} />
				{/each}
			</div>

			<!-- Selected color info -->
			<div class="h-32 border-t border-slate-50/20 px-4 py-2">
				{#if $currentColorShade >= 0}
					<ColorShadeInfo bind:shade={$palette[$currentColorSet].shades[$currentColorShade]} />
				{:else}
					<div class="m-auto pb-1 text-center text-sm text-slate-300">
						Select a color above to see more info
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>

<style class="postcss">
	dialog::backdrop {
		backdrop-filter: brightness(0.1);
	}

	.palette-selector.active {
		@apply bg-slate-600 text-slate-100;
	}
</style>
