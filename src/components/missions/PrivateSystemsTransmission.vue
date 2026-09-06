<script setup lang="ts">
import type { Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission }>()

const { t } = useI18n()
</script>

<template>
  <article class="private-systems-transmission" :style="`--mission-accent: ${mission.visual.atmosphere}`">
    <div class="private-systems-transmission__scan" aria-hidden="true" />

    <div class="private-systems-transmission__signal transmission-zone" aria-hidden="true">
      <i /> {{ t('missions.signalActive') }} / NCD-INFRA-05
    </div>

    <header class="private-systems-transmission__intro transmission-zone">
      <div>
        <p>{{ t('missions.mission') }} 05</p>
        <span>INFRA / SECURE</span>
      </div>
      <h3>{{ t('missions.items.privateSystems.name') }}</h3>
      <strong>{{ t('missions.items.privateSystems.transmission.subtitle') }}</strong>
    </header>

    <div class="private-systems-transmission__narrative transmission-zone">
      <p>{{ t('missions.items.privateSystems.transmission.paragraph1') }}</p>
      <p>{{ t('missions.items.privateSystems.transmission.paragraph2') }}</p>
      <p>{{ t('missions.items.privateSystems.transmission.paragraph3') }}</p>
      <p>{{ t('missions.items.privateSystems.transmission.paragraph4') }}</p>
      <p>{{ t('missions.items.privateSystems.transmission.paragraph5') }}</p>
    </div>

    <section class="private-systems-transmission__scope transmission-zone" :aria-label="t('missions.items.privateSystems.transmission.scopeLabel')">
      <span>{{ t('missions.items.privateSystems.transmission.scopeStart') }}</span>
      <i aria-hidden="true"><em /><em /><em /></i>
      <span>{{ t('missions.items.privateSystems.transmission.scopeEnd') }}</span>
    </section>

    <section class="private-systems-transmission__data transmission-zone">
      <dl class="private-systems-transmission__facts">
        <div>
          <dt>{{ t('missions.items.privateSystems.transmission.terrainLabel') }}</dt>
          <dd>{{ t('missions.items.privateSystems.transmission.terrain') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.yearLabel') }}</dt>
          <dd>{{ mission.year }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.statusLabel') }}</dt>
          <dd>{{ t('missions.items.privateSystems.transmission.status') }}</dd>
        </div>
      </dl>

      <div class="private-systems-transmission__readouts">
        <div>
          <h4>{{ t('missions.items.privateSystems.transmission.domainsLabel') }}</h4>
          <p>{{ t('missions.items.privateSystems.transmission.domains') }}</p>
        </div>
        <div>
          <h4>{{ t('missions.items.privateSystems.transmission.approachLabel') }}</h4>
          <p>{{ t('missions.items.privateSystems.transmission.approach') }}</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.private-systems-transmission { position: relative; isolation: isolate; }
.private-systems-transmission::before { position: absolute; z-index: -1; inset: -1rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 7%, transparent); background: radial-gradient(circle at 78% 15%, color-mix(in srgb, var(--mission-accent) 8%, transparent), transparent 40%), linear-gradient(135deg, rgb(155 222 248 / 2%), transparent 52%); content: ''; pointer-events: none; }
.private-systems-transmission__scan { position: absolute; z-index: 2; top: -1rem; right: -1rem; left: -1rem; height: 3rem; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mission-accent) 10%, transparent), transparent); pointer-events: none; animation: private-systems-scan 1.15s ease-out 80ms both; }
.transmission-zone { opacity: 0; transform: translateY(0.45rem); animation: private-systems-zone-in 520ms ease-out both; }
.private-systems-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: color-mix(in srgb, var(--mission-accent) 72%, transparent); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; animation-delay: 100ms; }
.private-systems-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 72%, transparent); animation: private-systems-signal-pulse 900ms ease-out 180ms both; }
.private-systems-transmission__intro { padding: clamp(1.25rem, 3vw, 1.8rem) 0 1.35rem; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 180ms; }
.private-systems-transmission__intro > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
.private-systems-transmission__intro p, .private-systems-transmission__intro span { margin: 0; color: rgb(225 239 244 / 38%); font-size: 0.46rem; letter-spacing: 0.2em; text-transform: uppercase; }
.private-systems-transmission__intro span { color: color-mix(in srgb, var(--mission-accent) 58%, transparent); }
.private-systems-transmission__intro h3 { margin: 0; font-size: clamp(2.1rem, 6vw, 4.35rem); font-weight: 200; line-height: 1; letter-spacing: 0.035em; }
.private-systems-transmission__intro strong { display: block; margin-top: 0.7rem; color: rgb(226 200 193 / 76%); font-size: clamp(0.78rem, 1.5vw, 0.95rem); font-weight: 300; letter-spacing: 0.055em; }
.private-systems-transmission__narrative { display: grid; gap: 0.78rem; max-width: 42rem; padding: 1.4rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 270ms; }
.private-systems-transmission__narrative p { margin: 0; color: rgb(231 240 244 / 70%); font-size: clamp(0.76rem, 1.25vw, 0.9rem); font-weight: 300; line-height: 1.65; }
.private-systems-transmission__scope { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 0.85rem; padding: 1.15rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 360ms; }
.private-systems-transmission__scope > span { color: rgb(222 237 242 / 64%); font-size: 0.48rem; letter-spacing: 0.13em; text-transform: uppercase; }
.private-systems-transmission__scope > span:last-child { text-align: right; }
.private-systems-transmission__scope > i { position: relative; height: 1px; background: color-mix(in srgb, var(--mission-accent) 18%, transparent); }
.private-systems-transmission__scope > i::before { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--mission-accent), transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, var(--mission-accent) 28%, transparent); content: ''; transform: scaleX(0); transform-origin: left; animation: private-systems-line-draw 760ms cubic-bezier(0.22, 1, 0.36, 1) 460ms forwards; }
.private-systems-transmission__scope em { position: absolute; top: 50%; width: 0.42rem; height: 0.42rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 66%, transparent); border-radius: 50%; opacity: 0; background: rgb(10 15 20); box-shadow: 0 0 0.55rem color-mix(in srgb, var(--mission-accent) 32%, transparent); transform: translate(-50%, -50%) scale(0.5); animation: private-systems-node-in 360ms ease-out forwards; }
.private-systems-transmission__scope em:nth-child(1) { left: 18%; animation-delay: 620ms; }
.private-systems-transmission__scope em:nth-child(2) { left: 50%; animation-delay: 710ms; }
.private-systems-transmission__scope em:nth-child(3) { left: 82%; animation-delay: 800ms; }
.private-systems-transmission__data { animation-delay: 450ms; }
.private-systems-transmission__facts { display: grid; grid-template-columns: 1.25fr 0.45fr 1.05fr; margin: 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.private-systems-transmission__facts div { min-width: 0; padding: 0.95rem 0.75rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.private-systems-transmission__facts div:first-child { padding-left: 0; }
.private-systems-transmission__facts div:last-child { padding-right: 0; border-right: 0; }
.private-systems-transmission dt, .private-systems-transmission dd, .private-systems-transmission__readouts h4, .private-systems-transmission__readouts p { margin: 0; text-transform: uppercase; }
.private-systems-transmission dt, .private-systems-transmission__readouts h4 { margin-bottom: 0.38rem; color: color-mix(in srgb, var(--mission-accent) 42%, transparent); font-size: 0.46rem; font-weight: 400; letter-spacing: 0.16em; }
.private-systems-transmission dd { color: rgb(242 247 249 / 76%); font-size: 0.49rem; letter-spacing: 0.11em; line-height: 1.45; }
.private-systems-transmission__readouts { display: grid; grid-template-columns: 1.2fr 1fr; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.private-systems-transmission__readouts > div { padding: 1rem 1.1rem 1rem 0; }
.private-systems-transmission__readouts > div + div { padding-left: 1.1rem; border-left: 1px solid rgb(155 222 248 / 9%); }
.private-systems-transmission__readouts p { color: color-mix(in srgb, var(--mission-accent) 78%, transparent); font-size: 0.49rem; letter-spacing: 0.11em; line-height: 1.65; }
:global(.modal__panel:has(.private-systems-transmission)) { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, #c85d4d 62%, transparent) rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.private-systems-transmission)::-webkit-scrollbar) { width: 6px; }
:global(.modal__panel:has(.private-systems-transmission)::-webkit-scrollbar-track) { background: rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.private-systems-transmission)::-webkit-scrollbar-thumb) { border: 1px solid rgb(4 12 18 / 58%); border-radius: 999px; background: color-mix(in srgb, #c85d4d 58%, transparent); }
:global(.modal__panel:has(.private-systems-transmission)::-webkit-scrollbar-thumb:hover) { background: color-mix(in srgb, #c85d4d 76%, transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, #c85d4d 34%, transparent); }
@keyframes private-systems-zone-in { to { opacity: 1; transform: none; } }
@keyframes private-systems-scan { 0% { opacity: 0; transform: translateY(0); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(34rem); } }
@keyframes private-systems-signal-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 72%, transparent); } 45% { opacity: 0.35; box-shadow: 0 0 0.15rem color-mix(in srgb, var(--mission-accent) 55%, transparent); } 72% { opacity: 1; box-shadow: 0 0 1rem 0.15rem color-mix(in srgb, var(--mission-accent) 28%, transparent); } }
@keyframes private-systems-line-draw { to { transform: scaleX(1); } }
@keyframes private-systems-node-in { to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
@media (max-width: 620px) {
  .private-systems-transmission__intro > div { align-items: flex-start; }
  .private-systems-transmission__intro span { max-width: 9rem; text-align: right; }
  .private-systems-transmission__scope { grid-template-columns: 1fr 1fr; }
  .private-systems-transmission__scope > i { grid-column: 1 / -1; grid-row: 2; }
  .private-systems-transmission__facts, .private-systems-transmission__readouts { grid-template-columns: 1fr; }
  .private-systems-transmission__facts div, .private-systems-transmission__facts div:first-child, .private-systems-transmission__facts div:last-child { padding: 0.72rem 0; border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); }
  .private-systems-transmission__facts div:last-child { border-bottom: 0; }
  .private-systems-transmission__readouts > div, .private-systems-transmission__readouts > div + div { padding: 0.85rem 0; border-left: 0; }
  .private-systems-transmission__readouts > div + div { border-top: 1px solid rgb(155 222 248 / 9%); }
}
@media (prefers-reduced-motion: reduce) {
  .private-systems-transmission__scan { display: none; }
  .transmission-zone, .private-systems-transmission__signal i, .private-systems-transmission__scope > i::before, .private-systems-transmission__scope em { opacity: 1; transform: none; animation: none; }
  .private-systems-transmission__scope em { transform: translate(-50%, -50%); }
}
</style>
