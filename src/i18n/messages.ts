export const messages = {
  fr: {
    'scenes.connection': 'Connexion',
    'scenes.idea': 'Idée',
    'scenes.exploration': 'Exploration',
    'scenes.missions': 'Missions',
    'scenes.about': 'À propos + Contact',
    'connection.searching': 'Recherche du signal',
    'connection.found': 'Signal trouvé',
    'idea.tagline': 'Tout commence avec une idée.',
    'idea.takeoff': 'Décollage',
    'common.close': 'Fermer',
  },
  en: {
    'scenes.connection': 'Connection',
    'scenes.idea': 'Idea',
    'scenes.exploration': 'Exploration',
    'scenes.missions': 'Missions',
    'scenes.about': 'About + Contact',
    'connection.searching': 'Searching for signal',
    'connection.found': 'Signal found',
    'idea.tagline': 'Everything starts with an idea.',
    'idea.takeoff': 'Take off',
    'common.close': 'Close',
  },
  es: {
    'scenes.connection': 'Conexión',
    'scenes.idea': 'Idea',
    'scenes.exploration': 'Exploración',
    'scenes.missions': 'Misiones',
    'scenes.about': 'Acerca de + Contacto',
    'connection.searching': 'Buscando señal',
    'connection.found': 'Señal encontrada',
    'idea.tagline': 'Todo comienza con una idea.',
    'idea.takeoff': 'Despegue',
    'common.close': 'Cerrar',
  },
} as const

export type Locale = keyof typeof messages
export type MessageKey = keyof (typeof messages)['fr']
