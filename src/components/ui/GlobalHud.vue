<script setup lang="ts">
import { siteConfig } from '@/data/site'
import { useI18n } from '@/i18n'
import HudStepIndicator from './HudStepIndicator.vue'

withDefaults(defineProps<{
  sceneCode: string
  step: number
  stepTotal: number
  showLanguageSwitcher?: boolean
  showCoordinates?: boolean
}>(), {
  showLanguageSwitcher: true,
  showCoordinates: true,
})

const { locale, setLocale, supportedLocales, t } = useI18n()
const coordinates = `${siteConfig.coordinates.latitude}, ${siteConfig.coordinates.longitude}`
</script>

<template>
  <aside class="global-hud" aria-label="NacoDev HUD">
    <div class="global-hud__scene" aria-hidden="true">
      <HudStepIndicator :code="sceneCode" :step="step" :total="stepTotal" />
    </div>

    <nav v-if="showLanguageSwitcher" class="global-hud__locales" :aria-label="t('hud.language')">
      <template v-for="(language, index) in supportedLocales" :key="language">
        <button
          type="button"
          :class="{ active: locale === language }"
          :aria-pressed="locale === language"
          :aria-label="`${t('hud.language')}: ${language.toUpperCase()}`"
          @click="setLocale(language)"
        >{{ language }}</button>
        <span v-if="index < supportedLocales.length - 1" aria-hidden="true">/</span>
      </template>
    </nav>

    <div v-if="showCoordinates" class="global-hud__coordinates">
      <a
        v-if="siteConfig.googleBusinessUrl"
        :href="siteConfig.googleBusinessUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${t('hud.googleBusiness')} — ${coordinates}`"
      >
        {{ siteConfig.coordinates.latitude }}<br>{{ siteConfig.coordinates.longitude }}
      </a>
      <span
        v-else
        class="global-hud__coordinate-target"
        role="link"
        aria-disabled="true"
        tabindex="0"
        :aria-label="coordinates"
      >
        {{ siteConfig.coordinates.latitude }}<br>{{ siteConfig.coordinates.longitude }}
      </span>
    </div>

    <div v-if="$slots.context" class="global-hud__context">
      <slot name="context" />
    </div>
  </aside>
</template>

<style scoped>
.global-hud { position: absolute; z-index: var(--z-hud); inset: 0; color: rgb(235 243 246 / 42%); font-size: var(--hud-label-size); letter-spacing: 0.16em; line-height: 1.7; text-transform: uppercase; pointer-events: none; }
.global-hud__scene, .global-hud__locales, .global-hud__coordinates, .global-hud__context { position: absolute; }
.global-hud__scene { top: var(--hud-top); left: var(--hud-left); }
.global-hud__locales { top: var(--hud-top); right: var(--hud-right); display: flex; align-items: center; gap: 0.22rem; line-height: 1; pointer-events: auto; }
.global-hud__locales button { padding: 0.3rem 0.22rem; border: 0; color: rgb(235 243 246 / 34%); background: transparent; font: inherit; font-size: inherit; letter-spacing: inherit; text-transform: uppercase; cursor: pointer; }
.global-hud__locales button.active { color: var(--color-accent); text-shadow: 0 0 0.8rem rgb(155 222 248 / 32%); }
.global-hud__locales button:is(:hover, :focus-visible) { color: var(--color-ink); }
.global-hud__locales button:focus-visible, .global-hud__coordinates a:focus-visible { border-radius: 1px; outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
.global-hud__coordinates { bottom: var(--hud-bottom); left: var(--hud-left); }
.global-hud__coordinates :is(a, .global-hud__coordinate-target) { position: relative; display: block; padding-right: 0.9rem; color: inherit; text-decoration: none; cursor: pointer; pointer-events: auto; transition: color 220ms ease, filter 220ms ease; }
.global-hud__coordinates :is(a, .global-hud__coordinate-target)::after { position: absolute; top: 0.12rem; right: 0; color: var(--color-accent); content: '↗'; opacity: 0.36; transition: opacity 220ms ease, transform 220ms ease; }
.global-hud__coordinates :is(a, .global-hud__coordinate-target):is(:hover, :focus-visible) { color: rgb(203 235 247 / 76%); filter: brightness(1.12); }
.global-hud__coordinates :is(a, .global-hud__coordinate-target):is(:hover, :focus-visible)::after { opacity: 0.72; transform: translate(0.08rem, -0.08rem); }
.global-hud__coordinates .global-hud__coordinate-target:focus-visible { border-radius: 1px; outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
.global-hud__context { right: var(--hud-right); bottom: var(--hud-bottom); }
.global-hud__context :deep(.global-hud__status) { display: flex; align-items: center; gap: 0.55rem; color: rgb(229 240 245 / 44%); }
.global-hud__context :deep(.global-hud__status-frame) { display: grid; justify-items: end; }
.global-hud__context :deep(.global-hud__status-copy) { display: grid; grid-area: 1 / 1; justify-items: end; line-height: 1.45; text-align: right; }
.global-hud__context :deep(.global-hud__status-copy strong) { color: rgb(220 239 246 / 58%); font: inherit; font-weight: 400; }
.global-hud__context :deep(.global-hud__status-dot) { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.7rem rgb(155 222 248 / 60%); }

@media (max-width: 700px) {
  .global-hud__scene :deep(.hud-marker) { gap: 0; }
}
</style>
