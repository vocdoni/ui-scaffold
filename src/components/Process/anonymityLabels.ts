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
 *
 * `title` is the full label ("Anonymous vote" / "Private vote") for cards and
 * summaries, `short` the one-word form for tight rows, and `description` the
 * one sentence that explains the mode — the same one everywhere it is shown.
 */
export const useAnonymityLabels = (anonymous?: boolean) => {
  const { t } = useTranslation()

  return anonymous
    ? {
        title: t('process.anonymity.anonymous.title', { defaultValue: 'Anonymous vote' }),
        short: t('process.anonymity.anonymous.short', { defaultValue: 'Anonymous' }),
        description: t('process.anonymity.anonymous.description', {
          defaultValue: 'Nobody sees who voted what, and no vote can be traced back to a voter.',
        }),
      }
    : {
        title: t('process.anonymity.private.title', { defaultValue: 'Private vote' }),
        short: t('process.anonymity.private.short', { defaultValue: 'Private' }),
        description: t('process.anonymity.private.description', {
          defaultValue: 'Nobody sees who voted what, but a vote could still be traced back to a voter.',
        }),
      }
}
