<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

type Theme = 'light' | 'dark'
const dark = ref(true)
const ready = ref(false)
let preference: Theme | null = null
let cleanup = () => {}
function apply(theme: Theme) {
  dark.value = theme === 'dark'
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark.value ? '#000000' : '#ffffff')
}
function readPreference(): Theme | null {
  try {
    const saved = localStorage.getItem('haris-theme')
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch { return null }
}
function toggle() {
  preference = dark.value ? 'light' : 'dark'
  apply(preference)
  try { localStorage.setItem('haris-theme', preference) } catch { /* Still works when storage is unavailable. */ }
}
onMounted(() => {
  const system = matchMedia('(prefers-color-scheme: dark)')
  preference = readPreference()
  const sync = () => apply(preference ?? (system.matches ? 'dark' : 'light'))
  const storage = (event: StorageEvent) => {
    if (event.key === 'haris-theme' || event.key === null) { preference = readPreference(); sync() }
  }
  sync()
  ready.value = true
  system.addEventListener('change', sync)
  window.addEventListener('storage', storage)
  cleanup = () => { system.removeEventListener('change', sync); window.removeEventListener('storage', storage) }
})
onBeforeUnmount(() => cleanup())
</script>
<template>
  <button class="theme-toggle" type="button" aria-label="Dark theme" :aria-pressed="dark" :title="dark ? 'Switch to light theme' : 'Switch to dark theme'" :disabled="!ready" @click="toggle">
    <svg class="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
    <svg class="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5a8.5 8.5 0 1 0 10.9 10.9Z" /></svg>
  </button>
</template>
