import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languages from './languages.mjs'
import translation from './locales'

const i18n = i18next.createInstance()

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  preload: ['en'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
  returnEmptyString: false,
})

for (const lang of languages) {
  if (typeof translation[lang] !== 'undefined') {
    i18n.addResourceBundle(lang, 'translation', translation[lang])
  }
}

export default i18n
