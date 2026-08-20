import type { MessageKey } from '@/i18n/messages'

export type TimelineStepId = 'elsewhere' | 'field' | 'digital' | 'systems' | 'ideas'

export interface TimelineStep {
  id: TimelineStepId
  titleKey: MessageKey
  statementKey: MessageKey
  metaKey: MessageKey
  descriptionKey: MessageKey
  progress: number
  position: { x: number; y: number; scale: number }
}

export const trajectoryPath = 'M -30 420 C 120 390 95 145 280 180 S 460 465 610 315 S 760 70 920 165 S 1050 385 1230 245'

export const timelineSteps: readonly TimelineStep[] = [
  {
    id: 'elsewhere',
    titleKey: 'about.steps.elsewhere.title',
    statementKey: 'about.steps.elsewhere.statement',
    metaKey: 'about.steps.elsewhere.meta',
    descriptionKey: 'about.steps.elsewhere.description',
    progress: 18,
    position: { x: 15, y: 42, scale: 0.76 },
  },
  {
    id: 'field',
    titleKey: 'about.steps.field.title',
    statementKey: 'about.steps.field.statement',
    metaKey: 'about.steps.field.meta',
    descriptionKey: 'about.steps.field.description',
    progress: 37,
    position: { x: 34, y: 61, scale: 1 },
  },
  {
    id: 'digital',
    titleKey: 'about.steps.digital.title',
    statementKey: 'about.steps.digital.statement',
    metaKey: 'about.steps.digital.meta',
    descriptionKey: 'about.steps.digital.description',
    progress: 56,
    position: { x: 51, y: 49, scale: 1.18 },
  },
  {
    id: 'systems',
    titleKey: 'about.steps.systems.title',
    statementKey: 'about.steps.systems.statement',
    metaKey: 'about.steps.systems.meta',
    descriptionKey: 'about.steps.systems.description',
    progress: 77,
    position: { x: 72, y: 30, scale: 0.92 },
  },
  {
    id: 'ideas',
    titleKey: 'about.steps.ideas.title',
    statementKey: 'about.steps.ideas.statement',
    metaKey: 'about.steps.ideas.meta',
    descriptionKey: 'about.steps.ideas.description',
    progress: 100,
    position: { x: 88, y: 45, scale: 0.72 },
  },
] as const
