<script setup lang="ts">
withDefaults(defineProps<{
  backLabel?: string
  nextLabel?: string
  backDisabled?: boolean
  nextDisabled?: boolean
  nextMark?: string
  navigationLabel?: string
}>(), {
  backLabel: '',
  nextLabel: '',
  backDisabled: false,
  nextDisabled: false,
  nextMark: '↗',
  navigationLabel: 'Scene navigation',
})

defineEmits<{ back: []; next: [] }>()
</script>

<template>
  <nav class="scene-navigation" :aria-label="navigationLabel">
    <button
      v-if="backLabel"
      class="hud-control hud-control--secondary"
      type="button"
      :disabled="backDisabled"
      @click="$emit('back')"
    >
      <span class="hud-control__arrow hud-control__arrow--back" aria-hidden="true">←</span>
      <span>{{ backLabel }}</span>
    </button>
    <button
      v-if="nextLabel"
      class="hud-control hud-control--primary"
      type="button"
      :disabled="nextDisabled"
      @click="$emit('next')"
    >
      <span>{{ nextLabel }}</span>
      <span class="hud-control__arrow hud-control__arrow--next" aria-hidden="true">{{ nextMark }}</span>
    </button>
  </nav>
</template>

<style scoped>
.scene-navigation { position: absolute; z-index: 8; bottom: clamp(1.5rem, 4vw, 3rem); left: 50%; display: flex; width: max-content; max-width: calc(100vw - (2 * var(--hud-left))); align-items: center; justify-content: center; gap: clamp(0.45rem, 1.4vw, 0.85rem); transform: translateX(-50%); }

@media (max-width: 700px) {
  .scene-navigation { bottom: 3.65rem; max-width: calc(100vw - 2rem); }
  .scene-navigation :deep(.hud-control) { min-height: 2.75rem; padding-inline: 0.72rem; letter-spacing: 0.12em; }
  .scene-navigation :deep(.hud-control--secondary) { flex: 0 0 auto; }
}
</style>
