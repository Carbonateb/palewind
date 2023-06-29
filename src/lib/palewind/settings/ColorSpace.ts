import { writable, type Writable } from "svelte/store";

const keyName = "colorSpace";

export type ColorSpace = "hsv" | "hsl" | "rgb";

export const colorSpace: Writable<ColorSpace> = writable(readColorModeFromStorage());

function readColorModeFromStorage(): ColorSpace {
	switch (localStorage.getItem(keyName)) {
		case "hsl":
			return "hsl";
		case "hsv":
			return "hsv";
		case "rgb":
			return "rgb";
		default:
			return "hsl";
	}
}

colorSpace.subscribe((value) => {
	localStorage.setItem(keyName, value.toString());
});
