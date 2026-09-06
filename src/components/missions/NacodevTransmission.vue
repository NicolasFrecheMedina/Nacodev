<script setup lang="ts">
import type { Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission }>()

const { t } = useI18n()
</script>

<template>
  <article class="nacodev-transmission" :style="`--mission-accent: ${mission.visual.atmosphere}`">
    <div class="nacodev-transmission__scan" aria-hidden="true" />

    <div class="nacodev-transmission__signal transmission-zone" aria-hidden="true">
      <i /> {{ t('missions.signalActive') }} / NCD-SYS-04
    </div>

    <header class="nacodev-transmission__intro transmission-zone">
      <div>
        <p>{{ t('missions.mission') }} 01</p>
        <span>LAB / BUILD</span>
      </div>
      <h3>{{ t('missions.items.nacodev.name') }}</h3>
      <strong>{{ t('missions.items.nacodev.transmission.subtitle') }}</strong>
    </header>

    <div class="nacodev-transmission__narrative transmission-zone">
      <p>{{ t('missions.items.nacodev.transmission.paragraph1') }}</p>
      <p>{{ t('missions.items.nacodev.transmission.paragraph2') }}</p>
      <p>{{ t('missions.items.nacodev.transmission.paragraph3') }}</p>
      <p>{{ t('missions.items.nacodev.transmission.paragraph4') }}</p>
    </div>

    <section class="nacodev-transmission__trajectory transmission-zone" :aria-label="t('missions.items.nacodev.transmission.trajectoryLabel')">
      <a v-if="mission.v1Url" :href="mission.v1Url" target="_blank" rel="noreferrer">
        {{ t('missions.items.nacodev.transmission.viewV1') }} <span aria-hidden="true">↗</span>
      </a>
      <span v-else class="nacodev-transmission__disabled" aria-disabled="true">
        {{ t('missions.items.nacodev.transmission.viewV1') }} <span aria-hidden="true">↗</span>
      </span>
      <i aria-hidden="true"><em /></i>
      <span><b>2026</b> — V2 <small>/ {{ t('missions.items.nacodev.transmission.currentSignal') }}</small></span>
    </section>

    <section class="nacodev-transmission__data transmission-zone">
      <dl class="nacodev-transmission__facts">
        <div>
          <dt>{{ t('missions.items.nacodev.transmission.originLabel') }}</dt>
          <dd>{{ t('missions.items.nacodev.transmission.origin') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.yearLabel') }}</dt>
          <dd>{{ mission.year }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.statusLabel') }}</dt>
          <dd>{{ t('missions.items.nacodev.transmission.status') }}</dd>
        </div>
      </dl>

      <div class="nacodev-transmission__readouts">
        <div>
          <h4>{{ t('missions.items.nacodev.transmission.exploreLabel') }}</h4>
          <p>{{ t('missions.items.nacodev.transmission.explore') }}</p>
        </div>
        <div>
          <h4>{{ t('missions.items.nacodev.transmission.modeLabel') }}</h4>
          <p>{{ t('missions.items.nacodev.transmission.mode') }}</p>
        </div>
      </div>
    </section>

  </article>
</template>

<style scoped>
.nacodev-transmission { position: relative; isolation: isolate; }
.nacodev-transmission::before { position: absolute; z-index: -1; inset: -1rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 5%, transparent); background: linear-gradient(120deg, color-mix(in srgb, var(--mission-accent) 3%, transparent), transparent 42%); content: ''; pointer-events: none; }
.nacodev-transmission__scan { position: absolute; z-index: 2; top: -1rem; right: -1rem; left: -1rem; height: 3rem; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mission-accent) 9%, transparent), transparent); pointer-events: none; animation: nacodev-scan 1.15s ease-out 80ms both; }
.transmission-zone { opacity: 0; transform: translateY(0.45rem); animation: nacodev-zone-in 520ms ease-out both; }
.nacodev-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: color-mix(in srgb, var(--mission-accent) 68%, transparent); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; animation-delay: 100ms; }
.nacodev-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.7rem var(--mission-accent); animation: nacodev-signal-pulse 900ms ease-out 180ms both; }
.nacodev-transmission__intro { padding: clamp(1.25rem, 3vw, 1.8rem) 0 1.35rem; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 180ms; }
.nacodev-transmission__intro > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.45rem; }
.nacodev-transmission__intro p, .nacodev-transmission__intro span { margin: 0; color: rgb(225 239 244 / 38%); font-size: 0.48rem; letter-spacing: 0.22em; text-transform: uppercase; }
.nacodev-transmission__intro span { color: color-mix(in srgb, var(--mission-accent) 55%, transparent); }
.nacodev-transmission__intro h3 { margin: 0; font-size: clamp(2.25rem, 7vw, 4.5rem); font-weight: 200; line-height: 1; letter-spacing: 0.035em; }
.nacodev-transmission__intro strong { display: block; margin-top: 0.7rem; color: rgb(196 226 237 / 72%); font-size: clamp(0.78rem, 1.5vw, 0.95rem); font-weight: 300; letter-spacing: 0.055em; }
.nacodev-transmission__narrative { display: grid; gap: 0.78rem; max-width: 42rem; padding: 1.4rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 270ms; }
.nacodev-transmission__narrative p { margin: 0; color: rgb(231 240 244 / 70%); font-size: clamp(0.76rem, 1.25vw, 0.9rem); font-weight: 300; line-height: 1.65; }
.nacodev-transmission__trajectory { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.8rem; padding: 1.15rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 360ms; }
.nacodev-transmission__trajectory a, .nacodev-transmission__disabled { padding: 0.35rem 0; border: 0; color: var(--mission-accent); background: transparent; font: inherit; font-size: 0.5rem; letter-spacing: 0.14em; text-decoration: none; text-transform: uppercase; cursor: pointer; transition: color 200ms ease, text-shadow 200ms ease; }
.nacodev-transmission__trajectory a:hover, .nacodev-transmission__trajectory a:focus-visible { color: rgb(242 247 249); text-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 48%, transparent); }
.nacodev-transmission__disabled { opacity: 0.38; cursor: not-allowed; }
.nacodev-transmission__trajectory > span:last-child { color: rgb(222 237 242 / 70%); font-size: 0.52rem; letter-spacing: 0.14em; text-align: right; text-transform: uppercase; }
.nacodev-transmission__trajectory b { color: var(--mission-accent); font-weight: 500; }
.nacodev-transmission__trajectory small { color: color-mix(in srgb, var(--mission-accent) 54%, transparent); font-size: inherit; }
.nacodev-transmission__trajectory > i { position: relative; height: 1px; overflow: visible; background: color-mix(in srgb, var(--mission-accent) 14%, transparent); }
.nacodev-transmission__trajectory > i em { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--mission-accent)); box-shadow: 0 0 0.5rem color-mix(in srgb, var(--mission-accent) 30%, transparent); transform: scaleX(0); transform-origin: left; animation: nacodev-line-draw 760ms cubic-bezier(0.22, 1, 0.36, 1) 460ms forwards; }
.nacodev-transmission__data { animation-delay: 450ms; }
.nacodev-transmission__facts { display: grid; grid-template-columns: 0.85fr 0.55fr 1.6fr; margin: 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.nacodev-transmission__facts div { min-width: 0; padding: 0.95rem 0.75rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.nacodev-transmission__facts div:first-child { padding-left: 0; }
.nacodev-transmission__facts div:last-child { padding-right: 0; border-right: 0; }
.nacodev-transmission dt, .nacodev-transmission dd, .nacodev-transmission__readouts h4, .nacodev-transmission__readouts p { margin: 0; text-transform: uppercase; }
.nacodev-transmission dt, .nacodev-transmission__readouts h4 { margin-bottom: 0.38rem; color: color-mix(in srgb, var(--mission-accent) 42%, transparent); font-size: 0.46rem; font-weight: 400; letter-spacing: 0.16em; }
.nacodev-transmission dd { color: rgb(242 247 249 / 76%); font-size: 0.5rem; letter-spacing: 0.12em; line-height: 1.45; }
.nacodev-transmission__readouts { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.nacodev-transmission__readouts > div { padding: 1rem 1.1rem 1rem 0; }
.nacodev-transmission__readouts > div + div { padding-left: 1.1rem; border-left: 1px solid rgb(155 222 248 / 9%); }
.nacodev-transmission__readouts p { color: color-mix(in srgb, var(--mission-accent) 74%, transparent); font-size: 0.49rem; letter-spacing: 0.12em; line-height: 1.65; }
:global(.modal__panel:has(.nacodev-transmission)) { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, #a6dff3 62%, transparent) rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.nacodev-transmission)::-webkit-scrollbar) { width: 6px; }
:global(.modal__panel:has(.nacodev-transmission)::-webkit-scrollbar-track) { background: rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.nacodev-transmission)::-webkit-scrollbar-thumb) { border: 1px solid rgb(4 12 18 / 58%); border-radius: 999px; background: color-mix(in srgb, #a6dff3 55%, transparent); }
:global(.modal__panel:has(.nacodev-transmission)::-webkit-scrollbar-thumb:hover) { background: color-mix(in srgb, #a6dff3 72%, transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, #a6dff3 34%, transparent); }
@keyframes nacodev-zone-in { to { opacity: 1; transform: none; } }
@keyframes nacodev-scan { 0% { opacity: 0; transform: translateY(0); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(32rem); } }
@keyframes nacodev-signal-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0.7rem var(--mission-accent); } 45% { opacity: 0.35; box-shadow: 0 0 0.15rem var(--mission-accent); } 72% { opacity: 1; box-shadow: 0 0 1rem 0.15rem color-mix(in srgb, var(--mission-accent) 30%, transparent); } }
@keyframes nacodev-line-draw { to { transform: scaleX(1); } }
@media (max-width: 600px) {
  .nacodev-transmission__intro > div { align-items: flex-start; }
  .nacodev-transmission__intro span { max-width: 9rem; text-align: right; }
  .nacodev-transmission__trajectory { grid-template-columns: auto 1fr; }
  .nacodev-transmission__trajectory > i { grid-column: 1 / -1; grid-row: 2; }
  .nacodev-transmission__trajectory > span:last-child { grid-column: 2; grid-row: 1; }
  .nacodev-transmission__trajectory small { display: block; margin-top: 0.25rem; }
  .nacodev-transmission__facts, .nacodev-transmission__readouts { grid-template-columns: 1fr; }
  .nacodev-transmission__facts div, .nacodev-transmission__facts div:first-child, .nacodev-transmission__facts div:last-child { padding: 0.72rem 0; border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); }
  .nacodev-transmission__facts div:last-child { border-bottom: 0; }
  .nacodev-transmission__readouts > div, .nacodev-transmission__readouts > div + div { padding: 0.85rem 0; border-left: 0; }
  .nacodev-transmission__readouts > div + div { border-top: 1px solid rgb(155 222 248 / 9%); }
}
@media (prefers-reduced-motion: reduce) {
  .nacodev-transmission__scan { display: none; }
  .transmission-zone, .nacodev-transmission__signal i, .nacodev-transmission__trajectory > i em { opacity: 1; transform: none; animation: none; }
}
</style>
