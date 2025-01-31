import i18n from '~i18n/index'

export const currency = (amount: number, currency: string = 'EUR') => {
  const formatted = (amount / 100).toLocaleString(i18n.resolvedLanguage, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'symbol',
  })

  // Ensure the € sign is placed after the amount
  if (currency === 'EUR' && !formatted.endsWith('€')) {
    return `${formatted.replace('€', '').trim()} €`
  }

  return formatted
}
