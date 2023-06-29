<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let vector: number[];

	let input1: HTMLInputElement;
	let input2: HTMLInputElement;
	let input3: HTMLInputElement;

	let value = [Math.floor(vector[0]), Math.floor(vector[1]), Math.floor(vector[2])];

	const dispatch = createEventDispatcher();

	function valueChanged(event: Event) {
		value = [
			Math.floor(parseFloat(input1.value)),
			Math.floor(parseFloat(input2.value)),
			Math.floor(parseFloat(input3.value)),
		];

		dispatch("changed", value);
	}

	$: {
		value[0] = Math.floor(vector[0]);
		value[1] = Math.floor(vector[1]);
		value[2] = Math.floor(vector[2]);
	}
</script>

<div class="flex gap-1">
	<input bind:this={input1} value={value[0]} type="number" on:change={valueChanged} />
	<input bind:this={input2} value={value[1]} type="number" on:change={valueChanged} />
	<input bind:this={input3} value={value[2]} type="number" on:change={valueChanged} />
</div>

<style lang="postcss">
	input {
		@apply interactive w-16 rounded px-2 py-1;
	}
	input:first-child {
		@apply rounded-l-lg;
	}
	input:last-child {
		@apply rounded-r-lg;
	}
</style>
