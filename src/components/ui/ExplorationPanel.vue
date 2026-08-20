<script setup lang="ts">
defineProps<{ label: string; description: string; selected: boolean; closeLabel: string }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <aside class="exploration-panel" :class="{ 'exploration-panel--selected': selected }" aria-live="polite">
    <span class="exploration-panel__eyebrow">{{ label }}</span>
    <p>{{ description }}</p>
    <button v-if="selected" type="button" @click="$emit('close')"><span aria-hidden="true">←</span> {{ closeLabel }}</button>
  </aside>
</template>

<style scoped>
.exploration-panel { position: absolute; z-index: 4; bottom: clamp(5.5rem, 8vh, 7rem); left: clamp(1.25rem, 4vw, 3rem); width: min(24rem, calc(100vw - 2.5rem)); min-height: 5.8rem; padding: 1rem 1.15rem; border: 1px solid rgb(220 239 246 / 11%); background: linear-gradient(125deg, rgb(15 22 31 / 48%), rgb(8 12 18 / 20%)); box-shadow: 0 1.2rem 4rem rgb(0 0 0 / 18%); backdrop-filter: blur(12px); pointer-events: none; }
.exploration-panel--selected { pointer-events: auto; }
.exploration-panel__eyebrow { color: var(--color-accent); font-size: 0.56rem; letter-spacing: 0.2em; text-transform: uppercase; }
.exploration-panel p { margin: 0.65rem 0 0; color: rgb(239 245 248 / 72%); font-size: clamp(0.72rem, 1.2vw, 0.82rem); font-weight: 300; line-height: 1.65; }
.exploration-panel button { margin-top: 0.85rem; padding: 0; border: 0; color: rgb(226 241 247 / 62%); font: inherit; font-size: 0.55rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; cursor: pointer; }
.exploration-panel button:hover { color: var(--color-ink); }
.exploration-panel button:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.3rem; }
@media (max-width: 700px) { .exploration-panel { bottom: 6rem; min-height: 5rem; } }
</style>
