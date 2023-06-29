<script lang="ts">
	import { palette } from "./Palewind";
	import { createProject, deleteProject, currentProjectID, projects } from "./Projects";

	function openProject(index: number) {
		$currentProjectID = index;
	}
</script>

<h2 class="text-2xl text-slate-400">My Projects</h2>
<p class="text-slate-500">Saved locally</p>
<div class="my-8 flex flex-wrap gap-4">
	{#each $projects as project, index}
		<button
			on:click={() => openProject(index)}
			class:active={$currentProjectID == index}
			class="project-card relative overflow-hidden rounded-lg border border-slate-700 bg-slate-950 text-left"
		>
			<!-- Color preview window -->
			<div class="color-preview flex h-32 w-64">
				{#each project.palette as colors}
					{#if colors.shades && colors.shades.length > 0}
						<div class="flex w-full flex-grow flex-col">
							{#each colors.shades as shade}
								<div class="flex-grow" style="background-color: {shade.color};" />
							{/each}
						</div>
					{/if}
				{/each}
			</div>
			<input
				type="text"
				bind:value={project.name}
				on:input={() => {
					// Will trigger a save
					$palette = $palette;
				}}
				class="w-full bg-transparent px-4 py-2 focus:outline-none"
			/>

			<button
				class="delete-button absolute right-0 top-0 m-1 rounded text-xl text-white opacity-0 hover:bg-red-500"
				on:click|stopPropagation={() => deleteProject(index)}
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
	{/each}
</div>
<button on:click={createProject} class="interactive interactive-primary px-4 py-1"
	>New Project</button
>

<style lang="postcss">
	.project-card.active {
		@apply outline outline-orange-400;
	}

	.project-card.active .color-preview {
		filter: blur(15px) brightness(1);
	}

	.project-card:not(.active) .color-preview {
		filter: blur(15px) brightness(0.66);
	}

	.project-card:hover .delete-button {
		@apply opacity-100;
	}
	.project-card.active .delete-button {
		@apply hidden;
	}
</style>
