<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { explorationAxes, explorationConnections, type ExplorationAxis, type ExplorationAxisId } from '@/data/exploration'
import ExplorationNode from './ExplorationNode.vue'

const props = defineProps<{ labels: Record<ExplorationAxisId, string>; selectedId: ExplorationAxisId | null }>()
const emit = defineEmits<{ select: [axis: ExplorationAxis]; preview: [axis: ExplorationAxis | null] }>()
const stage = ref<HTMLElement | null>(null)
const pointerX = ref(0)
const pointerY = ref(0)
const previewedId = ref<ExplorationAxisId | null>(null)
const compact = ref(false)
const reducedMotion = ref(false)
let compactQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined
const axesById = Object.fromEntries(explorationAxes.map((axis) => [axis.id, axis])) as Record<ExplorationAxisId, ExplorationAxis>
const viewBox = { width: 960, height: 560 }
const effectiveId = computed(() => props.selectedId ?? previewedId.value)
const focusOffset = computed(() => {
  const selected = props.selectedId ? axesById[props.selectedId] : null
  return selected ? { x: selected.position.x * -0.16, y: selected.position.y * -0.16 } : { x: 0, y: 0 }
})
const groupStyle = computed(() => ({
  '--pointer-rx': `${pointerY.value * -2.4}deg`, '--pointer-ry': `${pointerX.value * 3.2}deg`,
  '--focus-x': `${focusOffset.value.x}%`, '--focus-y': `${focusOffset.value.y}%`,
}))
function isConnectionActive(connection: readonly [ExplorationAxisId, ExplorationAxisId]) { return Boolean(effectiveId.value && connection.includes(effectiveId.value)) }
function previewAxis(axis: ExplorationAxis | null) {
  previewedId.value = axis?.id ?? null
  emit('preview', axis)
}
function handlePointerMove(event: PointerEvent) {
  if (!stage.value || reducedMotion.value || compact.value) return
  const bounds = stage.value.getBoundingClientRect()
  pointerX.value = (event.clientX - bounds.left) / bounds.width - 0.5
  pointerY.value = (event.clientY - bounds.top) / bounds.height - 0.5
}
function resetPointer() { pointerX.value = 0; pointerY.value = 0 }
function syncPreferences() {
  compact.value = compactQuery?.matches ?? false
  reducedMotion.value = motionQuery?.matches ?? false
  if (compact.value || reducedMotion.value) resetPointer()
}
onMounted(() => {
  compactQuery = window.matchMedia('(max-width: 700px)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncPreferences()
  compactQuery.addEventListener('change', syncPreferences)
  motionQuery.addEventListener('change', syncPreferences)
})
onBeforeUnmount(() => {
  compactQuery?.removeEventListener('change', syncPreferences)
  motionQuery?.removeEventListener('change', syncPreferences)
})
</script>

<template>
  <div ref="stage" class="constellation" @pointermove="handlePointerMove" @pointerleave="resetPointer">
    <div class="constellation__group" :style="groupStyle">
      <svg class="constellation__connections" :viewBox="`0 0 ${viewBox.width} ${viewBox.height}`" aria-hidden="true">
        <line v-for="connection in explorationConnections" :key="connection.join('-')"
          :class="{ 'constellation__connection--active': isConnectionActive(connection), 'constellation__connection--muted': effectiveId && !isConnectionActive(connection) }"
          :x1="(axesById[connection[0]].position.x / 100 + 0.5) * viewBox.width" :y1="(axesById[connection[0]].position.y / 100 + 0.5) * viewBox.height"
          :x2="(axesById[connection[1]].position.x / 100 + 0.5) * viewBox.width" :y2="(axesById[connection[1]].position.y / 100 + 0.5) * viewBox.height" />
      </svg>
      <ExplorationNode v-for="axis in explorationAxes" :key="axis.id" :axis="axis" :label="labels[axis.id]"
        :active="selectedId === axis.id" :muted="Boolean(effectiveId && effectiveId !== axis.id)"
        @activate="emit('select', $event)" @preview="previewAxis" />
    </div>
  </div>
</template>

<style scoped>
.constellation { position: absolute; inset: 7rem max(2rem, 5vw) 8rem; display: grid; place-items: center; perspective: 900px; }
.constellation__group { position: relative; width: min(62vw, 60rem); height: min(58vh, 35rem); transform: translate3d(var(--focus-x), var(--focus-y), 0) rotateX(var(--pointer-rx)) rotateY(var(--pointer-ry)); transform-style: preserve-3d; animation: constellation-drift 12s ease-in-out infinite; transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1); }
.constellation__connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.constellation__connections line { stroke: rgb(184 217 230 / 16%); stroke-width: 0.75; vector-effect: non-scaling-stroke; transition: opacity 500ms ease, stroke 500ms ease, stroke-width 500ms ease; }
.constellation__connections .constellation__connection--active { stroke: rgb(155 222 248 / 46%); stroke-width: 1; }
.constellation__connections .constellation__connection--muted { opacity: 0.22; }
@keyframes constellation-drift { 0%, 100% { margin-top: -0.25rem; } 50% { margin-top: 0.4rem; } }
@media (max-width: 700px) { .constellation { inset: 8rem 1rem 13rem; } .constellation__group { width: min(100%, 34rem); height: min(47vh, 27rem); } }
@media (prefers-reduced-motion: reduce) { .constellation__group { animation: none; transition-duration: 120ms; } }
</style>
