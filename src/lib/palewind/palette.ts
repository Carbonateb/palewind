import { get, writable, type Writable } from "svelte/store";

/**
 * This is where we'd add meta data, like if it overrides or extends
 */
export type PalewindPalette = PalewindColorSet[];

export interface PalewindColorSet {
	colorName: string;
	shades: PalewindPaletteShade[];
	// defaultColor: string;
	singleColor?: string;
}

export interface PalewindPaletteShade {
	id: string;
	color: string;
}
// tahiti: {
// 	100: "#cffafe",
// 	200: "#a5f3fc",
// 	300: "#67e8f9",
// 	400: "#22d3ee",
// 	500: "#06b6d4",
// 	600: "#0891b2",
// 	700: "#0e7490",
// 	800: "#155e75",
// 	900: "#164e63",
// },

export const palette: Writable<PalewindPalette> = writable([]);

export const currentColorSet: Writable<number> = writable(-1);

/*
{
	transparent: "transparent",
	current: "currentColor",
	white: "#ffffff",
	tahiti: {
		100: "#cffafe",
		200: "#a5f3fc",
		300: "#67e8f9",
		400: "#22d3ee",
		500: "#06b6d4",
		600: "#0891b2",
		700: "#0e7490",
		800: "#155e75",
		900: "#164e63",
	}
}
*/
export function setPaletteFromJson(json: string) {
	// JSON requires all keys be wrapped in double quotes.
	// This regex will find un-quoted keys
	// let matchResults = json.matchAll(/\s(\w*):/g);
	// for (const match of matchResults) {
	// 	console.log(match);
	// 	let replacement = match[0].replace(match[1], `"${match[1]}"`);
	// 	json = json.replace(match[0], replacement);
	// }

	let object = eval(`(()=>(${json}))()`) as {
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

	palette.set(result);
}

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
