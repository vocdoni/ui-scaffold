import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const getDefaultElectionState = () => ({
  loading: false,
  loaded: true,
  election: { organizationId: 'org-1' },
  connected: false,
})

const getDefaultClientState = () => ({
  account: { address: 'org-1' },
  connected: false,
})

const states = {
  election: getDefaultElectionState(),
  client: getDefaultClientState(),
}

vi.mock('@vocdoni/react-providers', () => ({
  ElectionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useElection: () => states.election,
  useClient: () => states.client,
  __setElectionState: (next: Partial<typeof states.election>) =>
    Object.assign(states.election, getDefaultElectionState(), next),
  __setClientState: (next: Partial<typeof states.client>) =>
    Object.assign(states.client, getDefaultClientState(), next),
}))

vi.mock('@vocdoni/sdk', () => ({
  InvalidElection: class InvalidElection {},
}))

vi.mock('@vocdoni/chakra-components', () => ({
  ElectionTitle: () => <div>ElectionTitle</div>,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? _key,
  }),
}))

vi.mock('~components/Process/ActionsMenu', () => ({
  ActionsMenu: () => <div>ActionsMenu</div>,
}))

vi.mock('~components/Process/Aside', () => ({
  CensusConnectButton: () => <button>Connect</button>,
}))

vi.mock('~components/Process/LogoutButton', () => ({
  default: () => <button>Logout</button>,
}))

describe('SharedCensus', () => {
  const originalProcessIds = import.meta.env.PROCESS_IDS
  const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  beforeEach(() => {
    vi.resetModules()
    import.meta.env.PROCESS_IDS = 'id-1'
    states.election = getDefaultElectionState()
    states.client = getDefaultClientState()
    scrollSpy.mockClear()
  })

  afterEach(() => {
    import.meta.env.PROCESS_IDS = originalProcessIds
  })

  it('scrolls to top after login completes', async () => {
    states.election.loading = true
    states.election.loaded = false

    const { default: SharedCensus } = await import('./SharedCensus')
    const { rerender } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SharedCensus />
      </MemoryRouter>
    )

    expect(scrollSpy).not.toHaveBeenCalled()

    // @ts-expect-error access to mocked methods (not in the original types)
    const { __setElectionState, __setClientState } = await import('@vocdoni/react-providers')
    __setElectionState({ loading: false, loaded: true, connected: true })

    rerender(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SharedCensus />
      </MemoryRouter>
    )

    expect(scrollSpy).toHaveBeenCalledTimes(1)
  })
})
