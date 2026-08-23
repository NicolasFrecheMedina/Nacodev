<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import TrajectoryMap from '@/components/about/TrajectoryMap.vue'
import TrajectoryPanel from '@/components/about/TrajectoryPanel.vue'
import ContactPanel from '@/components/contact/ContactPanel.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import GlobalHud from '@/components/ui/GlobalHud.vue'
import HudContextStatus from '@/components/ui/HudContextStatus.vue'
import SceneNavigation from '@/components/ui/SceneNavigation.vue'
import { sceneById, sceneStepTotal } from '@/data/scenes'
import { timelineSteps, type TimelineStep, type TimelineStepId } from '@/data/timeline'
import { useI18n } from '@/i18n'

const props = withDefaults(defineProps<{ emerging?: boolean; revealing?: boolean }>(), { emerging: false, revealing: false })
defineEmits<{ back: []; restart: [] }>()
const { locale, t } = useI18n()
const hud = sceneById.about.hud!
const selectedId = ref<TimelineStepId | null>(null)
const previewedId = ref<TimelineStepId | null>(null)
const contactOpen = ref(false)
const arrivedThroughTransition = ref(props.emerging)
const typedStatement = ref('')
const typingComplete = ref(!props.emerging)
const activeId = computed(() => selectedId.value ?? previewedId.value ?? 'elsewhere')
const activeStep = computed<TimelineStep>(() => timelineSteps.find((step) => step.id === activeId.value) ?? timelineSteps[0]!)
const activeIndex = computed(() => timelineSteps.findIndex((step) => step.id === activeStep.value.id))
const statement = computed(() => t(activeStep.value.statementKey))
const displayedStatement = computed(() => typingComplete.value ? statement.value : typedStatement.value)
const statementBreakIndex = computed(() => statement.value.split(' ').slice(0, activeStep.value.statementBreakAfter[locale.value]).join(' ').length)
const displayedStatementLineOne = computed(() => displayedStatement.value.slice(0, Math.min(displayedStatement.value.length, statementBreakIndex.value)))
const displayedStatementLineTwo = computed(() => displayedStatement.value.length > statementBreakIndex.value ? displayedStatement.value.slice(statementBreakIndex.value + 1) : '')
const caretOnFirstLine = computed(() => displayedStatement.value.length <= statementBreakIndex.value)
const hudContext = computed(() => selectedId.value || previewedId.value
  ? `${String(activeIndex.value + 1).padStart(2, '0')} / 05 · ${t(activeStep.value.titleKey)}`
  : t('scenes.about'))

function selectStep(step: TimelineStep) {
  if (selectedId.value === step.id) return
  selectedId.value = step.id
  previewedId.value = null
  startStatementTyping(t(step.statementKey), 120)
}

function previewStep(step: TimelineStep | null) {
  if (!selectedId.value) previewedId.value = step?.id ?? null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && selectedId.value && !contactOpen.value) {
    selectedId.value = null
    stopStatementTyping()
    typingComplete.value = true
  }
}

let typingTimer: number | undefined
let typingStartTimer: number | undefined

function stopStatementTyping() {
  if (typingTimer !== undefined) window.clearInterval(typingTimer)
  if (typingStartTimer !== undefined) window.clearTimeout(typingStartTimer)
  typingTimer = undefined
  typingStartTimer = undefined
}

function startStatementTyping(value: string, delay: number) {
  stopStatementTyping()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedStatement.value = value
    typingComplete.value = true
    return
  }
  typedStatement.value = ''
  typingComplete.value = false
  typingStartTimer = window.setTimeout(() => {
    typingStartTimer = undefined
    let characterIndex = 0
    typingTimer = window.setInterval(() => {
      characterIndex += 1
      typedStatement.value = value.slice(0, characterIndex)
      if (characterIndex >= value.length) {
        stopStatementTyping()
        typingComplete.value = true
      }
    }, 28)
  }, delay)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (!props.emerging) {
    typingComplete.value = true
    return
  }
  startStatementTyping(statement.value, 280)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopStatementTyping()
})
</script>

<template>
  <section id="about" class="about-scene" :class="{ 'about-scene--emerging': props.emerging, 'about-scene--revealing': props.revealing, 'about-scene--transitioned': arrivedThroughTransition }" :inert="props.emerging || props.revealing" :aria-busy="props.emerging || props.revealing" aria-labelledby="about-title">
    <GlobalHud :scene-code="hud.code" :step="hud.step" :step-total="sceneStepTotal">
      <template #context><HudContextStatus :primary="hudContext" /></template>
    </GlobalHud>
    <header class="about-scene__header">
      <div><p>{{ t('about.kicker') }}</p><h1 id="about-title">{{ t('scenes.about') }}</h1></div>
    </header>

    <div class="about-scene__intro">
      <Transition name="intro-copy" mode="out-in">
        <div :key="activeStep.id">
          <p class="about-scene__statement">
            <span>{{ displayedStatementLineOne }}<i v-if="!typingComplete && caretOnFirstLine" class="about-scene__typing-caret" aria-hidden="true" /></span>
            <br>
            <span>{{ displayedStatementLineTwo }}<i v-if="!typingComplete && !caretOnFirstLine" class="about-scene__typing-caret" aria-hidden="true" /></span>
          </p>
          <p class="about-scene__intro-meta">{{ t(activeStep.metaKey) }}</p>
        </div>
      </Transition>
    </div>

    <div class="about-scene__trajectory">
      <TrajectoryMap :active-id="activeId" :selected-id="selectedId" :emerging="props.emerging" @preview="previewStep" @select="selectStep" />
      <Transition name="trajectory-panel" mode="out-in">
        <TrajectoryPanel v-if="selectedId" :key="activeStep.id" :step="activeStep" :index="activeIndex" selected @close="selectedId = null" />
      </Transition>
    </div>

    <footer class="about-scene__footer">
      <div class="about-scene__profile">
        <div v-if="$slots.portrait" class="about-scene__portrait"><slot name="portrait" /></div>
        <div class="about-scene__identity"><strong>Nicolas Freche Medina</strong><span>{{ t(activeStep.titleKey) }} · {{ t('about.identityLine') }}</span></div>
      </div>
      <div class="about-scene__conclusion"><strong>{{ t('about.conclusion.first') }}</strong><span>{{ t('about.conclusion.second') }}</span></div>
      <ContactPanel @open="contactOpen = true" />
    </footer>

    <SceneNavigation :navigation-label="t('common.sceneNavigation')" :back-label="t('common.back')" :next-label="t('about.restart')" next-mark="↺" @back="$emit('back')" @next="$emit('restart')" />

    <BaseModal id="contact-modal" :open="contactOpen" :title="t('about.contact.title')" :close-label="t('common.close')" @close="contactOpen = false">
      <div class="contact-modal">
        <p>{{ t('about.contact.message') }}</p>
        <a class="contact-modal__primary" href="mailto:contact@nacodev.com">contact@nacodev.com</a>
        <a href="https://www.linkedin.com/in/nicolas-freche-medina-55998442/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </div>
    </BaseModal>
  </section>
</template>

<style scoped>
.about-scene { z-index: 1; position: relative; display: grid; width: 100%; height: 100svh; min-height: 38rem; overflow: hidden; grid-template-rows: auto auto minmax(17rem, 1fr) auto; padding: clamp(1.5rem, 4vw, 3rem); background: radial-gradient(circle at 56% 48%, rgb(72 130 151 / 7%), transparent 38%); animation: about-arrival 760ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.about-scene--emerging { z-index: 3; pointer-events: none; }
.about-scene--transitioned { animation: none; }
.about-scene::before { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.about-scene__header { z-index: 6; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-align: center; text-transform: uppercase; }
.about-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.about-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.about-scene__intro { z-index: 3; width: min(52rem, 76vw); height: clamp(7.25rem, 16vh, 9rem); padding-top: clamp(1.1rem, 3vh, 2.4rem); }
.about-scene__statement { min-height: 2.56em; margin: 0; color: rgb(246 249 250 / 88%); font-size: clamp(1.05rem, 2vw, 1.7rem); font-weight: 300; line-height: 1.28; text-wrap: balance; }
.about-scene__statement > span { white-space: nowrap; }
.about-scene__intro-meta { margin: 0.55rem 0 0; color: rgb(190 222 234 / 42%); font-size: 0.48rem; letter-spacing: 0.13em; text-transform: uppercase; }
.about-scene__trajectory { position: relative; min-height: 0; margin: -1rem -1rem 0; }
.about-scene__footer { z-index: 5; display: grid; grid-template-columns: minmax(12rem, 1fr) auto minmax(15rem, 1fr); align-items: end; gap: 1.5rem; margin-bottom: 2.4rem; }
.about-scene__profile { display: flex; min-width: 0; align-items: center; gap: 0.8rem; }
.about-scene__portrait { flex: 0 0 2.8rem; width: 2.8rem; aspect-ratio: 1; overflow: hidden; border: 1px solid rgb(155 222 248 / 18%); border-radius: 50%; }
.about-scene__portrait :deep(*) { width: 100%; height: 100%; object-fit: cover; }
.about-scene__identity { display: grid; min-width: 0; gap: 0.32rem; }
.about-scene__identity strong { font-size: 0.67rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; }
.about-scene__identity span { color: rgb(225 237 242 / 44%); font-size: 0.46rem; letter-spacing: 0.1em; }
.about-scene__conclusion { display: grid; gap: 0.2rem; text-align: center; }
.about-scene__conclusion strong { font-size: clamp(0.82rem, 1.3vw, 1.05rem); font-weight: 400; }
.about-scene__conclusion span { color: rgb(178 221 238 / 58%); font-size: 0.62rem; }
.about-scene__header, .about-scene :deep(.global-hud), .about-scene__intro, .about-scene__footer, .about-scene :deep(.scene-navigation), .about-scene__trajectory :deep(.trajectory-panel) { transition: opacity 420ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1); }
.about-scene__header, .about-scene__intro-meta { transition: opacity 420ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1); }
.about-scene--emerging .about-scene__header, .about-scene--emerging :deep(.global-hud), .about-scene--emerging .about-scene__footer, .about-scene--emerging :deep(.scene-navigation), .about-scene--emerging .about-scene__trajectory :deep(.trajectory-panel), .about-scene--emerging .about-scene__intro-meta { opacity: 0; transform: translateY(0.65rem); }
.about-scene__typing-caret { display: inline-block; width: 1px; height: 0.9em; margin-left: 0.12em; background: currentcolor; vertical-align: -0.05em; animation: typing-caret 680ms steps(1, end) infinite; }
.trajectory-panel-enter-active, .trajectory-panel-leave-active { transition: opacity 220ms ease, transform 320ms ease; }
.trajectory-panel-enter-from, .trajectory-panel-leave-to { opacity: 0; transform: translateY(0.5rem); }
.intro-copy-enter-active, .intro-copy-leave-active { transition: opacity 220ms ease, transform 300ms ease; }
.intro-copy-enter-from { opacity: 0; transform: translateY(0.35rem); }
.intro-copy-leave-to { opacity: 0; transform: translateY(-0.2rem); }
.contact-modal { display: grid; gap: 1rem; }
.contact-modal p { margin: 0 0 0.35rem; color: var(--color-muted); line-height: 1.6; }
.contact-modal a { width: fit-content; color: rgb(218 238 246 / 72%); text-decoration: none; }
.contact-modal__primary { font-size: clamp(1rem, 3vw, 1.45rem); }
@keyframes about-arrival { from { opacity: 0; filter: blur(5px); transform: scale(0.96); } to { opacity: 1; filter: none; transform: scale(1); } }
@keyframes typing-caret { 50% { opacity: 0; } }
@media (max-width: 700px) {
  .about-scene { display: block; min-height: 100svh; height: 100svh; padding: 1.35rem; overflow-x: hidden; overflow-y: auto; }
  .about-scene > * { min-width: 0; }
  .about-scene__header { padding-top: 2.4rem; text-align: left; }
  .about-scene__intro { width: 100%; height: auto; min-height: 7rem; padding-top: 1.8rem; }
  .about-scene__statement { max-width: 22rem; font-size: 1.12rem; }
  .about-scene__statement > span { white-space: normal; }
  .about-scene__trajectory { display: grid; width: 100%; min-width: 0; min-height: 13.5rem; margin: 1.35rem 0 1.15rem; gap: 0.8rem; }
  .about-scene__footer { display: grid; width: 100%; min-width: 0; grid-template-columns: minmax(0, 1fr); gap: 1.1rem; margin-bottom: 0; padding-bottom: 4.5rem; }
  .about-scene__conclusion { grid-row: 1; text-align: left; }
  .about-scene__profile { grid-row: 2; }
}
@media (prefers-reduced-motion: reduce) { .about-scene { animation-duration: 120ms; transform: none; filter: none; } .about-scene__header, .about-scene :deep(.global-hud), .about-scene__intro, .about-scene__footer, .about-scene :deep(.scene-navigation), .about-scene__trajectory :deep(.trajectory-panel), .trajectory-panel-enter-active, .trajectory-panel-leave-active, .intro-copy-enter-active, .intro-copy-leave-active { transition-duration: 160ms; transform: none; } }
</style>
