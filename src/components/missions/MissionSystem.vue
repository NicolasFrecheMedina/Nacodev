<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import MissionsCanvas from '@/components/space/MissionsCanvas.vue'
import { missions, type Mission, type MissionId } from '@/data/missions'
import { useI18n } from '@/i18n'

const props = defineProps<{ selectedId: MissionId | null; emerging?: boolean; departing?: boolean }>()
const emit = defineEmits<{
  select: [mission: Mission]
  preview: [mission: Mission | null]
}>()

const { t } = useI18n()
const stage = ref<HTMLElement | null>(null)
const hoveredId = ref<MissionId | null>(null)
const compact = ref(false)
const reducedMotion = ref(false)
const webglAvailable = ref(true)
const arrivedThroughTransition = ref(Boolean(props.emerging))
const pointer = ref({ x: 0, y: 0 })
let compactQuery: MediaQueryList | undefined
let motionQuery: MediaQueryList | undefined

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function syncMedia() {
  compact.value = compactQuery?.matches ?? false
  reducedMotion.value = motionQuery?.matches ?? false
  if (compact.value || reducedMotion.value) pointer.value = { x: 0, y: 0 }
}

function handlePointerMove(event: PointerEvent) {
  if (!stage.value || compact.value || reducedMotion.value) return
  const bounds = stage.value.getBoundingClientRect()
  pointer.value = {
    x: (event.clientX - bounds.left) / bounds.width - 0.5,
    y: -((event.clientY - bounds.top) / bounds.height - 0.5),
  }
}

function preview(mission: Mission | null) {
  hoveredId.value = mission?.id ?? null
  emit('preview', mission)
}

function targetStyle(mission: Mission) {
  return {
    '--target-x': `${mission.screenPosition.x}%`,
    '--target-y': `${mission.screenPosition.y}%`,
    '--target-mobile-x': `${mission.mobileScreenPosition.x}%`,
    '--target-mobile-y': `${mission.mobileScreenPosition.y}%`,
    '--planet-color': mission.visual.color,
    '--planet-glow': mission.visual.atmosphere,
  }
}

onMounted(() => {
  compactQuery = window.matchMedia('(max-width: 700px)')
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  webglAvailable.value = supportsWebGL()
  syncMedia()
  compactQuery.addEventListener('change', syncMedia)
  motionQuery.addEventListener('change', syncMedia)
})

onBeforeUnmount(() => {
  compactQuery?.removeEventListener('change', syncMedia)
  motionQuery?.removeEventListener('change', syncMedia)
})
</script>

<template>
  <div
    ref="stage"
    class="mission-system"
    :class="{ 'mission-system--fallback': !webglAvailable, 'mission-system--selected': selectedId, 'mission-system--emerging': emerging, 'mission-system--transitioned': arrivedThroughTransition }"
    @pointermove="handlePointerMove"
    @pointerleave="pointer = { x: 0, y: 0 }"
  >
    <MissionsCanvas
      v-if="webglAvailable"
      :selected-id="selectedId"
      :hovered-id="hoveredId"
      :compact="compact"
      :reduced-motion="reducedMotion"
      :departing="departing"
      :pointer="pointer"
      @error="webglAvailable = false"
    />

    <div v-if="emerging" class="mission-system__arrival-sources" aria-hidden="true">
      <i v-for="mission in missions" :key="mission.id" :style="targetStyle(mission)" />
    </div>

    <p v-if="!webglAvailable" class="mission-system__fallback-note" role="status">
      {{ t('missions.webglFallback') }}
    </p>

    <div v-if="!selectedId" class="mission-system__targets">
      <button
        v-for="(mission, index) in missions"
        :key="mission.id"
        class="mission-target"
        :data-mission-id="mission.id"
        :style="targetStyle(mission)"
        type="button"
        :aria-label="`${t('missions.select')} ${t(mission.nameKey)}`"
        @click="emit('select', mission)"
        @focus="preview(mission)"
        @blur="preview(null)"
        @pointerenter="preview(mission)"
        @pointerleave="preview(null)"
      >
        <span class="mission-target__fallback-planet" aria-hidden="true" />
        <span class="mission-target__reticle" aria-hidden="true" />
        <span class="mission-target__readout">
          <span>{{ t('missions.mission') }} / {{ String(index + 1).padStart(2, '0') }}</span>
          <strong>{{ t(mission.nameKey) }}</strong>
          <small>{{ t('missions.statusLabel') }} / {{ t(mission.statusKey) }}</small>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mission-system { position: absolute; inset: 6rem 2rem 5.5rem; opacity: 0; animation: system-arrival 1.5s cubic-bezier(0.22, 1, 0.36, 1) 180ms forwards; }
.mission-system--transitioned { opacity: 1; animation: none; }
.mission-system--emerging { opacity: 1; pointer-events: none; animation: none; }
.mission-system--emerging :deep(.missions-canvas) { opacity: 0; animation: destinations-arrival 450ms cubic-bezier(0.22, 1, 0.36, 1) 300ms forwards; }
.mission-system--emerging::after { opacity: 0; }
.mission-system__targets { transition: opacity 360ms ease; }
.mission-system--emerging .mission-system__targets { opacity: 0; }
.mission-system::after { position: absolute; inset: 8% 13%; border: 1px solid rgb(198 226 236 / 5%); border-radius: 50%; content: ''; pointer-events: none; transform: rotate(-7deg); }
.mission-system__arrival-sources { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.mission-system__arrival-sources i { position: absolute; top: var(--target-y); left: var(--target-x); width: 0.32rem; height: 0.32rem; border-radius: 50%; opacity: 0; background: color-mix(in srgb, var(--planet-glow) 72%, white); box-shadow: 0 0 1.2rem 0.28rem color-mix(in srgb, var(--planet-glow) 68%, transparent), 0 0 4rem 1rem color-mix(in srgb, var(--planet-color) 30%, transparent); transform: translate(-50%, -50%) scale(0.1); animation: destination-source 690ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both; }
.mission-system__arrival-sources i:nth-child(2) { animation-delay: 90ms; }
.mission-system__arrival-sources i:nth-child(3) { animation-delay: 120ms; }
.mission-system__arrival-sources i:nth-child(4) { animation-delay: 150ms; }
.mission-system__targets { position: absolute; inset: 0; }
.mission-target { position: absolute; z-index: 2; top: var(--target-y); left: var(--target-x); width: clamp(7rem, 11vw, 10rem); height: clamp(7rem, 11vw, 10rem); padding: 0; border: 0; border-radius: 50%; color: inherit; background: transparent; cursor: pointer; transform: translate(-50%, -50%); }
.mission-target__reticle { position: absolute; inset: -0.35rem; border: 1px solid transparent; border-radius: 50%; transition: border-color 350ms ease, transform 500ms ease; }
.mission-target__reticle::before, .mission-target__reticle::after { position: absolute; background: rgb(174 222 238 / 0%); content: ''; transition: background 350ms ease; }
.mission-target__reticle::before { top: 50%; right: -0.7rem; left: -0.7rem; height: 1px; }
.mission-target__reticle::after { top: -0.7rem; bottom: -0.7rem; left: 50%; width: 1px; }
.mission-target__readout { position: absolute; top: 50%; left: calc(100% + 1.1rem); display: grid; width: max-content; max-width: 12rem; gap: 0.28rem; opacity: 0; text-align: left; text-transform: uppercase; transform: translate(0.7rem, -50%); transition: opacity 300ms ease, transform 400ms ease; }
.mission-target:nth-child(even) .mission-target__readout { right: calc(100% + 1.1rem); left: auto; text-align: right; }
.mission-target__readout span, .mission-target__readout small { color: rgb(225 239 244 / 42%); font-size: 0.43rem; font-weight: 400; letter-spacing: 0.17em; }
.mission-target__readout strong { color: rgb(246 250 251 / 90%); font-size: 0.67rem; font-weight: 400; letter-spacing: 0.16em; }
.mission-target:is(:hover, :focus-visible) .mission-target__reticle { border-color: rgb(155 222 248 / 36%); transform: scale(1.08) rotate(12deg); }
.mission-target:is(:hover, :focus-visible) .mission-target__reticle::before, .mission-target:is(:hover, :focus-visible) .mission-target__reticle::after { background: rgb(174 222 238 / 20%); }
.mission-target:is(:hover, :focus-visible) .mission-target__readout { opacity: 1; transform: translate(0, -50%); }
.mission-target:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.55rem; }
.mission-target__fallback-planet { position: absolute; inset: 12%; border: 1px solid rgb(220 240 247 / 18%); border-radius: 50%; opacity: 0; background: radial-gradient(circle at 35% 28%, color-mix(in srgb, var(--planet-glow) 60%, white), var(--planet-color) 34%, #0b1017 76%); box-shadow: inset -1.3rem -0.7rem 2rem rgb(0 0 0 / 62%), 0 0 2rem color-mix(in srgb, var(--planet-glow) 18%, transparent); }
.mission-system--fallback .mission-target__fallback-planet { opacity: 1; }
.mission-system__fallback-note { position: absolute; right: 1rem; bottom: 0; margin: 0; color: rgb(225 239 244 / 45%); font-size: 0.48rem; letter-spacing: 0.16em; text-transform: uppercase; }
@keyframes system-arrival { from { opacity: 0; filter: blur(5px); transform: scale(0.78); } to { opacity: 1; filter: none; transform: scale(1); } }
@keyframes destinations-arrival { from { opacity: 0; filter: blur(5px); transform: scale(0.72); } to { opacity: 1; filter: none; transform: scale(1); } }
@keyframes destination-source { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); } 28%, 62% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, -50%) scale(4.5); } }
@media (max-width: 700px) {
  .mission-system { inset: 6.8rem 0.5rem 5.5rem; }
  .mission-system::after { display: none; }
  .mission-target { top: var(--target-mobile-y); left: var(--target-mobile-x); width: 5.8rem; height: 5.8rem; }
  .mission-system__arrival-sources i { top: var(--target-mobile-y); left: var(--target-mobile-x); }
  .mission-target__readout { top: calc(100% + 0.3rem); left: 50%; gap: 0.2rem; opacity: 0.78; transform: translate(-50%, 0); text-align: center; }
  .mission-target:nth-child(even) .mission-target__readout { right: auto; left: 50%; text-align: center; }
  .mission-target__readout span, .mission-target__readout small { display: none; }
  .mission-target:is(:hover, :focus-visible) .mission-target__readout { transform: translate(-50%, 0); }
  .mission-system__fallback-note { right: 50%; bottom: -0.6rem; width: max-content; transform: translateX(50%); }
}
@media (prefers-reduced-motion: reduce) { .mission-system { opacity: 1; animation: none; } .mission-system--emerging :deep(.missions-canvas) { animation: destinations-arrival 220ms ease forwards; } .mission-system__arrival-sources { display: none; } .mission-target__reticle, .mission-target__readout { transition-duration: 100ms; } }
</style>
