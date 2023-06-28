import { get, writable, type Writable } from "svelte/store";

export const isPWA: Writable<boolean> = writable(false);

// Initial detection of PWA (runs on startup)
{
	let displayMode = "browser tab";
	if (window.matchMedia("(display-mode: standalone)").matches) {
		displayMode = "standalone";
	}
	isPWA.set(displayMode == "standalone");
}

// Detect transfer between PWA and browser tab
window.matchMedia("(display-mode: standalone)").addEventListener("change", (event) => {
	isPWA.set(event.matches);
});
