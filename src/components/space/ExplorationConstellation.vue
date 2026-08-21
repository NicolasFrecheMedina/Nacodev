<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { explorationAxes, explorationConnections, type ExplorationAxis, type ExplorationAxisId } from '@/data/exploration'
import ExplorationNode from './ExplorationNode.vue'

const props = defineProps<{ labels: Record<ExplorationAxisId, string>; selectedId: ExplorationAxisId | null }>()
const emit = defineEmits<{ select: [axis: ExplorationAxis]; preview: [axis: ExplorationAxis | null] }>()
const compact = ref(false)
const stabilizedHoverId = ref<ExplorationAxisId | null>(null)
let compactQuery: MediaQueryList | undefined
let hoverReleaseTimer: number | undefined
const hoverSettleDuration = 450
const hoverStabilizedIds: readonly ExplorationAxisId[] = ['ideas', 'projects']
const axesById = Object.fromEntries(explorationAxes.map((axis) => [axis.id, axis])) as Record<ExplorationAxisId, ExplorationAxis>
const viewBox = { width: 960, height: 560 }
const effectiveId = computed(() => props.selectedId)
const focusOffset = computed(() => {
  const selected = props.selectedId ? axesById[props.selectedId] : null
  const strength = compact.value ? -0.32 : -0.42
  return selected ? { x: selected.position.x * strength, y: selected.position.y * strength } : { x: 0, y: 0 }
})
const groupStyle = computed(() => ({
  '--focus-x': `${focusOffset.value.x}%`, '--focus-y': `${focusOffset.value.y}%`,
  '--focus-scale': props.selectedId ? (compact.value ? '1.17' : '1.31') : '1',
}))
function isConnectionActive(connection: readonly [ExplorationAxisId, ExplorationAxisId]) { return Boolean(effectiveId.value && connection.includes(effectiveId.value)) }
function previewAxis(axis: ExplorationAxis | null) {
  emit('preview', axis)
}
function stabilizeHover(axisId: ExplorationAxisId, hovered: boolean) {
  if (!hoverStabilizedIds.includes(axisId)) return
  if (hoverReleaseTimer !== undefined) window.clearTimeout(hoverReleaseTimer)
  if (hovered) {
    stabilizedHoverId.value = axisId
    return
  }
  hoverReleaseTimer = window.setTimeout(() => {
    stabilizedHoverId.value = null
    hoverReleaseTimer = undefined
  }, hoverSettleDuration)
}
function syncPreferences() {
  compact.value = compactQuery?.matches ?? false
}
onMounted(() => {
  compactQuery = window.matchMedia('(max-width: 700px)')
  syncPreferences()
  compactQuery.addEventListener('change', syncPreferences)
})
onBeforeUnmount(() => {
  compactQuery?.removeEventListener('change', syncPreferences)
  if (hoverReleaseTimer !== undefined) window.clearTimeout(hoverReleaseTimer)
})
</script>

<template>
  <div class="constellation">
    <div class="constellation__group" :class="{ 'constellation__group--hover-stable': stabilizedHoverId }" :style="groupStyle">
      <svg class="constellation__connections" :viewBox="`0 0 ${viewBox.width} ${viewBox.height}`" aria-hidden="true">
        <line v-for="connection in explorationConnections" :key="connection.join('-')"
          :class="{ 'constellation__connection--active': isConnectionActive(connection), 'constellation__connection--muted': effectiveId && !isConnectionActive(connection) }"
          :x1="(axesById[connection[0]].position.x / 100 + 0.5) * viewBox.width" :y1="(axesById[connection[0]].position.y / 100 + 0.5) * viewBox.height"
          :x2="(axesById[connection[1]].position.x / 100 + 0.5) * viewBox.width" :y2="(axesById[connection[1]].position.y / 100 + 0.5) * viewBox.height" />
      </svg>
      <ExplorationNode v-for="axis in explorationAxes" :key="axis.id" :axis="axis" :label="labels[axis.id]"
        :active="selectedId === axis.id" :muted="Boolean(effectiveId && effectiveId !== axis.id)"
        :motion-paused="stabilizedHoverId === axis.id"
        @activate="emit('select', $event)" @preview="previewAxis" @hover-change="stabilizeHover(axis.id, $event)" />
    </div>
  </div>
</template>

<style scoped>
.constellation { position: absolute; inset: 7rem max(2rem, 5vw) 8rem; display: grid; place-items: center; perspective: 900px; }
.constellation__group { position: relative; width: min(62vw, 60rem); height: min(58vh, 35rem); transform: translate3d(var(--focus-x), var(--focus-y), 0) scale(var(--focus-scale)); transform-style: preserve-3d; animation: constellation-drift 12s ease-in-out infinite; transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1); }
.constellation__group--hover-stable { animation-play-state: paused; }
.constellation__connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.constellation__connections line { stroke: rgb(184 217 230 / 16%); stroke-width: 0.75; vector-effect: non-scaling-stroke; transition: opacity 500ms ease, stroke 500ms ease, stroke-width 500ms ease; }
.constellation__connections .constellation__connection--active { stroke: rgb(155 222 248 / 46%); stroke-width: 1; }
.constellation__connections .constellation__connection--muted { opacity: 0.22; }
@keyframes constellation-drift { 0%, 100% { margin-top: -0.25rem; } 50% { margin-top: 0.4rem; } }
@media (max-width: 700px) { .constellation { inset: 8rem 1rem 13rem; } .constellation__group { width: min(100%, 34rem); height: min(47vh, 27rem); } }
@media (prefers-reduced-motion: reduce) { .constellation__group { transform: none; animation: none; transition-duration: 120ms; } }
</style>
