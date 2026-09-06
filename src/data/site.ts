interface SiteConfig {
  coordinates: {
    latitude: string
    longitude: string
  }
  linkedinUrl: string
  githubUrl: string
  googleBusinessUrl: string
  legalUrls: {
    legalNotice: string
    privacy: string
    terms: string
  }
}

export const siteConfig: SiteConfig = {
  coordinates: {
    latitude: '43.7382° N',
    longitude: '1.0476° W',
  },
  linkedinUrl: 'https://www.linkedin.com/in/nicolas-freche-medina-55998442/',
  // TODO: renseigner l'URL du profil GitHub NacoDev.
  githubUrl: '',
  googleBusinessUrl: 'https://share.google/uKtSugzWM1rFpQjSa',
  legalUrls: {
    // TODO: renseigner les routes légales lorsque leurs pages seront disponibles.
    legalNotice: '',
    privacy: '',
    terms: '',
  },
}
