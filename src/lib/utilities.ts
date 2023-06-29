// From https://stackoverflow.com/a/44134328
export function hslToHex(h: number, s: number, l: number) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0"); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

// From https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
export function hexToHSL(hex: string) {
	// Convert hex to RGB first
	let r: any = 0,
		g: any = 0,
		b: any = 0;
	if (hex.length == 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];
	} else if (hex.length == 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {
		hue: h,
		sat: s,
		val: l,
	};
}

export function prettyPrint(str: string) {
	// Adds spaces before caps: "someTestURL" becomes "some Test URL"
	str = str.replace(/([^A-Z])([A-Z])/g, "$1 $2");

	// Replaces dashes and underscores with spaces
	str = str.replace(/[-_]/g, " ");

	// Capitalizes the first letter
	str = str.charAt(0).toUpperCase() + str.slice(1);

	return str.trim();
}

/**
 * Colors are stored in arrays of three elements, like [r, g, b] or [h, s, l].
 *
 * All numeric values are expected in the range 0-1
 *
 * Code adapted from http://www.easyrgb.com/en/math.php
 * (unless otherwise noted)
 */
export namespace ColorConvert {
	// Adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
	export function RGBToHex([r, g, b]: number[]) {
		let rHex = Math.floor(r * 255).toString(16);
		let gHex = Math.floor(g * 255).toString(16);
		let bHex = Math.floor(b * 255).toString(16);

		// Zero pad them
		if (rHex.length == 1) rHex = "0" + rHex;
		if (gHex.length == 1) gHex = "0" + gHex;
		if (bHex.length == 1) bHex = "0" + bHex;

		return "#" + rHex + gHex + bHex;
	}

	// Adapted from https://css-tricks.com/converting-color-spaces-in-javascript/
	export function hexToRGB(hex: string) {
		let r: any = 0,
			g: any = 0,
			b: any = 0;

		if (hex.length == 4) {
			// 3 digits
			r = "0x" + hex[1] + hex[1];
			g = "0x" + hex[2] + hex[2];
			b = "0x" + hex[3] + hex[3];
		} else if (hex.length == 7) {
			// 6 digits
			r = "0x" + hex[1] + hex[2];
			g = "0x" + hex[3] + hex[4];
			b = "0x" + hex[5] + hex[6];
		}

		return [r / 255, g / 255, b / 255];
	}

	/**
	 * R, G and B input range = 0 ÷ 255
	 * H, S and L output range = 0 ÷ 1.0
	 */
	export function RGBtoHSL([r, g, b]: number[]) {
		let min = Math.min(r, g, b); // min. value of RGB
		let max = Math.max(r, g, b); // max. value of RGB
		let delta = max - min; // Delta RGB value

		let h = 0;
		let s = 0;
		let l = (max + min) / 2;

		if (delta == 0) {
			// This is a gray, no chroma...
			h = 0;
			s = 0;
		} else {
			// Chromatic data...
			if (l < 0.5) s = delta / (max + min);
			else s = delta / (2 - max - min);

			let deltaR = ((max - r) / 6 + delta / 2) / delta;
			let deltaG = ((max - g) / 6 + delta / 2) / delta;
			let deltaB = ((max - b) / 6 + delta / 2) / delta;

			if (r == max) h = deltaB - deltaG;
			else if (g == max) h = 1 / 3 + deltaR - deltaB;
			else if (b == max) h = 2 / 3 + deltaG - deltaR;

			if (h < 0) h += 1;
			if (h > 1) h -= 1;
		}
		return [h, s, l];
	}

	/**
	 * H, S and L input range = 0 ÷ 1.0
	 * R, G and B output range = 0 ÷ 255
	 */
	export function HSLtoRGB([h, s, l]: number[]) {
		let r = 0;
		let g = 0;
		let b = 0;

		if (s == 0) {
			r = l;
			g = l;
			b = l;
		} else {
			let var_2;
			if (l < 0.5) var_2 = l * (1 + s);
			else var_2 = l + s - s * l;

			let var_1 = 2 * l - var_2;

			r = hueToRGB(var_1, var_2, h + 1 / 3);
			g = hueToRGB(var_1, var_2, h);
			b = hueToRGB(var_1, var_2, h - 1 / 3);
		}

		return [r, g, b];
	}

	function hueToRGB(v1: number, v2: number, vH: number) {
		if (vH < 0) vH += 1;
		if (vH > 1) vH -= 1;
		if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH;
		if (2 * vH < 1) return v2;
		if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
		return v1;
	}

	/**
	 * R, G and B input range = 0 ÷ 255
	 * H, S and V output range = 0 ÷ 1.0
	 */
	export function RGBToHSV([R, G, B]: number[]) {
		let var_Min = Math.min(R, G, B); // Min. value of RGB
		let var_Max = Math.max(R, G, B); // Max. value of RGB
		let delta = var_Max - var_Min; // Delta RGB value

		let H = 0;
		let S = 0;
		let V = var_Max;

		if (delta == 0) {
			// This is a gray, no chroma...
			H = 0;
			S = 0;
		} else {
			// Chromatic data...
			S = delta / var_Max;

			let del_R = ((var_Max - R) / 6 + delta / 2) / delta;
			let del_G = ((var_Max - G) / 6 + delta / 2) / delta;
			let del_B = ((var_Max - B) / 6 + delta / 2) / delta;

			if (R == var_Max) H = del_B - del_G;
			else if (G == var_Max) H = 1 / 3 + del_R - del_B;
			else if (B == var_Max) H = 2 / 3 + del_G - del_R;

			if (H < 0) H += 1;
			if (H > 1) H -= 1;
		}

		return [H, S, V];
	}

	/**
	 * H, S and V input range = 0 ÷ 1.0
	 * R, G and B output range = 0 ÷ 255
	 */
	export function HSVToRGB([H, S, V]: number[]) {
		let R = 0;
		let G = 0;
		let B = 0;

		if (S == 0) {
			R = V;
			G = V;
			B = V;
		} else {
			let var_h = H * 6;
			if (var_h == 6) var_h = 0; //H must be < 1
			let var_i = Math.floor(var_h);
			let var_1 = V * (1 - S);
			let var_2 = V * (1 - S * (var_h - var_i));
			let var_3 = V * (1 - S * (1 - (var_h - var_i)));

			if (var_i == 0) {
				R = V;
				G = var_3;
				B = var_1;
			} else if (var_i == 1) {
				R = var_2;
				G = V;
				B = var_1;
			} else if (var_i == 2) {
				R = var_1;
				G = V;
				B = var_3;
			} else if (var_i == 3) {
				R = var_1;
				G = var_2;
				B = V;
			} else if (var_i == 4) {
				R = var_3;
				G = var_1;
				B = V;
			} else {
				R = V;
				G = var_1;
				B = var_2;
			}
		}
		return [R, G, B];
	}
}
