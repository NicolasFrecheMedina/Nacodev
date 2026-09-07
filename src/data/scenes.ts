import type { MessageKey } from '@/i18n/messages'

export type SceneId = 'connection' | 'idea' | 'exploration' | 'missions' | 'about'
export interface SceneDefinition {
  id: SceneId
  titleKey: MessageKey
  hud?: {
    code: string
    step: number
  }
}

export const scenes: readonly SceneDefinition[] = [
  { id: 'connection', titleKey: 'scenes.connection' },
  { id: 'idea', titleKey: 'scenes.idea', hud: { code: 'NCD - IDA', step: 2 } },
  { id: 'exploration', titleKey: 'scenes.exploration', hud: { code: 'NCD - XPLR', step: 3 } },
  { id: 'missions', titleKey: 'scenes.missions', hud: { code: 'NCD - MSN-SYS', step: 4 } },
  { id: 'about', titleKey: 'scenes.about', hud: { code: 'NCD - TRJ', step: 5 } },
]

export const sceneById = Object.fromEntries(scenes.map((scene) => [scene.id, scene])) as Record<SceneId, SceneDefinition>
export const sceneStepTotal = scenes.length
