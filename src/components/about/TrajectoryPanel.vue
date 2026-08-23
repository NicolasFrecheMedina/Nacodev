<script setup lang="ts">
import type { TimelineStep } from '@/data/timeline'
import { useI18n } from '@/i18n'

defineProps<{
  step: TimelineStep
  index: number
  selected: boolean
  previousLabel: string
  nextLabel: string
  contactLabel: string
  hasPrevious: boolean
  hasNext: boolean
}>()
const emit = defineEmits<{ previous: []; next: []; contact: [] }>()
const { t } = useI18n()
</script>

<template>
  <article class="trajectory-panel" aria-live="polite">
    <div class="trajectory-panel__index">POINT / {{ String(index + 1).padStart(2, '0') }}</div>
    <h2>{{ t(step.titleKey) }}</h2>
    <p class="trajectory-panel__meta">{{ t(step.metaKey) }}</p>
    <p class="trajectory-panel__description">{{ t(step.descriptionKey) }}</p>
    <div v-if="selected" class="trajectory-panel__controls">
      <button v-if="hasPrevious" class="hud-control hud-control--secondary" type="button" @click="emit('previous')">
        <span class="hud-control__arrow hud-control__arrow--back" aria-hidden="true">←</span>
        <span>{{ previousLabel }}</span>
      </button>
      <button v-if="hasNext" class="hud-control" type="button" @click="emit('next')">
        <span>{{ nextLabel }}</span>
        <span class="hud-control__arrow hud-control__arrow--next" aria-hidden="true">→</span>
      </button>
      <button v-else class="hud-control" type="button" @click="emit('contact')">
        <span>{{ contactLabel }}</span>
        <span class="hud-control__arrow hud-control__arrow--next" aria-hidden="true">↗</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.trajectory-panel { position: absolute; z-index: 4; right: clamp(1.5rem, 6vw, 6rem); bottom: clamp(5.6rem, 10vh, 7.5rem); width: min(22rem, 28vw); min-width: 0; padding: 1.15rem 1.3rem; border: 1px solid rgb(224 242 248 / 13%); background: linear-gradient(135deg, rgb(13 21 29 / 76%), rgb(5 8 13 / 50%)); box-shadow: 0 1.3rem 4rem rgb(0 0 0 / 18%); backdrop-filter: blur(14px); }
.trajectory-panel__index { margin-bottom: 0.7rem; color: rgb(155 222 248 / 46%); font-size: 0.43rem; letter-spacing: 0.2em; }
.trajectory-panel h2 { margin: 0; font-size: clamp(0.85rem, 1.3vw, 1.05rem); font-weight: 400; letter-spacing: 0.08em; }
.trajectory-panel__meta { margin: 0.45rem 0 0.8rem; color: rgb(179 222 237 / 62%); font-size: 0.53rem; letter-spacing: 0.13em; overflow-wrap: anywhere; text-transform: uppercase; }
.trajectory-panel__description { margin: 0; color: rgb(235 242 245 / 68%); font-size: 0.72rem; line-height: 1.65; overflow-wrap: anywhere; }
.trajectory-panel__controls { display: flex; justify-content: flex-end; gap: 0.55rem; margin-top: 0.95rem; }
.trajectory-panel__controls .hud-control { min-height: 2.2rem; padding: 0.52rem 0.68rem; font-size: 0.46rem; }
@media (max-width: 700px) { .trajectory-panel { position: relative; right: auto; bottom: auto; width: 100%; min-height: 8.5rem; padding: 0.9rem 1rem; } .trajectory-panel__controls { display: grid; grid-template-columns: 1fr 1fr; } .trajectory-panel__controls .hud-control { min-height: 2.75rem; padding-inline: 0.5rem; letter-spacing: 0.1em; } .trajectory-panel__controls .hud-control:only-child { grid-column: 1 / -1; justify-self: end; } }
</style>
