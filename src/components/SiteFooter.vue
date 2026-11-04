<script setup lang="ts">
import { profile } from '../data/profile'
import ArrowIcon from './ArrowIcon.vue'
const profiles = [
  { label: 'Google Scholar', href: profile.scholar },
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
]
</script>
<template>
  <footer class="footer-shell">
    <div class="wrap site-footer">
    <div class="footer-contact">
      <p class="mono footer-label">Contact</p>
      <a class="footer-invitation" :href="profile.linkedin" target="_blank" rel="noopener">Write to me on LinkedIn <ArrowIcon /></a>
      <p class="footer-description">For collaborations, research, or professional opportunities.</p>
      <a class="footer-email text-link" :href="`mailto:${profile.email}`">{{ profile.email }} <ArrowIcon /></a>
    </div>
    <nav class="footer-profiles" aria-label="Social profiles">
      <p class="mono footer-label">Profiles</p>
      <a v-for="link in profiles" :key="link.label" :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
    </nav>
    <div class="footer-meta">
      <p class="mono">{{ profile.location }}</p>
      <div><a href="#main" class="mono footer-top">Back to top ↑</a><p class="mono">© {{ new Date().getFullYear() }} {{ profile.name }}</p></div>
    </div>
    </div>
  </footer>
</template>
