import LegalNotice, { StaticLegalNotice } from './LegalNotice'
import { render, screen } from '~src/test-utils'
import { resetReactProvidersMock, setReactProvidersMock } from '~src/test-utils-react-providers-mock'

vi.mock('@vocdoni/react-components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@vocdoni/react-components')>()
  const { getReactProvidersMock } = await import('~src/test-utils-react-providers-mock')

  return {
    ...actual,
    ...getReactProvidersMock(),
  }
})

describe('LegalNotice', () => {
  beforeEach(() => {
    resetReactProvidersMock()
    setReactProvidersMock({
      useOrganization: () => ({
        organization: {
          name: { default: 'Esquerra republicana' },
          address: '0xabc',
        },
      }),
    })
  })

  it('renders the expected organization name and link', () => {
    render(<LegalNotice />)

    expect(screen.getByText('Esquerra republicana')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'vocdoni.io' })).toHaveAttribute('href', 'https://vocdoni.io/')
  })

  // The SaaS API stores the name under `meta.name`; the top-level `name` shorthand is only
  // mirrored by newer backends, so both slots have to resolve to the same notice.
  it('reads the name from meta.name when the top-level shorthand is missing', () => {
    setReactProvidersMock({
      useOrganization: () => ({
        organization: {
          address: '0xabc',
          meta: { name: { default: 'Full Anon Org' } },
        },
      }),
    })

    render(<LegalNotice />)

    expect(screen.getByText('Full Anon Org')).toBeInTheDocument()
    expect(screen.queryByText('0xabc')).not.toBeInTheDocument()
  })

  it('accepts the plain-string form of the name', () => {
    setReactProvidersMock({
      useOrganization: () => ({
        organization: {
          address: '0xabc',
          meta: { name: 'Plain string org' },
        },
      }),
    })

    render(<LegalNotice />)

    expect(screen.getByText('Plain string org')).toBeInTheDocument()
  })

  it('resolves a locale map that has no default entry', () => {
    setReactProvidersMock({
      useOrganization: () => ({
        organization: {
          address: '0xabc',
          name: { ca: 'Esquerra republicana' },
        },
      }),
    })

    render(<LegalNotice />)

    expect(screen.getByText('Esquerra republicana')).toBeInTheDocument()
  })

  it('renders nothing — never the address — when the organization has no name', () => {
    setReactProvidersMock({
      useOrganization: () => ({
        organization: {
          address: '0xe303c19bf5313dd3d0ea7533700a6e0b308f20c6',
        },
      }),
    })

    render(<LegalNotice />)

    expect(screen.queryByTestId('layout-legal-notice')).not.toBeInTheDocument()
  })

  describe('StaticLegalNotice', () => {
    beforeEach(() => {
      // The real hook throws outside its provider: the static variant must never reach it.
      setReactProvidersMock({
        useOrganization: () => {
          throw new Error('useOrganization() must be used inside <OrganizationProvider>')
        },
      })
    })

    it('renders from the orgName prop without reading the organization context', () => {
      render(<StaticLegalNotice orgName='Legacy org' />)

      expect(screen.getByText('Legacy org')).toBeInTheDocument()
    })

    it('renders nothing when orgName is empty', () => {
      render(<StaticLegalNotice orgName='' />)

      expect(screen.queryByTestId('layout-legal-notice')).not.toBeInTheDocument()
    })

    it('renders nothing when orgName is undefined', () => {
      render(<StaticLegalNotice orgName={undefined} />)

      expect(screen.queryByTestId('layout-legal-notice')).not.toBeInTheDocument()
    })
  })
})
