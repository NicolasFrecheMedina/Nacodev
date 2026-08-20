<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

type Motion = 'idle' | 'warp' | 'drift' | 'launch'
interface Star { x: number; y: number; z: number; previousZ: number; size: number }

const props = withDefaults(defineProps<{ motion?: Motion }>(), { motion: 'idle' })
const canvas = ref<HTMLCanvasElement | null>(null)
const stars: Star[] = []
const starCount = 170
const depth = 900
let context: CanvasRenderingContext2D | null = null
let frame = 0
let width = 0
let height = 0
let pixelRatio = 1
let currentSpeed = 0
let reducedMotion = false
let mediaQuery: MediaQueryList | undefined

const speedByMotion: Record<Motion, number> = {
  idle: 0,
  warp: 24,
  drift: 0.45,
  launch: 34,
}

function resetStar(star: Star, randomDepth = false) {
  star.x = (Math.random() - 0.5) * width
  star.y = (Math.random() - 0.5) * height
  star.z = randomDepth ? Math.random() * depth + 1 : depth
  star.previousZ = star.z
  star.size = Math.random() * 1.15 + 0.35
}

function resize() {
  if (!canvas.value) return
  const bounds = canvas.value.getBoundingClientRect()
  width = bounds.width
  height = bounds.height
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * pixelRatio)
  canvas.value.height = Math.round(height * pixelRatio)
  context = canvas.value.getContext('2d')
  context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

function draw() {
  if (!context) return
  context.clearRect(0, 0, width, height)
  const targetSpeed = reducedMotion ? 0 : speedByMotion[props.motion]
  currentSpeed += (targetSpeed - currentSpeed) * 0.045
  const focalLength = Math.min(width, height) * 0.9

  for (const star of stars) {
    star.previousZ = star.z
    star.z -= currentSpeed
    if (star.z < 1) resetStar(star)

    const x = width / 2 + (star.x / star.z) * focalLength
    const y = height / 2 + (star.y / star.z) * focalLength
    const previousX = width / 2 + (star.x / star.previousZ) * focalLength
    const previousY = height / 2 + (star.y / star.previousZ) * focalLength
    if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
      resetStar(star)
      continue
    }

    const proximity = 1 - star.z / depth
    context.beginPath()
    context.moveTo(previousX, previousY)
    context.lineTo(x, y)
    context.lineWidth = star.size + proximity * (currentSpeed > 4 ? 1.7 : 0.45)
    context.strokeStyle = `rgba(226, 243, 250, ${0.18 + proximity * 0.7})`
    context.stroke()
  }
  frame = window.requestAnimationFrame(draw)
}

function handleMotionPreference(event: MediaQueryListEvent) {
  reducedMotion = event.matches
}

watch(() => props.motion, (motion) => {
  if (motion === 'warp' || motion === 'launch') {
    stars.forEach((star) => resetStar(star, true))
  }
})

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = mediaQuery.matches
  mediaQuery.addEventListener('change', handleMotionPreference)
  resize()
  for (let index = 0; index < starCount; index += 1) {
    const star: Star = { x: 0, y: 0, z: 0, previousZ: 0, size: 1 }
    resetStar(star, true)
    stars.push(star)
  }
  window.addEventListener('resize', resize, { passive: true })
  draw()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame)
  window.removeEventListener('resize', resize)
  mediaQuery?.removeEventListener('change', handleMotionPreference)
})
</script>

<template><canvas ref="canvas" class="starfield" /></template>

<style scoped>
.starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.82;
}
</style>
