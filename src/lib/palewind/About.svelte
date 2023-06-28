<script>
	import { windowName } from "./Palewind";
</script>

<div class="m-16 max-w-lg text-slate-300">
	<div class="mb-8 flex items-center gap-4 text-6xl text-slate-50">
		<img src="/logo.svg" class="w-16" alt="Logo" /> Palewind
	</div>
	<p class="font-bold text-slate-100">A palette editor specifically designed for Tailwind users.</p>
	<p>
		It works with the Tailwind config file, and uses the standard 50-950 scale by default so you can
		get straight to business.
	</p>
	<p>
		The concept for the editor itself is based on <a href="https://palettte.app">palettte.app</a>.
	</p>
	<h1>Get Started</h1>
	<p>
		If you've got some colours in your config file already, head over to <button
			on:click={() => ($windowName = "import")}>Import</button
		> and paste your color object there.
	</p>
	<p>If not, you can use the preloaded palette as a good starting point.</p>
	<p class="text-orange-300">Pro tip: Use Palewind without internet by installing the PWA</p>
	<h1>Find Out More</h1>
	<p>
		The README of the <a href="https://github.com/Carbonateb/palewind">GitHub repository</a> has much
		more information. Please file any issues / feedback there. Contributions are welcome!
	</p>
</div>

<style lang="postcss">
	h1 {
		@apply mt-12 text-2xl text-slate-400;
	}

	p {
		@apply mb-3 leading-relaxed;
	}

	a,
	button {
		@apply text-sky-400;
	}
</style>
