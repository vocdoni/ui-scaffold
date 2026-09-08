import { useTranslation } from 'react-i18next'

/**
 * The two voter-anonymity modes, as the organizer and the voter see them.
 *
 * Both are backed by the same CSP census; the difference is whether the CSP
 * blind-signs a ballot it cannot read (`CensusSpec.anonymous`). Kept in one
 * module so the builder, the dashboard, the public page and the vote receipt
 * cannot drift apart — the whole feature rests on the two terms meaning the
 * same thing everywhere.
 *
 * The description sentences share their first half on purpose: what is true
 * of both modes (nobody sees who voted what) is said the same way, so the only
 * thing left to read is the difference.
 *
 * Deliberately never says "secret": ballot secrecy (`secretUntilTheEnd`) is a
 * different setting, and conflating the two is the confusion this wording
 * exists to prevent. See the glossaries in `src/i18n/contexts/`.
 */
const ANONYMITY_LABELS = {
  private: {
    title: { key: 'process.anonymity.private.title', defaultValue: 'Private vote' },
    short: { key: 'process.anonymity.private.short', defaultValue: 'Private' },
    description: {
      key: 'process.anonymity.private.description',
      defaultValue: 'Nobody sees who voted what, but a vote could still be traced back to a voter.',
    },
  },
  anonymous: {
    title: { key: 'process.anonymity.anonymous.title', defaultValue: 'Anonymous vote' },
    short: { key: 'process.anonymity.anonymous.short', defaultValue: 'Anonymous' },
    description: {
      key: 'process.anonymity.anonymous.description',
      defaultValue: 'Nobody sees who voted what, and no vote can be traced back to a voter.',
    },
  },
} as const

// The keys above are looked up through a variable, so the extractor cannot see
// them. These hints keep them registered on `pnpm translations`:
// t('process.anonymity.private.title', { defaultValue: 'Private vote' })
// t('process.anonymity.private.short', { defaultValue: 'Private' })
// t('process.anonymity.private.description', { defaultValue: 'Nobody sees who voted what, but a vote could still be traced back to a voter.' })
// t('process.anonymity.anonymous.title', { defaultValue: 'Anonymous vote' })
// t('process.anonymity.anonymous.short', { defaultValue: 'Anonymous' })
// t('process.anonymity.anonymous.description', { defaultValue: 'Nobody sees who voted what, and no vote can be traced back to a voter.' })

const mode = (anonymous?: boolean) => ANONYMITY_LABELS[anonymous ? 'anonymous' : 'private']

/** Full label ("Anonymous vote" / "Private vote"), for cards and summaries. */
export const useAnonymityLabel = (anonymous?: boolean): string => {
  const { t } = useTranslation()
  const { key, defaultValue } = mode(anonymous).title

  return t(key, { defaultValue })
}

/** One-word label ("Anonymous" / "Private"), for tight rows and segment buttons. */
export const useAnonymityShortLabel = (anonymous?: boolean): string => {
  const { t } = useTranslation()
  const { key, defaultValue } = mode(anonymous).short

  return t(key, { defaultValue })
}

/** The one sentence that explains the mode — the same one everywhere it is shown. */
export const useAnonymityDescription = (anonymous?: boolean): string => {
  const { t } = useTranslation()
  const { key, defaultValue } = mode(anonymous).description

  return t(key, { defaultValue })
}
