<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import MissionInfoPanel from '@/components/missions/MissionInfoPanel.vue'
import MissionSystem from '@/components/missions/MissionSystem.vue'
import GlobalHud from '@/components/ui/GlobalHud.vue'
import HudContextStatus from '@/components/ui/HudContextStatus.vue'
import SceneNavigation from '@/components/ui/SceneNavigation.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { missions, type Mission } from '@/data/missions'
import { sceneById, sceneStepTotal } from '@/data/scenes'
import { useI18n } from '@/i18n'

withDefaults(defineProps<{ emerging?: boolean; stabilizing?: boolean }>(), { emerging: false, stabilizing: false })
const emit = defineEmits<{ back: []; depart: []; 'exit-complete': [] }>()
const { t } = useI18n()
const hud = sceneById.missions.hud!
const selectedMission = ref<Mission | null>(null)
const previewedMission = ref<Mission | null>(null)
const panel = ref<{ focus: () => void } | null>(null)
const departing = ref(false)
const missionOverlayOpen = ref(false)
let departureTimer: number | undefined
const selectedMissionIndex = computed(() => missions.findIndex((mission) => mission.id === selectedMission.value?.id))

async function selectMission(mission: Mission) {
  selectedMission.value = mission
  previewedMission.value = null
  missionOverlayOpen.value = false
  await nextTick()
  panel.value?.focus()
}

async function closeMission() {
  const previousId = selectedMission.value?.id
  missionOverlayOpen.value = false
  selectedMission.value = null
  await nextTick()
  if (previousId) document.querySelector<HTMLElement>(`[data-mission-id="${previousId}"]`)?.focus()
}

async function selectNextMission() {
  const nextIndex = (selectedMissionIndex.value + 1) % missions.length
  selectedMission.value = missions[nextIndex] ?? missions[0]!
  previewedMission.value = null
  await nextTick()
  panel.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedMission.value && !missionOverlayOpen.value) closeMission()
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
        <HudContextStatus :primary="previewedMission ? t(previewedMission.statusKey) : 'SYSTEM / NOMINAL'" />
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
        :index="selectedMissionIndex"
        :close-label="t('missions.overview')"
        :next-label="t('missions.next')"
        @close="closeMission"
        @next="selectNextMission"
        @explore="missionOverlayOpen = true"
      />
    </Transition>

    <SceneNavigation :navigation-label="t('common.sceneNavigation')" :back-label="t('common.back')" :next-label="t('missions.continue')" :back-disabled="departing" :next-disabled="departing" @back="emit('back')" @next="continueToAbout" />

    <BaseModal
      v-if="selectedMission"
      id="mission-transmission"
      :open="missionOverlayOpen"
      :title="`${t('missions.transmission')} / ${t(selectedMission.nameKey)}`"
      :close-label="t('common.close')"
      variant="transmission"
      @close="missionOverlayOpen = false"
    >
      <article class="mission-transmission">
        <div class="mission-transmission__signal" aria-hidden="true"><i /> {{ t('missions.signalActive') }} / NCD-SYS-04</div>
        <p class="mission-transmission__index">{{ t('missions.mission') }} {{ String(selectedMissionIndex + 1).padStart(2, '0') }}</p>
        <h3>{{ t(selectedMission.nameKey) }}</h3>
        <p class="mission-transmission__description">{{ t(selectedMission.descriptionKey) }}</p>
        <dl>
          <div><dt>{{ t('missions.axisLabel') }}</dt><dd>{{ t(selectedMission.categoryKey) }}</dd></div>
          <div><dt>{{ t('missions.statusLabel') }}</dt><dd>{{ t(selectedMission.statusKey) }}</dd></div>
          <div v-if="selectedMission.year"><dt>{{ t('missions.yearLabel') }}</dt><dd>{{ selectedMission.year }}</dd></div>
        </dl>
        <p class="mission-transmission__standby">{{ t('missions.transmissionStandby') }}</p>
      </article>
    </BaseModal>
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
.missions-scene__header, .missions-scene :deep(.global-hud), .missions-scene :deep(.scene-navigation) { transition: opacity 360ms ease; }
.missions-scene--emerging .missions-scene__header, .missions-scene--emerging :deep(.global-hud), .missions-scene--emerging :deep(.scene-navigation) { opacity: 0; }
.missions-scene--stabilizing .missions-scene__header, .missions-scene--stabilizing :deep(.global-hud), .missions-scene--stabilizing :deep(.scene-navigation) { transition-duration: 200ms; }
.missions-scene--departing { pointer-events: none; }
.missions-scene--departing :deep(.mission-system) { opacity: 0; filter: blur(6px) brightness(0.28); transform: translate3d(0, 0, -30rem) scale(0.5); transition: opacity 760ms ease, filter 760ms ease, transform 820ms cubic-bezier(0.4, 0, 1, 1); }
.missions-scene--departing :deep(.mission-system::after) { opacity: 0; }
.missions-scene--departing :deep(.mission-system__targets) { opacity: 0; transition-duration: 260ms; }
.missions-scene--departing .missions-scene__header, .missions-scene--departing :deep(.global-hud), .missions-scene--departing :deep(.scene-navigation) { opacity: 0; transition: opacity 320ms ease; }
.missions-scene__departure-orbits { position: absolute; z-index: 1; inset: 13% 12%; pointer-events: none; transform: rotate(-8deg); }
.missions-scene__departure-orbits i { position: absolute; inset: 12% 8%; border: 1px solid rgb(155 222 248 / 14%); border-radius: 50%; opacity: 0; animation: orbit-release 720ms ease-out both; }
.missions-scene__departure-orbits i:nth-child(2) { inset: 24% 0 5%; animation-delay: 90ms; transform: rotate(18deg); }
.missions-scene__departure-orbits i:nth-child(3) { inset: 2% 25% 20%; animation-delay: 170ms; transform: rotate(-22deg); }
.mission-panel-enter-active, .mission-panel-leave-active { transition: opacity 480ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
.mission-panel-enter-from, .mission-panel-leave-to { opacity: 0; transform: translate(2rem, -50%); }
.mission-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: rgb(155 222 248 / 58%); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; }
.mission-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.7rem var(--color-accent); animation: transmission-pulse 1.8s ease-in-out infinite; }
.mission-transmission__index { margin: 2rem 0 0.65rem; color: rgb(225 239 244 / 38%); font-size: 0.5rem; letter-spacing: 0.22em; text-transform: uppercase; }
.mission-transmission h3 { margin: 0; font-size: clamp(2rem, 6vw, 4.5rem); font-weight: 200; letter-spacing: 0.035em; }
.mission-transmission__description { max-width: 38rem; margin: 1.5rem 0 2rem; color: rgb(231 240 244 / 68%); font-size: clamp(0.82rem, 1.4vw, 1rem); font-weight: 300; line-height: 1.8; }
.mission-transmission dl { display: grid; grid-template-columns: repeat(3, 1fr); margin: 0; border-top: 1px solid rgb(155 222 248 / 12%); border-bottom: 1px solid rgb(155 222 248 / 12%); }
.mission-transmission dl div { padding: 0.9rem 0.75rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.mission-transmission dl div:last-child { border-right: 0; }
.mission-transmission dt, .mission-transmission dd { margin: 0; font-size: 0.5rem; letter-spacing: 0.14em; text-transform: uppercase; }
.mission-transmission dt { margin-bottom: 0.4rem; color: rgb(220 235 241 / 36%); }
.mission-transmission dd { color: rgb(242 247 249 / 76%); }
.mission-transmission__standby { margin: 1.5rem 0 0; color: rgb(225 239 244 / 32%); font-size: 0.48rem; letter-spacing: 0.16em; text-transform: uppercase; }
@keyframes transmission-pulse { 50% { opacity: 0.35; box-shadow: 0 0 0.25rem var(--color-accent); } }
@keyframes orbit-release { 0% { opacity: 0; transform: scale(0.82); } 24% { opacity: 0.72; } 78% { opacity: 0.35; } 100% { opacity: 0; transform: scale(1.16); } }
@media (max-width: 700px) { .missions-scene__header { top: calc(var(--hud-top) + 2.5rem); left: var(--hud-left); text-align: left; transform: none; } .mission-panel-enter-from, .mission-panel-leave-to { transform: translateY(1.5rem); } .mission-transmission dl { grid-template-columns: 1fr; } .mission-transmission dl div { border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); } .mission-transmission dl div:last-child { border-bottom: 0; } }
@media (prefers-reduced-motion: reduce) { .missions-scene { transition-duration: 120ms; } .missions-scene--stabilizing .missions-scene__header, .missions-scene--stabilizing :deep(.global-hud), .missions-scene--stabilizing :deep(.scene-navigation), .mission-panel-enter-active, .mission-panel-leave-active { transition-duration: 120ms; } .missions-scene--departing :deep(.mission-system) { transition-duration: 170ms; transform: none; } .missions-scene__departure-orbits { display: none; } .mission-transmission__signal i { animation: none; } }
</style>
