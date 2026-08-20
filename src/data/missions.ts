import type { MessageKey } from '@/i18n/messages'

export type MissionId = 'nacodev' | 't-moment' | 'au-dela' | 'web-experiments'

export interface MissionVisual {
  color: string
  emissive: string
  atmosphere: string
  roughness: number
  metalness: number
  detail: 'mineral' | 'atmospheric' | 'ethereal' | 'fragmented'
}

export interface Mission {
  id: MissionId
  name: string
  nameKey: MessageKey
  descriptionKey: MessageKey
  statusKey: MessageKey
  categoryKey: MessageKey
  year?: string
  position: [number, number, number]
  mobilePosition: [number, number, number]
  screenPosition: { x: number; y: number }
  mobileScreenPosition: { x: number; y: number }
  size: number
  rotationSpeed: number
  visual: MissionVisual
}

export const missions: readonly Mission[] = [
  {
    id: 'nacodev', name: 'NacoDev', nameKey: 'missions.items.nacodev.name',
    descriptionKey: 'missions.items.nacodev.description', statusKey: 'missions.status.active',
    categoryKey: 'missions.items.nacodev.category', year: '2024',
    position: [-3.15, 1.3, -0.35], mobilePosition: [-1.15, 2.25, -0.3],
    screenPosition: { x: 27, y: 36 }, mobileScreenPosition: { x: 31, y: 24 },
    size: 0.88, rotationSpeed: 0.075,
    visual: { color: '#343b43', emissive: '#7797a4', atmosphere: '#a6dff3', roughness: 0.82, metalness: 0.28, detail: 'mineral' },
  },
  {
    id: 't-moment', name: 'T-Moment', nameKey: 'missions.items.tmoment.name',
    descriptionKey: 'missions.items.tmoment.description', statusKey: 'missions.status.development',
    categoryKey: 'missions.items.tmoment.category', year: '2026',
    position: [2.85, 1.35, -0.8], mobilePosition: [1.2, 0.82, -0.6],
    screenPosition: { x: 70, y: 34 }, mobileScreenPosition: { x: 68, y: 43 },
    size: 0.92, rotationSpeed: 0.062,
    visual: { color: '#71848a', emissive: '#9cc4c9', atmosphere: '#c7edf0', roughness: 0.58, metalness: 0.08, detail: 'atmospheric' },
  },
  {
    id: 'au-dela', name: 'Au-delà', nameKey: 'missions.items.audela.name',
    descriptionKey: 'missions.items.audela.description', statusKey: 'missions.status.research',
    categoryKey: 'missions.items.audela.category',
    position: [-2.45, -1.75, 0.25], mobilePosition: [-1.18, -0.78, 0.1],
    screenPosition: { x: 32, y: 70 }, mobileScreenPosition: { x: 31, y: 63 },
    size: 0.86, rotationSpeed: 0.048,
    visual: { color: '#24283e', emissive: '#5a6296', atmosphere: '#8d9ee9', roughness: 0.7, metalness: 0.16, detail: 'ethereal' },
  },
  {
    id: 'web-experiments', name: 'Expériences web', nameKey: 'missions.items.web.name',
    descriptionKey: 'missions.items.web.description', statusKey: 'missions.status.ongoing',
    categoryKey: 'missions.items.web.category',
    position: [3.25, -1.7, -1.15], mobilePosition: [1.18, -2.28, -0.8],
    screenPosition: { x: 73, y: 69 }, mobileScreenPosition: { x: 68, y: 82 },
    size: 0.9, rotationSpeed: 0.09,
    visual: { color: '#4a515e', emissive: '#6fa6bd', atmosphere: '#a4dff5', roughness: 0.46, metalness: 0.35, detail: 'fragmented' },
  },
] as const
