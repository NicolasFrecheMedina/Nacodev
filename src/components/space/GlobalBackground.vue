<script setup lang="ts">
import ParallaxLayer from './ParallaxLayer.vue'
import VisualFilters from './VisualFilters.vue'
</script>

<template>
  <div class="space-background" aria-hidden="true">
    <div class="space-background__base" />
    <ParallaxLayer class="space-background__layer space-background__layer--far" :depth="0.15" />
    <ParallaxLayer class="space-background__layer space-background__layer--near" :depth="0.4" />
    <VisualFilters />
  </div>
</template>

<style scoped>
.space-background {
  position: fixed;
  inset: 0;
  z-index: var(--z-background);
  overflow: hidden;
  pointer-events: none;
  background: var(--color-space);
}
.space-background__base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 25% 20%, rgb(22 64 84 / 30%), transparent 35%),
    radial-gradient(circle at 80% 70%, rgb(53 31 83 / 24%), transparent 40%);
}
.space-background__layer {
  position: absolute;
  inset: -5%;
  opacity: 0.4;
  background-image: radial-gradient(circle, rgb(255 255 255 / 70%) 1px, transparent 1px);
  background-size: 5rem 5rem;
}
.space-background__layer--near { opacity: 0.18; background-position: 2rem 1rem; background-size: 9rem 9rem; }
</style>
