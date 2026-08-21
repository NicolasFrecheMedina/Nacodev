<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import TrajectoryNode from './TrajectoryNode.vue'
import { timelineSteps, trajectoryPath, type TimelineStep, type TimelineStepId } from '@/data/timeline'

const props = defineProps<{ activeId: TimelineStepId; selectedId: TimelineStepId | null; emerging?: boolean }>()
const emit = defineEmits<{ preview: [step: TimelineStep | null]; select: [step: TimelineStep] }>()
const activeStep = computed(() => timelineSteps.find((step) => step.id === props.activeId) ?? timelineSteps[0]!)
const drawReady = ref(!props.emerging)
let firstFrame = 0
let secondFrame = 0
const displayedProgress = computed(() => props.emerging && !drawReady.value ? 0 : activeStep.value.progress)
const progressStyle = computed(() => ({
  '--trajectory-progress': `${displayedProgress.value}%`,
  '--trajectory-dash': displayedProgress.value,
  '--trajectory-offset': 100 - displayedProgress.value,
  '--trajectory-clip': `${drawReady.value ? 1280 : 0}px`,
  '--trajectory-reveal': drawReady.value ? '100%' : '0%',
}))

onMounted(() => {
  if (!props.emerging) return
  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(() => { drawReady.value = true })
  })
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(firstFrame)
  window.cancelAnimationFrame(secondFrame)
})
</script>

<template>
  <div class="trajectory-map" :class="{ 'trajectory-map--emerging': emerging }" :style="progressStyle" aria-label="Trajectoire de Nicolas">
    <svg class="trajectory-map__line" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="trajectory-glow" x1="0" x2="1"><stop stop-color="#9bdef8" stop-opacity="0"/><stop offset=".48" stop-color="#d9f4ff" stop-opacity=".72"/><stop offset="1" stop-color="#9bdef8" stop-opacity=".08"/></linearGradient>
        <clipPath id="trajectory-reveal-clip"><rect class="trajectory-map__clip" x="-40" y="-20" height="560" /></clipPath>
      </defs>
      <path class="trajectory-map__shadow" :d="trajectoryPath" />
      <path class="trajectory-map__path" :d="trajectoryPath" />
      <path class="trajectory-map__progress" :d="trajectoryPath" pathLength="100" />
    </svg>
    <div class="trajectory-map__mobile-line" aria-hidden="true"><span /></div>
    <div class="trajectory-map__nodes">
      <TrajectoryNode v-for="(step, index) in timelineSteps" :key="step.id" :step="step" :index="index" :active="activeId === step.id" :selected="selectedId === step.id" @preview="emit('preview', $event)" @select="emit('select', $event)" />
    </div>
  </div>
</template>

<style scoped>
.trajectory-map { position: relative; width: 100%; min-width: 0; height: 100%; min-height: 19rem; perspective: 800px; }
.trajectory-map__line { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; transform: rotate(-2deg) perspective(700px) rotateX(10deg); transform-origin: center; }
.trajectory-map__shadow, .trajectory-map__path, .trajectory-map__progress { fill: none; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.trajectory-map__shadow { stroke: rgb(80 154 183 / 10%); stroke-width: 12; filter: blur(9px); }
.trajectory-map__path { stroke: url(#trajectory-glow); stroke-width: 1.25; stroke-dasharray: 3 5; animation: trajectory-drift 18s linear infinite; }
.trajectory-map__progress { stroke: rgb(204 240 253 / 88%); stroke-width: 2; stroke-dasharray: 100 100; stroke-dashoffset: var(--trajectory-offset); filter: drop-shadow(0 0 5px rgb(155 222 248 / 68%)); transition: stroke-dashoffset 620ms cubic-bezier(0.22, 1, 0.36, 1); }
.trajectory-map__clip { width: var(--trajectory-clip); transition: width 2300ms linear 2050ms; }
.trajectory-map--emerging .trajectory-map__shadow, .trajectory-map--emerging .trajectory-map__path { clip-path: url('#trajectory-reveal-clip'); }
.trajectory-map--emerging .trajectory-map__progress { animation: first-progress 1200ms cubic-bezier(0.22, 1, 0.36, 1) 4450ms both; }
.trajectory-map--emerging .trajectory-node { opacity: 0; }
.trajectory-map--emerging .trajectory-node:nth-child(1) { animation: node-arrival 350ms ease 2400ms forwards; }
.trajectory-map--emerging .trajectory-node:nth-child(2) { animation: node-arrival 350ms ease 2830ms forwards; }
.trajectory-map--emerging .trajectory-node:nth-child(3) { animation: node-arrival 350ms ease 3220ms forwards; }
.trajectory-map--emerging .trajectory-node:nth-child(4) { animation: node-arrival 350ms ease 3700ms forwards; }
.trajectory-map--emerging .trajectory-node:nth-child(5) { animation: node-arrival 350ms ease 4070ms forwards; }
.trajectory-map__mobile-line { display: none; }
.trajectory-map__nodes { position: absolute; inset: 0; transform-style: preserve-3d; }
@keyframes trajectory-drift { to { stroke-dashoffset: -80; } }
@keyframes node-arrival { from { opacity: 0; } to { opacity: 1; } }
@keyframes first-progress { from { opacity: 0; stroke-dasharray: 0 100; stroke-dashoffset: 0; } 8% { opacity: 1; } to { opacity: 1; stroke-dasharray: var(--trajectory-dash) 100; stroke-dashoffset: 0; } }
@media (max-width: 700px) {
  .trajectory-map { min-height: 4.3rem; }
  .trajectory-map__line { display: none; }
  .trajectory-map__mobile-line { position: absolute; top: 50%; right: 1.65rem; left: 1.65rem; display: block; height: 1px; overflow: hidden; background: rgb(155 222 248 / 16%); }
  .trajectory-map--emerging .trajectory-map__mobile-line { overflow: visible; background: transparent; }
  .trajectory-map__mobile-line span { display: block; width: var(--trajectory-progress); height: 100%; background: linear-gradient(90deg, rgb(155 222 248 / 18%), rgb(210 242 253 / 88%)); box-shadow: 0 0 0.7rem rgb(155 222 248 / 48%); transition: width 500ms cubic-bezier(0.22, 1, 0.36, 1); }
  .trajectory-map--emerging .trajectory-map__mobile-line span { width: var(--trajectory-reveal); background: repeating-linear-gradient(90deg, rgb(155 222 248 / 32%) 0 3px, transparent 3px 8px); box-shadow: none; transition-duration: 2300ms; transition-delay: 2050ms; transition-timing-function: linear; }
  .trajectory-map--emerging .trajectory-map__mobile-line::after { position: absolute; inset: 0 auto 0 0; width: var(--trajectory-progress); background: linear-gradient(90deg, rgb(155 222 248 / 18%), rgb(210 242 253 / 88%)); box-shadow: 0 0 0.7rem rgb(155 222 248 / 48%); content: ''; animation: mobile-first-progress 1200ms cubic-bezier(0.22, 1, 0.36, 1) 4450ms both; }
  .trajectory-map__nodes { display: flex; width: 100%; min-width: 0; align-items: center; justify-content: space-between; gap: 0.1rem; }
}
@keyframes mobile-first-progress { from { opacity: 0; width: 0; } 8% { opacity: 1; } to { opacity: 1; width: var(--trajectory-progress); } }
@media (prefers-reduced-motion: reduce) { .trajectory-map__path { animation: none; } .trajectory-map__line { transform: none; } .trajectory-map__clip, .trajectory-map--emerging .trajectory-map__mobile-line span { transition-duration: 235ms; transition-delay: 0ms; } .trajectory-map--emerging .trajectory-map__progress, .trajectory-map--emerging .trajectory-map__mobile-line::after { animation-delay: 235ms; animation-duration: 100ms; } .trajectory-map--emerging .trajectory-node { animation-delay: 120ms; animation-duration: 100ms; } }
</style>
