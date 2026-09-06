<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const openModalInstances = new Set<symbol>()

const props = withDefaults(
  defineProps<{ open: boolean; title: string; closeLabel?: string; variant?: 'default' | 'transmission' | 'legal' }>(),
  { closeLabel: 'Fermer', variant: 'default' },
)

const emit = defineEmits<{ close: []; closed: [] }>()
const dialog = ref<HTMLElement | null>(null)
const modalInstance = Symbol('modal')
let previouslyFocused: HTMLElement | null = null

function updateBodyLock(isOpen: boolean) {
  if (isOpen) openModalInstances.add(modalInstance)
  else openModalInstances.delete(modalInstance)
  document.body.classList.toggle('has-open-modal', openModalInstances.size > 0)
}

function requestClose() {
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') requestClose()
}

watch(
  () => props.open,
  async (isOpen) => {
    updateBodyLock(isOpen)
    if (isOpen) {
      previouslyFocused = document.activeElement as HTMLElement | null
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      dialog.value?.focus()
    } else {
      window.removeEventListener('keydown', onKeydown)
      previouslyFocused?.focus()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  updateBodyLock(false)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="emit('closed')">
      <div v-if="open" class="modal" :class="`modal--${variant}`" role="presentation" @mousedown.self="requestClose">
        <section
          ref="dialog"
          class="modal__panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${$attrs.id ?? 'base-modal'}-title`"
          tabindex="-1"
        >
          <header class="modal__header">
            <h2 :id="`${$attrs.id ?? 'base-modal'}-title`">{{ title }}</h2>
            <button class="modal__close" type="button" :aria-label="closeLabel" @click="requestClose">
              <span aria-hidden="true">×</span>
            </button>
          </header>
          <div class="modal__body"><slot /></div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  place-items: center;
  padding: var(--space-md);
  overflow-y: auto;
  background: rgb(2 4 10 / 78%);
}

.modal__panel {
  width: min(100%, 40rem);
  max-height: min(48rem, calc(100dvh - 2 * var(--space-md)));
  overflow-y: auto;
  color: var(--color-ink);
  background: var(--color-surface);
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: var(--radius-sm);
  box-shadow: 0 1.5rem 5rem rgb(0 0 0 / 45%);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-bottom: 1px solid rgb(255 255 255 / 10%);
}

.modal__header h2 { margin: 0; font-size: 1.25rem; }
.modal__body { padding: var(--space-lg); }

.modal__close {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  color: inherit;
  font: inherit;
  font-size: 1.75rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  place-items: center;
  transition: transform 240ms ease;
}

.modal__close:hover { transform: rotate(90deg); }

:is(.modal--transmission, .modal--legal) { background: radial-gradient(circle at 50% 45%, rgb(18 43 55 / 38%), rgb(1 3 7 / 92%) 68%); }
:is(.modal--transmission, .modal--legal) .modal__panel { position: relative; width: min(100%, 48rem); border-color: rgb(155 222 248 / 24%); border-radius: 0; background: linear-gradient(145deg, rgb(11 20 28 / 97%), rgb(3 7 12 / 98%)); box-shadow: inset 0 0 4rem rgb(97 188 221 / 5%), 0 0 0 1px rgb(155 222 248 / 4%), 0 2rem 7rem rgb(0 0 0 / 72%); scrollbar-color: rgb(137 218 250 / 62%) rgb(1 4 8 / 55%); scrollbar-width: thin; }
:is(.modal--transmission, .modal--legal) .modal__panel::before { position: absolute; z-index: 2; inset: 0; background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgb(190 230 244 / 2.5%) 4px); content: ''; pointer-events: none; }
:is(.modal--transmission, .modal--legal) .modal__panel::after { position: absolute; top: -1px; left: 8%; width: 28%; height: 1px; background: var(--color-accent); box-shadow: 0 0 1rem rgb(155 222 248 / 65%); content: ''; }
:is(.modal--transmission, .modal--legal) .modal__header { padding-block: 1rem; border-color: rgb(155 222 248 / 12%); }
:is(.modal--transmission, .modal--legal) .modal__header h2 { font-size: clamp(0.78rem, 1.5vw, 1rem); font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase; }
:is(.modal--transmission, .modal--legal) .modal__body { padding: clamp(1.4rem, 4vw, 3rem); }
.modal--legal .modal__panel { width: min(100%, 68rem); }
.modal--legal .modal__body { padding: 0; }
.modal-enter-active, .modal-leave-active { transition: opacity 240ms ease; }
.modal-enter-active .modal__panel, .modal-leave-active .modal__panel {
  transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 240ms ease;
}
.modal-enter-from, .modal-leave-to, .modal-enter-from .modal__panel, .modal-leave-to .modal__panel { opacity: 0; }
.modal-enter-from .modal__panel, .modal-leave-to .modal__panel { transform: scaleX(0.92) scaleY(0.08); }

@media (prefers-reduced-motion: reduce) {
  .modal-enter-active, .modal-leave-active,
  .modal-enter-active .modal__panel, .modal-leave-active .modal__panel { transition-duration: 1ms; }
}
</style>
