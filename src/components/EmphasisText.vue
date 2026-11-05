<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ text: string }>()
// Support **bold phrases** in structured content without rendering raw HTML.
const parts = computed(() => props.text.split(/(\*\*[^*]+\*\*)/g).map(text => ({
  bold: text.startsWith('**') && text.endsWith('**'),
  text: text.startsWith('**') && text.endsWith('**') ? text.slice(2, -2) : text,
})))
</script>
<template><template v-for="(part, index) in parts" :key="index"><strong v-if="part.bold">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></template>
