<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HudStepIndicator from '@/components/ui/HudStepIndicator.vue'
import { sceneStepTotal } from '@/data/scenes'
import { useI18n } from '@/i18n'

type SpaceMotion = 'idle' | 'warp' | 'drift' | 'launch'

const emit = defineEmits<{
  'background-change': [payload: { revealed: boolean; motion: SpaceMotion }]
  complete: []
}>()
const { t } = useI18n()
const status = ref<'searching' | 'found'>('searching')
const revealing = ref(false)
const timers: number[] = []

function later(callback: () => void, delay: number) {
  timers.push(window.setTimeout(callback, delay))
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  emit('background-change', { revealed: false, motion: 'idle' })

  if (reducedMotion) {
    later(() => {
      revealing.value = true
      status.value = 'found'
      emit('background-change', { revealed: true, motion: 'idle' })
    }, 120)
    later(() => emit('complete'), 900)
    return
  }

  later(() => {
    revealing.value = true
    emit('background-change', { revealed: true, motion: 'warp' })
  }, 1050)
  later(() => { status.value = 'found' }, 2050)
  later(() => emit('background-change', { revealed: true, motion: 'drift' }), 2800)
  later(() => emit('complete'), 3550)
})

onBeforeUnmount(() => timers.forEach((timer) => window.clearTimeout(timer)))
</script>

<template>
  <section id="connection" class="connection-scene" :class="{ 'connection-scene--revealing': revealing }">
    <div class="connection-scene__light" aria-hidden="true" />
    <div class="signal" role="status">
      <div class="signal__reticle" aria-hidden="true">
        <span class="signal__core" />
        <span class="signal__orbit signal__orbit--outer" />
        <span class="signal__orbit signal__orbit--inner" />
        <span class="signal__sweep" />
      </div>
      <div class="signal__scene" aria-hidden="true">
        <HudStepIndicator code="NCD — CNX" :step="1" :total="sceneStepTotal" />
      </div>
      <p class="signal__status" :class="{ 'signal__status--found': status === 'found' }">
        {{ status === 'searching' ? t('connection.searching') : t('connection.found') }}
      </p>
      <div class="signal__progress" aria-hidden="true"><span /></div>
    </div>
  </section>
</template>

<style scoped>
.connection-scene { position: relative; display: grid; width: 100%; height: 100svh; overflow: hidden; place-items: center; }
.connection-scene__light { position: absolute; inset: 0; background: #edf0f2; transition: opacity 950ms cubic-bezier(0.65, 0, 0.35, 1); }
.connection-scene--revealing .connection-scene__light { opacity: 0; }
.signal { position: relative; z-index: 1; display: grid; width: min(78vw, 18rem); justify-items: center; color: #172029; transition: color 600ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1); }
.connection-scene--revealing .signal { color: var(--color-ink); transform: scale(0.96); }
.signal__reticle { position: relative; width: clamp(7rem, 18vw, 9.5rem); aspect-ratio: 1; margin-bottom: clamp(2rem, 6vh, 3.5rem); border: 1px solid currentColor; border-radius: 50%; opacity: 0.72; }
.signal__reticle::before, .signal__reticle::after { position: absolute; content: ''; background: currentColor; opacity: 0.35; }
.signal__reticle::before { top: 50%; left: -14%; width: 128%; height: 1px; }
.signal__reticle::after { top: -14%; left: 50%; width: 1px; height: 128%; }
.signal__core { position: absolute; top: 50%; left: 50%; width: 0.38rem; aspect-ratio: 1; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 1.2rem var(--color-accent); transform: translate(-50%, -50%); }
.signal__orbit { position: absolute; border: 1px solid currentColor; border-radius: 50%; opacity: 0.18; }
.signal__orbit--outer { inset: 17%; }
.signal__orbit--inner { inset: 35%; }
.signal__sweep { position: absolute; inset: 4%; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0 72%, rgb(112 211 255 / 34%) 98%, transparent); animation: scan 1.45s linear infinite; }
.signal__status { margin: 0; letter-spacing: 0.24em; text-transform: uppercase; }
.signal__scene { margin-bottom: 0.7rem; font-size: var(--hud-label-size); letter-spacing: 0.16em; line-height: 1.7; text-transform: uppercase; opacity: 0.7; }
.signal__status { font-size: clamp(0.72rem, 2vw, 0.86rem); transition: color 300ms ease; }
.signal__status--found { color: var(--color-accent); }
.signal__progress { width: 100%; height: 1px; margin-top: 1.2rem; overflow: hidden; background: currentColor; opacity: 0.32; }
.signal__progress span { display: block; width: 35%; height: 100%; background: currentColor; animation: search 1.2s ease-in-out infinite; }
@keyframes scan { to { transform: rotate(1turn); } }
@keyframes search { from { transform: translateX(-110%); } to { transform: translateX(390%); } }
@media (prefers-reduced-motion: reduce) {
  .connection-scene__light, .signal { transition-duration: 150ms; }
  .signal__sweep, .signal__progress span { animation: none; }
}
</style>
