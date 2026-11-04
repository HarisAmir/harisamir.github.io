<script setup lang="ts">
import { featuredSkills } from '../data/profile'
</script>
<template>
  <section class="skills-strip" aria-label="Skills">
    <div class="skills-window" tabindex="0" aria-label="Skills; scroll to explore">
      <div class="skills-track">
        <ul class="skills-sequence" aria-label="Selected skills"><li v-for="skill in featuredSkills" :key="skill"><span aria-hidden="true">◆</span>{{ skill }}</li></ul>
        <ul class="skills-sequence skills-clone" aria-hidden="true"><li v-for="skill in featuredSkills" :key="skill"><span>◆</span>{{ skill }}</li></ul>
      </div>
    </div>
  </section>
</template>
