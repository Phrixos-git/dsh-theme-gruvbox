# Gruvbox theme

A browser theme bundle for the DeepSeek Harness Web GUI. It recolors the stock interface with the
[Gruvbox](https://github.com/morhetz/gruvbox) palette and leaves layout, spacing, radii, typography,
and component behavior untouched.

## Behavior

- **Light mode** uses the Gruvbox light "medium" palette: warm paper `#fbf1c7` surfaces, dark warm
  ink `#3c3836`, and the faded accents.
- **Dark mode** uses the Gruvbox dark "medium" palette: `#282828` surfaces, cream `#ebdbb2` ink, and
  the bright accents.
- The theme follows **Settings > General > Appearance** (`Light`, `Dark`, or `System`). It registers
  no picker and stores no preference of its own.
- Syntax highlighting follows `gruvbox.vim`: constants/numbers purple, functions green, comments
  warm gray (`fg4`) in light mode and gray in dark mode for legibility, parameters/identifiers blue,
  keywords red, strings green, string expressions aqua, and links blue.
- JSON trees use purple for keywords and numbers, blue for properties, and green for strings.
- Native text selection and PDF text selection share one translucent Gruvbox yellow (35% opacity in
  light mode, 30% in dark mode); selected text keeps its own color.
- File-type icons use matching accents: code/HTML/Markdown blue, Excel green, folder/PPT yellow,
  PDF red, image/video purple, and other gray. The image/video violet needs a build-specific
  selector; see the limits below.
- The bundle also defines the legacy background/fill aliases that the shipped Client references
  without a declaration (terminal status bars, job rows, preset labels, quaternary text).
- The Host adds a small head style so the body and boot canvas paint with the Gruvbox background and
  ink before the browser module runs. The Client retires that style (removes it from `document.head`)
  as soon as its token layer is in effect, so the token layer owns the body colors after boot.
- Turning the plugin off in **Plugins** removes the token layer and the rule layer. The boot style
  was already retired at startup, so the body background and text color return to the stock palette
  immediately, without a reload.

## Scope and limits

- The token layer is applied through `ctx.theme.overrideTokens`, so it composes over the active
  built-in theme. Avoid enabling a second color theme at the same time; two layers would both write
  the same alias tokens and the later registration would win per token.
- Only colors change. Motion, density, fonts, iconography, and focus geometry remain the host
  defaults.
- **File-type violet is build-specific.** Image and video icons declare `--dsh-file-type-violet` on
  their own CSS-module class, which body-level tokens cannot reach, so the bundle overrides
  `._icon_1wejo_1`. If a future Web frontend build changes that hash, those two icons keep the stock
  violet until the selector is updated; every other color remains in effect.
- **Terminal ANSI colors are partial.** The Host maps ANSI through shared state aliases, so in dark
  mode normal and bright red, green, and yellow resolve to one color each; magenta and white are not
  mapped.
- The file-mark fix also redefines `--dsw-static-neutral-00` and `--dsw-static-neutral-400` at the
  body level. In the shipped UI their only direct consumers are file-icon marks; a third-party
  plugin that reads them directly will receive Gruvbox surface neutrals.
- Inline artwork that paints its own literals (for example the onboarding illustrations, the loading
  screen's fixed label colors, and product SVG marks) keeps its original colors; the theme cannot
  recolor fixed SVG fills.
- The Host boot style covers the body and boot canvas. Components that only exist after the browser
  module loads can still use stock accents for the short interval before that module applies the
  full token layer.

## Palette source

The values come from the official palette dictionary in
[`colors/gruvbox.vim`](https://github.com/morhetz/gruvbox/blob/master/colors/gruvbox.vim)
(dark0–dark4, light0–light4, gray, and the bright/neutral/faded accents), MIT licensed.
