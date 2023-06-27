import { get, writable, type Writable } from "svelte/store";
import { currentColorSet, type PalewindPaletteShade } from "./palette";
import { windowName } from "./Palewind";

export const currentColorShade: Writable<number> = writable(-1);

windowName.subscribe((newValue) => {
	if (newValue.startsWith("color/")) {
		let color = parseInt(newValue.replace("color/", ""));
		currentColorSet.set(color);
		console.log(color);
	} else {
		currentColorSet.set(-1);
	}
	currentColorShade.set(-1);
});
