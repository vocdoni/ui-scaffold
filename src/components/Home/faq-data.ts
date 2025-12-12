import type { TFunction } from 'i18next'

const HOME_FAQ_KEYS = Array.from({ length: 45 }, (_, index) => `home.faqs.faq_${index + 1}`)

export const getHomeFaqs = (t: TFunction, limit?: number) => {
  const entries = HOME_FAQ_KEYS.map((key) => ({
    title: t(`${key}.title`),
    description: t(`${key}.description`),
  }))

  if (typeof limit === 'number') {
    return entries.slice(0, limit)
  }

  return entries
}
