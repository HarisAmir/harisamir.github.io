<script setup lang="ts">defineProps<{ number: string; title: string; description: string }>()</script>
<template><header class="page-heading"><p class="mono accent">{{ number }} / {{ title }}</p><h1>{{ title }}<span class="accent">.</span></h1><p class="page-description">{{ description }}</p></header></template>
