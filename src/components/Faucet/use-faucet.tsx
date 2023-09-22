import { useClient } from '@vocdoni/react-providers'

export const useFaucet = () => {
  const { connected, signer } = useClient()

  const oAuthSignInURL = async (provider: string): Promise<string> => {
    if (!connected) throw new Error('Wallet not connected')

    const params: URLSearchParams = new URLSearchParams()

    params.append('provider', provider)
    params.append('recipient', await signer.getAddress())
    const redirectURL: string = `${window.location.origin}${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`

    const response = await fetch(`${import.meta.env.VITE_FAUCET_URL}/oauth/authUrl/${provider}`, {
      method: 'POST',
      body: JSON.stringify({
        redirectURL,
      }),
    })
    const res = await response.json()
    if (!res.ok) throw new Error(res.reason)
    return res.data
  }

  const faucetReceipt = async (
    provider: string,
    code: string,
    recipient: string
  ): Promise<{ amount: string; faucetPackage: string }> => {
    const response = await fetch(`${import.meta.env.VITE_FAUCET_URL}/oauth/claim/${provider}/${code}/${recipient}`)
    const res = await response.json()
    if (!res.ok) throw new Error(res.reason)
    return res.data
  }

  return {
    oAuthSignInURL,
    faucetReceipt,
  }
}
