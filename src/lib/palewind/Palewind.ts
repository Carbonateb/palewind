import { ColorConvert, prettyPrint } from "$lib/utilities";
import { get, writable, type Writable } from "svelte/store";

/** A single "project". Contains many colors, which have shades. */
export type PalewindPalette = PalewindColorSet[];

/** A color in a project. Can have shades, or be a single color. */
export interface PalewindColorSet {
	colorName: string;
	shades: PalewindPaletteShade[];
	// defaultColor: string;
	singleColor?: string;
}

/** A single shade in a color set */
export interface PalewindPaletteShade {
	id: string;
	color: string;
}

export interface PalewindProject {
	id: string;
	name: string;
	palette: PalewindPalette;
}

/**
 * Basically our mini URL, used for client side navigation within the app.
 * It corresponds to the navbar on the left side.
 * Can be:
 * - "" (about page, default)
 * - "export"
 * - "import"
 * - "newcolor"
 * - "color/N" where N is the internal ID of a color we are editing.
 */
export const windowName: Writable<string> = writable("");

/** The current palette we are editing. Colors are visible in side bar */
export const palette: Writable<PalewindPalette> = writable([]);

/**
 * Corresponds to the color index we have open. Is -1 if not editing a color.
 * @deprecated use windowName instead.
 */
export const currentColorSet: Writable<number> = writable(-1);

/**
 * The color shade that is currently being edited. This is a single shade.
 * Used by the "more info" panel when editing a color.
 *
 * -1 means we are not editing a color.
 */
export const currentColorShade: Writable<number> = writable(-1);

/**
 * Used to import a palette from a string.
 * Overwrites the current palette with the result
 *
 * Warning: Works by using eval(), as the JSON parser is not flexible enough
 * (tailwind config file is JS not JSON, so it might have slightly different syntax)
 *
 * TODO rewrite this to not use eval().
 * Not urgent as this app does not handle sensitive info
 *
 * @param input The string to import
 */
export function readPaletteFromString(input: string) {
	let object = eval(`(()=>(${input}))()`) as {
		[colorName: string]: { [shadeName: string]: string } | string;
	};

	let result: PalewindColorSet[] = [];

	for (const colorName in object) {
		const element = object[colorName];

		if (typeof element == "string") {
			// Single color
			result.push({
				colorName: colorName,
				shades: [],
				singleColor: element,
			});
		} else if (typeof element == "object") {
			// We are dealing with a list of colours (shades)
			let shades: PalewindPaletteShade[] = [];

			for (const shadeName in element) {
				const shade = element[shadeName];
				shades.push({ color: shade, id: shadeName });
			}

			result.push({
				colorName: colorName,
				shades: shades,
			});
		} else {
			console.log("Unknown thing: ", colorName, " : ", element);
		}
	}

	return result;
}

/**
 * @deprecated Use readPaletteFromString, the pure version of this function
 */
export function setPaletteFromString(input: string) {
	palette.set(readPaletteFromString(input));
}

/** Exports the current palette to a JSON string. */
export function exportColorsToJson() {
	let configReplica: {
		[colorName: string]: { [shadeName: string]: string } | string;
	} = {};

	let p = get(palette);

	for (const color of p) {
		if (color.singleColor) {
			configReplica[color.colorName] = color.singleColor;
		} else {
			let attach: { [shadeName: string]: string } = {};
			for (const shade of color.shades) {
				attach[shade.id] = shade.color;
			}
			configReplica[color.colorName] = attach;
		}
	}

	return JSON.stringify(configReplica, undefined, "  ");
}

/** Exports the current palette to a JSON string, in HSL. */
export function exportColorsToCss() {
	let result = "";

	let p = get(palette);

	for (const color of p) {
		if (color.singleColor) {
			result += `--${color.colorName}: ${color.singleColor};\n`;
		} else {
			result += `\n/* ${prettyPrint(color.colorName)} */\n`;
			for (const shade of color.shades) {
				let hsl = ColorConvert.RGBtoHSL(ColorConvert.hexToRGB(shade.color));
				let split = `${Math.floor(hsl[0] * 360)} ${Math.round(hsl[1] * 100)}% ${Math.round(
					hsl[2] * 100
				)}%`;
				result += `--${color.colorName}-${shade.id}: ${split};\n`;
			}
		}
	}

	return result;
}

// Called when the user navigates around
windowName.subscribe((newValue) => {
	if (newValue.startsWith("color/")) {
		let color = parseInt(newValue.replace("color/", ""));
		currentColorSet.set(color);
	} else {
		currentColorSet.set(-1);
	}
	currentColorShade.set(-1);
});
