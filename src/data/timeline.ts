import type { Locale, MessageKey } from '@/i18n/messages'

export type TimelineStepId = 'elsewhere' | 'field' | 'digital' | 'systems' | 'ideas'

export interface TimelineStep {
  id: TimelineStepId
  titleKey: MessageKey
  statementKey: MessageKey
  metaKey: MessageKey
  descriptionKey: MessageKey
  statementBreakAfter: Record<Locale, number>
  progress: number
  position: { x: number; y: number; scale: number }
}

export const trajectoryPath = 'M -40 350 C 70 340 100 210 180 210 S 310 305 408 305 S 540 245 612 245 S 750 110 864 110 S 990 95 1056 90 S 1160 70 1240 55'

export const timelineSteps: readonly TimelineStep[] = [
  {
    id: 'elsewhere',
    titleKey: 'about.steps.elsewhere.title',
    statementKey: 'about.steps.elsewhere.statement',
    metaKey: 'about.steps.elsewhere.meta',
    descriptionKey: 'about.steps.elsewhere.description',
    statementBreakAfter: { fr: 5, en: 7, es: 4 },
    progress: 19.0562,
    position: { x: 15, y: 42, scale: 0.76 },
  },
  {
    id: 'field',
    titleKey: 'about.steps.field.title',
    statementKey: 'about.steps.field.statement',
    metaKey: 'about.steps.field.meta',
    descriptionKey: 'about.steps.field.description',
    statementBreakAfter: { fr: 6, en: 6, es: 4 },
    progress: 36.9031,
    position: { x: 34, y: 61, scale: 1 },
  },
  {
    id: 'digital',
    titleKey: 'about.steps.digital.title',
    statementKey: 'about.steps.digital.statement',
    metaKey: 'about.steps.digital.meta',
    descriptionKey: 'about.steps.digital.description',
    statementBreakAfter: { fr: 8, en: 6, es: 8 },
    progress: 52.1775,
    position: { x: 51, y: 49, scale: 1.18 },
  },
  {
    id: 'systems',
    titleKey: 'about.steps.systems.title',
    statementKey: 'about.steps.systems.statement',
    metaKey: 'about.steps.systems.meta',
    descriptionKey: 'about.steps.systems.description',
    statementBreakAfter: { fr: 8, en: 5, es: 8 },
    progress: 72.9449,
    position: { x: 72, y: 22, scale: 0.92 },
  },
  {
    id: 'ideas',
    titleKey: 'about.steps.ideas.title',
    statementKey: 'about.steps.ideas.statement',
    metaKey: 'about.steps.ideas.meta',
    descriptionKey: 'about.steps.ideas.description',
    statementBreakAfter: { fr: 5, en: 5, es: 4 },
    progress: 86.6824,
    position: { x: 88, y: 18, scale: 0.72 },
  },
] as const
