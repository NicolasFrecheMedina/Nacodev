<script setup lang="ts">
import type { ExplorationAxis } from '@/data/exploration'

defineProps<{ axis: ExplorationAxis; label: string; active: boolean; muted: boolean }>()
const emit = defineEmits<{ activate: [axis: ExplorationAxis]; preview: [axis: ExplorationAxis | null] }>()
</script>

<template>
  <button
    class="exploration-node"
    :class="{ 'exploration-node--active': active, 'exploration-node--muted': muted }"
    :style="{ '--node-left': `${50 + axis.position.x}%`, '--node-top': `${50 + axis.position.y}%`, '--node-z': `${axis.position.z}px` }"
    type="button"
    :aria-pressed="active"
    :aria-label="label"
    @click="emit('activate', axis)"
    @pointerenter="emit('preview', axis)"
    @pointerleave="emit('preview', null)"
    @focus="emit('preview', axis)"
    @blur="emit('preview', null)"
  >
    <span class="exploration-node__orbit" aria-hidden="true" />
    <span class="exploration-node__core" aria-hidden="true" />
    <span class="exploration-node__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.exploration-node { --node-scale: 1; position: absolute; top: var(--node-top); left: var(--node-left); width: 4.5rem; height: 4.5rem; padding: 0; border: 0; color: rgb(239 247 250 / 78%); background: transparent; cursor: pointer; transform: translate3d(-50%, -50%, var(--node-z)) scale(var(--node-scale)); transform-style: preserve-3d; animation: node-float 7s ease-in-out infinite; transition: color 400ms ease, filter 500ms ease, opacity 500ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-node:nth-of-type(2) { animation-delay: -1.8s; }
.exploration-node:nth-of-type(3) { animation-delay: -3.6s; }
.exploration-node:nth-of-type(4) { animation-delay: -5.2s; }
.exploration-node::before { position: absolute; inset: 50% auto auto 50%; width: 2px; height: 2px; border-radius: 50%; background: #f7fcff; box-shadow: 0 0 0.55rem 0.16rem rgb(155 222 248 / 75%), 0 0 2.2rem 0.75rem rgb(155 222 248 / 16%); content: ''; transform: translate(-50%, -50%); }
.exploration-node__core { position: absolute; inset: 50% auto auto 50%; width: 0.72rem; height: 0.72rem; border: 1px solid rgb(219 243 252 / 72%); border-radius: 50%; background: rgb(155 222 248 / 12%); box-shadow: inset 0 0 0.6rem rgb(218 244 255 / 16%); transform: translate(-50%, -50%); transition: background 400ms ease, box-shadow 400ms ease, transform 400ms ease; }
.exploration-node__orbit { position: absolute; inset: 0; border: 1px solid rgb(188 224 238 / 18%); border-radius: 50%; animation: node-breathe 5.5s ease-in-out infinite; }
.exploration-node__label { position: absolute; top: calc(50% + 2rem); left: 50%; white-space: nowrap; font-size: 0.64rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; text-shadow: 0 1px 0.8rem #020407; transform: translateX(-50%); }
.exploration-node:is(:hover, :focus-visible), .exploration-node--active { --node-scale: 1.1; z-index: 2; color: #fff; filter: brightness(1.35); }
.exploration-node:is(:hover, :focus-visible) .exploration-node__core, .exploration-node--active .exploration-node__core { background: rgb(155 222 248 / 32%); box-shadow: 0 0 1.2rem rgb(155 222 248 / 35%), inset 0 0 0.6rem rgb(238 250 255 / 42%); transform: translate(-50%, -50%) scale(1.16); }
.exploration-node--muted { opacity: 0.34; }
.exploration-node:focus-visible { outline: 1px solid rgb(155 222 248 / 72%); outline-offset: 0.35rem; border-radius: 50%; }
@keyframes node-breathe { 0%, 100% { opacity: 0.38; transform: scale(0.92); } 50% { opacity: 0.78; transform: scale(1.08); } }
@keyframes node-float { 0%, 100% { margin-top: -0.18rem; } 50% { margin-top: 0.24rem; } }
@media (max-width: 700px) { .exploration-node { width: 4rem; height: 4rem; } .exploration-node__label { top: calc(50% + 1.75rem); font-size: 0.58rem; letter-spacing: 0.16em; } }
@media (prefers-reduced-motion: reduce) { .exploration-node { animation: none; transition-duration: 120ms; } .exploration-node__orbit { animation: none; } }
</style>
