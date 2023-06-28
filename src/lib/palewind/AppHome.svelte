<script lang="ts">
	import { isOnline } from "$lib/detectPWA";
	import ProjectManager from "./ProjectManager.svelte";
</script>

<div class="custom-scrollbar overflow-y-auto p-16 pr-8 text-slate-300">
	<div class="mb-8 flex items-center gap-4 text-6xl text-slate-50">
		<img src="/logo.svg" class="w-16" alt="Logo" /> Palewind
	</div>
	<div class="mt-8">
		<ProjectManager />
	</div>
</div>
