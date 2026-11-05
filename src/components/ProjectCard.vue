<script setup lang="ts">
import type { Project } from '../data/projects'
import ProjectGallery from './ProjectGallery.vue'
import VideoComparison from './VideoComparison.vue'
import ResourceIcon from './ResourceIcon.vue'
import EmphasisText from './EmphasisText.vue'
defineProps<{ project: Project }>()
</script>
<template>
  <article :id="project.slug" class="project-card" :class="{ 'project-featured': project.comparison }" :aria-labelledby="`${project.slug}-title`">
    <ProjectGallery v-if="project.figures.length" :figures="project.figures" :title="project.title" />
    <div class="publication-content project-content">
      <div class="project-title-row"><h2 :id="`${project.slug}-title`"><svg v-if="project.slug === 'dls3d'" class="project-title-star" width="23" height="23" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.76 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>{{ project.title }}</h2></div>
      <ul class="tags project-categories" aria-label="Project topics"><li v-for="category in project.tags" :key="category">{{ category }}</li></ul>
      <p class="publication-summary"><EmphasisText :text="project.summary" /></p>
      <ul class="publication-contributions"><li v-for="item in project.highlights" :key="item"><EmphasisText :text="item" /></li></ul>
      <div class="publication-resources project-resources" aria-label="Project resources">
        <a v-for="link in project.links" :key="link.href" :href="link.href" class="publication-resource" target="_blank" rel="noopener"><ResourceIcon :name="link.icon" />{{ link.label }}</a>
        <span v-for="label in project.forthcoming" :key="label" class="resource-forthcoming"><ResourceIcon :name="label === 'GitHub' ? 'github' : 'paper'" />{{ label }}<span>Coming soon</span></span>
      </div>
    </div>
    <VideoComparison v-if="project.comparison" :media="project.comparison" />
  </article>
</template>
