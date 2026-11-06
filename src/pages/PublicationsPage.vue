<script setup lang="ts">
import PageHeading from '../components/PageHeading.vue'
import ArrowIcon from '../components/ArrowIcon.vue'
import { profile } from '../data/profile'
import { publications, underReviewPublications } from '../data/publications'
import PublicationCard from '../components/PublicationCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
</script>
<template><section class="standalone-page content-page"><PageHeading number="03" title="Publications" description="Collection of my research, explorations, and contributions." /><div class="publication-list"><ProjectCard v-for="submission in underReviewPublications" :key="submission.slug" :project="submission" publication /><PublicationCard v-for="publication in publications" :key="publication.id" :publication="publication" /></div><a class="text-link scholar-link" :href="profile.scholar" target="_blank" rel="noopener">View my Google Scholar profile <ArrowIcon /></a></section></template>
