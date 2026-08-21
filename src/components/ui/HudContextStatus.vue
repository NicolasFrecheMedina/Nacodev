<script setup lang="ts">
defineProps<{
  primary: string
  secondary?: string
}>()
</script>

<template>
  <span class="global-hud__status" role="status" aria-live="polite">
    <i class="global-hud__status-dot" aria-hidden="true" />
    <span class="global-hud__status-frame">
      <Transition name="hud-status" mode="out-in">
        <span :key="`${primary}\u0000${secondary ?? ''}`" class="global-hud__status-copy">
          <strong v-if="secondary">{{ primary }}</strong>
          <span v-else>{{ primary }}</span>
          <span v-if="secondary">{{ secondary }}</span>
        </span>
      </Transition>
    </span>
  </span>
</template>

<style scoped>
.hud-status-enter-active { position: relative; overflow: hidden; transition: opacity 160ms ease-out, filter 160ms ease-out, transform 160ms cubic-bezier(0.22, 1, 0.36, 1); }
.hud-status-leave-active { transition: opacity 60ms ease-in, filter 60ms ease-in, transform 60ms ease-in; }
.hud-status-enter-active::after { position: absolute; inset: -0.1rem auto -0.1rem 0; width: 28%; background: linear-gradient(90deg, transparent, rgb(185 232 250 / 24%), transparent); content: ''; pointer-events: none; transform: translateX(-120%); animation: hud-status-scan 160ms ease-out both; }
.hud-status-enter-from { opacity: 0; filter: blur(1.5px); transform: translateY(0.12rem); }
.hud-status-leave-to { opacity: 0.3; filter: blur(1px); transform: translateY(-0.08rem); }
@keyframes hud-status-scan { to { transform: translateX(460%); } }
@media (prefers-reduced-motion: reduce) {
  .hud-status-enter-active, .hud-status-leave-active { transition: opacity 40ms linear; }
  .hud-status-enter-active::after { display: none; animation: none; }
  .hud-status-enter-from, .hud-status-leave-to { filter: none; transform: none; }
}
</style>
