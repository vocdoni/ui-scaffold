// import languages from '../languages.mjs'
import ca from './ca.json'
import en from './en.json'
import es from './es.json'

const translations: { [key: string]: any } = {
  ca,
  en,
  es,
}
// ;(async () => {
//   for (const lang of languages) {
//     const trans = await import(`./${lang}.json`)

//     translations[lang] = trans.default
//   }
// })()

// console.log('translations after foreach:', JSON.stringify(translations))

export default translations
