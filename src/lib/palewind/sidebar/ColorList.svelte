<script lang="ts">
	import { prettyPrint } from "$lib/utilities";
	import { windowName, currentColorSet, palette } from "../Palewind";

	function deleteColor(index: number) {
		console.log($currentColorSet, index);

		if ($currentColorSet >= index) {
			if ($palette.length == 1) {
				// User just deleted last color, go to new color window
				$windowName = "newcolor";
			} else {
				// Go to previous color
				$windowName = `color/${$currentColorSet - 1}`;
			}
		}
		$palette.splice(index, 1);
		$palette = $palette;
	}
</script>

{#if $palette}
	{#each $palette as colorSet, i}
		{#if colorSet.singleColor == undefined}
			<!-- Color palette -->
			<button
				on:click={() => ($windowName = `color/${i}`)}
				class="palette-selector flex w-full items-center gap-4 py-1 pl-4 pr-2 text-left text-slate-400 hover:bg-slate-800 hover:text-slate-100"
				class:active={$windowName == `color/${i}`}
			>
				<!-- Color preview -->
				<div
					class="flex min-h-[0.75rem] w-3 flex-wrap overflow-hidden rounded-sm outline outline-1 outline-slate-300"
				>
					{#each colorSet.shades as shade}
						<div class="min-h-[0.25rem] w-1 flex-grow" style="background-color: {shade.color};" />
					{/each}
				</div>

				<!-- Color name -->
				<div class="flex-grow text-sm text-inherit">
					{prettyPrint(colorSet.colorName)}
				</div>

				<!-- Delete button -->
				<button
					class="rounded opacity-0 hover:bg-red-500"
					on:click|stopPropagation={() => deleteColor(i)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</button>
			</button>
		{:else}
			<!-- Single color -->
			<div
				class="palette-selector flex items-center pl-4 pr-2"
				title="Single colors cannot be edited yet, change them in the config manually"
			>
				<!-- Round preview -->
				<div
					style="background-color: {colorSet.singleColor}; box-shadow: inset 0 0 4px #00000060"
					class="mr-4 h-3 w-3 rounded-full border border-slate-300"
				/>

				<!-- Color name -->
				<div class="flex-grow text-sm text-slate-600">
					{prettyPrint(colorSet.colorName)}
				</div>

				<!-- Delete button -->
				<button
					class="rounded opacity-0 hover:bg-red-500"
					on:click|stopPropagation={() => deleteColor(i)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
					>
				</button>
			</div>
		{/if}
	{/each}
{/if}

<style lang="postcss">
	.palette-selector:hover > button {
		@apply opacity-100;
	}
	button.active {
		@apply bg-slate-700 text-slate-100;
	}
</style>
