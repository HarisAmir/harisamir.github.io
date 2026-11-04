<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import AmbientWaves from './components/AmbientWaves.vue'
import { usePageMotion } from './composables/usePageMotion'
usePageMotion()
function focusPage() { document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true }) }
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <AmbientWaves />
  <SiteHeader />
  <main id="main" tabindex="-1" class="wrap">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in" @after-enter="focusPage">
        <div :key="route.path" class="page-view" :data-page-path="route.path"><component :is="Component" /></div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
