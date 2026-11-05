<script setup lang="ts">
import { pages } from '../data/pages'
import ThemeToggle from './ThemeToggle.vue'
</script>
<template>
  <header class="site-header">
    <nav class="site-nav" aria-label="Main navigation">
      <RouterLink v-for="item in pages" :key="item.path" :to="item.path" exact-active-class="active">
        <span class="mono nav-number">{{ item.number }}</span><span>{{ item.title }}</span>
      </RouterLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
