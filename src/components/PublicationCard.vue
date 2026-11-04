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
      <div class="publication-badges"><span class="venue-badge">{{ publication.venue }}</span><span class="published-badge">{{ publication.status }}</span><span class="mono">{{ publication.year }}</span></div>
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
