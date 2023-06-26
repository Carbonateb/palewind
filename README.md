# Palewind

Palewind (Palette + Tailwind) is a palette editor designed specifically for Tailwind projects. It uses the same format to store colors as `tailwind.config.cjs`, so you can simply copy and paste the colors object into the editor.

When copying the object, ensure you just grab everything between (and including) the curly braces for the color object.

```js
const config = {
	theme: {
		colors: {
			// <- Copy this bracket...

			white: "#ffffff",
			gray: {
				50: "#f9fafb",
				100: "#f1f5f9",
				// ...
			},
		}, // <- ...to this one (inclusive)
	},
};
```

Also, you will notice that adding new colors will automatically create the 50-950 shade scale used commonly in Tailwind.

The preloaded color palette features a handful of colors from the [default Tailwind palette](https://tailwindcss.com/docs/customizing-colors) to get you started. It also has single colors for things like transparent, inherit, white and black. It's setup this way to let you replace Tailwind's default palette with your own (i.e. don't put it in `theme.extend`).

Tip: take a look at the preloaded palette, notice the shape that the nodes make - they are not linear, don't worry about making a geometrical palette.

## Color Editor

The concept for the editor was taken from the excellent [palettte.app](https://palettte.app/) by [Gabriel Schneider](https://twitter.com/gabdorf).

- The orange (left) node is **hue**
- The gray (middle) node is **saturation**
- The black (right) node is **value**

You can rename individual shades by clicking its name at the top.

Click a shade to input a hex color manually (at the bottom).

Small quirk: Due to converting between HSV and RGB, you may see nodes move by themselves after editing them. The color itself is not changing, just the node.

# Code

Palewind is made with [SvelteKit](https://kit.svelte.dev/) because it's my favorite thing in the world.

The first working version was created in just over a day's work!

Given its rapid development, the code is currently a bit messy. I will clean it up sometime in the future.

The site is being hosted by [Cloudflare Pages](https://pages.cloudflare.com/).

# TODO / Ideas for the future

- [ ] Create a logo
- [ ] Clean up UI
- [ ] Add lines between nodes (like in palettte.app)
- [ ] Allow changing color spaces
  - [ ] HSV
  - [ ] HSB
  - [ ] RGB
- [ ] Revamped palette creation page
  - [ ] Specify starting color
  - [ ] Hue shift
  - [ ] Saturation
- [ ] Edit single colors
- [ ] Integrate Tailwind's `DEFAULT` color feature
- [ ] More manual input options (RGB, HSV)
- [ ] Color utils to check contrast
- [ ] Drag & drop to rearrange
  - [ ] For shades
  - [ ] For colors
- [ ] Undo history
- [ ] Multiple "projects"

Crazy ideas:

- [ ] A palette sharing section, browse & upload user made palettes.
- [ ] Open config file directly and provide live updates
