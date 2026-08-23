<script setup lang="ts">
import { ref } from 'vue'
import type { Mission } from '@/data/missions'
import { useI18n } from '@/i18n'

defineProps<{ mission: Mission; index: number; closeLabel: string; nextLabel: string }>()
const emit = defineEmits<{ close: []; next: []; explore: [] }>()
const { t } = useI18n()
const panel = ref<HTMLElement | null>(null)

defineExpose({ focus: () => panel.value?.focus() })
</script>

<template>
  <aside ref="panel" class="mission-panel" aria-labelledby="mission-panel-title" tabindex="-1">
    <div class="mission-panel__signal" aria-hidden="true"><i /><span>NCD / SYS-04</span></div>
    <p class="mission-panel__index">{{ t('missions.mission') }} {{ String(index + 1).padStart(2, '0') }}</p>
    <h2 id="mission-panel-title">{{ t(mission.nameKey) }}</h2>
    <p class="mission-panel__description">{{ t(mission.descriptionKey) }}</p>
    <dl>
      <div><dt>{{ t('missions.axisLabel') }}</dt><dd>{{ t(mission.categoryKey) }}</dd></div>
      <div><dt>{{ t('missions.statusLabel') }}</dt><dd>{{ t(mission.statusKey) }}</dd></div>
      <div v-if="mission.year"><dt>{{ t('missions.yearLabel') }}</dt><dd>{{ mission.year }}</dd></div>
    </dl>
    <button class="mission-panel__explore" type="button" @click="emit('explore')">
      <span>{{ t('missions.explore') }}</span>
      <i aria-hidden="true">↗</i>
    </button>
    <div class="mission-panel__controls">
      <button class="hud-control hud-control--secondary" type="button" @click="emit('close')">
        <span class="hud-control__arrow hud-control__arrow--back" aria-hidden="true">←</span>
        <span>{{ closeLabel }}</span>
      </button>
      <button class="hud-control" type="button" @click="emit('next')">
        <span>{{ nextLabel }}</span>
        <span class="hud-control__arrow hud-control__arrow--next" aria-hidden="true">→</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.mission-panel { position: absolute; z-index: 5; top: 50%; right: clamp(1.5rem, 5vw, 5rem); width: min(28rem, 38vw); padding: clamp(1.5rem, 3vw, 2.4rem); border: 1px solid rgb(220 240 247 / 15%); color: var(--color-ink); background: linear-gradient(145deg, rgb(16 23 31 / 74%), rgb(7 11 17 / 62%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%), 0 2rem 5rem rgb(0 0 0 / 32%); backdrop-filter: blur(18px); transform: translateY(-50%); }
.mission-panel::before { position: absolute; top: -1px; left: 12%; width: 26%; height: 1px; background: var(--color-accent); box-shadow: 0 0 0.7rem rgb(155 222 248 / 45%); content: ''; }
.mission-panel:focus { outline: 1px solid rgb(155 222 248 / 28%); outline-offset: -1px; }
.mission-panel__signal { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; color: rgb(224 238 244 / 35%); font-size: 0.44rem; letter-spacing: 0.16em; }
.mission-panel__signal i { width: 0.28rem; height: 0.28rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.55rem var(--color-accent); }
.mission-panel__index { margin: 0 0 0.65rem; color: rgb(210 229 237 / 48%); font-size: 0.5rem; letter-spacing: 0.22em; text-transform: uppercase; }
.mission-panel h2 { margin: 0; font-family: var(--font-body); font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 300; letter-spacing: 0.04em; }
.mission-panel__description { margin: 1.5rem 0 1.8rem; color: rgb(231 240 244 / 62%); font-size: clamp(0.78rem, 1.15vw, 0.9rem); font-weight: 300; line-height: 1.75; }
.mission-panel dl { display: grid; gap: 0; margin: 0 0 1.7rem; }
.mission-panel dl div { display: grid; grid-template-columns: 1fr 1.4fr; gap: 1rem; padding: 0.65rem 0; border-top: 1px solid rgb(219 238 245 / 9%); }
.mission-panel dt, .mission-panel dd { margin: 0; font-size: 0.5rem; letter-spacing: 0.14em; text-transform: uppercase; }
.mission-panel dt { color: rgb(220 235 241 / 36%); }
.mission-panel dd { color: rgb(242 247 249 / 72%); text-align: right; }
.mission-panel__explore { display: flex; width: 100%; align-items: center; justify-content: space-between; padding: 0.85rem 0; border: 0; border-top: 1px solid rgb(155 222 248 / 16%); border-bottom: 1px solid rgb(155 222 248 / 16%); color: rgb(225 241 247 / 68%); font: inherit; font-size: 0.52rem; letter-spacing: 0.16em; text-transform: uppercase; background: transparent; cursor: pointer; transition: color 240ms ease, border-color 240ms ease; }
.mission-panel__explore i { font-style: normal; }
.mission-panel__explore:is(:hover, :focus-visible) { border-color: rgb(155 222 248 / 38%); color: var(--color-accent); }
.mission-panel__explore:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
.mission-panel__controls { display: flex; justify-content: flex-end; gap: 0.55rem; margin-top: 0.95rem; }
.mission-panel__controls .hud-control { min-height: 2.2rem; padding: 0.52rem 0.68rem; font-size: 0.46rem; }
@media (max-width: 700px) { .mission-panel { top: auto; right: 1rem; bottom: 1rem; left: 1rem; width: auto; max-height: calc(100svh - 8rem); overflow: auto; padding: 1.2rem; transform: none; } .mission-panel__signal { margin-bottom: 1rem; } .mission-panel__description { margin: 0.8rem 0 1rem; line-height: 1.55; } .mission-panel dl { margin-bottom: 0.7rem; } .mission-panel__controls { display: grid; grid-template-columns: 1fr 1fr; } .mission-panel__controls .hud-control { min-height: 2.75rem; padding-inline: 0.5rem; letter-spacing: 0.1em; } }
</style>
