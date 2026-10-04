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
  googleBusinessUrl: 'https://www.google.com/maps/search/?api=1&query=NacoDev%2C%205%20rue%20du%20Tuqu%C3%A9ou%2C%2040990%20Saint-Paul-l%C3%A8s-Dax',
}
