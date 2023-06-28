<script lang="ts">
	import { isOnline } from "$lib/detectPWA";
</script>

<div class="m-16 max-w-lg text-slate-300">
	<div class="mb-8 flex items-center gap-4 text-6xl text-slate-50">
		<img src="/logo.svg" class="w-16" alt="Logo" /> Palewind
	</div>
	<p>Welcome back</p>
	{#if !$isOnline}
		<p class="text-sm text-orange-300">Running in offline mode</p>
	{/if}
</div>
