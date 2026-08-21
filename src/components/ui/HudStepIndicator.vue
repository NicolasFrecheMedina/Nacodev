<script setup lang="ts">
defineProps<{ step: number; total: number; code?: string }>()
</script>

<template>
  <span class="hud-marker" aria-hidden="true">
    <span v-if="code" class="hud-marker__code">{{ code }}</span>
    <span class="hud-step">
      <strong>{{ String(step).padStart(2, '0') }}</strong>
      <span class="hud-step__separator">/</span>
      <span>{{ String(total).padStart(2, '0') }}</span>
    </span>
  </span>
</template>

<style scoped>
.hud-marker { display: inline-grid; justify-items: center; gap: 0.15rem; text-align: center; }
.hud-step { display: inline-flex; align-items: baseline; gap: 0.42em; }
.hud-step strong { color: var(--color-accent); font-weight: 500; text-shadow: 0 0 0.8rem rgb(155 222 248 / 35%); }
.hud-step__separator { opacity: 0.72; }
</style>
