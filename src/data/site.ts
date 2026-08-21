interface SiteConfig {
  coordinates: {
    latitude: string
    longitude: string
  }
  googleBusinessUrl: string
}

export const siteConfig: SiteConfig = {
  coordinates: {
    latitude: '48.8566° N',
    longitude: '02.3522° E',
  },
  // TODO: renseigner l'URL de la fiche Google Business NacoDev.
  googleBusinessUrl: '',
}
