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
    latitude: '48.8566° N',
    longitude: '02.3522° E',
  },
  linkedinUrl: 'https://www.linkedin.com/in/nicolas-freche-medina-55998442/',
  // TODO: renseigner l'URL du profil GitHub NacoDev.
  githubUrl: '',
  // TODO: renseigner l'URL de la fiche Google Business NacoDev.
  googleBusinessUrl: '',
  legalUrls: {
    // TODO: renseigner les routes légales lorsque leurs pages seront disponibles.
    legalNotice: '',
    privacy: '',
    terms: '',
  },
}
