<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import TrajectoryNode from './TrajectoryNode.vue'
import { timelineSteps, trajectoryPath, type TimelineStep, type TimelineStepId } from '@/data/timeline'

const props = defineProps<{ activeId: TimelineStepId; selectedId: TimelineStepId | null; emerging?: boolean; concluding?: boolean }>()
const emit = defineEmits<{ preview: [step: TimelineStep | null]; select: [step: TimelineStep]; 'conclusion-complete': [] }>()
const progressStep = computed(() => timelineSteps.find((step) => step.id === props.selectedId) ?? timelineSteps[0]!)
const progressIndex = computed(() => timelineSteps.findIndex((step) => step.id === progressStep.value.id))
const progressPath = ref<SVGPathElement | null>(null)
const measuredLengths = ref<Partial<Record<TimelineStepId, number>>>({})
const totalPathLength = ref(1)
const drawReady = ref(!props.emerging)
const activeLength = computed(() => measuredLengths.value[progressStep.value.id] ?? 0)
const renderedLength = ref(0)
let firstFrame = 0
let secondFrame = 0
let progressFrame = 0
let progressStartTimer: number | undefined
let progressInitialized = false
const displayedMobileProgress = computed(() => props.concluding ? 100 : props.emerging && !drawReady.value ? 0 : (progressIndex.value / (timelineSteps.length - 1)) * 100)
const progressStyle = computed(() => ({
  '--trajectory-mobile-progress': `${displayedMobileProgress.value}%`,
  '--trajectory-clip': `${drawReady.value ? 1280 : 0}px`,
  '--trajectory-reveal': drawReady.value ? '100%' : '0%',
}))

function animateProgress(target: number, duration = 620, onComplete?: () => void) {
  window.cancelAnimationFrame(progressFrame)
  const start = renderedLength.value
  const startedAt = performance.now()
  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    const easedProgress = 1 - (1 - progress) ** 4
    renderedLength.value = start + (target - start) * easedProgress
    if (progress < 1) progressFrame = window.requestAnimationFrame(tick)
    else {
      renderedLength.value = target
      onComplete?.()
    }
  }
  progressFrame = window.requestAnimationFrame(tick)
}

watch(activeLength, (target) => {
  if (target <= 0 || props.concluding) return
  if (!progressInitialized) {
    progressInitialized = true
    if (props.emerging) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      progressStartTimer = window.setTimeout(() => animateProgress(target, reducedMotion ? 100 : 1200), reducedMotion ? 235 : 4450)
    }
    else renderedLength.value = target
    return
  }
  animateProgress(target)
})

watch(() => props.concluding, (concluding) => {
  if (!concluding) {
    window.cancelAnimationFrame(progressFrame)
    if (activeLength.value > 0) renderedLength.value = activeLength.value
    return
  }

  const finalLength = progressPath.value?.getTotalLength()
  if (finalLength === undefined) return
  if (progressStartTimer !== undefined) {
    window.clearTimeout(progressStartTimer)
    progressStartTimer = undefined
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  animateProgress(finalLength, reducedMotion ? 120 : 900, () => emit('conclusion-complete'))
})

function squaredDistance(path: SVGPathElement, length: number, x: number, y: number) {
  const point = path.getPointAtLength(length)
  return (point.x - x) ** 2 + (point.y - y) ** 2
}

function lengthAtPoint(path: SVGPathElement, x: number, y: number) {
  const totalLength = path.getTotalLength()
  const sampleCount = 720
  const sampleLength = totalLength / sampleCount
  let closestLength = 0
  let closestDistance = Number.POSITIVE_INFINITY

  for (let index = 0; index <= sampleCount; index += 1) {
    const length = index * sampleLength
    const distance = squaredDistance(path, length, x, y)
    if (distance < closestDistance) {
      closestDistance = distance
      closestLength = length
    }
  }

  let start = Math.max(0, closestLength - sampleLength)
  let end = Math.min(totalLength, closestLength + sampleLength)
  for (let iteration = 0; iteration < 36; iteration += 1) {
    const first = start + (end - start) / 3
    const second = end - (end - start) / 3
    if (squaredDistance(path, first, x, y) <= squaredDistance(path, second, x, y)) end = second
    else start = first
  }

  return (start + end) / 2
}

function measureProgress() {
  const path = progressPath.value
  if (!path) return
  const totalLength = path.getTotalLength()
  totalPathLength.value = totalLength
  measuredLengths.value = Object.fromEntries(timelineSteps.map((step) => {
    const x = step.position.x * 12
    const y = step.position.y * 5
    return [step.id, lengthAtPoint(path, x, y)]
  }))
}

onMounted(() => {
  measureProgress()
  if (!props.emerging) return
  firstFrame = window.requestAnimationFrame(() => {
    secondFrame = window.requestAnimationFrame(() => { drawReady.value = true })
  })
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(firstFrame)
  window.cancelAnimationFrame(secondFrame)
  window.cancelAnimationFrame(progressFrame)
  if (progressStartTimer !== undefined) window.clearTimeout(progressStartTimer)
})
</script>

<template>
  <div class="trajectory-map" :class="{ 'trajectory-map--emerging': emerging, 'trajectory-map--concluding': concluding }" :style="progressStyle" aria-label="Trajectoire de Nicolas">
    <svg class="trajectory-map__line" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="trajectory-glow" x1="0" x2="1"><stop stop-color="#9bdef8" stop-opacity="0"/><stop offset=".48" stop-color="#d9f4ff" stop-opacity=".72"/><stop offset="1" stop-color="#9bdef8" stop-opacity=".08"/></linearGradient>
        <clipPath id="trajectory-reveal-clip"><rect class="trajectory-map__clip" x="-40" y="-20" height="560" /></clipPath>
      </defs>
      <path class="trajectory-map__shadow" :d="trajectoryPath" />
      <path class="trajectory-map__path" :d="trajectoryPath" />
      <path ref="progressPath" class="trajectory-map__progress" :d="trajectoryPath" :stroke-dasharray="`${renderedLength} ${totalPathLength}`" stroke-dashoffset="0" />
    </svg>
    <div class="trajectory-map__mobile-line" aria-hidden="true"><span /></div>
    <div class="trajectory-map__nodes">
      <TrajectoryNode v-for="(step, index) in timelineSteps" :key="step.id" :step="step" :index="index" :active="activeId === step.id" :selected="selectedId === step.id" :concluding="concluding" @preview="emit('preview', $event)" @select="emit('select', $event)" />
    </div>
  </div>
</template>

<style scoped>
.trajectory-map { position: relative; width: 100%; min-width: 0; height: 100%; min-height: 19rem; }
.trajectory-map__line { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.trajectory-map__shadow, .trajectory-map__path, .trajectory-map__progress { fill: none; }
.trajectory-map__shadow, .trajectory-map__path { stroke-linecap: round; vector-effect: non-scaling-stroke; }
.trajectory-map__shadow { stroke: rgb(80 154 183 / 10%); stroke-width: 12; filter: blur(9px); }
.trajectory-map__path { stroke: url(#trajectory-glow); stroke-width: 1.25; stroke-dasharray: 3 5; animation: trajectory-drift 18s linear infinite; }
.trajectory-map__progress { stroke: rgb(204 240 253 / 88%); stroke-width: 2; stroke-linecap: butt; filter: drop-shadow(0 0 5px rgb(155 222 248 / 68%)); transition: stroke 240ms ease, filter 240ms ease; }
.trajectory-map--concluding { pointer-events: none; }
.trajectory-map--concluding .trajectory-map__progress { stroke: #fff4d5; filter: drop-shadow(0 0 8px rgb(255 244 211 / 88%)) drop-shadow(0 0 18px rgb(255 226 151 / 42%)); }
.trajectory-map__clip { width: var(--trajectory-clip); transition: width 2300ms linear 2050ms; }
.trajectory-map--emerging .trajectory-map__shadow, .trajectory-map--emerging .trajectory-map__path { clip-path: url('#trajectory-reveal-clip'); }
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
@media (max-width: 700px) {
  .trajectory-map { min-height: 4.3rem; }
  .trajectory-map__line { display: none; }
  .trajectory-map__mobile-line { position: absolute; top: 50%; right: 1.65rem; left: 1.65rem; display: block; height: 1px; overflow: hidden; background: rgb(155 222 248 / 16%); }
  .trajectory-map--emerging .trajectory-map__mobile-line { overflow: visible; background: transparent; }
  .trajectory-map__mobile-line span { display: block; width: var(--trajectory-mobile-progress); height: 100%; background: linear-gradient(90deg, rgb(155 222 248 / 18%), rgb(210 242 253 / 88%)); box-shadow: 0 0 0.7rem rgb(155 222 248 / 48%); transition: width 500ms cubic-bezier(0.22, 1, 0.36, 1); }
  .trajectory-map--concluding .trajectory-map__mobile-line span { background: linear-gradient(90deg, rgb(255 232 168 / 35%), #fff4d5); box-shadow: 0 0 1rem rgb(255 226 151 / 58%); transition-duration: 900ms; }
  .trajectory-map--emerging .trajectory-map__mobile-line span { width: var(--trajectory-reveal); background: repeating-linear-gradient(90deg, rgb(155 222 248 / 32%) 0 3px, transparent 3px 8px); box-shadow: none; transition-duration: 2300ms; transition-delay: 2050ms; transition-timing-function: linear; }
  .trajectory-map--emerging .trajectory-map__mobile-line::after { position: absolute; inset: 0 auto 0 0; width: var(--trajectory-mobile-progress); background: linear-gradient(90deg, rgb(155 222 248 / 18%), rgb(210 242 253 / 88%)); box-shadow: 0 0 0.7rem rgb(155 222 248 / 48%); content: ''; animation: mobile-first-progress 1200ms cubic-bezier(0.22, 1, 0.36, 1) 4450ms both; }
  .trajectory-map__nodes { display: flex; width: 100%; min-width: 0; align-items: center; justify-content: space-between; gap: 0.1rem; }
}
@keyframes mobile-first-progress { from { opacity: 0; width: 0; } 8% { opacity: 1; } to { opacity: 1; width: var(--trajectory-mobile-progress); } }
@media (prefers-reduced-motion: reduce) { .trajectory-map__path { animation: none; } .trajectory-map__line { transform: none; } .trajectory-map__clip, .trajectory-map--emerging .trajectory-map__mobile-line span { transition-duration: 235ms; transition-delay: 0ms; } .trajectory-map--emerging .trajectory-map__mobile-line::after { animation-delay: 235ms; animation-duration: 100ms; } .trajectory-map--emerging .trajectory-node { animation-delay: 120ms; animation-duration: 100ms; } }
</style>
