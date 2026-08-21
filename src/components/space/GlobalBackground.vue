<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { parallaxConfig } from '@/data/parallax'
import ParallaxLayer from './ParallaxLayer.vue'
import StarfieldCanvas from './StarfieldCanvas.vue'
import VisualFilters from './VisualFilters.vue'

withDefaults(defineProps<{
  revealed?: boolean
  motion?: 'idle' | 'warp' | 'drift' | 'launch' | 'travel' | 'orbit'
}>(), {
  revealed: false,
  motion: 'idle',
})

const offsetX = ref(0)
const offsetY = ref(0)
let mediaQuery: MediaQueryList | undefined
let pointerQuery: MediaQueryList | undefined
let compactQuery: MediaQueryList | undefined
let frameId: number | undefined

function resetOffset() {
  if (frameId !== undefined) window.cancelAnimationFrame(frameId)
  frameId = undefined
  offsetX.value = 0
  offsetY.value = 0
}

function syncMediaPreferences() {
  if (mediaQuery?.matches || !pointerQuery?.matches) resetOffset()
}

function handlePointerMove(event: PointerEvent) {
  if (mediaQuery?.matches || !pointerQuery?.matches) return
  const amplitude = compactQuery?.matches ? parallaxConfig.amplitude.mobile : parallaxConfig.amplitude.desktop
  const nextX = (event.clientX / window.innerWidth - 0.5) * -amplitude.x
  const nextY = (event.clientY / window.innerHeight - 0.5) * -amplitude.y
  if (frameId !== undefined) window.cancelAnimationFrame(frameId)
  frameId = window.requestAnimationFrame(() => {
    offsetX.value = nextX
    offsetY.value = nextY
    frameId = undefined
  })
}

function handlePointerLeave() {
  resetOffset()
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  compactQuery = window.matchMedia(`(max-width: ${parallaxConfig.breakpoint}px)`)
  syncMediaPreferences()
  mediaQuery.addEventListener('change', syncMediaPreferences)
  pointerQuery.addEventListener('change', syncMediaPreferences)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', handlePointerLeave)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', syncMediaPreferences)
  pointerQuery?.removeEventListener('change', syncMediaPreferences)
  window.removeEventListener('pointermove', handlePointerMove)
  document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
  if (frameId !== undefined) window.cancelAnimationFrame(frameId)
})
</script>

<template>
  <div class="space-background" :class="{ 'space-background--revealed': revealed }" aria-hidden="true">
    <div class="space-background__base" />
    <ParallaxLayer
      class="space-background__image"
      :depth="parallaxConfig.layers.background"
      :offset-x="offsetX"
      :offset-y="offsetY"
    />
    <ParallaxLayer
      class="space-background__glow"
      :depth="parallaxConfig.layers.halo"
      :offset-x="offsetX"
      :offset-y="offsetY"
    />
    <StarfieldCanvas :motion="motion" />
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
  background: #03050a;
}
.space-background__image {
  position: absolute;
  inset: -4%;
  opacity: 0;
  background: url('../../../assets/space2.jpg') center / cover no-repeat;
  filter: grayscale(1) contrast(1.08) brightness(0.58);
  transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.space-background__glow {
  position: absolute;
  inset: -5%;
  opacity: 0;
  background: radial-gradient(circle at 52% 45%, rgb(144 218 255 / 10%), transparent 30%);
  transition: opacity 1.2s ease;
}
.space-background--revealed .space-background__image { opacity: 0.92; }
.space-background--revealed .space-background__glow { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .space-background__image,
  .space-background__glow { transition-duration: 150ms; }
}
</style>
