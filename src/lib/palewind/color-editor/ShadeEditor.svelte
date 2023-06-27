<script lang="ts">
	import PalewindColorEditor from "./PalewindColorEditor.svelte";
	import type { PalewindPaletteShade } from "../palette";

	export var shades: PalewindPaletteShade[] = [];
</script>

<div class="custom-scrollbar flex flex-grow gap-0 overflow-x-auto px-4 pb-4">
	{#each shades as shade, index}
		<PalewindColorEditor bind:shade {index} />
	{/each}
</div>
