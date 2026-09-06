<script setup lang="ts">
import { useI18n } from '@/i18n'
import { siteConfig } from '@/data/site'

defineEmits<{ open: [] }>()
const { t } = useI18n()
</script>

<template>
  <div class="contact-panel">
    <div class="contact-panel__links">
      <a href="mailto:contact@nacodev.com">contact@nacodev.com</a>
      <a :href="siteConfig.linkedinPersonalUrl" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
    </div>
    <button type="button" @click="$emit('open')">{{ t('about.contact.open') }} <span aria-hidden="true">↗</span></button>
  </div>
</template>

<style scoped>
.contact-panel { display: flex; align-items: center; justify-content: flex-end; gap: clamp(1rem, 3vw, 2.5rem); }
.contact-panel__links { display: grid; gap: 0.25rem; text-align: right; }
.contact-panel a { color: rgb(228 240 245 / 54%); font-size: 0.5rem; letter-spacing: 0.1em; text-decoration: none; }
.contact-panel a:is(:hover, :focus-visible) { color: var(--color-ink); }
.contact-panel button { padding: 0.72rem 0.9rem; border: 1px solid rgb(155 222 248 / 28%); color: rgb(241 248 250 / 76%); background: rgb(155 222 248 / 5%); font: inherit; font-size: 0.48rem; letter-spacing: 0.16em; text-transform: uppercase; cursor: pointer; }
.contact-panel :is(a, button):focus-visible { outline: 1px solid var(--color-accent); outline-offset: 0.25rem; }
@media (max-width: 700px) { .contact-panel { display: grid; width: 100%; min-width: 0; justify-items: start; gap: 0.8rem; } .contact-panel__links { min-width: 0; text-align: left; } .contact-panel button { width: fit-content; } }
</style>
