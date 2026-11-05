<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const globe = ref<HTMLElement>()
let cleanup = () => {}
onMounted(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  function updateTilt() {
    frame = 0
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight)
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll))
    if (globe.value) globe.value.style.rotate = `${reduced.matches ? 0 : progress * 90}deg`
  }
  function scheduleTilt() { if (!frame) frame = requestAnimationFrame(updateTilt) }
  window.addEventListener('scroll', scheduleTilt, { passive: true })
  window.addEventListener('resize', scheduleTilt)
  reduced.addEventListener('change', scheduleTilt)
  updateTilt()
  cleanup = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', scheduleTilt)
    window.removeEventListener('resize', scheduleTilt)
    reduced.removeEventListener('change', scheduleTilt)
  }
})
onBeforeUnmount(() => cleanup())
</script>

<template>
  <span class="location-globe" aria-hidden="true">
    <span ref="globe" class="globe">
      <span class="globe-wrap">
        <span class="circle"></span><span class="circle"></span><span class="circle"></span>
        <span class="circle-hor"></span><span class="circle-hor-middle"></span>
      </span>
    </span>
  </span>
</template>

<style scoped>
/* Supplied wireframe animation, sized for the inline location label. */
.location-globe { position: relative; display: block; width: 40px; height: 44px; flex-shrink: 0; font-size: 11px; color: var(--accent); }
.globe { position: absolute; top: 50%; left: 50%; width: 3em; height: 3em; transform: translate(-50%, -50%); border-radius: 50%; overflow: hidden; }
.globe-wrap { top: 50%; left: 50%; width: 100%; height: 100%; position: absolute; display: block; border-radius: 50%; transform: translate(-50%, -50%) rotate(30deg); animation: globe-tilt 5.4s cubic-bezier(.35, 0, .65, 1) infinite; overflow: hidden; box-shadow: inset 0 0 0 .125em currentColor; }
@keyframes globe-tilt {
  0%, 100% { transform: translate(-50%, -50%) rotate(15deg); }
  50% { transform: translate(-50%, -50%) rotate(-15deg); }
}
.circle { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; transform: translate(-50%, -50%); border-radius: 50%; box-shadow: inset .1em 0 0 .08em currentColor; animation: globe-circle 2.7s linear infinite; font-size: .75em; }
.circle:nth-child(1) { animation-delay: -1.8s; }
.circle:nth-child(2) { animation-delay: -.9s; }
@keyframes globe-circle {
  0% { border-radius: 50%; box-shadow: inset .1em 0 0 .08em currentColor; width: 100%; }
  49% { border-radius: 50%; box-shadow: inset .1em 0 0 .08em currentColor; background: transparent; }
  50% { border-radius: 0; width: .175em; background: currentColor; }
  51% { border-radius: 50%; box-shadow: inset -.1em 0 0 .08em currentColor; background: transparent; }
  100% { border-radius: 50%; box-shadow: inset -.1em 0 0 .08em currentColor; width: 100%; }
}
.circle-hor { position: absolute; top: 50%; left: 50%; width: 150%; transform: translate(-50%, -50%); border-radius: 50%; height: 55%; box-shadow: inset 0 0 0 .15em currentColor; font-size: .75em; }
.circle-hor-middle { position: absolute; top: 50%; left: 50%; width: 150%; transform: translate(-50%, -50%); height: .15em; background: currentColor; font-size: .75em; }
@media (max-width: 600px) { .location-globe { width: 30px; height: 36px; font-size: 9px; } }
@media (prefers-reduced-motion: reduce) { .globe-wrap, .circle { animation: none; } }
</style>
