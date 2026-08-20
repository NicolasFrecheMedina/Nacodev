<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import TrajectoryNode from './TrajectoryNode.vue'
import { timelineSteps, trajectoryPath, type TimelineStep, type TimelineStepId } from '@/data/timeline'

const props = defineProps<{ activeId: TimelineStepId; selectedId: TimelineStepId | null; emerging?: boolean }>()
const emit = defineEmits<{ preview: [step: TimelineStep | null]; select: [step: TimelineStep] }>()
const activeStep = computed(() => timelineSteps.find((step) => step.id === props.activeId) ?? timelineSteps[0]!)
const drawReady = ref(!props.emerging)
const reducedMotion = ref(false)
let firstFrame = 0
let secondFrame = 0
const displayedProgress = computed(() => props.emerging && !drawReady.value ? 0 : activeStep.value.progress)
const progressStyle = computed(() => ({
  '--trajectory-progress': `${displayedProgress.value}%`,
  '--trajectory-offset': 100 - displayedProgress.value,
  '--trajectory-clip': `${displayedProgress.value / timelineSteps[0]!.progress * 320}px`,
}))

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
      <circle v-if="emerging" class="trajectory-map__guide" r="4">
        <animateMotion
          :dur="reducedMotion ? '270ms' : '1210ms'"
          begin="0s"
          fill="freeze"
          calcMode="linear"
          keyPoints="0.035;0.035;0.18"
          :keyTimes="reducedMotion ? '0;0.13;1' : '0;0.132;1'"
          :path="trajectoryPath"
        />
      </circle>
    </svg>
    <div class="trajectory-map__mobile-line" aria-hidden="true"><span /><b v-if="emerging" /></div>
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
.trajectory-map__guide { fill: #f4fbff; filter: drop-shadow(0 0 7px #9bdef8) drop-shadow(0 0 15px rgb(155 222 248 / 72%)); }
.trajectory-map--emerging .trajectory-map__shadow, .trajectory-map--emerging .trajectory-map__path { opacity: 0; }
.trajectory-map__clip { width: var(--trajectory-clip); transition: width 1050ms linear 128ms; }
.trajectory-map--emerging .trajectory-map__progress { clip-path: url('#trajectory-reveal-clip'); stroke-width: 2.4; transition-duration: 1050ms; transition-delay: 128ms; transition-timing-function: linear; }
.trajectory-map--emerging .trajectory-node { opacity: 0; }
.trajectory-map--emerging .trajectory-node:first-child { animation: first-beacon 200ms ease 1210ms forwards; }
.trajectory-map__mobile-line { display: none; }
.trajectory-map__nodes { position: absolute; inset: 0; transform-style: preserve-3d; }
@keyframes trajectory-drift { to { stroke-dashoffset: -80; } }
@keyframes first-beacon { from { opacity: 0; filter: brightness(1); } to { opacity: 1; filter: brightness(1.55); } }
@media (max-width: 700px) {
  .trajectory-map { min-height: 4.3rem; }
  .trajectory-map__line { display: none; }
  .trajectory-map__mobile-line { position: absolute; top: 50%; right: 1.65rem; left: 1.65rem; display: block; height: 1px; overflow: hidden; background: rgb(155 222 248 / 16%); }
  .trajectory-map--emerging .trajectory-map__mobile-line { overflow: visible; background: transparent; }
  .trajectory-map__mobile-line span { display: block; width: var(--trajectory-progress); height: 100%; background: linear-gradient(90deg, rgb(155 222 248 / 18%), rgb(210 242 253 / 88%)); box-shadow: 0 0 0.7rem rgb(155 222 248 / 48%); transition: width 500ms cubic-bezier(0.22, 1, 0.36, 1); }
  .trajectory-map--emerging .trajectory-map__mobile-line span { transition-duration: 1050ms; transition-delay: 128ms; transition-timing-function: linear; }
  .trajectory-map__mobile-line b { position: absolute; top: 50%; left: var(--trajectory-progress); width: 0.42rem; height: 0.42rem; border-radius: 50%; background: #f4fbff; box-shadow: 0 0 0.9rem 0.22rem rgb(155 222 248 / 72%); transform: translate(-50%, -50%); transition: left 1050ms linear 128ms; }
  .trajectory-map__nodes { display: flex; width: 100%; min-width: 0; align-items: center; justify-content: space-between; gap: 0.1rem; }
}
@media (prefers-reduced-motion: reduce) { .trajectory-map__path { animation: none; } .trajectory-map__line { transform: none; } .trajectory-map__clip, .trajectory-map--emerging .trajectory-map__progress, .trajectory-map--emerging .trajectory-map__mobile-line span, .trajectory-map__mobile-line b { transition-duration: 235ms; transition-delay: 0ms; } .trajectory-map--emerging .trajectory-node:first-child { animation-delay: 230ms; animation-duration: 70ms; } }
</style>
