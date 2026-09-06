<script setup lang="ts">
import type { Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission }>()

const { t } = useI18n()
</script>

<template>
  <article class="audela-transmission" :style="`--mission-accent: ${mission.visual.atmosphere}`">
    <div class="audela-transmission__scan" aria-hidden="true" />

    <div class="audela-transmission__signal transmission-zone" aria-hidden="true">
      <i /> {{ t('missions.signalActive') }} / AD-HORIZON-03
    </div>

    <header class="audela-transmission__intro transmission-zone">
      <div>
        <p>{{ t('missions.mission') }} 03</p>
        <span>PROSPECTIVE / HORIZON</span>
      </div>
      <h3>{{ t('missions.items.audela.name') }}</h3>
      <strong>{{ t('missions.items.audela.transmission.subtitle') }}</strong>
    </header>

    <div class="audela-transmission__narrative transmission-zone">
      <p>{{ t('missions.items.audela.transmission.paragraph1') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph2') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph3') }}</p>
      <p class="audela-transmission__statement">{{ t('missions.items.audela.transmission.paragraph4') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph5') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph6') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph7') }}</p>
      <p>{{ t('missions.items.audela.transmission.paragraph8') }}</p>
    </div>

    <section class="audela-transmission__timeline transmission-zone" :aria-label="t('missions.items.audela.transmission.timelineLabel')">
      <a v-if="mission.projectUrl" :href="mission.projectUrl" target="_blank" rel="noreferrer">
        {{ t('missions.items.audela.transmission.viewProject') }} <span aria-hidden="true">↗</span>
      </a>
      <span v-else class="audela-transmission__disabled" aria-disabled="true">
        {{ t('missions.items.audela.transmission.viewProject') }} <span aria-hidden="true">↗</span>
      </span>
      <i aria-hidden="true">
        <em><b /><b /><b /></em>
      </i>
      <span class="audela-transmission__horizon">{{ t('missions.items.audela.transmission.horizon') }}</span>
    </section>

    <section class="audela-transmission__data transmission-zone">
      <dl class="audela-transmission__facts">
        <div>
          <dt>{{ t('missions.axisLabel') }}</dt>
          <dd>{{ t('missions.items.audela.transmission.axis') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.statusLabel') }}</dt>
          <dd>{{ t('missions.items.audela.transmission.status') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.items.audela.transmission.horizonLabel') }}</dt>
          <dd>{{ t('missions.items.audela.transmission.horizon') }}</dd>
        </div>
      </dl>

      <div class="audela-transmission__readouts">
        <div>
          <h4>{{ t('missions.items.audela.transmission.principleLabel') }}</h4>
          <p>{{ t('missions.items.audela.transmission.principle') }}</p>
        </div>
        <div>
          <h4>{{ t('missions.items.audela.transmission.territoryLabel') }}</h4>
          <p>{{ t('missions.items.audela.transmission.territory') }}</p>
        </div>
        <div>
          <h4>{{ t('missions.items.audela.transmission.visionLabel') }}</h4>
          <p>{{ t('missions.items.audela.transmission.vision') }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.audela-transmission { position: relative; isolation: isolate; }
.audela-transmission::before { position: absolute; z-index: -1; inset: -1rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 5%, transparent); background: radial-gradient(ellipse at 72% 18%, color-mix(in srgb, var(--mission-accent) 7%, transparent), transparent 42%); content: ''; pointer-events: none; }
.audela-transmission__scan { position: absolute; z-index: 2; top: -1rem; right: -1rem; left: -1rem; height: 3rem; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mission-accent) 8%, transparent), transparent); pointer-events: none; animation: audela-scan 1.15s ease-out 80ms both; }
.transmission-zone { opacity: 0; transform: translateY(0.45rem); animation: audela-zone-in 520ms ease-out both; }
.audela-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: color-mix(in srgb, var(--mission-accent) 68%, transparent); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; animation-delay: 100ms; }
.audela-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.7rem var(--mission-accent); animation: audela-signal-pulse 900ms ease-out 180ms both; }
.audela-transmission__intro { padding: clamp(1.25rem, 3vw, 1.8rem) 0 1.35rem; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 180ms; }
.audela-transmission__intro > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
.audela-transmission__intro p, .audela-transmission__intro span { margin: 0; color: rgb(225 239 244 / 38%); font-size: 0.46rem; letter-spacing: 0.2em; text-transform: uppercase; }
.audela-transmission__intro span { color: color-mix(in srgb, var(--mission-accent) 55%, transparent); }
.audela-transmission__intro h3 { margin: 0; font-size: clamp(2.25rem, 7vw, 4.5rem); font-weight: 200; line-height: 1; letter-spacing: 0.035em; }
.audela-transmission__intro strong { display: block; margin-top: 0.7rem; color: rgb(205 216 246 / 75%); font-size: clamp(0.78rem, 1.5vw, 0.95rem); font-weight: 300; letter-spacing: 0.055em; }
.audela-transmission__narrative { display: grid; gap: 1rem; max-width: 42rem; padding: 1.5rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 270ms; }
.audela-transmission__narrative p { margin: 0; color: rgb(231 240 244 / 70%); font-size: clamp(0.76rem, 1.25vw, 0.9rem); font-weight: 300; line-height: 1.72; }
.audela-transmission__narrative .audela-transmission__statement { position: relative; width: fit-content; padding: 0.35rem 1rem 0.35rem 0; color: rgb(221 229 255 / 90%); font-size: clamp(0.9rem, 1.6vw, 1.05rem); letter-spacing: 0.04em; }
.audela-transmission__statement::after { position: absolute; right: 0; bottom: 0; left: 0; height: 1px; background: linear-gradient(90deg, color-mix(in srgb, var(--mission-accent) 52%, transparent), transparent); content: ''; }
.audela-transmission__timeline { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.9rem; padding: 1.3rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 360ms; }
.audela-transmission__timeline a, .audela-transmission__disabled { padding: 0.35rem 0; border: 0; color: var(--mission-accent); background: transparent; font: inherit; font-size: 0.5rem; letter-spacing: 0.14em; text-decoration: none; text-transform: uppercase; cursor: pointer; transition: color 200ms ease, text-shadow 200ms ease; }
.audela-transmission__timeline a:hover, .audela-transmission__timeline a:focus-visible { color: rgb(242 247 249); text-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 48%, transparent); }
.audela-transmission__disabled { opacity: 0.38; cursor: not-allowed; }
.audela-transmission__timeline > i { position: relative; height: 1px; background: color-mix(in srgb, var(--mission-accent) 13%, transparent); }
.audela-transmission__timeline > i::before { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mission-accent) 72%, transparent), var(--mission-accent)); box-shadow: 0 0 0.6rem color-mix(in srgb, var(--mission-accent) 22%, transparent); content: ''; transform: scaleX(0); transform-origin: left; animation: audela-line-draw 800ms cubic-bezier(0.22, 1, 0.36, 1) 460ms forwards; }
.audela-transmission__timeline em { position: absolute; top: 50%; left: 58%; width: 1.8rem; height: 1.8rem; opacity: 0; transform: translate(-50%, -50%) scale(0.65); animation: audela-horizon-in 600ms ease-out 720ms forwards; }
.audela-transmission__timeline em b { position: absolute; border: 1px solid color-mix(in srgb, var(--mission-accent) 52%, transparent); border-radius: 50%; inset: 0; }
.audela-transmission__timeline em b:nth-child(2) { inset: 0.3rem; border-color: color-mix(in srgb, var(--mission-accent) 68%, transparent); }
.audela-transmission__timeline em b:nth-child(3) { inset: 0.68rem; border: 0; background: var(--mission-accent); box-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 70%, transparent); }
.audela-transmission__horizon { color: color-mix(in srgb, var(--mission-accent) 72%, transparent); font-size: 0.52rem; letter-spacing: 0.15em; text-align: right; text-transform: uppercase; }
.audela-transmission__data { animation-delay: 450ms; }
.audela-transmission__facts { display: grid; grid-template-columns: 1fr 1.35fr 0.7fr; margin: 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.audela-transmission__facts div { min-width: 0; padding: 0.95rem 0.75rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.audela-transmission__facts div:first-child { padding-left: 0; }
.audela-transmission__facts div:last-child { padding-right: 0; border-right: 0; }
.audela-transmission dt, .audela-transmission dd, .audela-transmission__readouts h4, .audela-transmission__readouts p { margin: 0; text-transform: uppercase; }
.audela-transmission dt, .audela-transmission__readouts h4 { margin-bottom: 0.38rem; color: color-mix(in srgb, var(--mission-accent) 42%, transparent); font-size: 0.46rem; font-weight: 400; letter-spacing: 0.16em; }
.audela-transmission dd { color: rgb(242 247 249 / 76%); font-size: 0.49rem; letter-spacing: 0.11em; line-height: 1.45; }
.audela-transmission__readouts { display: grid; grid-template-columns: 1.25fr 1fr 0.75fr; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.audela-transmission__readouts > div { padding: 1rem 1rem 1rem 0; }
.audela-transmission__readouts > div + div { padding-left: 1rem; border-left: 1px solid rgb(155 222 248 / 9%); }
.audela-transmission__readouts p { color: color-mix(in srgb, var(--mission-accent) 74%, transparent); font-size: 0.48rem; letter-spacing: 0.11em; line-height: 1.65; }
:global(.modal__panel:has(.audela-transmission)) { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, #8d9ee9 62%, transparent) rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.audela-transmission)::-webkit-scrollbar) { width: 6px; }
:global(.modal__panel:has(.audela-transmission)::-webkit-scrollbar-track) { background: rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.audela-transmission)::-webkit-scrollbar-thumb) { border: 1px solid rgb(4 12 18 / 58%); border-radius: 999px; background: color-mix(in srgb, #8d9ee9 55%, transparent); }
:global(.modal__panel:has(.audela-transmission)::-webkit-scrollbar-thumb:hover) { background: color-mix(in srgb, #8d9ee9 72%, transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, #8d9ee9 34%, transparent); }
@keyframes audela-zone-in { to { opacity: 1; transform: none; } }
@keyframes audela-scan { 0% { opacity: 0; transform: translateY(0); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(32rem); } }
@keyframes audela-signal-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0.7rem var(--mission-accent); } 45% { opacity: 0.35; box-shadow: 0 0 0.15rem var(--mission-accent); } 72% { opacity: 1; box-shadow: 0 0 1rem 0.15rem color-mix(in srgb, var(--mission-accent) 30%, transparent); } }
@keyframes audela-line-draw { to { transform: scaleX(1); } }
@keyframes audela-horizon-in { to { opacity: 1; transform: translate(-50%, -50%); } }
@media (max-width: 600px) {
  .audela-transmission__intro > div { align-items: flex-start; }
  .audela-transmission__intro span { max-width: 9rem; text-align: right; }
  .audela-transmission__timeline { grid-template-columns: auto 1fr; }
  .audela-transmission__timeline > i { grid-column: 1 / -1; grid-row: 2; }
  .audela-transmission__horizon { grid-column: 2; grid-row: 1; }
  .audela-transmission__facts, .audela-transmission__readouts { grid-template-columns: 1fr; }
  .audela-transmission__facts div, .audela-transmission__facts div:first-child, .audela-transmission__facts div:last-child { padding: 0.72rem 0; border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); }
  .audela-transmission__facts div:last-child { border-bottom: 0; }
  .audela-transmission__readouts > div, .audela-transmission__readouts > div + div { padding: 0.85rem 0; border-left: 0; }
  .audela-transmission__readouts > div + div { border-top: 1px solid rgb(155 222 248 / 9%); }
}
@media (prefers-reduced-motion: reduce) {
  .audela-transmission__scan { display: none; }
  .transmission-zone, .audela-transmission__signal i, .audela-transmission__timeline > i::before, .audela-transmission__timeline em { opacity: 1; transform: none; animation: none; }
  .audela-transmission__timeline em { transform: translate(-50%, -50%); }
}
</style>
