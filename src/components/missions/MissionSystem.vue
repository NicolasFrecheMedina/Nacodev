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
      :emerging="emerging"
      :departing="departing"
      :pointer="pointer"
      @error="webglAvailable = false"
    />

    <div class="mission-system__orbital-field" aria-hidden="true">
      <i class="mission-system__orbit mission-system__orbit--inner" />
      <i class="mission-system__orbit mission-system__orbit--outer" />
      <span class="mission-system__gravity" />
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
.mission-system--emerging { pointer-events: none; animation: system-return-depth 820ms cubic-bezier(0, 0, 0.6, 1) both, system-return-visual 760ms cubic-bezier(0.75, 0, 0.75, 0.9) both; }
.mission-system--emerging :deep(.missions-canvas) { opacity: 1; }
.mission-system--emerging::after { opacity: 0; }
.mission-system--emerging .mission-system__orbital-field { opacity: 0; }
.mission-system__targets { transition: opacity 360ms ease; }
.mission-system--emerging .mission-system__targets { opacity: 0; }
.mission-system::after { position: absolute; inset: 8% 13%; border: 1px solid rgb(198 226 236 / 5%); border-radius: 50%; content: ''; pointer-events: none; transform: rotate(-7deg); }
.mission-system:not(.mission-system--selected)::after { border-color: rgb(198 226 236 / 11%); box-shadow: inset 0 0 2rem rgb(126 199 225 / 1.5%), 0 0 1.5rem rgb(126 199 225 / 1.5%); }
.mission-system__orbital-field { position: absolute; z-index: 1; inset: 0; opacity: 1; pointer-events: none; transition: opacity 500ms ease; }
.mission-system--selected .mission-system__orbital-field { opacity: 0; }
.mission-system__orbit { position: absolute; border: 1px solid rgb(174 222 238 / 7%); border-radius: 50%; -webkit-mask-image: conic-gradient(from 25deg, transparent 0 9%, #000 14% 34%, transparent 40% 59%, #000 65% 88%, transparent 94%); mask-image: conic-gradient(from 25deg, transparent 0 9%, #000 14% 34%, transparent 40% 59%, #000 65% 88%, transparent 94%); }
.mission-system__orbit--inner { inset: 17% 22%; transform: rotate(13deg); }
.mission-system__orbit--outer { inset: 20% 8% 13%; border-color: rgb(174 222 238 / 5%); transform: rotate(-14deg); }
.mission-system__gravity { position: absolute; top: 50%; left: 50%; width: 2px; height: 2px; border-radius: 50%; background: rgb(184 230 246 / 42%); box-shadow: 0 0 0.7rem rgb(128 205 234 / 38%), 0 0 3rem 1rem rgb(93 174 204 / 8%); transform: translate(-50%, -50%); }
.mission-system__gravity::before { position: absolute; top: 50%; left: 50%; width: 9rem; height: 9rem; border-radius: 50%; background: radial-gradient(circle, rgb(112 195 225 / 5%), transparent 68%); content: ''; transform: translate(-50%, -50%); }
.mission-system__targets { position: absolute; inset: 0; }
.mission-target { --target-visual-size: clamp(7rem, 11vw, 10rem); position: absolute; z-index: 2; top: var(--target-y); left: var(--target-x); width: clamp(9.5rem, 15vw, 13rem); height: clamp(9.5rem, 15vw, 13rem); padding: 0; border: 0; border-radius: 50%; color: inherit; background: transparent; cursor: pointer; transform: translate(-50%, -50%); }
.mission-target__reticle { position: absolute; top: 50%; left: 50%; width: calc(var(--target-visual-size) + 0.7rem); height: calc(var(--target-visual-size) + 0.7rem); border: 1px solid transparent; border-radius: 50%; transform: translate(-50%, -50%); transition: border-color 350ms ease, transform 500ms ease; }
.mission-target__reticle::before, .mission-target__reticle::after { position: absolute; background: rgb(174 222 238 / 0%); content: ''; transition: background 350ms ease; }
.mission-target__reticle::before { top: 50%; right: -0.7rem; left: -0.7rem; height: 1px; }
.mission-target__reticle::after { top: -0.7rem; bottom: -0.7rem; left: 50%; width: 1px; }
.mission-target__readout { position: absolute; top: 50%; left: calc(50% + (var(--target-visual-size) / 2) + 1.1rem); display: grid; width: max-content; max-width: 12rem; gap: 0.28rem; opacity: 0; text-align: left; text-transform: uppercase; transform: translate(0.7rem, -50%); transition: opacity 300ms ease, transform 400ms ease; }
.mission-target:nth-child(even) .mission-target__readout { right: calc(50% + (var(--target-visual-size) / 2) + 1.1rem); left: auto; text-align: right; }
.mission-target__readout span, .mission-target__readout small { color: rgb(225 239 244 / 42%); font-size: 0.43rem; font-weight: 400; letter-spacing: 0.17em; }
.mission-target__readout strong { color: rgb(246 250 251 / 90%); font-size: 0.67rem; font-weight: 400; letter-spacing: 0.16em; }
.mission-target:is(:hover, :focus-visible) .mission-target__reticle { border-color: rgb(155 222 248 / 36%); transform: translate(-50%, -50%) scale(1.08) rotate(12deg); }
.mission-target:is(:hover, :focus-visible) .mission-target__reticle::before, .mission-target:is(:hover, :focus-visible) .mission-target__reticle::after { background: rgb(174 222 238 / 20%); }
.mission-target:is(:hover, :focus-visible) .mission-target__readout { opacity: 1; transform: translate(0, -50%); }
.mission-target:focus-visible { outline: none; }
.mission-target:focus-visible::after { position: absolute; top: 50%; left: 50%; width: var(--target-visual-size); height: var(--target-visual-size); border-radius: 50%; content: ''; outline: 1px solid var(--color-accent); outline-offset: 0.55rem; pointer-events: none; transform: translate(-50%, -50%); }
.mission-target__fallback-planet { position: absolute; top: 50%; left: 50%; width: calc(var(--target-visual-size) * 0.76); height: calc(var(--target-visual-size) * 0.76); border: 1px solid rgb(220 240 247 / 18%); border-radius: 50%; opacity: 0; background: radial-gradient(circle at 35% 28%, color-mix(in srgb, var(--planet-glow) 60%, white), var(--planet-color) 34%, #0b1017 76%); box-shadow: inset -1.3rem -0.7rem 2rem rgb(0 0 0 / 62%), 0 0 2rem color-mix(in srgb, var(--planet-glow) 18%, transparent); transform: translate(-50%, -50%); }
.mission-system--fallback .mission-target__fallback-planet { opacity: 1; }
.mission-system__fallback-note { position: absolute; right: 1rem; bottom: 0; margin: 0; color: rgb(225 239 244 / 45%); font-size: 0.48rem; letter-spacing: 0.16em; text-transform: uppercase; }
@keyframes system-arrival { from { opacity: 0; filter: blur(5px); transform: scale(0.78); } to { opacity: 1; filter: none; transform: scale(1); } }
@keyframes system-return-depth { from { transform: translate3d(0, 0, -30rem) scale(0.5); } to { transform: translate3d(0, 0, 0) scale(1); } }
@keyframes system-return-visual { from { opacity: 0; filter: blur(6px) brightness(0.28); } to { opacity: 1; filter: none; } }
@media (max-width: 700px) {
  .mission-system { inset: 6.8rem 0.5rem 5.5rem; }
  .mission-system::after { display: none; }
  .mission-system__orbit--inner { inset: 14% 15%; }
  .mission-system__orbit--outer { inset: 18% 5% 10%; }
  .mission-target { --target-visual-size: 5.8rem; top: var(--target-mobile-y); left: var(--target-mobile-x); width: 8rem; height: 8rem; }
  .mission-target__readout { top: calc(50% + (var(--target-visual-size) / 2) + 0.3rem); left: 50%; gap: 0.2rem; opacity: 0.78; transform: translate(-50%, 0); text-align: center; }
  .mission-target:nth-child(even) .mission-target__readout { right: auto; left: 50%; text-align: center; }
  .mission-target__readout span, .mission-target__readout small { display: none; }
  .mission-target:is(:hover, :focus-visible) .mission-target__readout { transform: translate(-50%, 0); }
  .mission-system__fallback-note { right: 50%; bottom: -0.6rem; width: max-content; transform: translateX(50%); }
}
@media (prefers-reduced-motion: reduce) { .mission-system { opacity: 1; animation: none; } .mission-target__reticle, .mission-target__readout, .mission-system__orbital-field { transition-duration: 100ms; } }
</style>
