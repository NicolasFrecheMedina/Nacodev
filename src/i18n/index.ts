import { readonly, ref } from 'vue'
import { messages, type Locale, type MessageKey } from './messages'

export const supportedLocales: readonly Locale[] = ['fr', 'en', 'es']
const locale = ref<Locale>('fr')

function setLocale(nextLocale: Locale) {
  locale.value = nextLocale
  document.documentElement.lang = nextLocale
}

function t(key: MessageKey): string {
  return messages[locale.value][key] ?? messages.fr[key]
}

export function useI18n() {
  return { locale: readonly(locale), setLocale, supportedLocales, t }
}
