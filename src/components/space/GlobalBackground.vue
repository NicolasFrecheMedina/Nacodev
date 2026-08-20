<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ParallaxLayer from './ParallaxLayer.vue'
import StarfieldCanvas from './StarfieldCanvas.vue'
import VisualFilters from './VisualFilters.vue'

withDefaults(defineProps<{
  revealed?: boolean
  motion?: 'idle' | 'warp' | 'drift' | 'launch' | 'travel'
}>(), {
  revealed: false,
  motion: 'idle',
})

const offsetX = ref(0)
const offsetY = ref(0)
let mediaQuery: MediaQueryList | undefined

function handlePointerMove(event: PointerEvent) {
  if (mediaQuery?.matches) return
  offsetX.value = (event.clientX / window.innerWidth - 0.5) * -18
  offsetY.value = (event.clientY / window.innerHeight - 0.5) * -18
}

function handlePointerLeave() {
  offsetX.value = 0
  offsetY.value = 0
}

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', handlePointerLeave)
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
})
</script>

<template>
  <div class="space-background" :class="{ 'space-background--revealed': revealed }" aria-hidden="true">
    <div class="space-background__base" />
    <ParallaxLayer
      class="space-background__image"
      :depth="0.32"
      :offset-x="offsetX"
      :offset-y="offsetY"
    />
    <ParallaxLayer
      class="space-background__glow"
      :depth="0.75"
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
