import { readonly, ref } from 'vue'
import { messages, type Locale, type MessageKey } from './messages'

export const supportedLocales: readonly Locale[] = ['fr', 'en', 'es']
const localeStorageKey = 'nacodev.locale'

function isSupportedLocale(value: string | null): value is Locale {
  return supportedLocales.some(candidate => candidate === value)
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'fr'

  try {
    const storedLocale = window.localStorage.getItem(localeStorageKey)
    return isSupportedLocale(storedLocale) ? storedLocale : 'fr'
  } catch {
    return 'fr'
  }
}

const locale = ref<Locale>(readStoredLocale())
const globalLocale = readonly(locale)

if (typeof document !== 'undefined') document.documentElement.lang = locale.value

function setLocale(nextLocale: Locale) {
  if (!isSupportedLocale(nextLocale)) return

  locale.value = nextLocale
  if (typeof document !== 'undefined') document.documentElement.lang = nextLocale

  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(localeStorageKey, nextLocale)
  } catch {
    // The in-memory locale remains global when storage is unavailable.
  }
}

function t(key: MessageKey): string {
  return messages[locale.value][key] ?? messages.fr[key]
}

export function useI18n() {
  return { locale: globalLocale, setLocale, supportedLocales, t }
}
