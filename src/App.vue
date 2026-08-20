<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import GlobalBackground from '@/components/space/GlobalBackground.vue'
import ConnectionScene from '@/scenes/ConnectionScene.vue'
import ExplorationScene from '@/scenes/ExplorationScene.vue'
import IdeaScene from '@/scenes/IdeaScene.vue'

const MissionsScene = defineAsyncComponent(() => import('@/scenes/MissionsScene.vue'))

type Scene = 'connection' | 'idea' | 'exploration' | 'missions'
type SpaceMotion = 'idle' | 'warp' | 'drift' | 'launch'

const scene = ref<Scene>('connection')
const backgroundRevealed = ref(false)
const spaceMotion = ref<SpaceMotion>('idle')
const takeoffComplete = ref(false)

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
  scene.value = 'missions'
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
      <MissionsScene v-else key="missions" />
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

@media (prefers-reduced-motion: reduce) {
  .scene-change-enter-active,
  .scene-change-leave-active {
    transition-duration: 120ms;
  }
}
</style>
