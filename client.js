/**
 * Gruvbox theme for the DeepSeek Harness Web GUI.
 *
 * Design constraints:
 * - Colors come from the official Gruvbox palette
 *   (https://github.com/morhetz/gruvbox, MIT): dark0–dark4, light0–light4,
 *   gray, and the bright/neutral/faded accents.
 * - The layout, spacing, radii, typography, and component behavior stay
 *   untouched. This module only stacks alias-token values over the active
 *   palette through `ctx.theme.overrideTokens`.
 * - Every token carries both palette modes, so Settings > General >
 *   Appearance > Light, Dark, and System all resolve to the matching Gruvbox
 *   palette without another preference or picker.
 * - Gruvbox contrast "medium" is used (dark0 #282828 / light0 #fbf1c7).
 *   Text/background pairs keep the stock UI's contrast hierarchy: primary,
 *   secondary, tertiary, caption, then dimmed.
 */

window.__ModuleLoader__.load({
  id: '@local/dsh-theme-gruvbox',
  factory() {
    /** Expand a six-digit hex color to rgba() with the given alpha. */
    const alpha = (hex, opacity) => {
      const value = Number.parseInt(hex.slice(1), 16);
      return `rgba(${(value >> 16) & 0xff}, ${(value >> 8) & 0xff}, ${value & 0xff}, ${opacity})`;
    };

    /** Mix `percent`% of `color` into `base` (both CSS colors). */
    const mix = (color, percent, base) => `color-mix(in srgb, ${color} ${percent}%, ${base})`;

    /** One override-layer token value: both palette modes are mandatory. */
    const pair = (light, dark) => ({ light, dark });

    /** Gruvbox light "medium" palette. */
    const L = Object.freeze({
      bgH: '#f9f5d7',
      bg0: '#fbf1c7',
      bg0s: '#f2e5bc',
      bg1: '#ebdbb2',
      bg2: '#d5c4a1',
      bg3: '#bdae93',
      bg4: '#a89984',
      gray: '#928374',
      fg0: '#282828',
      fg1: '#3c3836',
      fg2: '#504945',
      fg3: '#665c54',
      fg4: '#7c6f64',
      red: '#9d0006',
      green: '#79740e',
      yellow: '#b57614',
      blue: '#076678',
      purple: '#8f3f71',
      aqua: '#427b58',
      orange: '#af3a03',
      nRed: '#cc241d',
      nGreen: '#98971a',
      nYellow: '#d79921',
      nBlue: '#458588',
      nPurple: '#b16286',
      nAqua: '#689d6a',
      nOrange: '#d65d0e',
    });

    /** Gruvbox dark "medium" palette. */
    const D = Object.freeze({
      bgH: '#1d2021',
      bg0: '#282828',
      bg0s: '#32302f',
      bg1: '#3c3836',
      bg2: '#504945',
      bg3: '#665c54',
      bg4: '#7c6f64',
      gray: '#928374',
      fg0: '#fbf1c7',
      fg1: '#ebdbb2',
      fg2: '#d5c4a1',
      fg3: '#bdae93',
      fg4: '#a89984',
      red: '#fb4934',
      green: '#b8bb26',
      yellow: '#fabd2f',
      blue: '#83a598',
      purple: '#d3869b',
      aqua: '#8ec07c',
      orange: '#fe8019',
      nRed: '#cc241d',
      nGreen: '#98971a',
      nYellow: '#d79921',
      nBlue: '#458588',
      nPurple: '#b16286',
      nAqua: '#689d6a',
      nOrange: '#d65d0e',
    });

    const tokens = {
      // ---------------------------------------------------------------- surfaces
      '--dsw-alias-bg-base': pair(L.bg0, D.bg0),
      '--dsw-alias-bg-layer-1': pair(L.bg0, D.bg0s),
      '--dsw-alias-bg-layer-2': pair(L.bg0s, D.bg1),
      '--dsw-alias-bg-layer-3': pair(L.bg1, D.bg2),
      '--dsw-alias-bg-overlay': pair(L.bg1, D.bg2),
      '--dsw-alias-bg-module-platform': pair(L.bg1, D.bg1),
      '--dsw-alias-bg-multi-select': pair(L.bg0s, D.bg0s),
      '--dsw-alias-bg-skeleton': pair(alpha(L.fg1, 0.06), alpha(D.fg1, 0.08)),
      '--dsw-alias-bg-document-preview': pair(L.bg0s, D.bg0),
      '--dsw-alias-bg-document-selection': pair(alpha(L.nYellow, 0.35), alpha(D.yellow, 0.30)),
      '--dsw-alias-bg-mask-1': pair(alpha(L.fg0, 0.32), alpha(D.bgH, 0.55)),
      '--dsw-alias-bg-mask-2': pair(alpha(L.fg0, 0.16), alpha(D.bgH, 0.28)),
      '--dsw-alias-bg-mask-3': pair(alpha(L.fg0, 0.48), alpha(D.bgH, 0.48)),
      '--dsw-alias-bg-mask-photo': pair(alpha(D.bgH, 0.88), alpha(D.bgH, 0.88)),
      '--dsw-alias-bg-mask-drop': pair(alpha(L.bg0, 0.72), alpha(D.bg0s, 0.70)),

      // ---------------------------------------------------------------- borders
      '--dsw-alias-border-l1': pair(alpha(L.fg1, 0.12), alpha(D.fg1, 0.10)),
      '--dsw-alias-border-l2': pair(alpha(L.fg1, 0.18), alpha(D.fg1, 0.16)),
      '--dsw-alias-border-l3': pair(alpha(L.fg1, 0.24), alpha(D.fg1, 0.22)),
      '--dsw-alias-border-l4': pair(alpha(L.fg1, 0.30), alpha(D.fg1, 0.28)),
      '--dsw-alias-border-l2-darkmode-thin': pair(alpha(L.fg1, 0.12), alpha(D.fg1, 0.10)),
      '--dsw-alias-border-inverted': pair('transparent', alpha(D.fg1, 0.06)),
      '--dsw-alias-border-inverted2': pair('transparent', alpha(D.fg1, 0.08)),
      '--dsw-alias-border-selected': pair(L.fg4, D.fg4),

      // ---------------------------------------------------------------- brand and actions
      '--dsw-alias-brand-primary': pair(L.fg0, D.fg1),
      '--dsw-alias-brand-primary-invert': pair(L.bg0, D.bg0),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': pair(L.nBlue, D.blue),
      '--dsw-alias-brand-text': pair(L.fg0, D.fg0),
      '--dsw-alias-button-contrast-fill': pair(L.fg1, D.fg1),
      '--dsw-alias-button-elevated-fill': pair(L.bg0, D.bg2),
      '--dsw-alias-button-floating-fill': pair(L.bg0, D.bg1),
      '--dsw-alias-button-floating-hover': pair(L.bg0s, D.bg2),
      '--dsw-alias-button-ghost-active-border': pair(L.bg4, D.gray),
      '--dsw-alias-button-ghost-active-fill': pair(L.bg1, D.bg2),
      '--dsw-alias-button-ghost-active-hover': pair(L.bg2, D.bg3),
      '--dsw-alias-button-info-fill': pair(L.blue, D.blue),
      '--dsw-alias-button-info-hover': pair(L.nBlue, D.nBlue),
      '--dsw-alias-button-primary-dimmed': pair(L.bg1, D.bg2),
      '--dsw-alias-button-primary-fill': pair(L.fg0, D.fg1),
      '--dsw-alias-button-primary-hover': pair(L.fg1, D.fg0),
      '--dsw-alias-button-tool-bar-fill': pair(alpha(L.fg1, 0.50), alpha(D.fg1, 0.16)),
      '--dsw-alias-button-tool-bar-fill-invisible': pair(alpha(L.fg0, 0.36), alpha(D.bgH, 0.40)),
      '--dsw-alias-button-tool-bar-hover': pair(alpha(L.fg1, 0.65), alpha(D.fg1, 0.24)),

      // ---------------------------------------------------------------- cards and wells
      '--dsw-alias-card-fill': pair(L.bg0s, D.bg0s),
      '--dsw-alias-card-fill-hover': pair(L.bg1, D.bg1),
      '--dsw-alias-card-tile-fill': pair(
        mix(L.bg0, 50, 'transparent'),
        mix(D.fg1, 5, 'transparent'),
      ),

      // ---------------------------------------------------------------- text and icons
      '--dsw-alias-label-primary': pair(L.fg1, D.fg1),
      '--dsw-alias-label-secondary': pair(L.fg2, D.fg2),
      '--dsw-alias-label-tertiary': pair(L.fg3, D.fg3),
      '--dsw-alias-label-caption': pair(L.fg4, D.fg4),
      '--dsw-alias-switch-thumb': pair(L.bg0, D.fg4),
      '--dsw-alias-label-dimmed': pair(L.gray, D.gray),
      '--dsw-alias-label-primary-dimmed': pair(L.fg0, D.fg0),
      '--dsw-alias-label-primary-bluish': pair(L.blue, D.fg0),
      '--dsw-alias-label-primary-foreground': pair(L.bg0, D.bgH),
      '--dsw-alias-label-primary-inverted': pair(L.bg0, D.bgH),
      '--dsw-alias-label-on-color': pair(L.bg0, D.bgH),
      '--dsw-alias-label-document-preview': pair(L.fg3, D.fg3),
      '--dsw-alias-label-shimmer': pair(
        mix(L.fg0, 30, 'transparent'),
        mix(D.fg0, 45, 'transparent'),
      ),
      '--dsw-alias-label-deep-diving': pair(
        mix(L.nBlue, 70, L.fg1),
        mix(D.blue, 55, D.gray),
      ),
      '--dsw-alias-label-deep-diving-shimmer': pair(
        mix(L.blue, 30, L.fg1),
        mix(D.blue, 65, D.gray),
      ),
      '--dsw-alias-menu-icon': pair(L.fg2, D.fg1),
      '--dsw-alias-link': pair(L.blue, D.blue),

      // ---------------------------------------------------------------- interaction
      '--dsw-alias-interactive-bg-hover': pair(alpha(L.fg1, 0.08), alpha(D.fg1, 0.08)),
      '--dsw-alias-interactive-bg-active': pair(alpha(L.fg1, 0.14), alpha(D.fg1, 0.16)),
      '--dsw-alias-interactive-bg-hover-accent': pair(alpha(L.fg1, 0.20), alpha(D.fg1, 0.24)),
      '--dsw-alias-interactive-bg-hover-danger': pair(alpha(L.red, 0.06), alpha(D.red, 0.15)),
      '--dsw-alias-interactive-bg-hover-solid': pair(L.bg1, D.bg1),

      // ---------------------------------------------------------------- markdown
      '--dsw-alias-markdown-citation': pair(L.bg1, D.bg1),
      '--dsw-alias-markdown-code-block': pair(L.bg0s, D.bgH),
      '--dsw-alias-markdown-code-block-banner': pair(L.bg1, D.bg0s),
      '--dsw-alias-markdown-code-segment-selected': pair(L.bg0, D.bg1),
      '--dsw-alias-markdown-code-segment-unselected': pair(L.bg0s, D.bg0),
      '--dsw-alias-markdown-inline-code': pair(L.bg1, D.bg1),
      '--dsw-alias-markdown-placeholder': pair(L.bg2, D.bg1),
      '--dsw-alias-markdown-tag': pair(L.bg1, D.bg1),
      '--dsw-alias-trajectory-accent': pair(L.nBlue, D.blue),

      // ---------------------------------------------------------------- scrollbars
      '--dsw-alias-scrollbar-bg-l1': pair(L.bg2, D.bg2),
      '--dsw-alias-scrollbar-bg-l2': pair(L.bg2, D.bg3),
      '--dsw-alias-scrollbar-hover-l1': pair(L.bg3, D.bg3),
      '--dsw-alias-scrollbar-hover-l2': pair(L.bg3, D.bg4),

      // ---------------------------------------------------------------- state
      '--dsw-alias-state-business-primary': pair(L.blue, D.blue),
      '--dsw-alias-state-business-tertiary': pair(
        mix(L.blue, 12, L.bg0),
        mix(D.blue, 22, D.bg0),
      ),
      '--dsw-alias-state-done-primary': pair(L.purple, D.purple),
      '--dsw-alias-state-error-primary': pair(L.red, D.red),
      '--dsw-alias-state-error-secondary': pair(L.nRed, D.red),
      '--dsw-alias-state-idle-primary': pair(L.bg3, D.bg3),
      '--dsw-alias-state-success-primary': pair(L.green, D.green),
      '--dsw-alias-state-success-secondary': pair(L.nGreen, D.green),
      '--dsw-alias-state-success-tertiary': pair(mix(L.green, 17, L.bgH), mix(D.green, 10, D.bgH)),
      '--dsw-alias-state-warn-label': pair(L.orange, D.yellow),
      '--dsw-alias-state-warn-primary': pair(L.orange, D.yellow),
      '--dsw-alias-state-warn-secondary': pair(L.yellow, D.yellow),
      '--dsw-alias-state-warn-tertiary': pair(mix(L.orange, 7, L.bgH), mix(D.nYellow, 16, D.bgH)),

      // ---------------------------------------------------------------- diffs
      '--dsw-alias-code-diff-added': pair(alpha(L.green, 0.10), alpha(D.green, 0.14)),
      '--dsw-alias-code-diff-deleted': pair(alpha(L.red, 0.08), alpha(D.red, 0.14)),
      '--dsw-alias-file-diff-added-bg': pair(mix(L.green, 17, L.bgH), mix(D.green, 10, D.bgH)),
      '--dsw-alias-file-diff-added-gutter': pair(mix(L.green, 7, L.bgH), mix(D.green, 7, D.bgH)),
      '--dsw-alias-file-diff-added-marker': pair(L.green, D.green),
      '--dsw-alias-file-diff-deleted-bg': pair(mix(L.red, 10, L.bgH), mix(D.red, 13, D.bgH)),
      '--dsw-alias-file-diff-deleted-gutter': pair(mix(L.red, 4, L.bgH), mix(D.red, 10, D.bgH)),
      '--dsw-alias-file-diff-deleted-marker': pair(L.red, D.red),

      // ---------------------------------------------------------------- charts
      '--dsw-alias-chart-messages': pair(L.nBlue, D.blue),
      '--dsw-alias-chart-system': pair(L.bg4, D.gray),
      '--dsw-alias-chart-tools': pair(L.purple, D.purple),

      // ---------------------------------------------------------------- hover cards
      '--dsw-alias-hovercard-bg': pair(L.fg1, D.bg1),
      '--dsw-alias-hovercard-label-primary': pair(L.bg0, D.fg0),
      '--dsw-alias-hovercard-label-secondary': pair(L.bg2, D.fg2),
      '--dsw-alias-hovercard-label-tertiary': pair(L.bg3, D.fg3),
      '--dsw-alias-hovercard-state-done': pair(D.purple, D.purple),
      '--dsw-alias-hovercard-state-error': pair(D.red, D.red),

      // ---------------------------------------------------------------- illustrations
      '--dsw-alias-illustration-background': pair(L.bg0s, D.bg1),
      '--dsw-alias-illustration-backing': pair(L.bg3, D.bg3),
      '--dsw-alias-illustration-detail': pair(L.bg3, D.gray),
      '--dsw-alias-illustration-inset': pair(L.bg1, D.bg2),
      '--dsw-alias-illustration-shadow': pair(L.bg1, D.bg2),
      '--dsw-alias-illustration-surface': pair(L.bg1, D.bg2),

      // ---------------------------------------------------------------- JSON tree
      '--dsw-alias-json-tree-hover': pair(alpha(L.fg1, 0.05), alpha(D.fg1, 0.07)),
      '--dsw-alias-json-tree-icon': pair(L.fg3, D.fg4),
      '--dsw-alias-json-tree-keyword': pair(L.purple, D.purple),
      '--dsw-alias-json-tree-number': pair(L.purple, D.purple),
      '--dsw-alias-json-tree-property': pair(L.blue, D.blue),
      '--dsw-alias-json-tree-punctuation': pair(L.fg1, D.fg1),
      '--dsw-alias-json-tree-string': pair(L.green, D.green),

      // ---------------------------------------------------------------- overlays
      '--dsw-alias-toast-bg': pair(L.fg1, D.bg0s),
      '--dsw-alias-toast-label': pair(L.bg0, D.fg0),
      '--dsw-alias-toast-action': pair(D.blue, D.blue),
      '--dsw-alias-tooltip-bg': pair(L.fg1, D.bg2),
      '--dsw-alias-tooltip-key-bg': pair(
        mix(L.bg0, 18, L.fg1),
        mix(D.fg0, 18, D.bg2),
      ),
      '--dsw-alias-tooltip-label': pair(L.bg0, D.fg0),
      '--dsw-alias-turn-trigger-bg': pair(L.bg0s, alpha(D.fg1, 0.08)),
      '--dsw-alias-turn-trigger-bg-hover': pair(alpha(L.fg1, 0.08), alpha(D.fg1, 0.16)),
      '--dsw-menu-surface-fill': pair(alpha(L.bg0, 0.80), alpha(D.bg0, 0.70)),
      '--dsw-alias-menu-group-header-fill': pair(alpha(L.bg0s, 0.94), alpha(D.bg0s, 0.94)),
      '--dsw-specific-menu': pair(alpha(L.bg0, 0.94), alpha(D.bg0s, 0.94)),

      // ---------------------------------------------------------------- specific surfaces
      '--dsw-specific-bubble': pair(L.bg0s, D.bg0s),
      '--dsw-specific-bubble-highlight': pair(L.bg1, D.bg1),
      '--dsw-specific-file-upload-track': pair(alpha(L.fg1, 0.08), alpha(D.fg1, 0.08)),
      '--dsw-specific-guide-hero': pair(L.bg2, D.bg1),
      '--dsw-specific-input-major': pair(L.bg0, D.bg0s),
      '--dsw-specific-login-input': pair(L.bg0s, D.bgH),
      '--dsw-specific-selector': pair(L.bg1, D.bg1),
      '--dsw-specific-sidebar-fill': pair(L.bg0s, D.bg0s),
      '--dsw-specific-sidebar-nav-item-active': pair(L.bg1, D.bg1),
      '--dsw-specific-sidebar-nav-item-active-accent': pair(L.bg2, D.bg2),
      '--dsw-specific-sidebar-right-flash': pair(L.nBlue, D.blue),
      '--dsw-specific-tip': pair(L.bg1, D.bg1),

      // ---------------------------------------------------------------- macOS sidebar glass
      '--dsw-specific-sidebar-glass-fill': pair(alpha(L.bg0, 0.55), alpha(D.fg1, 0.15)),
      '--dsw-specific-sidebar-glass-hover': pair(alpha(L.bg0, 0.30), alpha(D.fg1, 0.20)),
      '--dsw-specific-sidebar-glass-collapsed-fill': pair('transparent', alpha(D.fg1, 0.15)),
      '--dsw-specific-sidebar-glass-collapsed-hover': pair(alpha(L.fg1, 0.08), alpha(D.fg1, 0.20)),
      '--dsw-specific-sidebar-tint': pair(
        mix(L.bg0s, 40, 'transparent'),
        mix(D.bg0s, 50, 'transparent'),
      ),
      '--dsw-specific-sidebar-wash-bottom': pair(alpha(L.purple, 0.09), alpha(D.purple, 0.07)),
      '--dsw-specific-sidebar-wash-bottom-clear': pair(alpha(L.purple, 0), alpha(D.purple, 0)),
      '--dsw-specific-sidebar-wash-top': pair(alpha(L.yellow, 0.10), alpha(D.yellow, 0.08)),
      '--dsw-specific-sidebar-wash-top-clear': pair(alpha(L.yellow, 0), alpha(D.yellow, 0)),

      // ---------------------------------------------------------------- legacy fill aliases
      // Components in the shipped Client reference these names, but the
      // installed theme package declares none of them. Defining them keeps
      // terminal status bars, job rows, preset labels, and secondary settings
      // surfaces on the Gruvbox surfaces instead of falling back to
      // transparent/inherited stock paint.
      '--dsw-alias-bg-l1': pair(L.bg0, D.bg0s),
      '--dsw-alias-bg-l2': pair(L.bg0s, D.bg1),
      '--dsw-alias-bg-layer-4': pair(L.bg1, D.bg3),
      '--dsw-alias-fill-l1': pair(L.bg0s, D.bg0s),
      '--dsw-alias-fill-l2': pair(L.bg1, D.bg1),
      '--dsw-alias-fill-tsp-secondary': pair(alpha(L.fg1, 0.06), alpha(D.fg1, 0.08)),
      '--dsw-alias-label-error': pair(L.red, D.red),
      '--dsw-alias-label-quaternary': pair(L.gray, D.gray),
      '--dsw-alias-separator-primary': pair(alpha(L.fg1, 0.18), alpha(D.fg1, 0.16)),

      // ---------------------------------------------------------------- direct static consumers
      // The built Web frontend paints file-type icons and terminal ANSI hues
      // from static tokens rather than aliases. Recolor the ones it uses so
      // those marks follow the palette instead of keeping stock accents.
      '--dsw-static-deepseek-500': pair(L.blue, D.blue),
      '--dsw-static-deepseek-450': pair(L.blue, D.blue),
      '--dsw-static-green-500': pair(L.green, D.green),
      '--dsw-static-amber-500': pair(L.yellow, D.yellow),
      '--dsw-static-amber-400': pair(L.yellow, D.yellow),
      '--dsw-static-red-600': pair(L.red, D.red),
      '--dsw-static-neutral-00': pair(L.bg0, D.bg0),
      '--dsw-static-neutral-400': pair(L.gray, D.gray),
      '--dsw-static-neutral-bluish-300': pair(L.gray, D.gray),
      '--dsw-static-blue-400': pair(L.nBlue, D.blue),
      '--dsw-static-blue-500': pair(L.aqua, D.aqua),
      '--dsw-static-blue-600': pair(L.nAqua, D.nAqua),

      // ---------------------------------------------------------------- onboarding
      '--dsw-alias-onboarding-accent': pair(L.nBlue, D.blue),
      '--dsw-gradient-onboarding-violet-stops': pair(
        `${L.purple} 33.102%, ${L.nPurple} 50.954%, ${D.purple} 85.326%, ${L.purple}`,
        `${D.nPurple} 33.102%, ${D.purple} 50.954%, ${D.yellow} 85.326%, ${D.nPurple}`,
      ),
      '--dsw-gradient-onboarding-blue-stops': pair(
        `${L.blue} 18.75%, ${L.nBlue} 51.78%, ${D.blue} 86.252%, ${L.blue}`,
        `${D.nBlue} 18.75%, ${D.blue} 51.78%, ${D.aqua} 86.252%, ${D.nBlue}`,
      ),
      '--dsw-gradient-onboarding-cyan-stops': pair(
        `${L.aqua} 21.154%, ${L.nAqua} 50.954%, ${D.aqua} 85.326%, ${L.aqua}`,
        `${L.aqua} 21.154%, ${L.nAqua} 50.954%, ${D.aqua} 85.326%, ${L.aqua}`,
      ),
      '--dsw-alias-onboarding-card-fill': pair(
        mix(L.bg0, 80, 'transparent'),
        mix(D.bg1, 80, 'transparent'),
      ),
      '--dsw-alias-onboarding-secondary-fill': pair(L.bg0s, D.bg2),
      '--dsw-alias-onboarding-checkbox-border': pair(alpha(L.fg1, 0.20), alpha(D.fg1, 0.16)),

      // ---------------------------------------------------------------- syntax highlighting
      '--shiki-foreground': pair(L.fg1, D.fg1),
      '--shiki-background': pair(L.bg0s, D.bgH),
      '--shiki-token-constant': pair(L.purple, D.purple),
      '--shiki-token-string': pair(L.green, D.green),
      '--shiki-token-comment': pair(L.fg4, D.gray),
      '--shiki-token-keyword': pair(L.red, D.red),
      '--shiki-token-parameter': pair(L.blue, D.blue),
      '--shiki-token-function': pair(L.green, D.green),
      '--shiki-token-string-expression': pair(L.aqua, D.aqua),
      '--shiki-token-punctuation': pair(L.fg3, D.fg2),
      '--shiki-token-link': pair(L.blue, D.blue),
    };

    // The Host half prefixes its boot <style> text with this exact marker so
    // this half can find and retire that element once the token layer is in
    // effect. The two halves run in different runtimes and cannot import each
    // other; keep this string identical to `BOOT_STYLE_MARKER` in `index.js`.
    const BOOT_STYLE_MARKER = '/*dsh-theme-gruvbox:boot*/';

    // The file-type icon declares its violet on the icon element itself, so a
    // body-level token cannot reach it. This CSS-module class comes from the
    // shipped Web bundle; a hash change only drops the override.
    const FILE_TYPE_ICON = '._icon_1wejo_1';

    // Native text selection is UA-painted and has no theme token, and the
    // file-type violet is element-local, so both need one small global rule.
    // The rule is cleaned up with the plugin like every other resource.
    const themeCss = [
      `::selection { background-color: ${alpha(L.nYellow, 0.35)}; }`,
      `body[data-ds-dark-theme] ::selection { background-color: ${alpha(D.yellow, 0.30)}; }`,
      `${FILE_TYPE_ICON} { --dsh-file-type-violet: ${L.purple}; }`,
      `body[data-ds-dark-theme] ${FILE_TYPE_ICON} { --dsh-file-type-violet: ${D.purple}; }`,
    ].join('\n');

    return {
      inject: ['theme'],
      apply(ctx) {
        // The layer follows the active light/dark preference; disposing the
        // plugin (or reloading it) removes every value it added.
        ctx.effect(
          () => ctx.theme.overrideTokens('gruvbox', tokens),
          'gruvbox theme: token override layer',
        );
        // The Host boot row uses `html body` (specificity 0,0,2), which would
        // keep painting the body after this token layer is removed. Retire the
        // row once the tokens are actually in effect; until then the body's
        // computed base token still carries the stock value, and removing the
        // row early would flash the stock colors for a frame.
        ctx.effect(() => {
          if (typeof document === 'undefined' || document.body === null) return () => {};
          let frame = null;
          let attempts = 0;
          const retire = () => {
            frame = null;
            const value = getComputedStyle(document.body)
              .getPropertyValue('--dsw-alias-bg-base')
              .trim()
              .toLowerCase();
            const dark = document.body.hasAttribute('data-ds-dark-theme');
            const expected = (dark ? D.bg0 : L.bg0).toLowerCase();
            if (value !== expected && attempts < 10) {
              attempts += 1;
              frame = requestAnimationFrame(retire);
              return;
            }
            for (const style of document.head.querySelectorAll('style')) {
              if (style.textContent !== null && style.textContent.startsWith(BOOT_STYLE_MARKER)) {
                style.remove();
              }
            }
          };
          retire();
          return () => {
            if (frame !== null) cancelAnimationFrame(frame);
          };
        }, 'gruvbox theme: retire boot style');
        ctx.effect(() => {
          if (typeof document === 'undefined') return () => {};
          const style = document.createElement('style');
          style.dataset.gruvboxTheme = 'styles';
          style.textContent = themeCss;
          document.head.append(style);
          return () => style.remove();
        }, 'gruvbox theme: styles');
      },
    };
  },
});
