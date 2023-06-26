import { get, writable, type Writable } from "svelte/store";
import type { PalewindPaletteShade } from "./palette";

export const currentColorShade: Writable<number> = writable(-1);
