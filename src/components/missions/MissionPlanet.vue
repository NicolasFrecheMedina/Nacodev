<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import { AdditiveBlending, BackSide, Group, MathUtils, MeshStandardMaterial, Vector3 } from 'three'
import type { Mission } from '@/data/missions'

const props = defineProps<{
  mission: Mission
  selected: boolean
  muted: boolean
  hovered: boolean
  compact: boolean
  reducedMotion: boolean
  emerging: boolean
  departing: boolean
}>()

const group = shallowRef<Group | null>(null)
const surface = shallowRef<MeshStandardMaterial | null>(null)
const basePosition = computed(() => props.compact ? props.mission.mobilePosition : props.mission.position)
const groupPosition = computed(() => new Vector3(basePosition.value[0], basePosition.value[1], basePosition.value[2]))
const uniformScale = (scale: number) => new Vector3(scale, scale, scale)
const targetPosition = new Vector3()
let elapsed = Math.random() * Math.PI * 2

useLoop().onBeforeRender(({ delta }) => {
  if (!group.value) return
  elapsed += delta
  const base = basePosition.value
  const orbitAngle = elapsed * 0.08 + props.mission.screenPosition.x * 0.035
  const orbitX = props.reducedMotion || props.selected ? 0 : Math.cos(orbitAngle) * 0.065
  const orbitY = props.reducedMotion || props.selected ? 0 : Math.sin(orbitAngle) * 0.04

  if (props.departing && props.reducedMotion) targetPosition.set(base[0], base[1], base[2])
  else if (props.departing) targetPosition.set(base[0] * 1.16 + orbitX, base[1] * 1.12 + orbitY, base[2] - 7)
  else if (props.selected) targetPosition.set(0, 0, 2.25)
  else if (props.muted) targetPosition.set(base[0] * 1.12 + orbitX, base[1] + orbitY, base[2] - 1.8)
  else targetPosition.set(base[0] + orbitX, base[1] + orbitY, base[2])

  group.value.position.lerp(targetPosition, props.reducedMotion ? 0.28 : 0.06)
  const targetScale = props.departing ? (props.reducedMotion ? 0.96 : 0.7) : props.selected ? 1.32 : props.muted ? 0.76 : props.hovered ? 1.055 : 1
  const scale = MathUtils.lerp(group.value.scale.x, targetScale, props.reducedMotion ? 0.28 : 0.07)
  group.value.scale.setScalar(scale)
  group.value.rotation.y += props.reducedMotion ? 0 : delta * props.mission.rotationSpeed * (props.hovered ? 1.5 : props.selected ? 0.55 : 1)
  group.value.rotation.z = Math.sin(elapsed * 0.2) * (props.reducedMotion ? 0 : 0.025)

  if (surface.value) {
    surface.value.opacity = MathUtils.lerp(surface.value.opacity, props.departing ? 0.08 : props.muted ? 0.34 : 1, 0.08)
    surface.value.emissiveIntensity = MathUtils.lerp(surface.value.emissiveIntensity, props.hovered || props.selected ? 0.24 : 0.09, 0.08)
  }
})
</script>

<template>
  <TresGroup ref="group" :position="groupPosition">
    <TresMesh :scale="uniformScale(mission.size)">
      <TresSphereGeometry :args="[1, 40, 28]" />
      <TresMeshStandardMaterial
        ref="surface"
        :color="mission.visual.color"
        :emissive="mission.visual.emissive"
        :emissive-intensity="0.09"
        :roughness="mission.visual.roughness"
        :metalness="mission.visual.metalness"
        transparent
      />
    </TresMesh>

    <TresMesh v-if="mission.visual.detail === 'mineral'" :scale="uniformScale(mission.size * 1.006)" :rotation="[0.22, 0.35, 0]">
      <TresIcosahedronGeometry :args="[1, 3]" />
      <TresMeshBasicMaterial :color="mission.visual.atmosphere" wireframe transparent :opacity="0.075" />
    </TresMesh>

    <TresMesh v-if="mission.visual.detail === 'fragmented'" :scale="uniformScale(mission.size * 1.025)" :rotation="[0.5, 0.2, 0.3]">
      <TresIcosahedronGeometry :args="[1, 2]" />
      <TresMeshBasicMaterial :color="mission.visual.atmosphere" wireframe transparent :opacity="0.14" />
    </TresMesh>

    <TresMesh v-if="mission.visual.detail === 'networked'" :scale="uniformScale(mission.size * 1.012)" :rotation="[0.08, 0.22, 0]">
      <TresSphereGeometry :args="[1, 24, 12]" />
      <TresMeshBasicMaterial :color="mission.visual.atmosphere" wireframe transparent :opacity="0.11" />
    </TresMesh>

    <TresMesh v-if="mission.visual.detail === 'networked'" :scale="uniformScale(mission.size * 1.2)" :rotation="[1.18, 0.18, 0.32]">
      <TresTorusGeometry :args="[0.82, 0.008, 6, 72]" />
      <TresMeshBasicMaterial :color="mission.visual.atmosphere" transparent :opacity="0.2" :blending="AdditiveBlending" />
    </TresMesh>

    <TresMesh v-if="mission.visual.detail === 'ethereal'" :rotation="[1.2, 0.25, 0.2]" :scale="uniformScale(mission.size * 1.42)">
      <TresTorusGeometry :args="[0.75, 0.012, 8, 72]" />
      <TresMeshBasicMaterial :color="mission.visual.atmosphere" transparent :opacity="0.22" :blending="AdditiveBlending" />
    </TresMesh>

    <TresMesh :scale="uniformScale(mission.size * (mission.visual.detail === 'atmospheric' ? 1.13 : 1.075))">
      <TresSphereGeometry :args="[1, 28, 20]" />
      <TresMeshBasicMaterial
        :color="mission.visual.atmosphere"
        transparent
        :opacity="mission.visual.detail === 'atmospheric' ? 0.095 : 0.045"
        :side="BackSide"
        :blending="AdditiveBlending"
      />
    </TresMesh>
  </TresGroup>
</template>
