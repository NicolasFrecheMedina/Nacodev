<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ExplorationConstellation from '@/components/space/ExplorationConstellation.vue'
import ExplorationPanel from '@/components/ui/ExplorationPanel.vue'
import GlobalHud from '@/components/ui/GlobalHud.vue'
import HudContextStatus from '@/components/ui/HudContextStatus.vue'
import SceneNavigation from '@/components/ui/SceneNavigation.vue'
import { explorationAxes, type ExplorationAxis, type ExplorationAxisId } from '@/data/exploration'
import { sceneById, sceneStepTotal } from '@/data/scenes'
import { useI18n } from '@/i18n'

withDefaults(defineProps<{ takeoffComplete?: boolean }>(), { takeoffComplete: false })
const emit = defineEmits<{ back: []; depart: []; 'exit-complete': [] }>()
const { t } = useI18n()
const hud = sceneById.exploration.hud!
const selectedAxis = ref<ExplorationAxis | null>(null)
const previewedAxis = ref<ExplorationAxis | null>(null)
const panel = ref<{ focusNext: () => void } | null>(null)
const suppressPreview = ref(false)
const departing = ref(false)
let departureTimer: number | undefined
const labels = computed(() => Object.fromEntries(explorationAxes.map((axis) => [axis.id, t(axis.labelKey)])) as Record<ExplorationAxisId, string>)
const contextAxis = computed(() => selectedAxis.value ?? previewedAxis.value)
const hudPrimary = computed(() => contextAxis.value ? `${t('exploration.status.star')} ${t(contextAxis.value.labelKey)}` : t('exploration.status.constellation'))
const hudSecondary = computed(() => selectedAxis.value ? t('exploration.status.locked') : previewedAxis.value ? t('exploration.status.detected') : t('exploration.status.online'))

function selectAxis(axis: ExplorationAxis) {
  selectedAxis.value = axis
  previewedAxis.value = null
}
function previewAxis(axis: ExplorationAxis | null) {
  if (!selectedAxis.value && !suppressPreview.value) previewedAxis.value = axis
}

async function closeAxis() {
  const previousId = selectedAxis.value?.id
  selectedAxis.value = null
  previewedAxis.value = null
  suppressPreview.value = true
  await nextTick()
  if (previousId) document.querySelector<HTMLElement>(`[data-axis-id="${previousId}"]`)?.focus()
  window.requestAnimationFrame(() => { suppressPreview.value = false })
}

async function selectNextAxis() {
  const currentIndex = explorationAxes.findIndex((axis) => axis.id === selectedAxis.value?.id)
  selectedAxis.value = explorationAxes[(currentIndex + 1) % explorationAxes.length] ?? explorationAxes[0]!
  previewedAxis.value = null
  await nextTick()
  panel.value?.focusNext()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedAxis.value) void closeAxis()
}

function continueToMissions() {
  if (departing.value) return
  departing.value = true
  emit('depart')
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 900
  departureTimer = window.setTimeout(() => emit('exit-complete'), duration)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (departureTimer !== undefined) window.clearTimeout(departureTimer)
})
</script>

<template>
  <section id="exploration" class="exploration-scene" :class="{ 'exploration-scene--ready': takeoffComplete, 'exploration-scene--departing': departing }" :inert="departing" :aria-busy="departing" aria-labelledby="exploration-title">
    <GlobalHud :scene-code="hud.code" :step="hud.step" :step-total="sceneStepTotal">
      <template #context>
        <HudContextStatus :primary="hudPrimary" :secondary="hudSecondary" />
      </template>
    </GlobalHud>
    <header class="exploration-scene__header">
      <div><p>{{ t('exploration.kicker') }}</p><h1 id="exploration-title">{{ t('scenes.exploration') }}</h1></div>
    </header>
    <ExplorationConstellation :labels="labels" :selected-id="selectedAxis?.id ?? null" @select="selectAxis" @preview="previewAxis" />
    <Transition name="panel">
      <ExplorationPanel
        v-if="selectedAxis"
        ref="panel"
        :key="selectedAxis.id"
        :label="t(selectedAxis.labelKey)"
        :description="t(selectedAxis.descriptionKey)"
        :selected="true"
        :close-label="t('exploration.overview')"
        :next-label="t('exploration.next')"
        @close="closeAxis"
        @next="selectNextAxis"
      />
    </Transition>
    <SceneNavigation :navigation-label="t('common.sceneNavigation')" :back-label="t('common.back')" :next-label="t('exploration.continue')" :back-disabled="departing" :next-disabled="departing" @back="emit('back')" @next="continueToMissions" />
  </section>
</template>

<style scoped>
.exploration-scene { position: relative; width: 100%; height: 100svh; min-height: 34rem; overflow: hidden; opacity: 0; transform: scale(0.82); filter: blur(7px); transition: opacity 1.4s ease 180ms, filter 1.3s ease 180ms, transform 1.7s cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.exploration-scene--ready { opacity: 1; filter: none; transform: scale(1); }
.exploration-scene--departing { pointer-events: none; }
.exploration-scene--departing :deep(.constellation__group) { animation: constellation-departure 900ms cubic-bezier(0.65, 0, 0.35, 1) both; }
.exploration-scene--departing :deep(.constellation__group::after) { position: absolute; top: 50%; left: 50%; width: 0.24rem; height: 0.24rem; border-radius: 50%; background: #f4fbff; box-shadow: 0 0 1rem 0.35rem rgb(155 222 248 / 72%), 0 0 5rem 1.8rem rgb(155 222 248 / 22%); content: ''; transform: translate(-50%, -50%); animation: attraction-point 620ms ease-out both; }
.exploration-scene--departing :deep(.constellation__connections line) { animation: connection-departure 900ms ease both; }
.exploration-scene--departing :deep(.exploration-node) { color: #fff; animation: node-departure 900ms ease both; }
.exploration-scene--departing :deep(.exploration-node__core) { background: rgb(214 244 255 / 68%); box-shadow: 0 0 1.4rem rgb(155 222 248 / 78%), inset 0 0 0.5rem #fff; }
.exploration-scene--departing :deep(.exploration-node__label) { animation: departure-label 480ms ease both; }
.exploration-scene--departing .exploration-scene__header, .exploration-scene--departing :deep(.global-hud), .exploration-scene--departing :deep(.scene-navigation), .exploration-scene--departing :deep(.exploration-panel) { opacity: 0; transition: opacity 300ms ease; }
.exploration-scene__header { position: absolute; z-index: 3; top: var(--hud-top); left: 50%; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-align: center; text-transform: uppercase; transform: translateX(-50%); }
.exploration-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.exploration-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.panel-enter-active, .panel-leave-active { transition: opacity 250ms ease; } .panel-enter-from, .panel-leave-to { opacity: 0; }
@keyframes constellation-departure {
  0% { opacity: 1; filter: brightness(1); transform: translate3d(var(--focus-x), var(--focus-y), 0) scale(1); }
  18% { opacity: 1; filter: brightness(1.55); transform: translate3d(0, 0, 1rem) scale(1.02); }
  42% { opacity: 1; filter: brightness(1.18); transform: translate3d(0, 0, 3rem) scale(0.76); }
  74% { opacity: 0.86; filter: brightness(1.12) blur(0); transform: translate3d(0, 0, 18rem) scale(1.65); }
  100% { opacity: 0; filter: brightness(1.5) blur(7px); transform: translate3d(0, 0, 42rem) scale(4.2); }
}
@keyframes attraction-point { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); } 28%, 62% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(8); } }
@keyframes connection-departure { 0% { stroke: rgb(184 217 230 / 16%); } 18%, 45% { opacity: 1; stroke: rgb(203 237 249 / 72%); stroke-width: 1.4; } 100% { opacity: 0; stroke: rgb(203 237 249 / 0%); } }
@keyframes node-departure { 0%, 45% { opacity: 1; filter: brightness(1.65); } 100% { opacity: 0; filter: brightness(2) blur(5px); } }
@keyframes departure-label { 0%, 30% { opacity: 1; } 100% { opacity: 0; transform: translateX(-50%) translateY(0.6rem); } }
@media (max-width: 700px) { .exploration-scene__header { top: calc(var(--hud-top) + 2.5rem); left: var(--hud-left); text-align: left; transform: none; } }
@media (prefers-reduced-motion: reduce) { .exploration-scene { transition-duration: 120ms; transform: none; filter: none; } .panel-enter-active, .panel-leave-active { transition-duration: 120ms; } .exploration-scene--departing :deep(.constellation__group) { animation: reduced-departure 180ms ease both; } .exploration-scene--departing :deep(.exploration-node), .exploration-scene--departing :deep(.constellation__connections line) { animation: reduced-element-departure 180ms ease both; } .exploration-scene--departing :deep(.constellation__group::after) { display: none; } }
@keyframes reduced-departure { to { opacity: 0; transform: translate3d(0, 0, 0) scale(0.96); } }
@keyframes reduced-element-departure { to { opacity: 0; } }
</style>
