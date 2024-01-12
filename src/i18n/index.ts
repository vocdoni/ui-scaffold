import { format, formatDistance, Locale } from 'date-fns'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { dateLocales, translations } from './locales'
import BrowserLanguageDetector from 'i18next-browser-languagedetector'

const i18n = i18next.createInstance()

i18n
  .use(BrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: import.meta.env.features.languages[0],
    debug: import.meta.env.NODE_ENV === 'development',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
  })

for (const lang of import.meta.env.features.languages) {
  if (typeof translations[lang] !== 'undefined') {
    i18n.addResourceBundle(lang, 'translation', translations[lang])
  }
}

/**
 * Configurable way of translating relative times (like "3 months ago" or "in 5 days")
 */
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

/**
 * Interpolates a duration between date.begin and date.end
 */
i18n.services.formatter?.add('duration', (value: any, lng: string | undefined, options: any) => {
  const opts: { locale?: Locale } = {}
  if (lng && lng !== 'en') {
    opts.locale = dateLocales[lng]
  }

  return formatDistance(value.begin, value.end, opts)
})

/**
 * A cooler way of formatting dates than the one provided by i18next
 */
i18n.services.formatter?.add('format', (value: any, lng: string | undefined, options: any) => {
  const opts: { locale?: Locale } = {}
  if (lng && lng !== 'en') {
    opts.locale = dateLocales[lng]
  }

  return format(value, options.format, opts)
})

/**
 * Uppercase
 */
i18n.services.formatter?.add('uppercase', (value: string, lng: string | undefined, options: any) =>
  value.toLocaleUpperCase(lng)
)

/**
 * Lowercase
 */
i18n.services.formatter?.add('lowercase', (value: string, lng: string | undefined, options: any) =>
  value.toLocaleLowerCase(lng)
)

export default i18n
