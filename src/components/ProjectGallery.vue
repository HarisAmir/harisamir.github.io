<script setup lang="ts">
import { ref } from 'vue'
import type { ProjectFigure } from '../data/projects'
defineProps<{ figures: ProjectFigure[]; title: string }>()
const track = ref<HTMLElement>()
const active = ref(0)
function go(index: number) {
  track.value?.scrollTo({ left: index * track.value.clientWidth, behavior: 'instant' })
}
function update() {
  if (track.value) active.value = Math.round(track.value.scrollLeft / track.value.clientWidth)
}
</script>
<template>
  <div class="project-gallery" role="region" aria-roledescription="carousel" :aria-label="`${title} figures`">
    <div class="figure-label mono"><span>Figures</span><span aria-live="polite">{{ String(active + 1).padStart(2, '0') }} / {{ String(figures.length).padStart(2, '0') }}</span></div>
    <div ref="track" class="gallery-track" tabindex="0" :aria-label="`${title}: scroll through figures`" @scroll.passive="update" @keydown.right.prevent="go(Math.min(active + 1, figures.length - 1))" @keydown.left.prevent="go(Math.max(active - 1, 0))">
      <figure v-for="(figure, index) in figures" :key="figure.src" class="gallery-slide" aria-roledescription="slide" :aria-label="`${index + 1} of ${figures.length}`">
        <a :href="figure.src" target="_blank" rel="noopener" :tabindex="active === index ? 0 : -1" class="gallery-image" :aria-label="`View full figure: ${figure.caption}`"><img :src="figure.src" :alt="figure.alt" width="1440" height="900" loading="lazy" decoding="async" /></a>
        <figcaption>{{ figure.caption }}</figcaption>
      </figure>
    </div>
    <div v-if="figures.length > 1" class="gallery-controls">
      <button class="gallery-arrow" :disabled="active === 0" aria-label="Previous figure" @click="go(active - 1)">←</button>
      <div class="gallery-dots"><button v-for="(_, index) in figures" :key="index" :aria-label="`Show figure ${index + 1}`" :aria-current="active === index ? 'true' : undefined" @click="go(index)"><span /></button></div>
      <button class="gallery-arrow" :disabled="active === figures.length - 1" aria-label="Next figure" @click="go(active + 1)">→</button>
    </div>
  </div>
</template>
