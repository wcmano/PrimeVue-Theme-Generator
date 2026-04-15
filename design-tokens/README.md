# Design Tokens

**Flow:** Figma → `tokens/` → Style Dictionary → `build/` → Tailwind + CSS vars → Vue

---

## Commands

```bash
npm run tokens:build    # build once
npm run tokens:watch    # rebuild on save
npm run build           # tokens + app
```

Edit `tokens/`. Never edit `build/` — it's regenerated.

---

## Folders

```
tokens/
├── core/         primitives     (color.blue.500)
├── semantic/     intent         (color.primary.bg)
└── components/   per-component  (button.bg.primary)

build/            generated, gitignored
  css/variables.css      → CSS vars on :root
  tailwind/tokens.js     → imported by tailwind.config.js
  json/tokens.json       → for docs / external tools
```

Reference only downward: components → semantic → core.

---

## Token format (DTCG)

```json
{
  "button": {
    "bg": {
      "primary": { "$value": "{color.primary.bg}", "$type": "color" }
    }
  }
}
```

`$value` is a literal (`"#3B82F6"`) or a reference (`"{color.primary.bg}"`).

---

## Naming

`button.bg.primary` →

| Target | Identifier |
|---|---|
| CSS variable | `--button-bg-primary` |
| Tailwind class | `bg-button-primary` *(after mapping)* |

---

## Tailwind mapping

Not automatic. Map tokens in [`tailwind.config.js`](../tailwind.config.js):

```js
import tokens from './design-tokens/build/tailwind/tokens.js'

theme: { extend: {
  colors:  { 'button-primary': tokens.button.bg.primary },
  padding: { 'button-x':       tokens.button.padding.x },
}}
```

Tailwind inlines the hex at build time. For runtime theming, map to `var()`:
```js
colors: { 'button-primary': 'var(--button-bg-primary)' }
```

---

## PrimeVue

**Unstyled + Volt (this project):** use Tailwind classes in `:pt`
```vue
<Button unstyled :pt="{ root: 'bg-button-primary px-button-x rounded-button' }" />
```

**Styled PrimeVue:** override `.p-button` via CSS variables
```css
.p-button { background: var(--button-bg-primary); }
```

---

## Add a token

1. Add it to the right tier under `tokens/`, referencing lower tiers.
2. `npm run tokens:build`.
3. For a Tailwind class, map it in `tailwind.config.js`.
4. Restart `npm run dev`.

---

## Styling rule: classes only, never JS

All styling goes through Tailwind classes generated from tokens. Never use `element.style`, `setProperty`, or inline `style` bindings for design-system values.

**Dynamic states** — use Tailwind variants, not JS:
```
bg-button-primary
enabled:hover:bg-button-primary/90
enabled:active:bg-button-primary/80
disabled:opacity-60 disabled:pointer-events-none
```

**Vue — `:class` binding:**
```vue
<button :class="[
  'px-button-x py-button-y rounded-button',
  { 'bg-button-primary': variant === 'primary',
    'bg-button-danger':  variant === 'danger' },
]" />
```

**Plain JS — `classList`:**
```js
btn.classList.toggle('ring-2', isActive)
btn.disabled = true   // let disabled: variant handle the look
```

> Don't build class names by string concatenation (`` `bg-${x}` ``) — Tailwind purges unseen classes. Use a lookup map or add to `safelist`.

---

## Don't

- Edit `build/`.
- Create circular references.
- Skip tiers.
- Forget to restart dev after config changes.
- Set styles via `element.style` / `setProperty` / inline `style=`.
- Import `tokens.js` from runtime code — only `tailwind.config.js` reads it.
