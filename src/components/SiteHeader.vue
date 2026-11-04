<script setup lang="ts">
import { pages } from '../data/pages'
</script>
<template>
  <header class="site-header">
    <nav class="site-nav" aria-label="Main navigation">
      <RouterLink v-for="item in pages" :key="item.path" :to="item.path" exact-active-class="active">
        <span class="mono nav-number">{{ item.number }}</span><span>{{ item.title }}</span>
      </RouterLink>
    </nav>
  </header>
</template>
