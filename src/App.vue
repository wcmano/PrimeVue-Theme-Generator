<script setup>
import { ref } from 'vue'
import Button from './volt/Button.vue'
import Card from './volt/Card.vue'

const clicks = ref(0)

function handleClick() {
  clicks.value += 1
}
</script>

<template>
  <main class="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center p-6">
    <Card class="w-full max-w-md">
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-palette text-primary text-2xl"></i>
          <span>PrimeVue Volt + Tailwind</span>
        </div>
      </template>

      <template #subtitle>
        Vue 3 + Vite + PrimeVue unstyled mode, styled via Volt Pass-Through.
      </template>

      <template #content>
        <p class="mb-4 leading-relaxed">
          Click the button below to test reactivity. Volt components expose
          the full Tailwind class string, so you can override or extend styles
          with design tokens like
          <code class="px-1 rounded bg-surface-100 dark:bg-surface-800">bg-primary</code>.
        </p>

        <div class="rounded-lg border border-surface-200 dark:border-surface-700 p-3 text-center">
          Clicks: <span class="font-bold text-primary">{{ clicks }}</span>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2 pt-4">
          <Button
            label="Reset"
            severity="secondary"
            outlined
            icon="pi pi-refresh"
            @click="clicks = 0"
          />
          <Button
            label="Click me"
            icon="pi pi-bolt"
            @click="handleClick"
          />
        </div>
      </template>
    </Card>
  </main>
</template>
