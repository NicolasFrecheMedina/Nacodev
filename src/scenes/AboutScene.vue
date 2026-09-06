<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import TrajectoryMap from '@/components/about/TrajectoryMap.vue'
import TrajectoryPanel from '@/components/about/TrajectoryPanel.vue'
import ContactPanel from '@/components/contact/ContactPanel.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import GlobalHud from '@/components/ui/GlobalHud.vue'
import HudContextStatus from '@/components/ui/HudContextStatus.vue'
import SceneNavigation from '@/components/ui/SceneNavigation.vue'
import { sceneById, sceneStepTotal } from '@/data/scenes'
import { siteConfig } from '@/data/site'
import { timelineSteps, type TimelineStep, type TimelineStepId } from '@/data/timeline'
import { useI18n } from '@/i18n'

const props = withDefaults(defineProps<{ emerging?: boolean; revealing?: boolean }>(), { emerging: false, revealing: false })
const emit = defineEmits<{ back: []; restart: [] }>()
const { locale, t } = useI18n()
const hud = sceneById.about.hud!
const selectedId = ref<TimelineStepId | null>(null)
const hoveredId = ref<TimelineStepId | null>(null)
const contactOpen = ref(false)
const concluding = ref(false)
const contactStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const contactFields = reactive({ name: '', email: '', subject: '', message: '' })
const arrivedThroughTransition = ref(props.emerging)
const initialTitleReveal = ref(props.emerging)
const typedStatement = ref('')
const typingComplete = ref(true)
const selectedStep = computed<TimelineStep>(() => timelineSteps.find((step) => step.id === selectedId.value) ?? timelineSteps[0]!)
const selectedIndex = computed(() => timelineSteps.findIndex((step) => step.id === selectedStep.value.id))
const hudStep = computed(() => timelineSteps.find((step) => step.id === (hoveredId.value ?? selectedId.value)))
const statement = computed(() => t(selectedStep.value.statementKey))
const displayedStatement = computed(() => typingComplete.value ? statement.value : typedStatement.value)
const statementBreakIndex = computed(() => statement.value.split(' ').slice(0, selectedStep.value.statementBreakAfter[locale.value]).join(' ').length)
const statementLineOne = computed(() => statement.value.slice(0, statementBreakIndex.value))
const statementLineTwo = computed(() => statement.value.slice(statementBreakIndex.value + 1))
const displayedStatementLineOne = computed(() => displayedStatement.value.slice(0, Math.min(displayedStatement.value.length, statementBreakIndex.value)))
const displayedStatementLineTwo = computed(() => displayedStatement.value.length > statementBreakIndex.value ? displayedStatement.value.slice(statementBreakIndex.value + 1) : '')
const hudContext = computed(() => hudStep.value
  ? `${String(timelineSteps.findIndex((step) => step.id === hudStep.value?.id) + 1).padStart(2, '0')} / 05 · ${t(hudStep.value.titleKey)}`
  : t('scenes.about'))

function selectStep(step: TimelineStep) {
  if (selectedId.value === step.id) return
  initialTitleReveal.value = false
  selectedId.value = step.id
  hoveredId.value = null
  startStatementTyping(t(step.statementKey), 120)
}

function selectNextStep() {
  const currentIndex = timelineSteps.findIndex((step) => step.id === selectedId.value)
  selectStep(timelineSteps[(currentIndex + 1) % timelineSteps.length] ?? timelineSteps[0]!)
}

function selectPreviousStep() {
  const currentIndex = timelineSteps.findIndex((step) => step.id === selectedId.value)
  selectStep(timelineSteps[(currentIndex - 1 + timelineSteps.length) % timelineSteps.length] ?? timelineSteps[0]!)
}

function beginContactSequence() {
  if (concluding.value || contactOpen.value) return
  concluding.value = true
}

function completeContactSequence() {
  concluding.value = false
  contactOpen.value = true
}

function resetContactStatus() {
  contactStatus.value = 'idle'
}

function retryContact() {
  contactStatus.value = 'idle'
}

function restartFromContact() {
  contactOpen.value = false
  emit('restart')
}

async function submitContact(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  const payload = new URLSearchParams()
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string') payload.append(key, value)
  })

  contactStatus.value = 'submitting'
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
    })
    if (!response.ok) throw new Error(`Netlify form response: ${response.status}`)
    form.reset()
    Object.assign(contactFields, { name: '', email: '', subject: '', message: '' })
    contactStatus.value = 'success'
  } catch {
    contactStatus.value = 'error'
  }
}

function previewStep(step: TimelineStep | null) {
  hoveredId.value = step?.id ?? null
}

function handleKeydown(event: KeyboardEvent) {
  if (concluding.value) return
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

watch(locale, () => {
  stopStatementTyping()
  initialTitleReveal.value = false
  typedStatement.value = statement.value
  typingComplete.value = true
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (!props.emerging) {
    typingComplete.value = true
    return
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopStatementTyping()
})
</script>

<template>
  <section id="about" class="about-scene" :class="{ 'about-scene--emerging': props.emerging, 'about-scene--revealing': props.revealing, 'about-scene--transitioned': arrivedThroughTransition, 'about-scene--concluding': concluding }" :inert="props.emerging || props.revealing || concluding" :aria-busy="props.emerging || props.revealing || concluding" aria-labelledby="about-title">
    <GlobalHud :scene-code="hud.code" :step="hud.step" :step-total="sceneStepTotal">
      <template #context><HudContextStatus :primary="hudContext" /></template>
    </GlobalHud>
    <header class="about-scene__header">
      <div>
        <p>{{ t('about.kicker') }}</p>
        <h1 id="about-title">{{ t('about.sceneTitle') }}</h1>
        <span>{{ t('about.sceneSubtitle') }}</span>
      </div>
    </header>

    <div class="about-scene__intro">
      <p class="about-scene__signature">NICOLAS FRECHE</p>
      <Transition name="intro-copy" mode="out-in">
        <div :key="selectedStep.id">
          <div class="about-scene__statement-frame">
            <p class="about-scene__statement about-scene__statement--reserved" aria-hidden="true">
              <span>{{ statementLineOne }}</span><br><span>{{ statementLineTwo }}</span>
            </p>
            <p class="about-scene__statement about-scene__statement--typed" :class="{ 'about-scene__statement--initial-reveal': initialTitleReveal }">
              <span>{{ displayedStatementLineOne }}</span>
              <br>
              <span>{{ displayedStatementLineTwo }}</span>
            </p>
          </div>
          <p class="about-scene__intro-meta">{{ t(selectedStep.metaKey) }}</p>
        </div>
      </Transition>
      <ContactPanel class="about-scene__intro-contact" @open="beginContactSequence" />
    </div>

    <div class="about-scene__trajectory">
      <TrajectoryMap :active-id="selectedStep.id" :selected-id="selectedId" :emerging="props.emerging" :concluding="concluding || contactOpen" @preview="previewStep" @select="selectStep" @conclusion-complete="completeContactSequence" />
      <Transition name="trajectory-panel" mode="out-in">
        <TrajectoryPanel
          v-if="selectedId"
          :key="selectedStep.id"
          :step="selectedStep"
          :index="selectedIndex"
          :previous-label="t('about.previous')"
          :next-label="t('about.next')"
          :contact-label="t('about.contact.open')"
          :has-previous="selectedIndex > 0"
          :has-next="selectedIndex < timelineSteps.length - 1"
          selected
          @previous="selectPreviousStep"
          @next="selectNextStep"
          @contact="beginContactSequence"
        />
      </Transition>
    </div>

    <SceneNavigation :navigation-label="t('common.sceneNavigation')" :back-label="t('common.back')" :next-label="t('about.restart')" next-mark="↺" @back="$emit('back')" @next="$emit('restart')" />

    <BaseModal id="contact-modal" :open="contactOpen" :title="t('about.contact.title')" :close-label="t('common.close')" variant="transmission" @close="contactOpen = false" @closed="resetContactStatus">
      <div class="contact-modal">
        <p class="contact-modal__lead">{{ t('about.contact.message') }}</p>

        <div v-if="contactStatus === 'success'" class="contact-modal__feedback contact-modal__feedback--success" role="status">
          <span aria-hidden="true">SIGNAL / CONFIRMÉ</span>
          <h3>{{ t('about.contact.successTitle') }}</h3>
          <p>{{ t('about.contact.success') }}</p>
          <div class="contact-modal__feedback-actions">
            <button type="button" @click="restartFromContact">{{ t('about.restart') }}</button>
            <button type="button" @click="contactOpen = false">{{ t('common.close') }}</button>
          </div>
        </div>
        <div v-else-if="contactStatus === 'error'" class="contact-modal__feedback contact-modal__feedback--error" role="alert">
          <span aria-hidden="true">SIGNAL / INTERROMPU</span>
          <h3>{{ t('about.contact.errorTitle') }}</h3>
          <p>{{ t('about.contact.error') }}</p>
          <div class="contact-modal__feedback-actions">
            <button type="button" @click="retryContact">{{ t('about.contact.retry') }}</button>
            <button type="button" @click="contactOpen = false">{{ t('common.close') }}</button>
          </div>
        </div>
        <form v-else name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" class="contact-form" @submit.prevent="submitContact">
          <input type="hidden" name="form-name" value="contact">
          <p hidden><label>Ne pas remplir <input name="bot-field"></label></p>
          <label><span>{{ t('about.contact.name') }}</span><input v-model="contactFields.name" name="name" type="text" autocomplete="name" required></label>
          <label><span>{{ t('about.contact.email') }}</span><input v-model="contactFields.email" name="email" type="email" autocomplete="email" required></label>
          <label class="contact-form__wide"><span>{{ t('about.contact.subject') }}</span><input v-model="contactFields.subject" name="subject" type="text" required></label>
          <label class="contact-form__wide"><span>{{ t('about.contact.body') }}</span><textarea v-model="contactFields.message" name="message" rows="5" required></textarea></label>
          <p v-if="contactStatus === 'submitting'" class="contact-form__status" role="status">{{ t('about.contact.sending') }}</p>
          <button class="contact-form__submit" type="submit" :disabled="contactStatus === 'submitting'">
            {{ contactStatus === 'submitting' ? t('about.contact.sending') : t('about.contact.submit') }} <span aria-hidden="true">↗</span>
          </button>
        </form>

        <nav class="contact-modal__external" aria-label="Liens de contact secondaires">
          <a :href="siteConfig.linkedinUrl" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a v-if="siteConfig.githubUrl" :href="siteConfig.githubUrl" target="_blank" rel="noreferrer">GITHUB ↗</a><span v-else aria-disabled="true">GITHUB ↗</span>
          <a v-if="siteConfig.googleBusinessUrl" :href="siteConfig.googleBusinessUrl" target="_blank" rel="noreferrer">GOOGLE ↗</a><span v-else aria-disabled="true">GOOGLE ↗</span>
        </nav>

        <nav class="contact-modal__legal" aria-label="Liens légaux">
          <a v-if="siteConfig.legalUrls.legalNotice" :href="siteConfig.legalUrls.legalNotice">{{ t('about.contact.legalNotice') }}</a><span v-else aria-disabled="true">{{ t('about.contact.legalNotice') }}</span>
          <i aria-hidden="true">·</i>
          <a v-if="siteConfig.legalUrls.privacy" :href="siteConfig.legalUrls.privacy">{{ t('about.contact.privacy') }}</a><span v-else aria-disabled="true">{{ t('about.contact.privacy') }}</span>
          <i aria-hidden="true">·</i>
          <a v-if="siteConfig.legalUrls.terms" :href="siteConfig.legalUrls.terms">{{ t('about.contact.terms') }}</a><span v-else aria-disabled="true">{{ t('about.contact.terms') }}</span>
        </nav>
      </div>
    </BaseModal>
  </section>
</template>

<style scoped>
.about-scene { z-index: 1; position: relative; display: grid; width: 100%; height: 100svh; min-height: 38rem; overflow: hidden; grid-template-rows: auto auto minmax(17rem, 1fr) auto; padding: clamp(1.5rem, 4vw, 3rem); animation: about-arrival 760ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.about-scene--emerging { z-index: 3; pointer-events: none; }
.about-scene--transitioned { animation: none; }
.about-scene::before { position: absolute; inset: 0; background: radial-gradient(circle at 56% 48%, rgb(72 130 151 / 7%), transparent 38%); content: ''; pointer-events: none; }
.about-scene::after { position: absolute; inset: clamp(0.8rem, 2vw, 1.5rem); border: 1px solid rgb(238 246 248 / 8%); content: ''; pointer-events: none; }
.about-scene--transitioned::before { animation: about-surface-arrival 760ms ease both; }
.about-scene__header { z-index: 6; color: rgb(235 243 246 / 34%); font-size: 0.52rem; letter-spacing: 0.2em; text-align: center; text-transform: uppercase; }
.about-scene__header p { margin: 0 0 0.35rem; color: rgb(235 243 246 / 45%); }
.about-scene__header h1 { margin: 0; color: rgb(245 249 251 / 88%); font-family: var(--font-body); font-size: clamp(0.72rem, 1.4vw, 0.9rem); font-weight: 400; letter-spacing: 0.34em; }
.about-scene__header span { display: block; margin-top: 0.35rem; color: rgb(190 222 234 / 42%); font-size: 0.46rem; letter-spacing: 0.14em; text-transform: none; }
.about-scene__intro { z-index: 3; width: min(52rem, 76vw); min-height: clamp(9.8rem, 21vh, 11.5rem); padding-top: clamp(1.1rem, 3vh, 2.4rem); }
.about-scene__intro-contact { justify-content: flex-start; margin-top: 0.85rem; }
.about-scene__intro-contact :deep(.contact-panel__links) { display: none; }
.about-scene__intro-contact :deep(button) { position: relative; display: inline-flex; min-width: 10.75rem; overflow: hidden; align-items: center; justify-content: space-between; padding: 0.8rem 0.9rem 0.8rem 1.05rem; border-color: rgb(227 243 248 / 34%); border-radius: var(--radius-sm); color: rgb(245 249 251 / 88%); background: linear-gradient(135deg, rgb(255 255 255 / 10%), rgb(255 255 255 / 3%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%), 0 0.8rem 2.4rem rgb(0 0 0 / 16%); backdrop-filter: blur(12px); transition: border-color 220ms ease, box-shadow 220ms ease, color 220ms ease, background 220ms ease, transform 220ms ease; }
.about-scene__intro-contact :deep(button)::before { position: absolute; inset: 0; background: radial-gradient(circle at 78% 50%, rgb(155 222 248 / 13%), transparent 62%); content: ''; opacity: 0; pointer-events: none; transition: opacity 250ms ease; }
.about-scene__intro-contact :deep(button:hover), .about-scene__intro-contact :deep(button:focus-visible) { border-color: rgb(137 218 250 / 72%); color: var(--color-accent); background: linear-gradient(135deg, rgb(255 255 255 / 14%), rgb(155 222 248 / 7%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 16%), 0 0 1.7rem rgb(95 194 234 / 18%); transform: translateY(-2px); }
.about-scene__intro-contact :deep(button:hover)::before, .about-scene__intro-contact :deep(button:focus-visible)::before { opacity: 1; }
.about-scene__intro-contact :deep(button span) { position: relative; margin-left: 1.4rem; color: var(--color-accent); font-size: 0.78rem; transition: transform 220ms ease; }
.about-scene__intro-contact :deep(button:is(:hover, :focus-visible) span) { transform: translate(0.14rem, -0.14rem); }
.about-scene__signature { margin: 0 0 0.65rem; color: rgb(155 222 248 / 52%); font-size: 0.5rem; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; }
.about-scene__statement-frame { position: relative; width: 100%; }
.about-scene__statement { min-height: 2.56em; margin: 0; color: rgb(246 249 250 / 88%); font-size: clamp(1.05rem, 2vw, 1.7rem); font-weight: 300; line-height: 1.28; text-wrap: balance; }
.about-scene__statement--reserved { visibility: hidden; }
.about-scene__statement--typed { position: absolute; inset: 0; width: 100%; }
.about-scene__statement--initial-reveal > span { display: inline-block; clip-path: inset(0 100% 0 0); }
.about-scene__statement--initial-reveal > span:first-child { animation: initial-title-reveal 780ms steps(28, end) 180ms forwards; }
.about-scene__statement--initial-reveal > span:last-child { animation: initial-title-reveal 780ms steps(27, end) 960ms forwards; }
.about-scene__statement > span { white-space: nowrap; }
.about-scene__intro-meta { margin: 0.55rem 0 0; color: rgb(190 222 234 / 42%); font-size: 0.48rem; letter-spacing: 0.13em; text-transform: uppercase; }
.about-scene__trajectory { position: relative; min-height: 0; margin: -1rem -1rem 0; }
.about-scene__header, .about-scene :deep(.global-hud), .about-scene__intro, .about-scene__intro-contact, .about-scene :deep(.scene-navigation), .about-scene__trajectory :deep(.trajectory-panel) { transition: opacity 420ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1); }
.about-scene__header, .about-scene__signature, .about-scene__intro-meta { transition: opacity 420ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1); }
.about-scene--emerging .about-scene__header, .about-scene--emerging :deep(.global-hud), .about-scene--emerging .about-scene__intro-contact, .about-scene--emerging :deep(.scene-navigation), .about-scene--emerging .about-scene__trajectory :deep(.trajectory-panel), .about-scene--emerging .about-scene__signature, .about-scene--emerging .about-scene__intro-meta { opacity: 0; transform: translateY(0.65rem); }
.trajectory-panel-enter-active, .trajectory-panel-leave-active { transition: opacity 220ms ease, transform 320ms ease; }
.trajectory-panel-enter-from, .trajectory-panel-leave-to { opacity: 0; transform: translateY(0.5rem); }
.intro-copy-enter-active, .intro-copy-leave-active { transition: opacity 220ms ease, transform 300ms ease; }
.intro-copy-enter-from { opacity: 0; transform: translateY(0.35rem); }
.intro-copy-leave-to { opacity: 0; transform: translateY(-0.2rem); }
.contact-modal { display: grid; gap: 1.35rem; }
.contact-modal__lead { margin: 0; color: rgb(218 235 242 / 58%); font-size: 0.72rem; line-height: 1.7; }
.contact-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.9rem; }
.contact-form label { display: grid; gap: 0.4rem; }
.contact-form label > span { color: rgb(190 222 234 / 55%); font-size: 0.46rem; letter-spacing: 0.17em; text-transform: uppercase; }
.contact-form__wide, .contact-form__status, .contact-form__submit { grid-column: 1 / -1; }
.contact-form :is(input, textarea) { width: 100%; border: 1px solid rgb(155 222 248 / 16%); border-radius: 2px; outline: 0; color: rgb(241 248 250 / 90%); background: linear-gradient(135deg, rgb(155 222 248 / 5%), rgb(1 4 8 / 42%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%); font: inherit; font-size: 0.72rem; }
.contact-form input { min-height: 2.65rem; padding: 0.7rem 0.8rem; }
.contact-form textarea { min-height: 7rem; padding: 0.8rem; line-height: 1.55; resize: vertical; }
.contact-form :is(input, textarea):focus { border-color: rgb(137 218 250 / 58%); background: rgb(155 222 248 / 7%); box-shadow: 0 0 0 1px rgb(137 218 250 / 8%), 0 0 1.15rem rgb(95 194 234 / 9%); }
.contact-form__status { min-height: 1em; margin: 0; color: rgb(190 222 234 / 68%); font-size: 0.56rem; letter-spacing: 0.08em; }
.contact-form__submit { position: relative; display: inline-flex; width: fit-content; min-width: 14rem; align-items: center; justify-content: space-between; justify-self: center; gap: 1.5rem; padding: 0.82rem 1rem; border: 1px solid rgb(155 222 248 / 34%); border-radius: 2px; color: rgb(241 248 250 / 86%); background: linear-gradient(135deg, rgb(255 255 255 / 8%), rgb(155 222 248 / 4%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%); font: inherit; font-size: 0.5rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: border-color 220ms ease, box-shadow 220ms ease, color 220ms ease, transform 220ms ease; }
.contact-form__submit:is(:hover, :focus-visible) { border-color: rgb(137 218 250 / 68%); color: var(--color-accent); box-shadow: 0 0 1.4rem rgb(95 194 234 / 14%); transform: translateY(-1px); }
.contact-form__submit:disabled { opacity: 0.58; cursor: wait; transform: none; }
.contact-modal__feedback { display: grid; min-height: 13rem; align-content: center; justify-items: center; gap: 0.65rem; border: 1px solid rgb(155 222 248 / 14%); background: radial-gradient(circle at 50% 50%, rgb(155 222 248 / 8%), transparent 70%); text-align: center; }
.contact-modal__feedback > span { color: var(--color-accent); font-size: 0.44rem; letter-spacing: 0.22em; }
.contact-modal__feedback h3 { margin: 0.35rem 0 0; color: rgb(241 248 250 / 92%); font-size: clamp(0.8rem, 2vw, 1rem); font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; }
.contact-modal__feedback p { margin: 0; color: rgb(218 235 242 / 68%); font-size: 0.7rem; line-height: 1.65; }
.contact-modal__feedback--error { border-color: rgb(255 181 171 / 16%); background: radial-gradient(circle at 50% 50%, rgb(150 58 51 / 8%), transparent 70%); }
.contact-modal__feedback--error > span { color: rgb(255 181 171 / 72%); }
.contact-modal__feedback-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.65rem; margin-top: 1rem; }
.contact-modal__feedback-actions button { padding: 0.65rem 0.8rem; border: 1px solid rgb(155 222 248 / 24%); border-radius: 2px; color: rgb(231 243 247 / 72%); background: rgb(155 222 248 / 4%); font: inherit; font-size: 0.46rem; letter-spacing: 0.13em; text-transform: uppercase; cursor: pointer; transition: border-color 200ms ease, color 200ms ease, background 200ms ease; }
.contact-modal__feedback-actions button:is(:hover, :focus-visible) { border-color: rgb(137 218 250 / 58%); color: var(--color-accent); background: rgb(155 222 248 / 8%); }
.contact-modal__external { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.65rem 1.2rem; padding: 0.8rem 1rem; border: 1px solid rgb(155 222 248 / 10%); border-radius: 2px; background: linear-gradient(135deg, rgb(155 222 248 / 4%), rgb(255 255 255 / 1.5%)); box-shadow: inset 0 1px 0 rgb(255 255 255 / 3%); backdrop-filter: blur(8px); }
.contact-modal__external :is(a, span), .contact-modal__legal :is(a, span) { color: rgb(190 222 234 / 48%); font-size: 0.46rem; letter-spacing: 0.13em; text-decoration: none; }
.contact-modal__external a:is(:hover, :focus-visible), .contact-modal__legal a:is(:hover, :focus-visible) { color: var(--color-accent); }
.contact-modal__external [aria-disabled='true'], .contact-modal__legal [aria-disabled='true'] { opacity: 0.42; }
.contact-modal__legal { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.45rem; padding-top: 0.9rem; border-top: 1px solid rgb(155 222 248 / 9%); }
.contact-modal__legal i { color: rgb(190 222 234 / 22%); font-style: normal; }
@keyframes about-arrival { from { opacity: 0; filter: blur(5px); transform: scale(0.96); } to { opacity: 1; filter: none; transform: scale(1); } }
@keyframes about-surface-arrival { from { opacity: 0; } to { opacity: 1; } }
@keyframes initial-title-reveal { to { clip-path: inset(0 0 0 0); } }
@media (max-width: 700px) {
  .about-scene { display: block; min-height: 100svh; height: 100svh; padding: 1.35rem; overflow-x: hidden; overflow-y: auto; }
  .about-scene > * { min-width: 0; }
  .about-scene__header { padding-top: 2.4rem; text-align: left; }
  .about-scene__intro { width: 100%; height: auto; min-height: 7rem; padding-top: 1.8rem; }
  .about-scene__intro-contact { margin-top: 1rem; }
  .about-scene__statement { max-width: 22rem; font-size: 1.12rem; }
  .about-scene__statement > span { white-space: normal; }
  .about-scene__trajectory { display: grid; width: 100%; min-width: 0; min-height: 13.5rem; margin: 1.35rem 0 1.15rem; gap: 0.8rem; }
  .contact-form { grid-template-columns: minmax(0, 1fr); }
  .contact-form > * { grid-column: 1; }
}
@media (prefers-reduced-motion: reduce) { .about-scene, .about-scene--transitioned::before { animation-duration: 120ms; transform: none; filter: none; } .about-scene__statement--initial-reveal > span { clip-path: none; animation: none; } .about-scene__header, .about-scene :deep(.global-hud), .about-scene__intro, .about-scene :deep(.scene-navigation), .about-scene__trajectory :deep(.trajectory-panel), .trajectory-panel-enter-active, .trajectory-panel-leave-active, .intro-copy-enter-active, .intro-copy-leave-active { transition-duration: 160ms; transform: none; } }
</style>
