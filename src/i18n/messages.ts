export const messages = {
  fr: {
    'scenes.connection': 'Connexion',
    'scenes.idea': 'Idée',
    'scenes.exploration': 'Exploration',
    'scenes.missions': 'Missions',
    'scenes.about': 'À propos + Contact',
    'common.close': 'Fermer',
  },
  en: {
    'scenes.connection': 'Connection',
    'scenes.idea': 'Idea',
    'scenes.exploration': 'Exploration',
    'scenes.missions': 'Missions',
    'scenes.about': 'About + Contact',
    'common.close': 'Close',
  },
  es: {
    'scenes.connection': 'Conexión',
    'scenes.idea': 'Idea',
    'scenes.exploration': 'Exploración',
    'scenes.missions': 'Misiones',
    'scenes.about': 'Acerca de + Contacto',
    'common.close': 'Cerrar',
  },
} as const

export type Locale = keyof typeof messages
export type MessageKey = keyof (typeof messages)['fr']
