<template>
  <span class="location-marker" aria-hidden="true">
    <svg viewBox="0 0 24 28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10.5C20 16.5 12 23 12 23S4 16.5 4 10.5a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.7" />
      <path d="M7 26h10" opacity=".5" />
    </svg>
  </span>
</template>
<style scoped>
.location-marker { display: grid; place-items: center; width: 40px; height: 44px; flex-shrink: 0; color: var(--accent); }
.location-marker svg { width: 26px; height: 30px; animation: location-bounce 3.6s ease-in-out infinite; }
@keyframes location-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@media (max-width: 600px) { .location-marker { width: 30px; height: 36px; } .location-marker svg { width: 23px; height: 27px; } }
</style>
