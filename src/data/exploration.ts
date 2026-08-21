import type { MessageKey } from '@/i18n/messages'

export type ExplorationAxisId = 'ideas' | 'products' | 'systems' | 'projects'

export interface ExplorationAxis {
  id: ExplorationAxisId
  labelKey: MessageKey
  descriptionKey: MessageKey
  position: { x: number; y: number; z: number }
  hoverOffset: { x: number; y: number }
}

export const explorationAxes: readonly ExplorationAxis[] = [
  { id: 'ideas', labelKey: 'exploration.axes.ideas.label', descriptionKey: 'exploration.axes.ideas.description', position: { x: -24, y: -21, z: 58 }, hoverOffset: { x: -6, y: -5 } },
  { id: 'products', labelKey: 'exploration.axes.products.label', descriptionKey: 'exploration.axes.products.description', position: { x: 24, y: -16, z: -12 }, hoverOffset: { x: 5.28, y: -3.52 } },
  { id: 'systems', labelKey: 'exploration.axes.systems.label', descriptionKey: 'exploration.axes.systems.description', position: { x: -17, y: 25, z: -34 }, hoverOffset: { x: -3.74, y: 5.5 } },
  { id: 'projects', labelKey: 'exploration.axes.projects.label', descriptionKey: 'exploration.axes.projects.description', position: { x: 20, y: 24, z: 72 }, hoverOffset: { x: 6, y: 5 } },
] as const

export const explorationConnections: readonly [ExplorationAxisId, ExplorationAxisId][] = [
  ['ideas', 'products'], ['ideas', 'systems'], ['ideas', 'projects'],
  ['products', 'systems'], ['products', 'projects'], ['systems', 'projects'],
] as const
