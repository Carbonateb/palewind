<script lang="ts">
	import { onMount } from "svelte";
	import { exportColorsToJson } from "./palette";

	let exportValue: string = "";

	function exportToClipboard() {
		navigator.clipboard.writeText(exportValue);
	}

	onMount(() => {
		exportValue = exportColorsToJson();
	});
</script>

<div class="custom-scrollbar overflow-auto p-4">
	<h1 class="text-2xl">Export</h1>
	<p class="mb-8">
		Your Tailwind compatible object is here.
		<br />I'm leaving it to your dev environment to format it like the rest of your codebase.
	</p>
	<button on:click={exportToClipboard} class="interactive interactive-primary mb-4 px-4 py-1"
		>Copy to Clipboard</button
	>
	<pre class="select-text rounded bg-slate-950 p-2 text-sm text-slate-400">{exportValue}</pre>
</div>
