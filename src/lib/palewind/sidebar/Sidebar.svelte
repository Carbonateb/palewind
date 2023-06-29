<script lang="ts">
	import ColorList from "./ColorList.svelte";
	import { windowName } from "../Palewind";
	import { fade } from "svelte/transition";
	import ColorSpaceSwitcher from "./ColorSpaceSwitcher.svelte";
</script>

<nav class="flex h-full max-h-full flex-col overflow-auto border-r border-slate-600">
	<div class="mb-2">
		<button
			on:click={() => ($windowName = "")}
			class="relative flex h-12 w-full items-center justify-center gap-1 border-b border-gray-600"
		>
			{#if $windowName == ""}
				<a
					href="https://github.com/Carbonateb/palewind"
					transition:fade
					class="absolute inset-0 bg-slate-800 pt-2 text-xs text-slate-500"
					title="Translation: by '🧡' he means Svelte">Made with 🧡 by Carbonateb</a
				>
			{:else}
				<img transition:fade src="/logo.svg" class="w-6" alt="Logo" />
				<span transition:fade class="text-2xl">Palewind</span>
			{/if}
		</button>
	</div>
	<button
		class="nav-item"
		on:click={() => ($windowName = "import")}
		class:selected={$windowName == "import"}
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
			class="lucide lucide-folder-input"
			><path
				d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"
			/><path d="M2 13h10" /><path d="m9 16 3-3-3-3" /></svg
		>Import</button
	>
	<button
		class="nav-item"
		on:click={() => ($windowName = "export")}
		class:selected={$windowName == "export"}
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
			class="lucide lucide-folder-output"
			><path
				d="M2 7.5V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2"
			/><path d="M2 13h10" /><path d="m5 10-3 3 3 3" /></svg
		>Export</button
	>
	<button
		class="nav-item"
		on:click={() => ($windowName = "newcolor")}
		class:selected={$windowName == "newcolor"}
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
	<ColorSpaceSwitcher />
</nav>

<style lang="postcss">
	.nav-item {
		@apply flex items-center gap-4 py-1 pl-4 text-slate-400 hover:bg-slate-800 hover:text-slate-100;
	}

	nav > button.selected {
		@apply bg-slate-700 text-slate-100;
	}
</style>
