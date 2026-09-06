import type { MessageKey } from '@/i18n/messages'

export type MissionId = 'nacodev' | 't-moment' | 'au-dela' | 'web-experiments' | 'private-systems'

export interface MissionVisual {
  color: string
  emissive: string
  atmosphere: string
  roughness: number
  metalness: number
  detail: 'mineral' | 'atmospheric' | 'ethereal' | 'fragmented' | 'networked'
}

export interface Mission {
  id: MissionId
  name: string
  nameKey: MessageKey
  descriptionKey: MessageKey
  statusKey: MessageKey
  categoryKey: MessageKey
  year?: string
  v1Url?: string
  projectUrl?: string
  position: [number, number, number]
  mobilePosition: [number, number, number]
  screenPosition: { x: number; y: number }
  mobileScreenPosition: { x: number; y: number }
  size: number
  rotationSpeed: number
  visual: MissionVisual
}

export interface WebExperienceProject {
  id: string
  name: string
  url: string
}

export const webExperienceProjects: readonly WebExperienceProject[] = [
  { id: 'granjon-energie', name: 'Granjon Énergie', url: 'https://granjonenergie.fr' },
  { id: 'sud-renov', name: 'Sud Renov', url: 'https://sud-renov.fr' },
  { id: 'tep-aquitaine', name: 'TEP Aquitaine', url: 'https://tep-aquitaine.fr' },
  { id: 'diva-drag-queen-france', name: 'Diva Drag Queen France', url: 'https://divadragqueen-france.fr' },
] as const

export const missions: readonly Mission[] = [
  {
    id: 'nacodev', name: 'NacoDev', nameKey: 'missions.items.nacodev.name',
    descriptionKey: 'missions.items.nacodev.description', statusKey: 'missions.status.active',
    categoryKey: 'missions.items.nacodev.category', year: '2021',
    // Add the archived NacoDev V1 URL here when it is available.
    v1Url: '',
    position: [0, 2.35, -0.35], mobilePosition: [0, 2.85, -0.3],
    screenPosition: { x: 50, y: 22 }, mobileScreenPosition: { x: 50, y: 15 },
    size: 0.88, rotationSpeed: 0.075,
    visual: { color: '#343b43', emissive: '#7797a4', atmosphere: '#a6dff3', roughness: 0.82, metalness: 0.28, detail: 'mineral' },
  },
  {
    id: 't-moment', name: 'T-Moment', nameKey: 'missions.items.tmoment.name',
    descriptionKey: 'missions.items.tmoment.description', statusKey: 'missions.status.development',
    categoryKey: 'missions.items.tmoment.category', year: '2026',
    // Add the future T-Moment product URL here when it is available.
    projectUrl: '',
    position: [4.2, 1.15, -0.8], mobilePosition: [1.58, 1.55, -0.6],
    screenPosition: { x: 78, y: 36 }, mobileScreenPosition: { x: 78, y: 32 },
    size: 0.92, rotationSpeed: 0.062,
    visual: { color: '#71848a', emissive: '#9cc4c9', atmosphere: '#c7edf0', roughness: 0.58, metalness: 0.08, detail: 'atmospheric' },
  },
  {
    id: 'au-dela', name: 'Au-delà', nameKey: 'missions.items.audela.name',
    descriptionKey: 'missions.items.audela.description', statusKey: 'missions.status.research',
    categoryKey: 'missions.items.audela.category',
    // Add the future Au-delà project URL here when it is available.
    projectUrl: '',
    position: [2.15, -2.05, 0.25], mobilePosition: [1.35, -1.45, 0.1],
    screenPosition: { x: 66, y: 72 }, mobileScreenPosition: { x: 72, y: 72 },
    size: 0.86, rotationSpeed: 0.048,
    visual: { color: '#24283e', emissive: '#5a6296', atmosphere: '#8d9ee9', roughness: 0.7, metalness: 0.16, detail: 'ethereal' },
  },
  {
    id: 'web-experiments', name: 'Expériences web', nameKey: 'missions.items.web.name',
    descriptionKey: 'missions.items.web.description', statusKey: 'missions.status.ongoing',
    categoryKey: 'missions.items.web.category', year: '2021 → AUJOURD’HUI',
    position: [-2.4, -2.15, -1.15], mobilePosition: [-1.25, -1.65, -0.8],
    screenPosition: { x: 34, y: 75 }, mobileScreenPosition: { x: 29, y: 74 },
    size: 0.9, rotationSpeed: 0.09,
    visual: { color: '#4a515e', emissive: '#6fa6bd', atmosphere: '#a4dff5', roughness: 0.46, metalness: 0.35, detail: 'fragmented' },
  },
  {
    id: 'private-systems', name: 'Systèmes privés', nameKey: 'missions.items.privateSystems.name',
    descriptionKey: 'missions.items.privateSystems.description', statusKey: 'missions.status.serviceActive',
    categoryKey: 'missions.items.privateSystems.category', year: '2026',
    position: [-3.8, 0.8, -0.2], mobilePosition: [-1.45, 0.95, -0.45],
    screenPosition: { x: 24, y: 40 }, mobileScreenPosition: { x: 24, y: 39 },
    size: 0.8, rotationSpeed: 0.056,
    visual: { color: '#451b24', emissive: '#91352f', atmosphere: '#c85d4d', roughness: 0.62, metalness: 0.3, detail: 'networked' },
  },
] as const
