<script lang="ts">
	import ColorList from "./ColorList.svelte";
	import { windowName } from "../Palewind";
	import { fade } from "svelte/transition";
</script>

<nav class="flex h-full max-h-full flex-col overflow-auto border-r border-slate-600">
	<div class="mb-2">
		<button
			on:click={() => ($windowName = "")}
			class="relative flex h-12 w-full items-center justify-center gap-1 border-b border-gray-600"
		>
			{#if $windowName == ""}
				<span
					transition:fade
					class="absolute inset-0 bg-slate-800 pt-2 text-xs text-slate-500"
					title="Translation: by '🧡' he means Svelte">Made with 🧡 by Carbonateb</span
				>
			{:else}
				<img transition:fade src="/logo.svg" class="w-6" alt="Logo" />
				<span transition:fade class="text-2xl">Palewind</span>
			{/if}
		</button>
	</div>
	<button on:click={() => ($windowName = "import")} class:selected={$windowName == "import"}>
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
			class="lucide lucide-folder-input"
			><path
				d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"
			/><path d="M2 13h10" /><path d="m9 16 3-3-3-3" /></svg
		>Import</button
	>
	<button on:click={() => ($windowName = "export")} class:selected={$windowName == "export"}>
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
			class="lucide lucide-folder-output"
			><path
				d="M2 7.5V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2"
			/><path d="M2 13h10" /><path d="m5 10-3 3 3 3" /></svg
		>Export</button
	>
	<button on:click={() => ($windowName = "newcolor")} class:selected={$windowName == "newcolor"}>
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
			class="lucide lucide-plus"
			><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg
		>New Color</button
	>

	<h2 class="mt-8 px-4 text-xs uppercase text-slate-400">Colors</h2>

	<!-- Colors -->
	<div class="custom-scrollbar flex-grow overflow-y-auto border-y border-slate-600">
		<ColorList />
	</div>

	<!-- Extras -->
	<a href="https://github.com/Carbonateb/palewind">
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
			class="lucide lucide-github"
			><path
				d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
			/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
		>GitHub
	</a>
</nav>

<style lang="postcss">
	a,
	nav > button {
		@apply flex items-center gap-4 py-1 pl-4 text-slate-400 hover:bg-slate-800 hover:text-slate-100;
	}

	nav > button.selected {
		@apply bg-slate-700 text-slate-100;
	}
</style>
