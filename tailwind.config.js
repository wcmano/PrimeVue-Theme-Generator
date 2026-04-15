import primeui from 'tailwindcss-primeui'
import tokens from './design-tokens/build/tailwind/tokens.js'

/**
 * Map the generated token tree into Tailwind's theme.
 *
 * Strategy:
 *   - Colors → theme.extend.colors.* (lets you write `bg-button-primary`)
 *   - Dimensions → theme.extend.padding / borderRadius / spacing
 *
 * We pick the `button` and `color` namespaces explicitly so unrelated
 * primitives (like `size.spacing.2`) don't pollute the colors palette.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Component-level (what your components consume)
        'button-primary': tokens.button.bg.primary,
        'button-text-primary': tokens.button.text.primary,

        // Semantic (reusable across many components)
        primary: {
          DEFAULT: tokens.color.primary.bg,
          text: tokens.color.primary.text,
        },
      },
      padding: {
        'button-x': tokens.button.padding.x,
        'button-y': tokens.button.padding.y,
      },
      borderRadius: {
        button: tokens.button.radius.default,
      },
    },
  },
  plugins: [primeui],
}
