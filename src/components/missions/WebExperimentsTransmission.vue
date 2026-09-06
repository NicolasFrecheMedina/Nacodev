<script setup lang="ts">
import { webExperienceProjects, type Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission }>()

const { t } = useI18n()
</script>

<template>
  <article class="web-transmission" :style="`--mission-accent: ${mission.visual.atmosphere}`">
    <div class="web-transmission__scan" aria-hidden="true" />

    <div class="web-transmission__signal transmission-zone" aria-hidden="true">
      <i /> {{ t('missions.signalActive') }} / WEB-LIVE-04
    </div>

    <header class="web-transmission__intro transmission-zone">
      <div>
        <p>{{ t('missions.mission') }} 04</p>
        <span>PROJETS / EN LIGNE</span>
      </div>
      <h3>{{ t('missions.items.web.name') }}</h3>
      <strong>{{ t('missions.items.web.transmission.subtitle') }}</strong>
    </header>

    <div class="web-transmission__narrative transmission-zone">
      <p>{{ t('missions.items.web.transmission.paragraph1') }}</p>
      <p>{{ t('missions.items.web.transmission.paragraph2') }}</p>
      <p>{{ t('missions.items.web.transmission.paragraph3') }}</p>
      <p>{{ t('missions.items.web.transmission.paragraph4') }}</p>
      <p>{{ t('missions.items.web.transmission.paragraph5') }}</p>
    </div>

    <section class="web-transmission__projects transmission-zone" :aria-label="t('missions.items.web.transmission.projectsLabel')">
      <article
        v-for="(project, index) in webExperienceProjects"
        :key="project.id"
        class="web-project"
        :style="{ animationDelay: `${460 + index * 80}ms` }"
      >
        <span class="web-project__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h4>{{ project.name }}</h4>
          <p>{{ t('missions.items.web.transmission.siteType') }} <i /> {{ t('missions.items.web.transmission.online') }}</p>
        </div>
        <a :href="project.url" target="_blank" rel="noreferrer">
          {{ t('missions.items.web.transmission.visit') }} <span aria-hidden="true">↗</span>
        </a>
      </article>
    </section>

    <section class="web-transmission__data transmission-zone">
      <dl class="web-transmission__facts">
        <div>
          <dt>{{ t('missions.axisLabel') }}</dt>
          <dd>{{ t('missions.items.web.transmission.axis') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.statusLabel') }}</dt>
          <dd>{{ t('missions.status.ongoing') }}</dd>
        </div>
        <div>
          <dt>{{ t('missions.items.web.transmission.periodLabel') }}</dt>
          <dd>{{ t('missions.items.web.transmission.period') }}</dd>
        </div>
      </dl>

      <div class="web-transmission__principle">
        <h4>{{ t('missions.items.web.transmission.principleLabel') }}</h4>
        <p>{{ t('missions.items.web.transmission.principle') }}</p>
      </div>
    </section>
  </article>
</template>

<style scoped>
.web-transmission { position: relative; isolation: isolate; }
.web-transmission::before { position: absolute; z-index: -1; inset: -1rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 5%, transparent); background: linear-gradient(135deg, color-mix(in srgb, var(--mission-accent) 3%, transparent), transparent 46%); content: ''; pointer-events: none; }
.web-transmission__scan { position: absolute; z-index: 2; top: -1rem; right: -1rem; left: -1rem; height: 3rem; opacity: 0; background: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--mission-accent) 8%, transparent), transparent); pointer-events: none; animation: web-scan 1.15s ease-out 80ms both; }
.transmission-zone { opacity: 0; transform: translateY(0.45rem); animation: web-zone-in 520ms ease-out both; }
.web-transmission__signal { display: flex; align-items: center; gap: 0.6rem; color: color-mix(in srgb, var(--mission-accent) 68%, transparent); font-size: 0.48rem; letter-spacing: 0.18em; text-transform: uppercase; animation-delay: 100ms; }
.web-transmission__signal i { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.7rem var(--mission-accent); animation: web-signal-pulse 900ms ease-out 180ms both; }
.web-transmission__intro { padding: clamp(1.25rem, 3vw, 1.8rem) 0 1.35rem; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 180ms; }
.web-transmission__intro > div { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
.web-transmission__intro p, .web-transmission__intro span { margin: 0; color: rgb(225 239 244 / 38%); font-size: 0.46rem; letter-spacing: 0.2em; text-transform: uppercase; }
.web-transmission__intro span { color: color-mix(in srgb, var(--mission-accent) 52%, transparent); }
.web-transmission__intro h3 { margin: 0; font-size: clamp(2.1rem, 6vw, 4.2rem); font-weight: 200; line-height: 1; letter-spacing: 0.035em; }
.web-transmission__intro strong { display: block; margin-top: 0.7rem; color: rgb(196 226 237 / 72%); font-size: clamp(0.78rem, 1.5vw, 0.95rem); font-weight: 300; letter-spacing: 0.055em; }
.web-transmission__narrative { display: grid; gap: 0.82rem; max-width: 42rem; padding: 1.4rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 270ms; }
.web-transmission__narrative p { margin: 0; color: rgb(231 240 244 / 70%); font-size: clamp(0.76rem, 1.25vw, 0.9rem); font-weight: 300; line-height: 1.65; }
.web-transmission__projects { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.55rem; padding: 1.2rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); animation-delay: 360ms; }
.web-project { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 0.75rem; min-width: 0; padding: 0.8rem; border: 1px solid color-mix(in srgb, var(--mission-accent) 13%, transparent); opacity: 0; background: linear-gradient(135deg, color-mix(in srgb, var(--mission-accent) 5%, transparent), rgb(255 255 255 / 1.5%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%); transform: translateY(0.4rem); animation: web-project-in 480ms ease-out both; transition: border-color 220ms ease, background 220ms ease, box-shadow 220ms ease, transform 220ms ease; }
.web-project:hover { border-color: color-mix(in srgb, var(--mission-accent) 29%, transparent); background: linear-gradient(135deg, color-mix(in srgb, var(--mission-accent) 8%, transparent), rgb(255 255 255 / 2%)); box-shadow: 0 0 1.2rem color-mix(in srgb, var(--mission-accent) 7%, transparent); transform: translateY(-1px); }
.web-project__number { align-self: start; color: color-mix(in srgb, var(--mission-accent) 50%, transparent); font-family: monospace; font-size: 0.48rem; letter-spacing: 0.1em; }
.web-project h4 { overflow: hidden; margin: 0; color: rgb(239 246 248 / 82%); font-size: 0.65rem; font-weight: 400; letter-spacing: 0.06em; text-overflow: ellipsis; white-space: nowrap; }
.web-project p { display: flex; align-items: center; gap: 0.4rem; margin: 0.38rem 0 0; color: rgb(220 235 241 / 38%); font-size: 0.42rem; letter-spacing: 0.13em; text-transform: uppercase; }
.web-project p i { width: 0.22rem; height: 0.22rem; border-radius: 50%; background: var(--mission-accent); box-shadow: 0 0 0.45rem color-mix(in srgb, var(--mission-accent) 54%, transparent); }
.web-project a { padding: 0.35rem 0; color: var(--mission-accent); font-size: 0.45rem; letter-spacing: 0.12em; text-decoration: none; text-transform: uppercase; transition: color 200ms ease, text-shadow 200ms ease; }
.web-project a:hover, .web-project a:focus-visible { color: rgb(242 247 249); text-shadow: 0 0 0.7rem color-mix(in srgb, var(--mission-accent) 48%, transparent); }
.web-transmission__data { animation-delay: 780ms; }
.web-transmission__facts { display: grid; grid-template-columns: 1.45fr 0.65fr 1fr; margin: 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.web-transmission__facts div { min-width: 0; padding: 0.95rem 0.75rem; border-right: 1px solid rgb(155 222 248 / 9%); }
.web-transmission__facts div:first-child { padding-left: 0; }
.web-transmission__facts div:last-child { padding-right: 0; border-right: 0; }
.web-transmission dt, .web-transmission dd, .web-transmission__principle h4, .web-transmission__principle p { margin: 0; text-transform: uppercase; }
.web-transmission dt, .web-transmission__principle h4 { margin-bottom: 0.38rem; color: color-mix(in srgb, var(--mission-accent) 42%, transparent); font-size: 0.46rem; font-weight: 400; letter-spacing: 0.16em; }
.web-transmission dd { color: rgb(242 247 249 / 76%); font-size: 0.49rem; letter-spacing: 0.11em; line-height: 1.45; }
.web-transmission__principle { padding: 1rem 0; border-bottom: 1px solid rgb(155 222 248 / 13%); }
.web-transmission__principle p { color: color-mix(in srgb, var(--mission-accent) 74%, transparent); font-size: 0.49rem; letter-spacing: 0.12em; line-height: 1.65; }
:global(.modal__panel:has(.web-transmission)) { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, #a4dff5 62%, transparent) rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.web-transmission)::-webkit-scrollbar) { width: 6px; }
:global(.modal__panel:has(.web-transmission)::-webkit-scrollbar-track) { background: rgb(1 5 9 / 28%); }
:global(.modal__panel:has(.web-transmission)::-webkit-scrollbar-thumb) { border: 1px solid rgb(4 12 18 / 58%); border-radius: 999px; background: color-mix(in srgb, #a4dff5 55%, transparent); }
:global(.modal__panel:has(.web-transmission)::-webkit-scrollbar-thumb:hover) { background: color-mix(in srgb, #a4dff5 72%, transparent); box-shadow: 0 0 0.55rem color-mix(in srgb, #a4dff5 34%, transparent); }
@keyframes web-zone-in { to { opacity: 1; transform: none; } }
@keyframes web-scan { 0% { opacity: 0; transform: translateY(0); } 18% { opacity: 1; } 100% { opacity: 0; transform: translateY(32rem); } }
@keyframes web-signal-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0.7rem var(--mission-accent); } 45% { opacity: 0.35; box-shadow: 0 0 0.15rem var(--mission-accent); } 72% { opacity: 1; box-shadow: 0 0 1rem 0.15rem color-mix(in srgb, var(--mission-accent) 30%, transparent); } }
@keyframes web-project-in { to { opacity: 1; transform: none; } }
@media (max-width: 650px) {
  .web-transmission__intro > div { align-items: flex-start; }
  .web-transmission__intro span { max-width: 9rem; text-align: right; }
  .web-transmission__projects, .web-transmission__facts { grid-template-columns: 1fr; }
  .web-transmission__facts div, .web-transmission__facts div:first-child, .web-transmission__facts div:last-child { padding: 0.72rem 0; border-right: 0; border-bottom: 1px solid rgb(155 222 248 / 9%); }
  .web-transmission__facts div:last-child { border-bottom: 0; }
}
@media (max-width: 400px) {
  .web-project { grid-template-columns: auto 1fr; }
  .web-project a { grid-column: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .web-transmission__scan { display: none; }
  .transmission-zone, .web-transmission__signal i, .web-project { opacity: 1; transform: none; animation: none; }
}
</style>
