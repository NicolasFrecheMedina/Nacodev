<script setup lang="ts">
import type { Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission }>()

const { t } = useI18n()
</script>

<template>
  <article class="tmoment-transmission" :style="`--mission-accent: ${mission.visual.atmosphere}`">
    <div class="tmoment-transmission__scan" aria-hidden="true" />

    <div class="tmoment-transmission__signal transmission-zone" aria-hidden="true">
      <i /> {{ t('missions.signalActive') }} / TM-TEMPORAL-02
    </div>

    <header class="tmoment-transmission__intro transmission-zone">
      <div>
        <p>{{ t('missions.mission') }} 02</p>
        <span>{{ t('missions.items.tmoment.transmission.headerLabel') }}</span>
      </div>
      <h3>{{ t('missions.items.tmoment.name') }}</h3>
      <strong>{{ t('missions.items.tmoment.transmission.subtitle') }}</strong>
    </header>

    <div class="tmoment-transmission__narrative transmission-zone">
      <p>{{ t('missions.items.tmoment.transmission.paragraph1') }}</p>
      <p>{{ t('missions.items.tmoment.transmission.paragraph2') }}</p>
      <p>{{ t('missions.items.tmoment.transmission.paragraph3') }}</p>
      <p>{{ t('missions.items.tmoment.transmission.paragraph4') }}</p>
      <p>{{ t('missions.items.tmoment.transmission.paragraph5') }}</p>
    </div>

    <section class="tmoment-transmission__timeline transmission-zone" :aria-label="t('missions.items.tmoment.transmission.timelineLabel')">
      <a v-if="mission.projectUrl" :href="mission.projectUrl" target="_blank" rel="noreferrer">
        {{ t('missions.items.tmoment.transmission.viewProject') }} <span aria-hidden="true">↗</span>
      </a>
      <span v-else class="tmoment-transmission__disabled" aria-disabled="true">
        {{ t('missions.items.tmoment.transmission.viewProject') }} <span aria-hidden="true">↗</span>
      </span>
      <i aria-hidden="true"><em><b>↶</b></em></i>
      <span class="tmoment-transmission__target"><b>2027</b> - {{ t('missions.items.tmoment.transmission.launchLabel') }}</span>
    </section>

    <section class="tmoment-transmission__data transmission-zone">
      <dl class="tmoment-transmission__facts">
        <div>
          <dt>{{ t('missions.axisLabel') }}</dt>
          <dd>{{ t('missions.items.tmoment.transmission.axis') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.statusLabel') }}</dt>
          <dd>{{ t('missions.status.development') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.items.tmoment.transmission.startLabel') }}</dt>
          <dd>2025</dd>
        </div>
        <div>
          <dt>{{ t('missions.items.tmoment.transmission.launchLabel') }}</dt>
          <dd>2027</dd>
        </div>
      </dl>

      <div class="tmoment-transmission__readouts">
        <div>
          <h4>{{ t('missions.items.tmoment.transmission.principleLabel') }}</h4>
          <p>{{ t('missions.items.tmoment.transmission.principle') }}</p>
        </div>
        <div>
          <h4>{{ t('missions.items.tmoment.transmission.firstFieldLabel') }}</h4>
          <p>{{ t('missions.items.tmoment.transmission.firstField') }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.tmoment-transmission { position: relative; isolation: isolate; }
.tmoment-transmission::before { position: absolute; z-index: -1; inset: -1rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 5%, transparent); background: radial-gradient(circle at 82% 12%, color-mix(in srgb, var(--mission-accent) 5%, transparent), transparent 38%); content: ''; pointer-events: none; }
.tmoment-transmission__scan { position: absolute; z-index: 2; top: -1rem; right: -1rem; left: -1rem; height: 3rem; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mission-accent) 8%, transparent), transparent); pointer-events: none; animation: tmoment-scan 1.15s ease-out 80ms both; }
.transmission-zone { opacity: 0; transform: translateY(0.4rem); animation: tmoment-zone-in 520ms ease-out both; }
.tmoment-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: color-mix(in srgb, var(--mission-accent) 68%, transparent); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; animation-delay: 100ms; }
.tmoment-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.7rem var(--mission-accent); animation: tmoment-signal-pulse 900ms ease-out 180ms both; }
.tmoment-transmission__intro { padding: clamp(1.25rem, 3vw, 1.8rem) 0 1.35rem; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 180ms; }
.tmoment-transmission__intro > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
.tmoment-transmission__intro p, .tmoment-transmission__intro span { margin: 0; color: rgb(225 239 244 / 38%); font-size: 0.46rem; letter-spacing: 0.2em; text-transform: uppercase; }
.tmoment-transmission__intro span { color: color-mix(in srgb, var(--mission-accent) 52%, transparent); }
.tmoment-transmission__intro h3 { margin: 0; font-size: clamp(2.25rem, 7vw, 4.5rem); font-weight: 200; line-height: 1; letter-spacing: 0.035em; }
.tmoment-transmission__intro strong { display: block; margin-top: 0.7rem; color: rgb(196 226 237 / 72%); font-size: clamp(0.78rem, 1.5vw, 0.95rem); font-weight: 300; letter-spacing: 0.055em; }
.tmoment-transmission__narrative { display: grid; gap: 0.78rem; max-width: 42rem; padding: 1.4rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 270ms; }
.tmoment-transmission__narrative p { margin: 0; color: rgb(231 240 244 / 70%); font-size: clamp(0.76rem, 1.25vw, 0.9rem); font-weight: 300; line-height: 1.65; }
.tmoment-transmission__timeline { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.85rem; padding: 1.2rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 360ms; }
.tmoment-transmission__timeline a, .tmoment-transmission__disabled { padding: 0.35rem 0; border: 0; color: var(--mission-accent); background: transparent; font: inherit; font-size: 0.5rem; letter-spacing: 0.14em; text-decoration: none; text-transform: uppercase; cursor: pointer; transition: color 200ms ease, text-shadow 200ms ease; }
.tmoment-transmission__timeline a:hover, .tmoment-transmission__timeline a:focus-visible { color: rgb(242 247 249); text-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 48%, transparent); }
.tmoment-transmission__disabled { opacity: 0.38; cursor: not-allowed; }
.tmoment-transmission__timeline > i { position: relative; height: 1px; background: color-mix(in srgb, var(--mission-accent) 14%, transparent); }
.tmoment-transmission__timeline > i::before { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--mission-accent)); box-shadow: 0 0 0.5rem color-mix(in srgb, var(--mission-accent) 30%, transparent); content: ''; transform: scaleX(0); transform-origin: left; animation: tmoment-timeline-rewind 760ms cubic-bezier(0.22, 1, 0.36, 1) 460ms forwards; }
.tmoment-transmission__timeline em { position: absolute; top: 50%; left: 50%; display: grid; width: 1.35rem; height: 1.35rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 44%, transparent); border-radius: 50%; opacity: 0; color: var(--mission-accent); background: rgb(6 14 20); font-style: normal; place-items: center; transform: translate(-50%, -50%); animation: tmoment-marker-in 500ms ease-out 720ms forwards; }
.tmoment-transmission__timeline em b { font-size: 0.72rem; font-weight: 400; line-height: 1; }
.tmoment-transmission__target { color: rgb(222 237 242 / 70%); font-size: 0.52rem; letter-spacing: 0.14em; text-align: right; text-transform: uppercase; }
.tmoment-transmission__target b { color: var(--mission-accent); font-weight: 500; }
.tmoment-transmission__data { animation-delay: 450ms; }
.tmoment-transmission__facts { display: grid; grid-template-columns: 1.1fr 1.25fr 0.7fr 0.7fr; margin: 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.tmoment-transmission__facts div { min-width: 0; padding: 0.95rem 0.7rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.tmoment-transmission__facts div:first-child { padding-left: 0; }
.tmoment-transmission__facts div:last-child { padding-right: 0; border-right: 0; }
.tmoment-transmission dt, .tmoment-transmission dd, .tmoment-transmission__readouts h4, .tmoment-transmission__readouts p { margin: 0; text-transform: uppercase; }
.tmoment-transmission dt, .tmoment-transmission__readouts h4 { margin-bottom: 0.38rem; color: color-mix(in srgb, var(--mission-accent) 42%, transparent); font-size: 0.46rem; font-weight: 400; letter-spacing: 0.16em; }
.tmoment-transmission dd { color: rgb(242 247 249 / 76%); font-size: 0.49rem; letter-spacing: 0.11em; line-height: 1.45; }
.tmoment-transmission__readouts { display: grid; grid-template-columns: 1.5fr 0.5fr; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.tmoment-transmission__readouts > div { padding: 1rem 1.1rem 1rem 0; }
.tmoment-transmission__readouts > div + div { padding-left: 1.1rem; border-left: 1px solid rgb(155 222 248 / 9%); }
.tmoment-transmission__readouts p { color: color-mix(in srgb, var(--mission-accent) 74%, transparent); font-size: 0.49rem; letter-spacing: 0.12em; line-height: 1.65; }
:global(.modal__panel:has(.tmoment-transmission)) { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, #c7edf0 62%, transparent) rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.tmoment-transmission)::-webkit-scrollbar) { width: 6px; }
:global(.modal__panel:has(.tmoment-transmission)::-webkit-scrollbar-track) { background: rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.tmoment-transmission)::-webkit-scrollbar-thumb) { border: 1px solid rgb(4 12 18 / 58%); border-radius: 999px; background: color-mix(in srgb, #c7edf0 55%, transparent); }
:global(.modal__panel:has(.tmoment-transmission)::-webkit-scrollbar-thumb:hover) { background: color-mix(in srgb, #c7edf0 72%, transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, #c7edf0 34%, transparent); }
@keyframes tmoment-zone-in { to { opacity: 1; transform: none; } }
@keyframes tmoment-scan { 0% { opacity: 0; transform: translateY(0); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(32rem); } }
@keyframes tmoment-signal-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0.7rem var(--mission-accent); } 45% { opacity: 0.35; box-shadow: 0 0 0.15rem var(--mission-accent); } 72% { opacity: 1; box-shadow: 0 0 1rem 0.15rem color-mix(in srgb, var(--mission-accent) 30%, transparent); } }
@keyframes tmoment-timeline-rewind { to { transform: scaleX(1); } }
@keyframes tmoment-marker-in { from { opacity: 0; transform: translate(-50%, -50%) rotate(70deg) scale(0.7); } to { opacity: 1; transform: translate(-50%, -50%); } }
@media (max-width: 600px) {
  .tmoment-transmission__intro > div { align-items: flex-start; }
  .tmoment-transmission__intro span { max-width: 9rem; text-align: right; }
  .tmoment-transmission__timeline { grid-template-columns: auto 1fr; }
  .tmoment-transmission__timeline > i { grid-column: 1 / -1; grid-row: 2; }
  .tmoment-transmission__target { grid-column: 2; grid-row: 1; }
  .tmoment-transmission__facts, .tmoment-transmission__readouts { grid-template-columns: 1fr; }
  .tmoment-transmission__facts div, .tmoment-transmission__facts div:first-child, .tmoment-transmission__facts div:last-child { padding: 0.72rem 0; border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); }
  .tmoment-transmission__facts div:last-child { border-bottom: 0; }
  .tmoment-transmission__readouts > div, .tmoment-transmission__readouts > div + div { padding: 0.85rem 0; border-left: 0; }
  .tmoment-transmission__readouts > div + div { border-top: 1px solid rgb(155 222 248 / 9%); }
}
@media (prefers-reduced-motion: reduce) {
  .tmoment-transmission__scan { display: none; }
  .transmission-zone, .tmoment-transmission__signal i, .tmoment-transmission__timeline > i::before, .tmoment-transmission__timeline em { opacity: 1; transform: none; animation: none; }
  .tmoment-transmission__timeline em { transform: translate(-50%, -50%); }
}
</style>
