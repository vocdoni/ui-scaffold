import { getAnonymityLabels } from './anonymityLabels'

const plainT = ((key: string, options?: { defaultValue?: string }) => options?.defaultValue ?? key) as never

describe('getAnonymityLabels', () => {
  it('names the mechanism behind an anonymous process', () => {
    const labels = getAnonymityLabels(plainT, true)

    expect(labels.mechanism).toBe('blind-csp')
    expect(labels.title).toBe('Anonymous vote')
    expect(labels.short).toBe('Anonymous')
    expect(labels.mechanismTitle).toBe('Blind signature')
    expect(labels.mechanismDescription).toContain('blind signature')
  })

  it('names no mechanism for a private process, which has none', () => {
    const labels = getAnonymityLabels(plainT, false)

    expect(labels.mechanism).toBeNull()
    expect(labels.title).toBe('Private vote')
    expect(labels.short).toBe('Private')
    expect(labels.mechanismTitle).toBeUndefined()
    expect(labels.mechanismDescription).toBeUndefined()
  })

  it('reads an absent flag as private, since the API omits it when false', () => {
    expect(getAnonymityLabels(plainT, undefined).mechanism).toBeNull()
    expect(getAnonymityLabels(plainT, undefined).title).toBe('Private vote')
  })

  it('never describes either mode as secret — that is a different setting', () => {
    // Ballot secrecy (`secretUntilTheEnd`) is unrelated to anonymity, and conflating the two is
    // the confusion this copy exists to prevent. See the glossaries in `src/i18n/contexts/`.
    for (const anonymous of [true, false]) {
      const labels = getAnonymityLabels(plainT, anonymous)
      const copy = [labels.title, labels.short, labels.description, labels.mechanismDescription ?? ''].join(' ')

      expect(copy.toLowerCase()).not.toContain('secret')
    }
  })
})
