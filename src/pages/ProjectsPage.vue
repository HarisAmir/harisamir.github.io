<script setup lang="ts">
import PageHeading from '../components/PageHeading.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
</script>
<template>
  <section class="standalone-page content-page">
    <PageHeading number="02" title="Projects" description="Projects I've built and worked on." />
    <div class="project-list"><ProjectCard v-for="project in projects" :key="project.slug" :project="project" /></div>
  </section>
</template>
