<script setup lang="ts">
import type { TimelineStep } from '@/data/timeline'
import { useI18n } from '@/i18n'

defineProps<{ step: TimelineStep; index: number; selected: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
</script>

<template>
  <article class="trajectory-panel" aria-live="polite">
    <div class="trajectory-panel__index">POINT / {{ String(index + 1).padStart(2, '0') }}</div>
    <h2>{{ t(step.titleKey) }}</h2>
    <p class="trajectory-panel__meta">{{ t(step.metaKey) }}</p>
    <p class="trajectory-panel__description">{{ t(step.descriptionKey) }}</p>
    <button v-if="selected" type="button" @click="emit('close')">{{ t('about.overview') }}</button>
  </article>
</template>

<style scoped>
.trajectory-panel { position: absolute; z-index: 4; right: clamp(1.5rem, 6vw, 6rem); bottom: clamp(5.6rem, 10vh, 7.5rem); width: min(22rem, 28vw); min-width: 0; padding: 1.15rem 1.3rem; border: 1px solid rgb(224 242 248 / 13%); background: linear-gradient(135deg, rgb(13 21 29 / 76%), rgb(5 8 13 / 50%)); box-shadow: 0 1.3rem 4rem rgb(0 0 0 / 18%); backdrop-filter: blur(14px); }
.trajectory-panel__index { margin-bottom: 0.7rem; color: rgb(155 222 248 / 46%); font-size: 0.43rem; letter-spacing: 0.2em; }
.trajectory-panel h2 { margin: 0; font-size: clamp(0.85rem, 1.3vw, 1.05rem); font-weight: 400; letter-spacing: 0.08em; }
.trajectory-panel__meta { margin: 0.45rem 0 0.8rem; color: rgb(179 222 237 / 62%); font-size: 0.53rem; letter-spacing: 0.13em; overflow-wrap: anywhere; text-transform: uppercase; }
.trajectory-panel__description { margin: 0; color: rgb(235 242 245 / 68%); font-size: 0.72rem; line-height: 1.65; overflow-wrap: anywhere; }
.trajectory-panel button { margin-top: 0.9rem; padding: 0; border: 0; border-bottom: 1px solid rgb(155 222 248 / 28%); color: rgb(210 237 247 / 65%); background: none; font: inherit; font-size: 0.48rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; }
.trajectory-panel button:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
@media (max-width: 700px) { .trajectory-panel { position: relative; right: auto; bottom: auto; width: 100%; min-height: 8.5rem; padding: 0.9rem 1rem; } }
</style>
