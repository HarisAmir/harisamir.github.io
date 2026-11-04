<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const waves = ref<HTMLElement>()
let cleanup = () => {}
onMounted(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const elements = [...waves.value!.querySelectorAll<HTMLElement>('.ambient-wave')]
  const animations = new Map<HTMLElement, Animation>()
  let generation = 0
  const random = (min: number, max: number) => min + Math.random() * (max - min)
  const destination = () => `translate(${random(-16, 16)}%, ${random(-14, 14)}%) rotate(${random(-28, 28)}deg) scale(${random(1.05, 1.28)})`
  function travel(element: HTMLElement, from: string, duration: number, run: number) {
    const to = destination()
    const animation = element.animate([{ transform: from }, { transform: to }], {
      duration, easing: 'cubic-bezier(.45, 0, .55, 1)', fill: 'forwards',
    })
    animations.set(element, animation)
    if (document.hidden) animation.pause()
    animation.finished.then(() => {
      if (run !== generation) return
      // Commit the endpoint before beginning a fresh random path, avoiding jumps.
      element.style.transform = to
      animation.cancel()
      travel(element, to, duration, run)
    }).catch(() => { /* Cancellation is expected when motion settings change. */ })
  }
  function update() {
    const run = ++generation
    for (const animation of animations.values()) animation.cancel()
    animations.clear()
    for (const [index, element] of elements.entries()) {
      element.style.removeProperty('transform')
      if (reduced.matches || !element.animate) { element.style.removeProperty('animation'); continue }
      const from = getComputedStyle(element).transform
      element.style.animation = 'none'
      travel(element, from, index === 0 ? 5720 : 7693, run)
    }
  }
  function visibility() {
    for (const animation of animations.values()) document.hidden ? animation.pause() : animation.play()
  }
  update()
  reduced.addEventListener('change', update)
  document.addEventListener('visibilitychange', visibility)
  cleanup = () => {
    generation++
    for (const animation of animations.values()) animation.cancel()
    reduced.removeEventListener('change', update)
    document.removeEventListener('visibilitychange', visibility)
  }
})
onBeforeUnmount(() => cleanup())
</script>
<template>
  <div ref="waves" class="ambient-waves" aria-hidden="true"><span class="ambient-wave wave-one"></span><span class="ambient-wave wave-two"></span></div>
</template>
