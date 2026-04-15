import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// PrimeIcons
import 'primeicons/primeicons.css'

// Design tokens → CSS custom properties on :root
// (imported BEFORE Tailwind so utilities can reference them via var(--x))
import '../design-tokens/build/css/variables.css'

// Tailwind + app styles (imported after PrimeVue config so utilities win)
import './style.css'

import App from './App.vue'

const app = createApp(App)

// Volt components run in unstyled mode and are styled with Tailwind via
// Pass-Through (PT) props. We still register a theme preset because Volt
// relies on the design-token CSS variables it provides (primary, surface, etc.)
// exposed to Tailwind through the tailwindcss-primeui plugin.
app.use(PrimeVue, {
  unstyled: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})

app.mount('#app')
