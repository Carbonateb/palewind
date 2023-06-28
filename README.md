Available at [**palewind.pages.dev**](https://palewind.pages.dev)

# Palewind

Palewind (Palette + Tailwind) is a palette editor designed specifically for Tailwind projects. It uses the same format to store colors as `tailwind.config.cjs`, so you can simply copy and paste the colors object into the editor.

When copying the object, ensure you just grab everything between (and including) the curly braces for the color object.

```js
const config = {
	theme: {
		//      ↓ Copy this bracket...
		colors: {
			white: "#ffffff",
			gray: {
				50: "#f9fafb",
				100: "#f1f5f9",
				// [...]
			},
		}, // ← ...to this one (inclusive)
	},
};
```

Also, you will notice that adding new colors will automatically create the 50-950 shade scale used commonly in Tailwind.

The preloaded color palette features a handful of colors from the [default Tailwind palette](https://tailwindcss.com/docs/customizing-colors) to get you started. It also has single colors for things like transparent, inherit, white and black. It's setup this way to let you replace Tailwind's default palette with your own (i.e. don't put it in `theme.extend`).

Tip: take a look at the preloaded palette, notice the shape that the nodes make - they are not linear, don't worry about making a geometrical palette.

## Color Editor

The concept for the editor was taken from the excellent [palettte.app](https://palettte.app/) by [Gabriel Schneider](https://twitter.com/gabdorf). I have extended it with my own ideas.

### How to use

- The orange (left) node is **hue**
- The gray (middle) node is **saturation**
- The black (right) node is **value**

You can rename individual shades by clicking its name at the top.

Click a shade to input a hex color manually (at the bottom).

Small quirk: Due to converting between HSV and RGB, you may see nodes move by themselves after editing them. **The color itself is not changing**, just the node. The effect is stronger when working with very light or dark colors.

## Why make another palette tool?

In addition to most of the reasons why palettte.app exists, Palewind brings the following advantages:

- Works directly with your tailwind config
- A robust color generator for a solid starting point
- More efficient use of space
  - Can comfortably display an 11-shade (50-950) color using half a 1080p monitor
  - Gives you more room for other windows
- Nodes never overlap each other
- Edit shade names quickly
  - You probably won't even need to if you're using the 50-950 scale
- Open sourced under them MIT license
- Quickly visualize all colors in a palette at a glance (via the preview icons)
- Offline support

**Coming soon:**

- A project manager to store your palettes
- Work across different color spaces (HSL, HSV, RGB)
- The fastest way to edit colors (with turbo mode)

# Code

Palewind is made with [SvelteKit](https://kit.svelte.dev/) because it's my favorite thing in the world.

The first working version was created in just over a day's work!

~~Given its rapid development, the code is currently a bit messy. I will clean it up sometime in the future.~~ This has been cleaned up now.

The site is being hosted by [Cloudflare Pages](https://pages.cloudflare.com/).

# TODO / Ideas for the future

- [x] Clean up the code
- [x] Create a logo
- [x] Clean up UI
- [x] Add meta tags
- [x] Add og:image
- [ ] PWA
- [ ] Add lines between nodes (like in palettte.app)
- [ ] Add turbo edit mode (hold modifier key + drag to set color)
- [ ] Allow changing color spaces
  - [ ] HSV
  - [ ] HSB
  - [ ] RGB
- [x] Revamped palette creation page
  - [x] Specify starting color
  - [x] Hue shift
  - [x] Saturation
- [ ] Edit single colors
- [ ] Integrate Tailwind's `DEFAULT` color feature
- [ ] More manual input options (RGB, HSV)
- [ ] Color utils to check contrast
  - [x] Visualizer for white / black text on color
- [ ] More import / export options
- [ ] Drag & drop to rearrange
  - [ ] For shades
  - [ ] For colors
- [ ] Undo history
- [ ] Multiple "projects"

Crazy ideas:

- [ ] A palette sharing section, browse & upload user made palettes.
- [ ] Open config file directly and provide live updates

# Bonus

```js
{
	palewind: {
		tl: "#f97415",
		tm: "#94a3b8",
		tr: "#171717",
		bl: "#ea6720",
		bm: "#64748b",
		br: "#000000"
	}
}
```

Import that 🙂
