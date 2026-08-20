<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Vector3 } from 'three'
import MissionCamera from '@/components/missions/MissionCamera.vue'
import MissionPlanet from '@/components/missions/MissionPlanet.vue'
import { missions, type MissionId } from '@/data/missions'

defineProps<{
  selectedId: MissionId | null
  hoveredId: MissionId | null
  compact: boolean
  reducedMotion: boolean
  departing: boolean
  pointer: { x: number; y: number }
}>()

const emit = defineEmits<{ error: [] }>()
const keyLightPosition = new Vector3(-4, 5, 7)
const accentLightPosition = new Vector3(4, -2, 3)
</script>

<template>
  <TresCanvas
    class="missions-canvas"
    :alpha="true"
    :clear-alpha="0"
    :antialias="!compact"
    :dpr="[1, 1.6]"
    :shadows="false"
    :fps-limit="reducedMotion ? 24 : 60"
    power-preference="high-performance"
    @error="emit('error')"
  >
    <MissionCamera :pointer="pointer" :selected="Boolean(selectedId)" :reduced-motion="reducedMotion" />
    <TresAmbientLight :intensity="0.42" color="#b9c8cf" />
    <TresDirectionalLight :position="keyLightPosition" :intensity="2.1" color="#edf7fa" />
    <TresPointLight :position="accentLightPosition" :intensity="7" :distance="12" color="#75c8e9" />
    <MissionPlanet
      v-for="mission in missions"
      :key="mission.id"
      :mission="mission"
      :selected="selectedId === mission.id"
      :muted="Boolean(selectedId && selectedId !== mission.id)"
      :hovered="hoveredId === mission.id"
      :compact="compact"
      :reduced-motion="reducedMotion"
      :departing="departing"
    />
  </TresCanvas>
</template>

<style scoped>
.missions-canvas { width: 100%; height: 100%; }
</style>
