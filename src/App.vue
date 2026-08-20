<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, ref } from 'vue'
import GlobalBackground from '@/components/space/GlobalBackground.vue'
import ConnectionScene from '@/scenes/ConnectionScene.vue'
import ExplorationScene from '@/scenes/ExplorationScene.vue'
import IdeaScene from '@/scenes/IdeaScene.vue'

const loadMissionsScene = () => import('@/scenes/MissionsScene.vue')
const MissionsScene = defineAsyncComponent(loadMissionsScene)
const loadAboutScene = () => import('@/scenes/AboutScene.vue')
const AboutScene = defineAsyncComponent(loadAboutScene)

type Scene = 'connection' | 'idea' | 'exploration' | 'missions' | 'about'
type SpaceMotion = 'idle' | 'warp' | 'drift' | 'launch' | 'travel'
type TransitionPhase = 'idle' | 'exploration-exit' | 'missions-gap' | 'missions-enter' | 'missions-ui' | 'missions-exit' | 'about-gap' | 'about-draw' | 'about-reveal'

const scene = ref<Scene>('connection')
const backgroundRevealed = ref(false)
const spaceMotion = ref<SpaceMotion>('idle')
const takeoffComplete = ref(false)
const transitionPhase = ref<TransitionPhase>('idle')
let phaseTimer: number | undefined

function clearPhaseTimer() {
  if (phaseTimer !== undefined) window.clearTimeout(phaseTimer)
  phaseTimer = undefined
}

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

function beginMissionsTransition() {
  if (transitionPhase.value !== 'idle') return
  spaceMotion.value = 'travel'
  transitionPhase.value = 'exploration-exit'
  void loadMissionsScene()
  void loadAboutScene()
}

function completeConstellationExit() {
  if (transitionPhase.value !== 'exploration-exit') return
  scene.value = 'missions'
  transitionPhase.value = 'missions-gap'
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  phaseTimer = window.setTimeout(() => {
    transitionPhase.value = 'missions-enter'
    phaseTimer = window.setTimeout(() => {
      transitionPhase.value = 'missions-ui'
      phaseTimer = window.setTimeout(() => {
        transitionPhase.value = 'idle'
        spaceMotion.value = 'drift'
      }, reducedMotion ? 120 : 200)
    }, reducedMotion ? 260 : 850)
  }, reducedMotion ? 80 : 140)
}

function beginAboutTransition() {
  if (transitionPhase.value !== 'idle') return
  spaceMotion.value = 'travel'
  transitionPhase.value = 'missions-exit'
  void loadAboutScene()
}

function completeMissionsExit() {
  if (transitionPhase.value !== 'missions-exit') return
  scene.value = 'about'
  transitionPhase.value = 'about-gap'
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  phaseTimer = window.setTimeout(() => {
    transitionPhase.value = 'about-draw'
    phaseTimer = window.setTimeout(() => {
      transitionPhase.value = 'about-reveal'
      phaseTimer = window.setTimeout(() => {
        transitionPhase.value = 'idle'
        spaceMotion.value = 'drift'
      }, reducedMotion ? 160 : 420)
    }, reducedMotion ? 320 : 1450)
  }, reducedMotion ? 80 : 140)
}

function restartJourney() {
  clearPhaseTimer()
  spaceMotion.value = 'drift'
  transitionPhase.value = 'idle'
  scene.value = 'idea'
}

onBeforeUnmount(clearPhaseTimer)
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
      <div v-else key="journey-end" class="journey-end" :data-transition-phase="transitionPhase">
        <ExplorationScene
          v-if="scene === 'exploration'"
          :takeoff-complete="takeoffComplete"
          @depart="beginMissionsTransition"
          @exit-complete="completeConstellationExit"
        />
        <MissionsScene
          v-if="scene === 'missions' && transitionPhase !== 'missions-gap'"
          :emerging="transitionPhase === 'missions-enter'"
          :stabilizing="transitionPhase === 'missions-ui'"
          @depart="beginAboutTransition"
          @exit-complete="completeMissionsExit"
        />
        <AboutScene
          v-if="scene === 'about' && transitionPhase !== 'about-gap'"
          :emerging="transitionPhase === 'about-draw'"
          :revealing="transitionPhase === 'about-reveal'"
          @restart="restartJourney"
        />
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
