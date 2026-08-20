<script setup lang="ts">
import { computed, ref } from 'vue'
import ExplorationConstellation from '@/components/space/ExplorationConstellation.vue'
import ExplorationPanel from '@/components/ui/ExplorationPanel.vue'
import { explorationAxes, type ExplorationAxis, type ExplorationAxisId } from '@/data/exploration'
import { useI18n } from '@/i18n'

withDefaults(defineProps<{ takeoffComplete?: boolean }>(), { takeoffComplete: false })
const emit = defineEmits<{ continue: [] }>()
const { t } = useI18n()
const selectedAxis = ref<ExplorationAxis | null>(null)
const previewedAxis = ref<ExplorationAxis | null>(null)
const visibleAxis = computed(() => selectedAxis.value ?? previewedAxis.value)
const labels = computed(() => Object.fromEntries(explorationAxes.map((axis) => [axis.id, t(axis.labelKey)])) as Record<ExplorationAxisId, string>)

function selectAxis(axis: ExplorationAxis) {
  selectedAxis.value = selectedAxis.value?.id === axis.id ? null : axis
  previewedAxis.value = null
}
function previewAxis(axis: ExplorationAxis | null) {
  if (!selectedAxis.value) previewedAxis.value = axis
}
</script>

<template>
  <section id="exploration" class="exploration-scene" :class="{ 'exploration-scene--ready': takeoffComplete }" aria-labelledby="exploration-title">
    <header class="exploration-scene__header">
      <span aria-hidden="true">03 / 05</span>
      <div><p>{{ t('exploration.kicker') }}</p><h1 id="exploration-title">{{ t('scenes.exploration') }}</h1></div>
      <span aria-hidden="true">NCD — XPLR</span>
    </header>
    <ExplorationConstellation :labels="labels" :selected-id="selectedAxis?.id ?? null" @select="selectAxis" @preview="previewAxis" />
    <Transition name="panel">
      <ExplorationPanel v-if="visibleAxis" :key="visibleAxis.id" :label="t(visibleAxis.labelKey)" :description="t(visibleAxis.descriptionKey)" :selected="Boolean(selectedAxis)" :close-label="t('exploration.overview')" @close="selectedAxis = null" />
    </Transition>
    <div class="exploration-scene__status" aria-hidden="true"><i />{{ selectedAxis ? t('exploration.status.focus') : t('exploration.status.online') }}</div>
    <button class="exploration-scene__continue" type="button" @click="emit('continue')">{{ t('exploration.continue') }}<span aria-hidden="true">↗</span></button>
  </section>
</template>

<style scoped>
.exploration-scene { position: relative; width: 100%; height: 100svh; min-height: 34rem; overflow: hidden; opacity: 0; transform: scale(0.82); filter: blur(7px); transition: opacity 1.4s ease 180ms, filter 1.3s ease 180ms, transform 1.7s cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.exploration-scene--ready { opacity: 1; filter: none; transform: scale(1); }
.exploration-scene__header { position: absolute; z-index: 3; top: clamp(1.5rem, 4vw, 3rem); right: clamp(1.5rem, 4vw, 3rem); left: clamp(1.5rem, 4vw, 3rem); display: grid; grid-template-columns: 1fr auto 1fr; align-items: start; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase; }
.exploration-scene__header > div { text-align: center; } .exploration-scene__header > span:last-child { text-align: right; }
.exploration-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.exploration-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.exploration-scene__status { position: absolute; right: clamp(1.5rem, 4vw, 3rem); bottom: clamp(1.5rem, 4vw, 3rem); display: flex; align-items: center; gap: 0.55rem; color: rgb(229 240 245 / 40%); font-size: 0.5rem; letter-spacing: 0.17em; text-transform: uppercase; }
.exploration-scene__status i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.7rem rgb(155 222 248 / 60%); }
.exploration-scene__continue { position: absolute; z-index: 4; bottom: clamp(1.5rem, 4vw, 3rem); left: 50%; display: flex; align-items: center; gap: 0.8rem; padding: 0.7rem 1rem; border: 1px solid rgb(225 241 247 / 14%); color: rgb(240 247 250 / 58%); font: inherit; font-size: 0.52rem; letter-spacing: 0.18em; text-transform: uppercase; background: rgb(10 15 22 / 25%); backdrop-filter: blur(8px); cursor: pointer; transform: translateX(-50%); transition: border-color 300ms ease, color 300ms ease, background 300ms ease; }
.exploration-scene__continue:is(:hover, :focus-visible) { border-color: rgb(155 222 248 / 42%); color: var(--color-ink); background: rgb(155 222 248 / 7%); }
.exploration-scene__continue:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.3rem; }
.panel-enter-active, .panel-leave-active { transition: opacity 250ms ease; } .panel-enter-from, .panel-leave-to { opacity: 0; }
@media (max-width: 700px) { .exploration-scene__header { grid-template-columns: 1fr auto; } .exploration-scene__header > span:first-child { display: none; } .exploration-scene__header > div { text-align: left; } .exploration-scene__status { display: none; } .exploration-scene__continue { bottom: 1.35rem; } }
@media (prefers-reduced-motion: reduce) { .exploration-scene { transition-duration: 120ms; transform: none; filter: none; } .panel-enter-active, .panel-leave-active { transition-duration: 120ms; } }
</style>
