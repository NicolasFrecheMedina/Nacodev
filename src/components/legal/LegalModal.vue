<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { legalConfig, legalContent, type LegalTab } from '@/data/legal'
import { useI18n } from '@/i18n'

const props = defineProps<{ open: boolean; initialTab: LegalTab }>()
const emit = defineEmits<{ close: [] }>()
const { locale, t } = useI18n()
const activeTab = ref<LegalTab>(props.initialTab)
const content = computed(() => legalContent[locale.value])
const currentYear = new Date().getFullYear()

watch(
  () => [props.open, props.initialTab] as const,
  ([isOpen, initialTab]) => {
    if (isOpen) activeTab.value = initialTab
  },
  { immediate: true },
)

function selectTab(tab: LegalTab) {
  activeTab.value = tab
}

function navigateTabs(event: KeyboardEvent) {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
  const tabs: LegalTab[] = ['legalNotice', 'privacy', 'terms']
  const direction = event.key === 'ArrowRight' ? 1 : -1
  const nextIndex = (tabs.indexOf(activeTab.value) + direction + tabs.length) % tabs.length
  const nextTab = tabs[nextIndex]!
  selectTab(nextTab)
  document.getElementById(`legal-tab-${nextTab}`)?.focus()
}
</script>

<template>
  <BaseModal id="legal-modal" :open="open" :title="content.archiveTitle" :close-label="t('common.close')" variant="legal" @close="emit('close')">
    <div class="legal-archive">
      <nav class="legal-archive__tabs" :aria-label="content.navigationLabel" role="tablist">
        <button
          v-for="tab in (['legalNotice', 'privacy', 'terms'] as const)"
          :id="`legal-tab-${tab}`"
          :key="tab"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab"
          :aria-controls="`legal-panel-${tab}`"
          :tabindex="activeTab === tab ? 0 : -1"
          @click="selectTab(tab)"
          @keydown="navigateTabs"
        >
          {{ content.tabs[tab] }}
        </button>
      </nav>

      <main
        :id="`legal-panel-${activeTab}`"
        class="legal-archive__document"
        role="tabpanel"
        :aria-labelledby="`legal-tab-${activeTab}`"
        tabindex="0"
      >
        <p v-if="content.referenceNotice" class="legal-archive__reference">{{ content.referenceNotice }}</p>

        <template v-if="activeTab === 'legalNotice'">
          <section class="legal-section">
            <p class="legal-section__code">01 / IDENTIFICATION</p>
            <h3>{{ content.legalNotice.identityTitle }}</h3>
            <dl class="legal-details">
              <div><dt>{{ content.legalNotice.labels.businessName }}</dt><dd>{{ legalConfig.businessName }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.ownerName }}</dt><dd>{{ legalConfig.ownerName }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.legalStatus }}</dt><dd>{{ legalConfig.legalStatus[locale] }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.activity }}</dt><dd>{{ legalConfig.activity[locale] }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.address }}</dt><dd>{{ legalConfig.address }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.phone }}</dt><dd><a :href="`tel:${legalConfig.phone.replace(/\s/g, '')}`">{{ legalConfig.phone }}</a></dd></div>
              <div><dt>{{ content.legalNotice.labels.email }}</dt><dd><a :href="`mailto:${legalConfig.email}`">{{ legalConfig.email }}</a></dd></div>
              <div><dt>{{ content.legalNotice.labels.publicationDirector }}</dt><dd>{{ legalConfig.publicationDirector }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.host }}</dt><dd><a :href="legalConfig.hostUrl" target="_blank" rel="noopener noreferrer">{{ legalConfig.host }} ↗</a></dd></div>
              <div v-if="legalConfig.siren"><dt>{{ content.legalNotice.labels.siren }}</dt><dd>{{ legalConfig.siren }}</dd></div>
              <div v-if="legalConfig.siret"><dt>{{ content.legalNotice.labels.siret }}</dt><dd>{{ legalConfig.siret }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.nafCode }}</dt><dd>{{ legalConfig.nafCode }}</dd></div>
              <div v-if="legalConfig.registrationNumber"><dt>{{ content.legalNotice.labels.registrationNumber }}</dt><dd>{{ legalConfig.registrationNumber }}</dd></div>
              <div><dt>{{ content.legalNotice.labels.vatRegime }}</dt><dd>{{ legalConfig.vatRegime[locale] }}</dd></div>
            </dl>
          </section>
          <section class="legal-section">
            <p class="legal-section__code">02 / IP</p>
            <h3>{{ content.legalNotice.intellectualPropertyTitle }}</h3>
            <p>{{ content.legalNotice.intellectualProperty }}</p>
          </section>
        </template>

        <template v-else>
          <section v-for="(section, index) in activeTab === 'privacy' ? content.privacy : content.terms" :key="section.title" class="legal-section">
            <p class="legal-section__code">{{ String(index + 1).padStart(2, '0') }} / ARCHIVE</p>
            <h3>{{ section.title }}</h3>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            <p v-if="activeTab === 'privacy' && index === 5" class="legal-section__configured"><a :href="`mailto:${legalConfig.email}`">{{ legalConfig.email }}</a></p>
            <div v-if="activeTab === 'terms' && index === 14 && legalConfig.consumerMediatorName" class="legal-details legal-details--compact">
              <div><dt>Nom</dt><dd>{{ legalConfig.consumerMediatorName }}</dd></div>
              <div><dt>Adresse</dt><dd>{{ legalConfig.consumerMediatorAddress }}</dd></div>
              <div><dt>URL</dt><dd><a :href="legalConfig.consumerMediatorUrl" target="_blank" rel="noopener noreferrer">{{ legalConfig.consumerMediatorUrl }}</a></dd></div>
            </div>
          </section>
        </template>

        <footer class="legal-archive__footer">© 2021–{{ currentYear }} {{ legalConfig.businessName }} - {{ content.rightsReserved }}</footer>
      </main>
    </div>
  </BaseModal>
</template>

<style scoped>
.legal-archive { position: relative; min-height: min(42rem, calc(100dvh - 8rem)); }
.legal-archive__tabs { position: sticky; z-index: 3; top: 0; display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid rgb(155 222 248 / 14%); background: rgb(5 10 16 / 94%); backdrop-filter: blur(16px); }
.legal-archive__tabs button { min-height: 3.35rem; padding: 0.75rem; border: 0; border-right: 1px solid rgb(155 222 248 / 10%); color: rgb(190 222 234 / 46%); background: transparent; font: inherit; font-size: 0.5rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease; }
.legal-archive__tabs button:last-child { border-right: 0; }
.legal-archive__tabs button[aria-selected='true'] { color: var(--color-accent); background: linear-gradient(180deg, rgb(155 222 248 / 8%), transparent); box-shadow: inset 0 -1px var(--color-accent); }
.legal-archive__tabs button:focus-visible { z-index: 1; outline: 1px solid var(--color-accent); outline-offset: -3px; }
.legal-archive__document { display: grid; max-width: 58rem; margin-inline: auto; gap: 2.2rem; padding: clamp(1.5rem, 4vw, 3.4rem); outline: 0; }
.legal-archive__reference { margin: 0; padding: 0.75rem 1rem; border-left: 1px solid rgb(137 218 250 / 42%); color: rgb(190 222 234 / 54%); background: rgb(155 222 248 / 3%); font-size: 0.6rem; line-height: 1.6; }
.legal-section { position: relative; }
.legal-section + .legal-section { padding-top: 2.2rem; border-top: 1px solid rgb(155 222 248 / 9%); }
.legal-section__code { margin: 0 0 0.65rem; color: rgb(137 218 250 / 42%); font-size: 0.44rem; letter-spacing: 0.2em; }
.legal-section h3 { margin: 0 0 0.85rem; color: rgb(241 248 250 / 90%); font-size: clamp(0.78rem, 1.7vw, 1rem); font-weight: 400; letter-spacing: 0.1em; line-height: 1.45; text-transform: uppercase; }
.legal-section > p:not(.legal-section__code, .legal-section__configured) { margin: 0.65rem 0 0; color: rgb(218 235 242 / 66%); font-size: 0.7rem; line-height: 1.8; }
.legal-section__configured { color: var(--color-accent); font-size: 0.64rem; }
.legal-section__configured a { color: inherit; }
.legal-details { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 0; border: 1px solid rgb(155 222 248 / 11%); }
.legal-details div { display: grid; gap: 0.35rem; padding: 0.9rem; border-bottom: 1px solid rgb(155 222 248 / 8%); }
.legal-details div:nth-child(odd) { border-right: 1px solid rgb(155 222 248 / 8%); }
.legal-details dt { color: rgb(137 218 250 / 43%); font-size: 0.43rem; letter-spacing: 0.15em; text-transform: uppercase; }
.legal-details dd { margin: 0; color: rgb(231 243 247 / 74%); font-size: 0.68rem; line-height: 1.55; }
.legal-details a { color: inherit; text-decoration: none; }
.legal-details a:is(:hover, :focus-visible) { color: var(--color-accent); }
.legal-details--compact { margin-top: 1rem; }
.legal-archive__todo { padding: 1rem; border: 1px dashed rgb(255 190 110 / 32%); color: rgb(255 211 153 / 68%); background: rgb(255 170 65 / 4%); font-size: 0.58rem; line-height: 1.6; }
.legal-archive__todo strong { letter-spacing: 0.1em; text-transform: uppercase; }
.legal-archive__todo :is(p, ul) { margin: 0.6rem 0 0; }
.legal-archive__footer { padding-top: 1.2rem; border-top: 1px solid rgb(155 222 248 / 10%); color: rgb(190 222 234 / 38%); font-size: 0.48rem; letter-spacing: 0.1em; text-align: center; text-transform: uppercase; }
@media (max-width: 700px) {
  .legal-archive { min-height: calc(100dvh - 7rem); }
  .legal-archive__tabs button { min-height: 3.7rem; padding-inline: 0.35rem; font-size: 0.42rem; letter-spacing: 0.08em; }
  .legal-archive__document { gap: 1.7rem; padding: 1.25rem; }
  .legal-details { grid-template-columns: 1fr; }
  .legal-details div:nth-child(odd) { border-right: 0; }
}
@media (prefers-reduced-motion: reduce) { .legal-archive__tabs button { transition-duration: 1ms; } }
</style>
