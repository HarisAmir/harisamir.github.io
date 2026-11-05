<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import type { Project } from '../data/projects'
defineProps<{ media: NonNullable<Project['comparison']> }>()
const baseline = ref<HTMLVideoElement>()
const ours = ref<HTMLVideoElement>()
const intended = ref(false)
const playing = ref(false)
const finished = ref(false)
const error = ref('')
let generation = 0
let starting = false
function pausePair() {
  baseline.value?.pause()
  ours.value?.pause()
  playing.value = false
}
function stop() {
  intended.value = false
  generation++
  pausePair()
}
async function resume() {
  const pair = [baseline.value, ours.value]
  if (!intended.value || starting || pair.some(video => !video)) return
  const active = pair.filter((video): video is HTMLVideoElement => !!video && !video.ended)
  if (active.some(video => video.readyState < 3 || video.seeking)) return
  const run = generation
  starting = true
  try {
    await Promise.all(active.map(video => { video.playbackRate = 1; return video.play() }))
    if (run === generation && intended.value) playing.value = true
    else pausePair()
  } catch (reason) {
    if (run === generation && intended.value && !(reason instanceof DOMException && reason.name === 'AbortError')) {
      stop()
      error.value = 'Playback could not start. Please reload the page to try again.'
    }
  } finally {
    starting = false
    // A seek or buffering event can cancel an in-flight play request. Retry
    // after it settles if the latest user intent is still to play.
    if (run !== generation && intended.value) void resume()
  }
}
function start() {
  error.value = ''
  intended.value = true
  for (const video of [baseline.value, ours.value]) {
    if (!video) continue
    video.muted = true
    if (video.readyState === 0) video.load()
  }
  void resume()
}
function reset() {
  generation++
  pausePair()
  finished.value = false
  for (const video of [baseline.value, ours.value]) {
    if (video && video.readyState > 0) video.currentTime = 0
  }
  void resume()
}
function loop() { if (intended.value) reset() }
function buffer() {
  if (!intended.value) return
  generation++
  pausePair()
}
function fail() { stop(); error.value = 'The comparison could not load. Please reload the page to try again.' }
onMounted(start)
onBeforeUnmount(stop)
</script>
<template>
  <section class="video-comparison" aria-label="DLS3D versus SOTA baseline video comparison">
    <div class="comparison-heading"><div><p class="mono accent">Less latency. More FPS</p><h3>Same scene. Same accuracy. Faster perception.</h3></div></div>
    <div class="comparison-pair">
      <figure><figcaption><strong>SOTA baseline</strong><span class="mono">11.07 s</span></figcaption><video ref="baseline" :src="media.baseline" :poster="media.baselinePoster" muted playsinline preload="auto" aria-label="SOTA baseline multi-view 3D detection visualization" @canplay="resume" @seeked="resume" @waiting="buffer" @ended="loop" @error="fail" /></figure>
      <figure class="comparison-ours"><figcaption><strong>Ours</strong><span class="mono">8.74 s</span></figcaption><div class="comparison-frame"><video ref="ours" :src="media.ours" :poster="media.oursPoster" muted playsinline preload="auto" aria-label="DLS3D multi-view 3D detection visualization" @canplay="resume" @seeked="resume" @waiting="buffer" @ended="finished = true" @error="fail" /><span v-if="finished" class="video-hold">Finished · waiting for baseline</span></div></figure>
    </div>
    <p v-if="error" class="comparison-status" role="status">{{ error }}</p>
    <noscript><p class="comparison-note">Enable JavaScript to play the synchronized comparison.</p></noscript>
  </section>
</template>
