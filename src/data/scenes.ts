import type { MessageKey } from '@/i18n/messages'

export type SceneId = 'connection' | 'idea' | 'exploration' | 'missions' | 'about'
export interface SceneDefinition { id: SceneId; titleKey: MessageKey }

export const scenes: readonly SceneDefinition[] = [
  { id: 'connection', titleKey: 'scenes.connection' },
  { id: 'idea', titleKey: 'scenes.idea' },
  { id: 'exploration', titleKey: 'scenes.exploration' },
  { id: 'missions', titleKey: 'scenes.missions' },
  { id: 'about', titleKey: 'scenes.about' },
]
