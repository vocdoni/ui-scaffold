import { Locale } from 'date-fns'
/**
 * If you add or remove any languages, remember to also update languges.mjs
 */
import ca from './ca.json'
import en from './en.json'
import es from './es.json'

// no need to import english here, since it's date-fns default language
import { ca as dca } from 'date-fns/locale/ca'
import { es as des } from 'date-fns/locale/es'

export const translations: { [key: string]: any } = {
  ca,
  en,
  es,
}

export const dateLocales: { [key: string]: Locale } = {
  ca: dca,
  es: des,
}

export const datesLocale = (lang?: string) => {
  if (!lang) return
  if (!dateLocales.hasOwnProperty(lang)) return

  return dateLocales[lang]
}
