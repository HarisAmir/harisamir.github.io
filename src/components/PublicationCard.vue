<script setup lang="ts">
import { ref } from 'vue'
import type { Publication } from '../data/publications'
import ResourceIcon from './ResourceIcon.vue'
const props = defineProps<{ publication: Publication }>()
const copyStatus = ref('')
async function copyCitation() {
  try {
    await navigator.clipboard.writeText(props.publication.bibtex)
    copyStatus.value = 'Citation copied.'
  } catch { copyStatus.value = 'Copy unavailable. Select the citation below to copy it manually.' }
}
</script>

<template>
  <article class="publication-card" :aria-labelledby="`${publication.id}-title`">
    <figure class="publication-figure">
      <div class="figure-label mono"><span>Figures</span><span>Overview / 01</span></div>
      <a class="publication-image" :href="publication.image.large" target="_blank" rel="noopener">
        <img :src="publication.image.src" :srcset="`${publication.image.src} 1200w, ${publication.image.large} 2400w`" sizes="(max-width: 900px) calc(100vw - 40px), 38vw" :width="publication.image.width" :height="publication.image.height" :alt="publication.image.alt" decoding="async" />
      </a>
      <figcaption><strong>Overview.</strong> {{ publication.image.caption }}</figcaption>
    </figure>
    <div class="publication-content">
      <div class="publication-badges"><span class="venue-badge"><svg class="venue-star" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.76 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>{{ publication.venue }}</span><span v-if="publication.id !== 'recontext3d'" class="mono year-badge">{{ publication.year }}</span></div>
      <h2 :id="`${publication.id}-title`">{{ publication.title }}</h2>
      <p class="publication-authors"><template v-for="(author, index) in publication.authors" :key="author.name"><span v-if="index">, </span><strong v-if="author.highlight">{{ author.name }}</strong><span v-else>{{ author.name }}</span></template></p>
      <p class="publication-summary">{{ publication.summary }}</p>
      <h3>Key contributions</h3>
      <ul class="publication-contributions"><li v-for="contribution in publication.contributions" :key="contribution">{{ contribution }}</li></ul>
      <div class="publication-resources" aria-label="Publication resources">
        <a v-for="link in publication.links" :key="link.label" :href="link.href" target="_blank" rel="noopener" class="publication-resource"><ResourceIcon :name="link.icon" />{{ link.label }}</a>
        <details class="publication-citation" @toggle="copyStatus = ''">
          <summary class="publication-resource"><ResourceIcon name="citation" />BibTeX<span class="citation-indicator" aria-hidden="true">+</span></summary>
          <div class="citation-panel"><div class="citation-toolbar"><button class="publication-resource" @click="copyCitation">Copy citation</button><span role="status" class="mono">{{ copyStatus }}</span></div><pre><code>{{ publication.bibtex }}</code></pre></div>
        </details>
      </div>
    </div>
  </article>
</template>
