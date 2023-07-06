import { format as dformat } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { datesLocale } from './locales'

export const useDateFns = () => {
  const { i18n } = useTranslation()
  return {
    format: (date: Date | number, format: string) => dformat(date, format, { locale: datesLocale(i18n.language) }),
  }
}
