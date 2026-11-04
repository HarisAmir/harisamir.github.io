<script setup lang="ts">
defineProps<{ name: string }>()
const paths: Record<string, string> = {
  paper: 'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h8',
  arxiv: 'M7 4h13v16H7M7 4H4v4h3M7 4v16H4v-4h3M10 8h7m-7 4h7m-7 4h5',
  project: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
  dataset: 'M20 6c0 2-4 3-8 3S4 8 4 6s4-3 8-3 8 1 8 3Zm0 0v12c0 2-4 3-8 3s-8-1-8-3V6m0 6c0 2 4 3 8 3s8-1 8-3',
  poster: 'M4 3h16v18H4V3Zm3 4h10M7 11h10M7 15h4v3H7v-3Zm7 0h3m-3 3h3',
  citation: 'M4 5h6v7H7v3l3 3-2 2-4-4V5Zm10 0h6v7h-3v3l3 3-2 2-4-4V5Z',
}
</script>
<template><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name] || paths.paper" /></svg></template>
