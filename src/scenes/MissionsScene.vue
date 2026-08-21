<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import MissionInfoPanel from '@/components/missions/MissionInfoPanel.vue'
import MissionSystem from '@/components/missions/MissionSystem.vue'
import GlobalHud from '@/components/ui/GlobalHud.vue'
import { missions, type Mission } from '@/data/missions'
import { sceneById, sceneStepTotal } from '@/data/scenes'
import { useI18n } from '@/i18n'

withDefaults(defineProps<{ emerging?: boolean; stabilizing?: boolean }>(), { emerging: false, stabilizing: false })
const emit = defineEmits<{ depart: []; 'exit-complete': [] }>()
const { t } = useI18n()
const hud = sceneById.missions.hud!
const selectedMission = ref<Mission | null>(null)
const previewedMission = ref<Mission | null>(null)
const panel = ref<{ focus: () => void } | null>(null)
const departing = ref(false)
let departureTimer: number | undefined

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

function continueToAbout() {
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
  <section id="missions" class="missions-scene" :class="{ 'missions-scene--focused': selectedMission, 'missions-scene--emerging': emerging, 'missions-scene--stabilizing': stabilizing, 'missions-scene--departing': departing }" :inert="emerging || stabilizing || departing" :aria-busy="emerging || stabilizing || departing" aria-labelledby="missions-title">
    <GlobalHud :scene-code="hud.code" :step="hud.step" :step-total="sceneStepTotal">
      <template #context>
        <span class="global-hud__status" aria-hidden="true"><i class="global-hud__status-dot" /><span>{{ previewedMission ? t(previewedMission.statusKey) : 'SYSTEM / NOMINAL' }}</span></span>
      </template>
    </GlobalHud>
    <header class="missions-scene__header">
      <div><p>{{ t('missions.subtitle') }}</p><h1 id="missions-title">{{ t('scenes.missions') }}</h1></div>
    </header>

    <MissionSystem :selected-id="selectedMission?.id ?? null" :emerging="emerging" :departing="departing" @select="selectMission" @preview="previewedMission = $event" />

    <div v-if="departing" class="missions-scene__departure-orbits" aria-hidden="true"><i /><i /><i /></div>

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

    <button v-if="!selectedMission" class="missions-scene__continue" type="button" :disabled="departing" @click="continueToAbout">{{ t('missions.continue') }} <span aria-hidden="true">↗</span></button>
  </section>
</template>

<style scoped>
.missions-scene { position: relative; width: 100%; height: 100svh; min-height: 34rem; overflow: hidden; background: radial-gradient(circle at 50% 50%, rgb(35 59 70 / 8%), transparent 38%); transition: background 800ms ease; }
.missions-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.missions-scene--focused { background: rgb(1 3 7 / 28%); }
.missions-scene--emerging { pointer-events: none; }
.missions-scene__header { position: absolute; z-index: 6; top: var(--hud-top); left: 50%; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-align: center; text-transform: uppercase; transform: translateX(-50%); }
.missions-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.missions-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.missions-scene__continue { position: absolute; z-index: 6; bottom: clamp(1.5rem, 4vw, 3rem); left: 50%; display: flex; align-items: center; gap: 0.9rem; padding: 0.7rem 1rem; border: 1px solid rgb(225 241 247 / 13%); color: rgb(240 247 250 / 52%); background: rgb(10 15 22 / 25%); font: inherit; font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; backdrop-filter: blur(8px); cursor: pointer; transform: translateX(-50%); transition: border-color 300ms ease, color 300ms ease, background 300ms ease; }
.missions-scene__continue:is(:hover, :focus-visible) { border-color: rgb(155 222 248 / 42%); color: var(--color-ink); background: rgb(155 222 248 / 7%); }
.missions-scene__continue:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.3rem; }
.missions-scene__header, .missions-scene :deep(.global-hud), .missions-scene__continue { transition: opacity 360ms ease; }
.missions-scene--emerging .missions-scene__header, .missions-scene--emerging :deep(.global-hud), .missions-scene--emerging .missions-scene__continue { opacity: 0; }
.missions-scene--stabilizing .missions-scene__header, .missions-scene--stabilizing :deep(.global-hud), .missions-scene--stabilizing .missions-scene__continue { transition-duration: 200ms; }
.missions-scene--departing { pointer-events: none; }
.missions-scene--departing :deep(.mission-system) { opacity: 0; filter: blur(6px) brightness(0.28); transform: translate3d(0, 0, -30rem) scale(0.5); transition: opacity 760ms ease, filter 760ms ease, transform 820ms cubic-bezier(0.4, 0, 1, 1); }
.missions-scene--departing :deep(.mission-system::after) { opacity: 0; }
.missions-scene--departing :deep(.mission-system__targets) { opacity: 0; transition-duration: 260ms; }
.missions-scene--departing .missions-scene__header, .missions-scene--departing :deep(.global-hud), .missions-scene--departing .missions-scene__continue { opacity: 0; transition: opacity 320ms ease; }
.missions-scene__departure-orbits { position: absolute; z-index: 1; inset: 13% 12%; pointer-events: none; transform: rotate(-8deg); }
.missions-scene__departure-orbits i { position: absolute; inset: 12% 8%; border: 1px solid rgb(155 222 248 / 14%); border-radius: 50%; opacity: 0; animation: orbit-release 720ms ease-out both; }
.missions-scene__departure-orbits i:nth-child(2) { inset: 24% 0 5%; animation-delay: 90ms; transform: rotate(18deg); }
.missions-scene__departure-orbits i:nth-child(3) { inset: 2% 25% 20%; animation-delay: 170ms; transform: rotate(-22deg); }
.mission-panel-enter-active, .mission-panel-leave-active { transition: opacity 480ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
.mission-panel-enter-from, .mission-panel-leave-to { opacity: 0; transform: translate(2rem, -50%); }
@keyframes orbit-release { 0% { opacity: 0; transform: scale(0.82); } 24% { opacity: 0.72; } 78% { opacity: 0.35; } 100% { opacity: 0; transform: scale(1.16); } }
@media (max-width: 700px) { .missions-scene__header { top: calc(var(--hud-top) + 2.5rem); left: var(--hud-left); text-align: left; transform: none; } .missions-scene__continue { bottom: 3.7rem; width: max-content; } .mission-panel-enter-from, .mission-panel-leave-to { transform: translateY(1.5rem); } }
@media (prefers-reduced-motion: reduce) { .missions-scene { transition-duration: 120ms; } .missions-scene--stabilizing .missions-scene__header, .missions-scene--stabilizing :deep(.global-hud), .missions-scene--stabilizing .missions-scene__continue, .mission-panel-enter-active, .mission-panel-leave-active { transition-duration: 120ms; } .missions-scene--departing :deep(.mission-system) { transition-duration: 170ms; transform: none; } .missions-scene__departure-orbits { display: none; } }
</style>
