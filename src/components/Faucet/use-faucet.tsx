import { useClient } from '@vocdoni/react-providers'

export const useFaucet = () => {
  const { connected, signer, client } = useClient()

  // TODO: Remove this when the client is updated
  let {
    faucetService: { url },
  } = client
  url = url.replace(/v2.*/, 'v2')

  const oAuthSignInURL = async (
    provider: string,
    redirectURLParams?: { param: string; value: any }[]
  ): Promise<string> => {
    if (!connected) throw new Error('Wallet not connected')

    const redirectURL = new URL(window.location.href)
    const stateParams = [
      { param: 'provider', value: provider },
      { param: 'recipient', value: await signer.getAddress() },
      ...(redirectURLParams || []),
    ]

    const response = await fetch(`${url}/oauth/authUrl/${provider}`, {
      method: 'POST',
      body: JSON.stringify({
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
    const response = await fetch(`${url}/oauth/claim/${provider}/${encodeURIComponent(code)}/${recipient}`)
    const res = await response.json()
    if (res.error) throw new Error(res.error)
    return res
  }

  return {
    oAuthSignInURL,
    faucetReceipt,
  }
}
