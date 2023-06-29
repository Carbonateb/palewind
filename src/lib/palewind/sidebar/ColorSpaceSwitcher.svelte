<script lang="ts">
	import { colorSpace } from "$lib/palewind/settings/ColorSpace";

	$colorSpace;
</script>

<div class="p-4">
	<div class="mb-2 text-xs uppercase text-slate-400">Color Space</div>
	<div class="flex gap-0.5">
		<button class:active={$colorSpace == "hsl"} on:click={() => ($colorSpace = "hsl")}>HSL</button>
		<button class:active={$colorSpace == "hsv"} on:click={() => ($colorSpace = "hsv")}>HSV</button>
		<button class:active={$colorSpace == "rgb"} on:click={() => ($colorSpace = "rgb")}>RGB</button>
	</div>
</div>

<style lang="postcss">
	button {
		@apply highlight h-5 flex-grow rounded bg-slate-800 text-xs text-slate-500 hover:bg-slate-700;
	}
	button:first-child {
		@apply rounded-l-lg;
	}
	button:last-child {
		@apply rounded-r-lg;
	}
	button.active {
		@apply bg-slate-600 text-slate-300;
	}
</style>
