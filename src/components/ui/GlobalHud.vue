<script setup lang="ts">
import { siteConfig } from '@/data/site'
import { useI18n } from '@/i18n'

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
      <span>{{ sceneCode }}</span>
      <span><strong>{{ String(step).padStart(2, '0') }}</strong> / {{ String(stepTotal).padStart(2, '0') }}</span>
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
      <span v-else aria-hidden="true">
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
.global-hud__scene { top: var(--hud-top); left: var(--hud-left); display: grid; gap: 0.15rem; }
.global-hud__scene strong { color: var(--color-accent); font-weight: 500; text-shadow: 0 0 0.8rem rgb(155 222 248 / 35%); }
.global-hud__locales { top: var(--hud-top); right: var(--hud-right); display: flex; align-items: center; gap: 0.22rem; line-height: 1; pointer-events: auto; }
.global-hud__locales button { padding: 0.3rem 0.22rem; border: 0; color: rgb(235 243 246 / 34%); background: transparent; font: inherit; font-size: inherit; letter-spacing: inherit; text-transform: uppercase; cursor: pointer; }
.global-hud__locales button.active { color: var(--color-accent); text-shadow: 0 0 0.8rem rgb(155 222 248 / 32%); }
.global-hud__locales button:is(:hover, :focus-visible) { color: var(--color-ink); }
.global-hud__locales button:focus-visible, .global-hud__coordinates a:focus-visible { border-radius: 1px; outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
.global-hud__coordinates { bottom: var(--hud-bottom); left: var(--hud-left); }
.global-hud__coordinates a { display: block; color: inherit; text-decoration: none; pointer-events: auto; transition: color 180ms ease; }
.global-hud__coordinates a:is(:hover, :focus-visible) { color: var(--color-accent); }
.global-hud__context { right: var(--hud-right); bottom: var(--hud-bottom); }
.global-hud__context :deep(.global-hud__status) { display: flex; align-items: center; gap: 0.55rem; color: rgb(229 240 245 / 44%); }
.global-hud__context :deep(.global-hud__status-dot) { width: 0.3rem; height: 0.3rem; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0.7rem rgb(155 222 248 / 60%); }

@media (max-width: 700px) {
  .global-hud__scene { gap: 0; }
}
</style>
