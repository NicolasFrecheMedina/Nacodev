<script setup lang="ts">
import type { TimelineStep } from '@/data/timeline'
import { useI18n } from '@/i18n'

const props = defineProps<{ step: TimelineStep; index: number; active: boolean; selected: boolean }>()
const emit = defineEmits<{ preview: [step: TimelineStep | null]; select: [step: TimelineStep] }>()
const { t } = useI18n()

const style = {
  '--node-x': `${props.step.position.x}%`,
  '--node-y': `${props.step.position.y}%`,
  '--node-scale': props.step.position.scale,
}
</script>

<template>
  <button
    class="trajectory-node"
    :class="{ 'trajectory-node--active': active, 'trajectory-node--selected': selected }"
    :style="style"
    type="button"
    :aria-label="`${String(index + 1).padStart(2, '0')} — ${t(step.titleKey)}`"
    :aria-pressed="selected"
    @click="emit('select', step)"
    @focus="emit('preview', step)"
    @blur="emit('preview', null)"
    @pointerenter="emit('preview', step)"
    @pointerleave="emit('preview', null)"
  >
    <span class="trajectory-node__orbit" aria-hidden="true" />
    <span class="trajectory-node__core" aria-hidden="true" />
    <span class="trajectory-node__label"><small>{{ String(index + 1).padStart(2, '0') }}</small>{{ t(step.titleKey) }}</span>
  </button>
</template>

<style scoped>
.trajectory-node { position: absolute; z-index: 2; top: var(--node-y); left: var(--node-x); width: 3.25rem; height: 3.25rem; padding: 0; border: 0; border-radius: 50%; color: var(--color-ink); background: transparent; cursor: pointer; transform: translate(-50%, -50%) scale(var(--node-scale)); transition: transform 400ms ease; }
.trajectory-node__orbit { position: absolute; inset: 0.45rem; border: 1px solid rgb(155 222 248 / 24%); border-radius: 50%; transition: border-color 300ms ease, box-shadow 300ms ease, transform 500ms ease; }
.trajectory-node__core { position: absolute; top: 50%; left: 50%; width: 0.36rem; height: 0.36rem; border-radius: 50%; background: rgb(219 240 247 / 62%); box-shadow: 0 0 0.8rem rgb(155 222 248 / 24%); transform: translate(-50%, -50%); }
.trajectory-node__label { position: absolute; top: calc(100% + 0.2rem); left: 50%; display: grid; width: max-content; max-width: 10rem; gap: 0.2rem; color: rgb(238 246 249 / 60%); font-size: 0.48rem; letter-spacing: 0.12em; line-height: 1.35; text-align: center; text-transform: uppercase; transform: translateX(-50%); transition: color 300ms ease; }
.trajectory-node__label small { color: rgb(155 222 248 / 38%); font-size: 0.4rem; }
.trajectory-node:is(:hover, :focus-visible), .trajectory-node--active { transform: translate(-50%, -50%) scale(calc(var(--node-scale) * 1.12)); }
.trajectory-node:is(:hover, :focus-visible) .trajectory-node__orbit, .trajectory-node--active .trajectory-node__orbit { border-color: rgb(155 222 248 / 74%); box-shadow: 0 0 1.4rem rgb(155 222 248 / 28%), inset 0 0 1rem rgb(155 222 248 / 10%); transform: rotate(35deg) scale(1.08); }
.trajectory-node:is(:hover, :focus-visible) .trajectory-node__label, .trajectory-node--active .trajectory-node__label { color: rgb(248 251 252 / 92%); }
.trajectory-node:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
@media (max-width: 700px) {
  .trajectory-node { position: relative; top: auto; left: auto; flex: 0 0 3.3rem; width: 3.3rem; height: 3.3rem; transform: none; }
  .trajectory-node:is(:hover, :focus-visible), .trajectory-node--active { transform: scale(1.04); }
  .trajectory-node__label { display: none; }
}
@media (prefers-reduced-motion: reduce) { .trajectory-node, .trajectory-node__orbit, .trajectory-node__label { transition-duration: 100ms; } }
</style>
