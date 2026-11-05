<script setup lang="ts">
defineProps<{ name: string }>()
const paths: Record<string, string> = {
  paper: 'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h8',
  arxiv: 'M7 4h13v16H7M7 4H4v4h3M7 4v16H4v-4h3M10 8h7m-7 4h7m-7 4h5',
  project: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  dataset: 'M20 6c0 2-4 3-8 3S4 8 4 6s4-3 8-3 8 1 8 3Zm0 0v12c0 2-4 3-8 3s-8-1-8-3V6m0 6c0 2 4 3 8 3s8-1 8-3',
  poster: 'M4 3h16v18H4V3Zm3 4h10M7 11h10M7 15h4v3H7v-3Zm7 0h3m-3 3h3',
  citation: 'M4 5h6v7H7v3l3 3-2 2-4-4V5Zm10 0h6v7h-3v3l3 3-2 2-4-4V5Z',
}
</script>
<template><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path v-if="name === 'github'" fill="currentColor" stroke="none" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.09c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.73 2.63 1.23 3.27.94.1-.73.39-1.23.71-1.51-2.49-.28-5.11-1.25-5.11-5.54 0-1.22.44-2.22 1.15-3.01-.12-.28-.5-1.42.11-2.97 0 0 .94-.3 3.08 1.15a10.73 10.73 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.97.72.79 1.15 1.79 1.15 3.01 0 4.3-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /><path v-else :d="paths[name] || paths.paper" /></svg></template>
