<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import MissionInfoPanel from '@/components/missions/MissionInfoPanel.vue'
import MissionSystem from '@/components/missions/MissionSystem.vue'
import { missions, type Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

const emit = defineEmits<{ continue: [] }>()
const { t } = useI18n()
const selectedMission = ref<Mission | null>(null)
const previewedMission = ref<Mission | null>(null)
const panel = ref<{ focus: () => void } | null>(null)

async function selectMission(mission: Mission) {
  selectedMission.value = mission
  previewedMission.value = null
  await nextTick()
  panel.value?.focus()
}

async function closeMission() {
  const previousId = selectedMission.value?.id
  selectedMission.value = null
  await nextTick()
  if (previousId) document.querySelector<HTMLElement>(`[data-mission-id="${previousId}"]`)?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedMission.value) closeMission()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <section id="missions" class="missions-scene" :class="{ 'missions-scene--focused': selectedMission }" aria-labelledby="missions-title">
    <header class="missions-scene__header">
      <span aria-hidden="true">04 / 05</span>
      <div><p>{{ t('missions.subtitle') }}</p><h1 id="missions-title">{{ t('scenes.missions') }}</h1></div>
      <span aria-hidden="true">NCD — MSN-SYS</span>
    </header>

    <MissionSystem :selected-id="selectedMission?.id ?? null" @select="selectMission" @preview="previewedMission = $event" />

    <Transition name="mission-panel">
      <MissionInfoPanel
        v-if="selectedMission"
        ref="panel"
        :key="selectedMission.id"
        :mission="selectedMission"
        :index="missions.findIndex((mission) => mission.id === selectedMission?.id)"
        @close="closeMission"
      />
    </Transition>

    <div class="missions-scene__telemetry" aria-hidden="true"><i /><span>{{ previewedMission ? t(previewedMission.statusKey) : 'SYSTEM / NOMINAL' }}</span></div>
    <button v-if="!selectedMission" class="missions-scene__continue" type="button" @click="emit('continue')">{{ t('missions.continue') }} <span aria-hidden="true">↗</span></button>
  </section>
</template>

<style scoped>
.missions-scene { position: relative; width: 100%; height: 100svh; min-height: 34rem; overflow: hidden; background: radial-gradient(circle at 50% 50%, rgb(35 59 70 / 8%), transparent 38%); transition: background 800ms ease; }
.missions-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.missions-scene--focused { background: rgb(1 3 7 / 28%); }
.missions-scene__header { position: absolute; z-index: 6; top: clamp(1.5rem, 4vw, 3rem); right: clamp(1.5rem, 4vw, 3rem); left: clamp(1.5rem, 4vw, 3rem); display: grid; grid-template-columns: 1fr auto 1fr; align-items: start; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase; }
.missions-scene__header > div { text-align: center; }
.missions-scene__header > span:last-child { text-align: right; }
.missions-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.missions-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.missions-scene__telemetry { position: absolute; z-index: 4; right: clamp(1.5rem, 4vw, 3rem); bottom: clamp(1.5rem, 4vw, 3rem); display: flex; align-items: center; gap: 0.55rem; color: rgb(229 240 245 / 40%); font-size: 0.46rem; letter-spacing: 0.17em; text-transform: uppercase; }
.missions-scene__telemetry i { width: 0.28rem; height: 0.28rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.7rem rgb(155 222 248 / 60%); }
.missions-scene__continue { position: absolute; z-index: 6; bottom: clamp(1.5rem, 4vw, 3rem); left: 50%; display: flex; align-items: center; gap: 0.9rem; padding: 0.7rem 1rem; border: 1px solid rgb(225 241 247 / 13%); color: rgb(240 247 250 / 52%); background: rgb(10 15 22 / 25%); font: inherit; font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; backdrop-filter: blur(8px); cursor: pointer; transform: translateX(-50%); transition: border-color 300ms ease, color 300ms ease, background 300ms ease; }
.missions-scene__continue:is(:hover, :focus-visible) { border-color: rgb(155 222 248 / 42%); color: var(--color-ink); background: rgb(155 222 248 / 7%); }
.missions-scene__continue:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.3rem; }
.mission-panel-enter-active, .mission-panel-leave-active { transition: opacity 480ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
.mission-panel-enter-from, .mission-panel-leave-to { opacity: 0; transform: translate(2rem, -50%); }
@media (max-width: 700px) { .missions-scene__header { grid-template-columns: 1fr auto; } .missions-scene__header > span:first-child { display: none; } .missions-scene__header > div { text-align: left; } .missions-scene__telemetry { display: none; } .missions-scene__continue { bottom: 1.25rem; width: max-content; } .mission-panel-enter-from, .mission-panel-leave-to { transform: translateY(1.5rem); } }
@media (prefers-reduced-motion: reduce) { .missions-scene { transition-duration: 120ms; } .mission-panel-enter-active, .mission-panel-leave-active { transition-duration: 120ms; } }
</style>
