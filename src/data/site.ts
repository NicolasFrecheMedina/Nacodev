interface SiteConfig {
  coordinates: {
    latitude: string
    longitude: string
  }
  linkedinCompanyUrl: string
  linkedinPersonalUrl: string
  githubUrl: string
  googleBusinessUrl: string
}

export const siteConfig: SiteConfig = {
  coordinates: {
    latitude: '43.7382° N',
    longitude: '1.0476° W',
  },
  linkedinCompanyUrl: 'https://fr.linkedin.com/company/nacodev',
  linkedinPersonalUrl: 'https://www.linkedin.com/in/nicolas-freche-medina-55998442/',
  githubUrl: 'https://github.com/NicolasFrecheMedina',
  googleBusinessUrl: 'https://share.google/uKtSugzWM1rFpQjSa',
}
