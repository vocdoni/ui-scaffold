/**
  This file needs to be either mjs or js in order to properly import it
  from every place where it's required (like i18next-parser.config.mjs).

  Also take in mind that, if you add or remove any languages, you'll also need
  to update locales/index.ts
*/

export const LanguagesSlice = {
  en: 'English',
  es: 'Spanish',
  ca: 'Catalan',
  it: 'Italiano',
}

// t('language.english', 'English')
// t('language.spanish', 'Spanish')
// t('language.catalan', 'Catalan')
// t('language.italian', 'Italiano')

const languages = Object.keys(LanguagesSlice)

export default languages
