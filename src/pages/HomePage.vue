<script setup lang="ts">
import { profile, affiliations } from '../data/profile'
import { pages } from '../data/pages'
import ArrowIcon from '../components/ArrowIcon.vue'
import SkillsStrip from '../components/SkillsStrip.vue'
import LocationMarker from '../components/LocationMarker.vue'
import { projects } from '../data/projects'
import { publications } from '../data/publications'
const projectPreview = projects.find(project => project.slug === 'dls3d')!.comparison!.oursPoster
const publicationPreview = publications.find(publication => publication.id === 'recontext3d')!
</script>

<template>
  <div class="home-page">
  <section id="about" class="hero">
    <div class="hero-kicker mono rise"><span>Portfolio - 2026 </span><span class="hero-location">Berlin, DE <LocationMarker /></span></div>
    <div class="hero-content">
      <div class="hero-intro">
        <div class="hero-name-frame">
          <svg class="name-star name-star-one" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 0C35 23 41 29 64 32C41 35 35 41 32 64C29 41 23 35 0 32C23 29 29 23 32 0Z" fill="currentColor" /></svg>
          <h1 class="hero-name rise">Haris Amir<span class="accent">.</span></h1>
          <svg class="name-star name-star-two" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 0C35 23 41 29 64 32C41 35 35 41 32 64C29 41 23 35 0 32C23 29 29 23 32 0Z" fill="currentColor" /></svg>
        </div>
        <p class="hero-role rise">{{ profile.role }}</p>
        <p class="hero-statement rise">{{ profile.introduction }}</p>
        <div class="hero-actions rise">
          <RouterLink to="/projects/" class="button button-dark">View Projects <ArrowIcon /></RouterLink>
          <a :href="profile.resume" download class="button button-outline">Download Resume <span aria-hidden="true">↓</span></a>
        </div>
        <dl class="hero-facts rise"><div v-for="fact in profile.facts" :key="fact.label"><dt class="mono">{{ fact.label }}</dt><dd :class="{ 'availability-status': fact.label === 'Status' }"><span v-if="fact.label === 'Status'" class="status-dot" aria-hidden="true"></span>{{ fact.value }}</dd></div></dl>
      </div>
      <figure class="portrait rise">
        <img src="/profile/portrait-640.webp" srcset="/profile/portrait-640.webp 640w, /profile/portrait-1280.webp 1280w" sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1050px) 40vw, 33vw" width="640" height="854" alt="Haris Amir standing beside a canal" fetchpriority="high" />
      </figure>
    </div>
    <section class="affiliations" aria-labelledby="affiliations-heading">
      <h2 id="affiliations-heading">Experience &amp; Affiliations<span class="accent">.</span></h2>
      <ul class="affiliation-list"><li v-for="affiliation in affiliations" :key="affiliation.name"><img :src="affiliation.logo" :alt="affiliation.name" width="128" height="64" loading="lazy" decoding="async" /></li></ul>
    </section>
    <div class="about-line"><span class="mono">My focus</span><p>{{ profile.about }}</p></div>
    <SkillsStrip />
  </section>

  <nav class="page-index" aria-label="Explore the portfolio">
    <div class="index-columns mono" aria-hidden="true"><span>No.</span><span>Section</span><span>Content</span><span>Preview</span><span></span></div>
    <RouterLink v-for="page in pages.slice(1)" :key="page.path" :to="page.path" class="index-row">
      <span class="mono index-number">{{ page.number }}</span>
      <span class="index-title">{{ page.title }}</span>
      <span class="index-description">{{ page.summary }}</span>
      <span class="index-preview" :class="{ 'index-preview-image': page.title !== 'Contact' }" aria-hidden="true">
        <template v-if="page.title === 'Projects'"><img :src="projectPreview" alt="" width="1130" height="720" loading="lazy" decoding="async" /><span class="mono">DLS3D · Dynamic layer selection</span></template>
        <template v-else-if="page.title === 'Publications'"><img :src="publicationPreview.image.src" alt="" :width="publicationPreview.image.width" :height="publicationPreview.image.height" loading="lazy" decoding="async" /><span class="mono">ReConText3D · {{ publicationPreview.venue }}</span></template>
        <template v-else><span class="mono">Start a conversation</span><span class="preview-type">Say hello<span class="accent">.</span></span></template>
      </span>
      <ArrowIcon />
    </RouterLink>
  </nav>
  </div>
</template>
