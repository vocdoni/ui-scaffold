import { useClient } from '@vocdoni/react-providers'

export type signinUrlParams = {
  param: string
  value: any
}

export type authTypes = {
  oauth?: number
  open?: number
  aragondao?: number
}

export const useFaucet = () => {
  const { connected, signer, client } = useClient()

  // TODO: Remove this when the client is updated
  let {
    faucetService: { url },
  } = client
  url = url.replace(/v2.*/, 'v2')

  url = 'http://localhost:8080/v2'
  console.log('FAUCET URL:', url)
  const oAuthSignInURL = async (provider: string, redirectURLParams?: signinUrlParams[]): Promise<string> => {
    if (!connected) throw new Error('Wallet not connected')

    const redirectURL = new URL(window.location.href)

    const stateParams = [
      { param: 'provider', value: provider },
      { param: 'recipient', value: await signer.getAddress() },
      ...(redirectURLParams || []),
    ]

    const response = await fetch(`${url}/oauth/authUrl`, {
      method: 'POST',
      body: JSON.stringify({
        provider,
        redirectURL: redirectURL.toString(),
        state: btoa(JSON.stringify(stateParams)),
      }),
    })

    const res = await response.json()
    if (res.error) throw new Error(res.error)
    return res.url
  }

  const faucetReceipt = async (
    provider: string,
    code: string,
    recipient: string
  ): Promise<{ amount: string; faucetPackage: string }> => {
    const redirectURL = new URL(window.location.href)
    redirectURL.search = ''
    const response = await fetch(`${url}/oauth/claim`, {
      method: 'POST',
      body: JSON.stringify({
        provider,
        code: encodeURIComponent(code),
        recipient,
        redirectURL: redirectURL.toString(),
      }),
    })
    const res = await response.json()
    if (res.error) throw new Error(res.error)
    return res
  }

  const getAuthTypes = async (): Promise<authTypes> => {
    const response = await fetch(`${url}/authTypes`)
    const res = await response.json()
    if (res.error) throw new Error(res.error)
    return res.auth
  }

  return {
    oAuthSignInURL,
    faucetReceipt,
    getAuthTypes,
  }
}
