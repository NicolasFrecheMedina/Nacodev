<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import GlobalBackground from '@/components/space/GlobalBackground.vue'
import ConnectionScene from '@/scenes/ConnectionScene.vue'
import ExplorationScene from '@/scenes/ExplorationScene.vue'
import IdeaScene from '@/scenes/IdeaScene.vue'

const MissionsScene = defineAsyncComponent(() => import('@/scenes/MissionsScene.vue'))
const loadAboutScene = () => import('@/scenes/AboutScene.vue')
const AboutScene = defineAsyncComponent(loadAboutScene)

type Scene = 'connection' | 'idea' | 'exploration' | 'missions' | 'about'
type SpaceMotion = 'idle' | 'warp' | 'drift' | 'launch'

const scene = ref<Scene>('connection')
const backgroundRevealed = ref(false)
const spaceMotion = ref<SpaceMotion>('idle')
const takeoffComplete = ref(false)
const aboutEmerging = ref(false)

function updateConnectionBackground(payload: { revealed: boolean; motion: SpaceMotion }) {
  backgroundRevealed.value = payload.revealed
  spaceMotion.value = payload.motion
}

function showIdea() {
  backgroundRevealed.value = true
  spaceMotion.value = 'drift'
  scene.value = 'idea'
}

function updateIdeaMotion(motion: 'drift' | 'launch') {
  spaceMotion.value = motion
}

function showExploration() {
  takeoffComplete.value = true
  spaceMotion.value = 'drift'
  scene.value = 'exploration'
}

function showMissions() {
  spaceMotion.value = 'drift'
  aboutEmerging.value = false
  void loadAboutScene()
  scene.value = 'missions'
}

function revealAbout() {
  aboutEmerging.value = true
}

function showAbout() {
  spaceMotion.value = 'drift'
  scene.value = 'about'
}

function restartJourney() {
  spaceMotion.value = 'drift'
  aboutEmerging.value = false
  scene.value = 'idea'
}
</script>

<template>
  <GlobalBackground :revealed="backgroundRevealed" :motion="spaceMotion" />
  <main class="scene-stack" aria-live="polite">
    <Transition name="scene-change" mode="out-in">
      <ConnectionScene
        v-if="scene === 'connection'"
        key="connection"
        @background-change="updateConnectionBackground"
        @complete="showIdea"
      />
      <IdeaScene
        v-else-if="scene === 'idea'"
        key="idea"
        @motion-change="updateIdeaMotion"
        @takeoff-complete="showExploration"
      />
      <ExplorationScene
        v-else-if="scene === 'exploration'"
        key="exploration"
        :takeoff-complete="takeoffComplete"
        @continue="showMissions"
      />
      <div v-else key="journey-end" class="journey-end">
        <MissionsScene v-if="scene === 'missions'" @depart="revealAbout" @continue="showAbout" />
        <AboutScene v-if="scene === 'about' || aboutEmerging" :emerging="scene === 'missions'" @restart="restartJourney" />
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.scene-change-enter-active,
.scene-change-leave-active {
  transition: opacity 420ms ease;
}

.scene-change-enter-from,
.scene-change-leave-to {
  opacity: 0;
}

.journey-end { position: relative; width: 100%; height: 100svh; overflow: hidden; }
.journey-end > * { position: absolute; inset: 0; }

@media (prefers-reduced-motion: reduce) {
  .scene-change-enter-active,
  .scene-change-leave-active {
    transition-duration: 120ms;
  }
}
</style>
