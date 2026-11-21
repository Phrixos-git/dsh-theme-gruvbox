/**
 * Host half of the Gruvbox theme bundle.
 *
 * The full palette is a browser-side token layer (`ctx.theme.overrideTokens`)
 * in the Client module. This half contributes one head style row so the body
 * and the boot canvas use Gruvbox colors during the interval before the
 * browser module runs. The Client half then removes that row once its token
 * layer is in effect, so the row cannot outrank the shell's `body` rule after
 * boot. The Web server is optional: compositions without an HTTP server
 * simply skip the row, and the Client module still applies the palette once it
 * loads.
 */

const LIGHT_BACKGROUND = '#fbf1c7';
const LIGHT_INK = '#3c3836';
const DARK_BACKGROUND = '#282828';
const DARK_INK = '#ebdbb2';

/**
 * Fixed marker at the start of the boot style text. The Client half finds the
 * injected <style> by this prefix and removes it once its token layer is in
 * effect. The two halves run in different runtimes and cannot import each
 * other, so keep this string identical to `BOOT_STYLE_MARKER` in `client.js`.
 */
const BOOT_STYLE_MARKER = '/*dsh-theme-gruvbox:boot*/';

/**
 * Pre-plugin CSS. `html body` outranks the shell's later `body` rule so the
 * first paint keeps the Gruvbox background; the `:not([data-ds-theme-source])`
 * media fallback covers the stock System preference before its boot script
 * sets the attribute, and the dark attribute rule takes over afterwards.
 * `--dsh-boot-bg` feeds the loading screen's canvas fallback. The Client half
 * retires this row after the token layer takes effect, so the `html body`
 * specificity does not keep the body colors after the plugin is disabled.
 */
const BOOT_STYLE = BOOT_STYLE_MARKER + [
  `html body{background-color:${LIGHT_BACKGROUND};color:${LIGHT_INK};--dsh-boot-bg:${LIGHT_BACKGROUND}}`,
  `html body[data-ds-dark-theme]{background-color:${DARK_BACKGROUND};color:${DARK_INK};--dsh-boot-bg:${DARK_BACKGROUND}}`,
  '@media(prefers-color-scheme:dark){html:not([data-ds-theme-source]) body{'
    + `background-color:${DARK_BACKGROUND};color:${DARK_INK};--dsh-boot-bg:${DARK_BACKGROUND}}}`,
].join('');

/**
 * Register the boot style row. The listener appends, so it runs after the
 * stock theme's prepended boot row and its palette wins for the body.
 * @param ctx - Host plugin context.
 */
export function apply(ctx) {
  ctx.inject(['webServer'], (scope) => {
    scope.on('webserver/index-inject', (table) => {
      table.push({ kind: 'style', text: BOOT_STYLE });
    });
  });
}
