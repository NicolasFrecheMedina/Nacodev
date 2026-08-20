<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import logoUrl from '../../assets/NacoDevlogoW.png'
import { useI18n } from '@/i18n'

const emit = defineEmits<{
  'motion-change': [motion: 'drift' | 'launch']
  'takeoff-complete': []
}>()
const { t } = useI18n()
const launching = ref(false)
let takeoffTimer: number | undefined

function takeoff() {
  if (launching.value) return
  launching.value = true
  emit('motion-change', 'launch')
  const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 220 : 900
  takeoffTimer = window.setTimeout(() => emit('takeoff-complete'), duration)
}

onBeforeUnmount(() => {
  if (takeoffTimer !== undefined) window.clearTimeout(takeoffTimer)
})
</script>

<template>
  <section id="idea" class="idea-scene" :class="{ 'idea-scene--launching': launching }" aria-labelledby="idea-title">
    <div class="idea-scene__coordinates" aria-hidden="true">48.8566° N<br>02.3522° E</div>
    <div class="idea-scene__hero">
      <img class="idea-scene__logo" :src="logoUrl" alt="Naco Dev">
      <h1 id="idea-title">{{ t('idea.tagline') }}</h1>
      <button class="takeoff" type="button" :disabled="launching" @click="takeoff">
        <span>{{ t('idea.takeoff') }}</span><span class="takeoff__mark" aria-hidden="true">↗</span>
      </button>
    </div>
    <div class="idea-scene__index" aria-hidden="true"><span>02</span> / 05</div>
  </section>
</template>

<style scoped>
.idea-scene { position: relative; display: grid; width: 100%; height: 100svh; min-height: 30rem; overflow: hidden; padding: clamp(1.25rem, 4vw, 3rem); place-items: center; }
.idea-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 10%); content: ''; pointer-events: none; }
.idea-scene__hero { display: grid; width: min(82vw, 46rem); justify-items: center; text-align: center; animation: hero-arrival 900ms cubic-bezier(0.22, 1, 0.36, 1) both; transition: opacity 700ms ease, filter 700ms ease, transform 900ms cubic-bezier(0.5, 0, 1, 0.5); }
.idea-scene--launching .idea-scene__hero { opacity: 0; filter: blur(8px); transform: scale(0.68); }
.idea-scene__logo { display: block; width: clamp(13rem, 38vw, 28rem); height: auto; filter: drop-shadow(0 0 1.8rem rgb(154 220 246 / 8%)); }
.idea-scene h1 { margin: clamp(2.2rem, 7vh, 4.5rem) 0 clamp(2.1rem, 6vh, 3.8rem); font-family: var(--font-body); font-size: clamp(1.05rem, 2.4vw, 1.55rem); font-weight: 300; letter-spacing: 0.04em; line-height: 1.4; }
.takeoff { position: relative; display: inline-flex; min-width: 11rem; align-items: center; justify-content: space-between; padding: 0.95rem 1.05rem 0.95rem 1.25rem; border: 1px solid rgb(227 243 248 / 34%); border-radius: var(--radius-sm); color: var(--color-ink); background: linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 3%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%), 0 1rem 3rem rgb(0 0 0 / 18%); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; backdrop-filter: blur(12px); cursor: pointer; transition: border-color 220ms ease, box-shadow 220ms ease, color 220ms ease, transform 220ms ease; }
.takeoff::before { position: absolute; top: -1px; left: 16%; width: 22%; height: 1px; background: var(--color-accent); content: ''; transform: scaleX(0); transform-origin: left; transition: transform 250ms ease; }
.takeoff:hover, .takeoff:focus-visible { border-color: rgb(137 218 250 / 72%); color: var(--color-accent); box-shadow: inset 0 1px 0 rgb(255 255 255 / 14%), 0 0 1.6rem rgb(95 194 234 / 12%); transform: translateY(-2px); }
.takeoff:hover::before, .takeoff:focus-visible::before { transform: scaleX(1); }
.takeoff:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
.takeoff:disabled { cursor: default; }
.takeoff__mark { margin-left: 1.6rem; color: var(--color-accent); font-size: 1rem; }
.idea-scene__coordinates, .idea-scene__index { position: absolute; bottom: clamp(1.5rem, 4vw, 3rem); color: rgb(235 243 246 / 42%); font-size: 0.55rem; letter-spacing: 0.16em; line-height: 1.7; }
.idea-scene__coordinates { left: clamp(1.5rem, 4vw, 3rem); }
.idea-scene__index { right: clamp(1.5rem, 4vw, 3rem); }
.idea-scene__index span { color: var(--color-accent); }
@keyframes hero-arrival { from { opacity: 0; filter: blur(7px); transform: scale(0.9); } }
@media (prefers-reduced-motion: reduce) {
  .idea-scene__hero { animation: none; transition-duration: 150ms; }
  .takeoff { transition-duration: 0ms; }
}
</style>
