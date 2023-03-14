import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import languages from './languages.mjs'
import translations from './locales'

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

export default i18n
