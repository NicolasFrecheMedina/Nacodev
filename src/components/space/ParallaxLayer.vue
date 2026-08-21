<script setup lang="ts">
import { computed, type StyleValue } from 'vue'
import { parallaxConfig } from '@/data/parallax'

const props = withDefaults(defineProps<{ depth?: number; offsetX?: number; offsetY?: number }>(), {
  depth: parallaxConfig.layers.depthElements,
  offsetX: 0,
  offsetY: 0,
})

const layerStyle = computed(() => ({
  '--parallax-depth': props.depth,
  '--parallax-x': `${props.offsetX}px`,
  '--parallax-y': `${props.offsetY}px`,
}) as StyleValue)
</script>

<template>
  <div class="parallax-layer" :style="layerStyle" :data-depth="depth"><slot /></div>
</template>

<style scoped>
.parallax-layer {
  transform: translate3d(calc(var(--parallax-x) * var(--parallax-depth)), calc(var(--parallax-y) * var(--parallax-depth)), 0);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .parallax-layer { transform: none; will-change: auto; }
}
</style>
