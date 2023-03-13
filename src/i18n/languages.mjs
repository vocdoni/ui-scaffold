/**
  This file needs to be either mjs or js in order to properly import it
  from every place where it's required (like i18next-parser.config.mjs).

  Also take in mind that, if you add or remove any languages, you'll also need
  to update locales/index.ts
*/

const languages = ['ca', 'es', 'en']

export default languages
