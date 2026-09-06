<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ label: string; description: string; selected: boolean; closeLabel: string; nextLabel: string }>()
defineEmits<{ close: []; next: [] }>()
const nextControl = ref<HTMLButtonElement | null>(null)
defineExpose({ focusNext: () => nextControl.value?.focus() })
</script>

<template>
  <aside class="exploration-panel" :class="{ 'exploration-panel--selected': selected }" aria-live="polite">
    <span class="exploration-panel__eyebrow">{{ label }}</span>
    <p>{{ description }}</p>
    <div v-if="selected" class="exploration-panel__controls">
      <button class="hud-control hud-control--secondary" type="button" @click="$emit('close')">
        <span class="hud-control__arrow hud-control__arrow--back" aria-hidden="true">←</span>
        <span>{{ closeLabel }}</span>
      </button>
      <button ref="nextControl" class="hud-control" type="button" @click="$emit('next')">
        <span>{{ nextLabel }}</span>
        <span class="hud-control__arrow hud-control__arrow--next" aria-hidden="true">→</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.exploration-panel { position: absolute; z-index: 4; bottom: clamp(5.5rem, 8vh, 7rem); left: clamp(1.25rem, 4vw, 3rem); width: min(30rem, calc(100vw - 2.5rem)); min-height: 5.8rem; padding: 1rem 1.15rem; border: 1px solid rgb(220 239 246 / 11%); background: linear-gradient(125deg, rgb(15 22 31 / 52%), rgb(8 12 18 / 24%)); box-shadow: 0 1.2rem 4rem rgb(0 0 0 / 18%); backdrop-filter: blur(12px); pointer-events: none; }
.exploration-panel--selected { pointer-events: auto; }
.exploration-panel__eyebrow { color: var(--color-accent); font-size: 0.56rem; letter-spacing: 0.2em; text-transform: uppercase; }
.exploration-panel p { margin: 0.65rem 0 0; color: rgb(239 245 248 / 72%); font-size: clamp(0.72rem, 1.2vw, 0.82rem); font-weight: 300; line-height: 1.65; white-space: pre-line; }
.exploration-panel__controls { display: flex; justify-content: flex-end; gap: 0.55rem; margin-top: 0.95rem; }
.exploration-panel__controls .hud-control { min-height: 2.2rem; padding: 0.52rem 0.68rem; font-size: 0.46rem; }
@media (max-width: 700px) {
  .exploration-panel { bottom: 7rem; min-height: 5rem; padding: 0.9rem 0.95rem; }
  .exploration-panel__controls { display: grid; grid-template-columns: 1fr 1fr; }
  .exploration-panel__controls .hud-control { min-height: 2.75rem; padding-inline: 0.5rem; letter-spacing: 0.1em; }
}
</style>
