<script setup lang="ts">
import PageHeading from '../components/PageHeading.vue'
import ArrowIcon from '../components/ArrowIcon.vue'
import ContactIcon from '../components/ContactIcon.vue'
import { contactLinks } from '../data/profile'
</script>
<template>
  <section class="standalone-page content-page contact-page">
    <PageHeading number="04" title="Contact" description="Whether it's research, engineering, or something entirely new, I'd love to hear about it." />
    <div class="contact-directory">
      <a v-for="(link, index) in contactLinks" :key="link.label" :href="link.href" :target="link.href.startsWith('mailto:') ? undefined : '_blank'" :rel="link.href.startsWith('mailto:') ? undefined : 'noopener'" class="contact-row">
        <span class="mono contact-number">0{{ index + 1 }}</span>
        <h2><ContactIcon :name="link.label" />{{ link.label }}</h2>
        <span class="contact-value">{{ link.value }}</span><ArrowIcon />
      </a>
    </div>
  </section>
</template>
