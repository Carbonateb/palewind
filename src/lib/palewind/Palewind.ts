import { get, writable, type Writable } from "svelte/store";

export const windowName: Writable<string> = writable("");

export const currentColorShade: Writable<number> = writable(-1);

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

export const palette: Writable<PalewindPalette> = writable([]);

export const currentColorSet: Writable<number> = writable(-1);

export function setPaletteFromJson(json: string) {
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

windowName.subscribe((newValue) => {
	if (newValue.startsWith("color/")) {
		let color = parseInt(newValue.replace("color/", ""));
		currentColorSet.set(color);
	} else {
		currentColorSet.set(-1);
	}
	currentColorShade.set(-1);
});

export const defaultPaletteString = `{
	transparent: "transparent",
	current: "currentColor",
	white: "#ffffff",
	black: "#000000",
	gray: {
		50: "#f9fafb",
		100: "#f1f5f9",
		200: "#e2e8f0",
		300: "#cbd5e1",
		400: "#94a3b8",
		500: "#64748b",
		600: "#475569",
		700: "#334155",
		800: "#1e293b",
		900: "#0f172a",
		950: "#020617",
	},
	sky: {
		50: "#f0f9ff",
		100: "#e0f2fe",
		200: "#bae6fd",
		300: "#7dd3fc",
		400: "#38bdf8",
		500: "#0ea5e9",
		600: "#0284c7",
		700: "#0369a1",
		800: "#075985",
		900: "#0c4a6e",
		950: "#082f49",
	},
	green: {
		50: "#f0fdf4",
		100: "#dcfce7",
		200: "#bbf7d0",
		300: "#86efac",
		400: "#4ade80",
		500: "#22c55e",
		600: "#16a34a",
		700: "#15803d",
		800: "#166534",
		900: "#14532d",
		950: "#052e16",
	},
	orange: {
		50: "#fff7ed",
		100: "#ffedd5",
		200: "#fed7aa",
		300: "#fdba74",
		400: "#fb923c",
		500: "#f97316",
		600: "#ea580c",
		700: "#c2410c",
		800: "#9a3412",
		900: "#7c2d12",
		950: "#431407",
	},
}`;
