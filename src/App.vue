<script setup lang="ts">
import GlobalBackground from '@/components/space/GlobalBackground.vue'
import AboutScene from '@/scenes/AboutScene.vue'
import ConnectionScene from '@/scenes/ConnectionScene.vue'
import ExplorationScene from '@/scenes/ExplorationScene.vue'
import IdeaScene from '@/scenes/IdeaScene.vue'
import MissionsScene from '@/scenes/MissionsScene.vue'
</script>

<template>
  <GlobalBackground />
  <main class="scene-stack">
    <ConnectionScene />
    <IdeaScene />
    <ExplorationScene />
    <MissionsScene />
    <AboutScene />
  </main>
</template>
