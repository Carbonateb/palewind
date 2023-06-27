<script lang="ts">
	export let value: number;
	export let max = 100;
	export let color = "transparent";
	export let isPressed = false;

	let track: HTMLDivElement;

	$: thumbOffset = (1 - value / max) * 100;

	function onThumbPressed(ev: MouseEvent) {
		isPressed = true;
		function onMouseMove(ev: MouseEvent) {
			let newValue = value - ev.movementY / (track.getBoundingClientRect().height / max);
			value = Math.max(Math.min(newValue, max), 0);
		}

		function onMouseUp(ev: MouseEvent) {
			onMouseMove(ev);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			isPressed = false;
		}

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}
</script>

<div class="w-4 overflow-visible py-2" class:pressed={isPressed}>
	<div bind:this={track} class="track-inner relative mx-auto h-full w-1 rounded-full">
		<div
			class="thumb"
			style="left: -6px; top: calc({thumbOffset}% - 8px); background-color: {color};"
			on:mousedown={onThumbPressed}
			role="slider"
			aria-valuenow={value}
			tabindex="-1"
		/>
	</div>
</div>

<style lang="postcss">
	.pressed > .track-inner {
		@apply bg-white/80;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
	}
	.thumb {
		@apply absolute h-4 w-4 cursor-grab rounded-full border-2 border-white transition-all hover:bg-white;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.33);
	}
	.pressed .thumb {
		@apply cursor-grabbing transition-none;
	}
</style>
