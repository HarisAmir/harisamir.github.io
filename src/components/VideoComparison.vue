<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { Project } from '../data/projects'
defineProps<{ media: NonNullable<Project['comparison']> }>()
const baseline = ref<HTMLVideoElement>()
const ours = ref<HTMLVideoElement>()
const intended = ref(false)
const playing = ref(false)
const finished = ref(false)
const error = ref('')
const elapsed = ref(0)
const duration = ref(0)
let generation = 0
let starting = false
const status = computed(() => error.value || (finished.value ? 'DLS3D finished · holding the final frame.' : intended.value && !playing.value ? 'Loading comparison…' : playing.value ? 'Playing both at original speed.' : 'Ready when you are.'))
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
      error.value = 'Playback could not start. Press Play to try again.'
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
  for (const video of [baseline.value, ours.value]) if (video?.readyState === 0) video.load()
  void resume()
}
function reset() {
  generation++
  pausePair()
  finished.value = false
  elapsed.value = 0
  for (const video of [baseline.value, ours.value]) {
    if (video && video.readyState > 0) video.currentTime = 0
  }
  void resume()
}
function restart() { intended.value = true; error.value = ''; reset() }
function loop() { if (intended.value) reset() }
function buffer() {
  if (!intended.value) return
  generation++
  pausePair()
}
function fail() { stop(); error.value = 'The comparison could not load. Please reload the page to try again.' }
function updateTime() { elapsed.value = baseline.value?.currentTime || 0 }
onBeforeUnmount(stop)
</script>
<template>
  <section class="video-comparison" aria-label="DLS3D versus SOTA baseline video comparison">
    <div class="comparison-heading"><div><p class="mono accent">Less latency. More frames per second.</p><h3>Same scene. Faster perception.</h3></div><span class="mono">Original-speed playback</span></div>
    <div class="comparison-pair">
      <figure><figcaption><strong>SOTA baseline</strong><span class="mono">EVA-02 B · 11.07 s</span></figcaption><video ref="baseline" :src="media.baseline" :poster="media.baselinePoster" muted playsinline preload="metadata" aria-label="SOTA baseline multi-view 3D detection visualization" @loadedmetadata="duration = baseline?.duration || 0" @canplay="resume" @seeked="resume" @waiting="buffer" @ended="loop" @timeupdate="updateTime" @error="fail" /></figure>
      <figure class="comparison-ours"><figcaption><strong>Ours <span>(DLS3D)</span></strong><span class="mono">8.74 s</span></figcaption><div class="comparison-frame"><video ref="ours" :src="media.ours" :poster="media.oursPoster" muted playsinline preload="metadata" aria-label="DLS3D multi-view 3D detection visualization" @canplay="resume" @seeked="resume" @waiting="buffer" @ended="finished = true" @error="fail" /><span v-if="finished" class="video-hold">Finished · waiting for baseline</span></div></figure>
    </div>
    <div class="comparison-controls"><button class="publication-resource" @click="intended ? stop() : start()">{{ intended ? 'Pause comparison' : 'Play comparison' }}</button><button class="publication-resource" @click="restart">Restart</button><span class="comparison-time mono" aria-hidden="true">{{ elapsed.toFixed(1) }} / {{ duration ? duration.toFixed(1) : '11.1' }} s</span><p :class="error ? 'comparison-status' : 'sr-only'" role="status">{{ status }}</p></div>
    <noscript><p class="comparison-note">Enable JavaScript to play the synchronized comparison.</p></noscript>
  </section>
</template>
