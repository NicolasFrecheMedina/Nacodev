<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import { PerspectiveCamera, Vector3 } from 'three'

const props = defineProps<{
  pointer: { x: number; y: number }
  selected: boolean
  reducedMotion: boolean
}>()

const camera = shallowRef<PerspectiveCamera | null>(null)
const target = new Vector3()
const initialPosition = new Vector3(0, 0, 10)
const desired = computed(() => new Vector3(
  props.reducedMotion ? 0 : props.pointer.x * 0.22,
  props.reducedMotion ? 0 : props.pointer.y * 0.16,
  props.selected ? 9.2 : 10,
))

useLoop().onBeforeRender(() => {
  if (!camera.value) return
  camera.value.position.lerp(desired.value, props.reducedMotion ? 0.3 : 0.055)
  camera.value.lookAt(target)
})
</script>

<template>
  <TresPerspectiveCamera ref="camera" :position="initialPosition" :fov="42" :near="0.1" :far="50" />
</template>
