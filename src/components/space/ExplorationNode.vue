<script setup lang="ts">
import type { ExplorationAxis } from '@/data/exploration'

const props = defineProps<{ axis: ExplorationAxis; label: string; active: boolean; muted: boolean; motionPaused?: boolean }>()
const emit = defineEmits<{ activate: [axis: ExplorationAxis]; preview: [axis: ExplorationAxis | null]; 'hover-change': [hovered: boolean] }>()

function handlePointerEnter() {
  emit('hover-change', true)
  emit('preview', props.axis)
}

function handlePointerLeave() {
  emit('hover-change', false)
  emit('preview', null)
}

function nodeStyle(axis: ExplorationAxis) {
  return {
    '--node-left': `${50 + axis.position.x}%`,
    '--node-top': `${50 + axis.position.y}%`,
    '--node-z': `${axis.position.z}px`,
    '--node-hover-x': `${axis.hoverOffset.x}px`,
    '--node-hover-y': `${axis.hoverOffset.y}px`,
  }
}
</script>

<template>
  <button
    class="exploration-node"
    :class="{ 'exploration-node--active': active, 'exploration-node--muted': muted, 'exploration-node--motion-paused': motionPaused }"
    :style="nodeStyle(axis)"
    type="button"
    :data-axis-id="axis.id"
    :aria-pressed="active"
    :aria-label="label"
    @click="emit('activate', axis)"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    @focus="emit('preview', axis)"
    @blur="emit('preview', null)"
  >
    <span class="exploration-node__depth" aria-hidden="true">
      <span class="exploration-node__visual">
        <span class="exploration-node__orbit" />
        <span class="exploration-node__core" />
        <span class="exploration-node__label">{{ label }}</span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.exploration-node { --node-active-scale: 1; --node-hover-scale: 1; --node-shift-x: 0px; --node-shift-y: 0px; position: absolute; z-index: 1; top: var(--node-top); left: var(--node-left); width: 4.5rem; height: 4.5rem; padding: 0; border: 0; color: rgb(239 247 250 / 78%); background: transparent; cursor: pointer; transform: translate3d(-50%, -50%, 0) scale(var(--node-active-scale)); transform-style: preserve-3d; animation: node-float 7s ease-in-out infinite; transition: color 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease, transform 300ms cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-node:nth-of-type(2) { animation-delay: -1.8s; }
.exploration-node:nth-of-type(3) { animation-delay: -3.6s; }
.exploration-node:nth-of-type(4) { animation-delay: -5.2s; }
.exploration-node--motion-paused { animation-play-state: paused; }
.exploration-node__depth { position: absolute; inset: 0; transform: translateZ(var(--node-z)); transform-style: preserve-3d; pointer-events: none; }
.exploration-node__visual { position: absolute; inset: 0; transform: translate3d(var(--node-shift-x), var(--node-shift-y), 0) scale(var(--node-hover-scale)); transform-style: preserve-3d; transition: filter 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-node__visual::before { position: absolute; inset: 50% auto auto 50%; width: 2px; height: 2px; border-radius: 50%; background: #f7fcff; box-shadow: 0 0 0.55rem 0.16rem rgb(155 222 248 / 75%), 0 0 2.2rem 0.75rem rgb(155 222 248 / 16%); content: ''; transform: translate(-50%, -50%); transition: width 400ms ease, height 400ms ease, box-shadow 400ms ease; }
.exploration-node__core { position: absolute; inset: 50% auto auto 50%; width: 0.72rem; height: 0.72rem; border: 1px solid rgb(219 243 252 / 72%); border-radius: 50%; background: rgb(155 222 248 / 12%); box-shadow: inset 0 0 0.6rem rgb(218 244 255 / 16%); transform: translate(-50%, -50%); transition: background 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1); }
.exploration-node__orbit { position: absolute; inset: 0; border: 1px solid rgb(188 224 238 / 18%); border-radius: 50%; animation: node-breathe 5.5s ease-in-out infinite; }
.exploration-node__label { position: absolute; top: calc(50% + 2rem); left: 50%; white-space: nowrap; font-size: 0.64rem; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; text-shadow: 0 1px 0.8rem #020407; transform: translateX(-50%); }
.exploration-node:is(:hover, :focus-visible) { --node-hover-scale: 1.04; z-index: 2; color: #fff; }
.exploration-node:is([data-axis-id='ideas'], [data-axis-id='projects']):is(:hover, :focus-visible):not(.exploration-node--active) .exploration-node__visual { filter: brightness(1.15); }
.exploration-node:is([data-axis-id='products'], [data-axis-id='systems']):is(:hover, :focus-visible):not(.exploration-node--active) { filter: brightness(1.15); }
.exploration-node:is(:hover, :focus-visible) .exploration-node__core { background: rgb(155 222 248 / 20%); box-shadow: 0 0 1rem rgb(155 222 248 / 24%), inset 0 0 0.6rem rgb(238 250 255 / 28%); transform: translate(-50%, -50%) scale(1.08); }
.exploration-node.exploration-node--active { --node-active-scale: 1.16; --node-hover-scale: 1; --node-shift-x: 0px; --node-shift-y: 0px; z-index: 3; color: #fff; filter: brightness(1.85); }
.exploration-node.exploration-node--active .exploration-node__visual::before { width: 3px; height: 3px; box-shadow: 0 0 0.8rem 0.28rem rgb(190 235 252 / 92%), 0 0 2.8rem 1rem rgb(155 222 248 / 34%); }
.exploration-node.exploration-node--active .exploration-node__core { background: rgb(177 229 249 / 52%); box-shadow: 0 0 1.8rem rgb(155 222 248 / 64%), 0 0 3.2rem rgb(155 222 248 / 24%), inset 0 0 0.7rem rgb(255 255 255 / 68%); transform: translate(-50%, -50%) scale(1.28); }
.exploration-node.exploration-node--active .exploration-node__orbit { border-color: rgb(188 230 247 / 38%); box-shadow: 0 0 1.8rem rgb(155 222 248 / 14%); }
.exploration-node--muted { opacity: 0.5; }
.exploration-node:focus-visible { outline: 1px solid rgb(155 222 248 / 72%); outline-offset: 0.35rem; border-radius: 50%; }
@keyframes node-breathe { 0%, 100% { opacity: 0.38; transform: scale(0.92); } 50% { opacity: 0.78; transform: scale(1.08); } }
@keyframes node-float { 0%, 100% { margin-top: -0.18rem; } 50% { margin-top: 0.24rem; } }
@media (hover: hover) and (pointer: fine) {
  .exploration-node:hover:not(.exploration-node--active) { --node-shift-x: var(--node-hover-x); --node-shift-y: var(--node-hover-y); }
}
@media (hover: none), (pointer: coarse) {
  .exploration-node:hover:not(.exploration-node--active) { --node-shift-x: 0px; --node-shift-y: 0px; }
}
@media (max-width: 700px) { .exploration-node { width: 4rem; height: 4rem; } .exploration-node__label { top: calc(50% + 1.75rem); font-size: 0.58rem; letter-spacing: 0.16em; } }
@media (prefers-reduced-motion: reduce) { .exploration-node { --node-shift-x: 0px; --node-shift-y: 0px; animation: none; transition-duration: 120ms; } .exploration-node:hover:not(.exploration-node--active) { --node-shift-x: 0px; --node-shift-y: 0px; } .exploration-node__visual { transition-duration: 120ms; } .exploration-node__orbit { animation: none; } }
</style>
