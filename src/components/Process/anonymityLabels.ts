import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'

/**
 * The mechanism that unlinks a ballot from the voter who cast it.
 *
 * Only `blind-csp` exists here. The other mechanism the protocol has —
 * zero-knowledge proof of census membership — is a *vote mode*, not a census
 * setting, and this app has no field that reports it: `CensusSpec.anonymous`
 * documents itself as "unrelated to zk-SNARK anonymous voting: the vote
 * envelope's anonymous flag stays false". Naming zk from the data we have would
 * therefore be an invention, so it is left out until a field exposes it. The
 * union and `mechanism` field exist so adding it then is additive.
 */
export type AnonymityMechanism = 'blind-csp'

export type AnonymityLabels = {
  title: string
  short: string
  description: string
  /** Null when ballots are not anonymous — there is no mechanism to name. */
  mechanism: AnonymityMechanism | null
  /** Technology name, e.g. "Blind signature". Only set alongside `mechanism`. */
  mechanismTitle?: string
  /** One sentence on how that technology achieves it. Only set alongside `mechanism`. */
  mechanismDescription?: string
}

/**
 * The two voter-anonymity modes, as the organizer and the voter see them.
 *
 * Both are backed by the same CSP census; the difference is whether the CSP
 * blind-signs a ballot it cannot read (`CensusSpec.anonymous`). Kept in one
 * module so the builder, the dashboard, the public page, the PDF report and the
 * vote receipt cannot drift apart — the whole feature rests on the two terms
 * meaning the same thing everywhere.
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
 * summaries, `short` the one-word form for tight rows, `description` the one
 * sentence that explains the mode, and `mechanismDescription` the one that
 * names the technology behind it — the same ones everywhere they are shown.
 *
 * Takes `t` rather than calling `useTranslation` so the PDF report can use it:
 * `buildCertificateData` is a plain function and cannot call a hook. Prefer
 * {@link useAnonymityLabels} from a component.
 */
export const getAnonymityLabels = (t: TFunction, anonymous?: boolean): AnonymityLabels =>
  anonymous
    ? {
        title: t('process.anonymity.anonymous.title', { defaultValue: 'Anonymous vote' }),
        short: t('process.anonymity.anonymous.short', { defaultValue: 'Anonymous' }),
        description: t('process.anonymity.anonymous.description', {
          defaultValue: 'Nobody sees who voted what, and no vote can be traced back to a voter.',
        }),
        mechanism: 'blind-csp',
        mechanismTitle: t('process.anonymity.mechanism.blind_csp.title', { defaultValue: 'Blind signature' }),
        mechanismDescription: t('process.anonymity.mechanism.blind_csp.description', {
          defaultValue:
            'The credential service provider authorized each ballot with a blind signature: it never saw the ballot or the address that cast it, so it keeps no record linking a voter to their vote.',
        }),
      }
    : {
        title: t('process.anonymity.private.title', { defaultValue: 'Private vote' }),
        short: t('process.anonymity.private.short', { defaultValue: 'Private' }),
        description: t('process.anonymity.private.description', {
          defaultValue: 'Nobody sees who voted what, but a vote could still be traced back to a voter.',
        }),
        mechanism: null,
      }

/** {@link getAnonymityLabels} bound to the active translation. */
export const useAnonymityLabels = (anonymous?: boolean): AnonymityLabels => {
  const { t } = useTranslation()

  return getAnonymityLabels(t, anonymous)
}
