import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useElection } from '@vocdoni/react-providers'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CensusTypes } from './Census/CensusType'
import LogoutButton from './LogoutButton'

let currentElection: any
let electionConnected = false
let walletConnected = false
let authenticated = false
let votedBallots: string | null = null
let canVote = false
let isInCensus = false
let votesLeft = 0
let votingLoading = false

const mockClearClient = vi.fn()
const mockClear = vi.fn()
const mockDisconnect = vi.fn()
const mockLogout = vi.fn()

vi.mock('@vocdoni/sdk', () => {
  class InvalidElection {}
  return {
    CensusType: { CSP: 'csp' },
    dotobject: (obj: any) => obj?.census ?? {},
    InvalidElection,
  }
})

vi.mock('@vocdoni/react-providers', () => ({
  useElection: () => ({
    election: currentElection,
    connected: electionConnected,
    clearClient: mockClearClient,
    isAbleToVote: canVote,
    isInCensus,
    votesLeft,
    voted: votedBallots,
    loading: { voting: votingLoading },
  }),
  useClient: () => ({
    clear: mockClear,
  }),
}))

vi.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: walletConnected,
  }),
  useDisconnect: () => ({
    disconnect: mockDisconnect,
  }),
}))

vi.mock('~components/Auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: authenticated,
    logout: mockLogout,
  }),
}))

vi.mock('@vocdoni/chakra-components', () => ({
  SpreadsheetAccess: (props: any) => <div data-testid='spreadsheet-access' {...props} />,
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Import after mocks so we get the mocked InvalidElection class
import { IInvalidElectionParameters, InvalidElection } from '@vocdoni/sdk'

const makeElection = (censusType: CensusTypes) => ({
  census: { type: censusType },
  meta: { census: { type: censusType } },
})

describe('LogoutButton', () => {
  beforeEach(() => {
    electionConnected = false
    walletConnected = false
    authenticated = false
    votedBallots = null
    canVote = false
    isInCensus = false
    votesLeft = 0
    votingLoading = false
    currentElection = makeElection(CensusTypes.CSP)

    mockClearClient.mockReset()
    mockClear.mockReset()
    mockDisconnect.mockReset()
    mockLogout.mockReset()

    mockClearClient.mockImplementation(() => {
      electionConnected = false
    })

    mockDisconnect.mockImplementation(() => {
      walletConnected = false
      electionConnected = false
    })

    mockLogout.mockImplementation(() => {
      authenticated = false
      electionConnected = false
    })

    mockClear.mockImplementation(() => {})
  })

  const VoteUiProbe = () => {
    const { isAbleToVote, voted } = useElection()
    return (
      <>
        {isAbleToVote && <div>vote-now</div>}
        {voted && <div>aside.has_already_voted</div>}
        <LogoutButton />
      </>
    )
  }

  it('returns null for an invalid election', () => {
    currentElection = new InvalidElection({} as IInvalidElectionParameters)
    electionConnected = true

    const { container } = render(<LogoutButton />)

    expect(container.innerHTML).toBe('')
  })

  it('returns null when neither app nor wallet is connected', () => {
    const { container } = render(<LogoutButton />)

    expect(container.innerHTML).toBe('')
  })

  it('shows spreadsheet access control when connected to a spreadsheet census', () => {
    currentElection = makeElection(CensusTypes.Spreadsheet)
    electionConnected = true

    render(<LogoutButton />)

    expect(screen.getByTestId('spreadsheet-access')).toBeInTheDocument()
    expect(screen.queryByText('logout')).not.toBeInTheDocument()
  })

  it('shows logout for web3 sessions and hides after disconnecting', () => {
    currentElection = makeElection(CensusTypes.Web3)
    electionConnected = true
    walletConnected = true

    const { rerender } = render(<LogoutButton />)

    expect(screen.getByText('logout')).toBeInTheDocument()

    fireEvent.click(screen.getByText('logout'))
    rerender(<LogoutButton />)

    expect(screen.queryByText('logout')).not.toBeInTheDocument()
  })

  it('shows logout for CSP sessions and hides after logging out', () => {
    currentElection = makeElection(CensusTypes.CSP)
    electionConnected = true
    authenticated = true

    const { rerender } = render(<LogoutButton />)

    expect(screen.getByText('logout')).toBeInTheDocument()

    fireEvent.click(screen.getByText('logout'))
    rerender(<LogoutButton />)

    expect(screen.queryByText('logout')).not.toBeInTheDocument()
  })

  it('should remove voting UI after logging out from a web3 session with a stored vote', () => {
    currentElection = makeElection(CensusTypes.Web3)
    electionConnected = true
    walletConnected = true
    votedBallots = 'vote-id'
    canVote = true
    isInCensus = true

    const { rerender } = render(<VoteUiProbe />)

    expect(screen.getByText('logout')).toBeInTheDocument()
    expect(screen.getByText('vote-now')).toBeInTheDocument()
    expect(screen.getByText('aside.has_already_voted')).toBeInTheDocument()
    screen.debug()

    fireEvent.click(screen.getByText('logout'))
    rerender(<VoteUiProbe />)

    screen.debug()

    expect(screen.queryByText('logout')).not.toBeInTheDocument()
    expect(screen.queryByText('vote-now')).not.toBeInTheDocument()
    expect(screen.queryByText('aside.has_already_voted')).not.toBeInTheDocument()
  })
})
