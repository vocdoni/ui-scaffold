import { formatDistance, Locale } from 'date-fns'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languages from './languages.mjs'
import { dateLocales, translations } from './locales'

const i18n = i18next.createInstance()
const fallbackLng = 'en'
const storedLang = () => {
  if (window && 'localStorage' in window) {
    return window.localStorage.getItem('vocdoni.lang') || fallbackLng
  }
  return fallbackLng
}

i18n.use(initReactI18next).init({
  fallbackLng,
  debug: process.env.NODE_ENV === 'development',
  defaultNS: 'translation',
  lng: storedLang(),
  interpolation: {
    escapeValue: false,
  },
  returnEmptyString: false,
})

for (const lang of languages) {
  if (typeof translations[lang] !== 'undefined') {
    i18n.addResourceBundle(lang, 'translation', translations[lang])
  }
}

i18n.services.formatter?.add('relative', (value: any, lng: string | undefined, options: any) => {
  const opts: { locale?: Locale } = {}
  const now = new Date()
  if (lng && lng !== 'en') {
    opts.locale = dateLocales[lng]
  }

  const relative = formatDistance(now, value, opts)

  if (!options.future && !options.past) {
    return relative
  }
  if (now < value) {
    return options.future.replace('%time', relative)
  }
  return options.past.replace('%time', relative)
})

export default i18n
