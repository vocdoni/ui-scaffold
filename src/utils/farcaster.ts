import { useEffect } from 'react'
import type { Signer } from '@ethersproject/abstract-signer'
import type { ExternalProvider } from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'
import { sdk } from '@farcaster/miniapp-sdk'
import { chains } from '~constants/rainbow'

/**
 * Check if the app is running inside a Farcaster miniapp context
 */
export const isFarcasterMiniapp = (): boolean => {
  // Check if both APP_DOMAIN and FC_ACCOUNT_ASSOCIATION are set (feature flags)
  if (!import.meta.env.APP_DOMAIN || !import.meta.env.FC_ACCOUNT_ASSOCIATION) {
    return false
  }

  // Check if running in browser (not SSR)
  if (typeof window === 'undefined') {
    return false
  }

  // Basic check - will be validated during SDK initialization
  return true
}

/**
 * Initialize the Farcaster SDK
 * Must be called after the app loads to hide the splash screen
 */
export const initializeFarcasterSDK = async (): Promise<void> => {
  if (!isFarcasterMiniapp()) {
    return
  }

  try {
    // Check if context is available
    const context = await sdk.context
    if (!context || !context.client) {
      throw new Error('Not running in Farcaster miniapp context')
    }

    await sdk.actions.ready()
    console.log('✅ Farcaster SDK initialized')
  } catch (error) {
    console.error('❌ Failed to initialize Farcaster SDK:', error)
    throw error
  }
}

/**
 * Get the Ethereum provider from Farcaster wallet
 * Returns an EIP-1193 compatible provider
 */
export const getFarcasterEthereumProvider = async () => {
  if (!isFarcasterMiniapp()) {
    throw new Error('Not running in Farcaster miniapp context')
  }

  try {
    const provider = await sdk.wallet.getEthereumProvider()
    if (!provider) {
      throw new Error('Farcaster Ethereum provider not available')
    }
    return provider
  } catch (error) {
    console.error('❌ Failed to get Farcaster Ethereum provider:', error)
    throw error
  }
}

/**
 * Get the current chain ID from Farcaster Ethereum provider
 * Returns the numeric chain ID (e.g., 1 for mainnet, 137 for Polygon)
 */
export const getFarcasterChainId = async (): Promise<number | null> => {
  if (!isFarcasterMiniapp()) {
    return null
  }

  try {
    const provider = await getFarcasterEthereumProvider()
    // eth_chainId returns hex string like "0x1" for mainnet
    const chainIdHex = (await provider.request({ method: 'eth_chainId' })) as string
    console.log('✅ Farcaster provider chain ID (hex):', chainIdHex)
    const chainId = parseInt(chainIdHex, 16)
    console.log('✅ Farcaster provider chain ID (decimal):', chainId)
    return chainId
  } catch (error) {
    console.error('❌ Failed to get chain ID from Farcaster provider:', error)
    return null
  }
}

/**
 * Convert Farcaster's Ethereum provider to an ethers.js Signer
 * This is compatible with the Vocdoni SDK which expects an ethers v5 signer
 */
export const farcasterSignerAdapter = async (): Promise<Signer | null> => {
  if (!isFarcasterMiniapp()) {
    return null
  }

  try {
    const provider = await getFarcasterEthereumProvider()

    // Get the current chain ID from the provider
    const chainId = await getFarcasterChainId()

    // Look up the chain from our supported chains list
    const chain = chainId ? chains.find((c) => c.id === chainId) : undefined

    // Create network object for Web3Provider (following Wagmi adapter pattern)
    const network = chain
      ? {
          chainId: chain.id,
          name: chain.name,
          ensAddress: (chain.contracts as any)?.ensRegistry?.address,
        }
      : undefined

    const web3Provider = new Web3Provider(provider as ExternalProvider, network)

    // Request account access
    const accounts = (await provider.request({ method: 'eth_requestAccounts' })) as string[]
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found in Farcaster wallet')
    }

    const signer = web3Provider.getSigner(accounts[0])
    console.log(
      '✅ Farcaster signer created for account:',
      accounts[0],
      'on chain:',
      chain?.name || `Unknown (${chainId})`
    )

    return signer
  } catch (error) {
    console.error('❌ Failed to create Farcaster signer:', error)
    return null
  }
}

/**
 * Get the connected wallet address from Farcaster
 */
export const getFarcasterAddress = async (): Promise<string | null> => {
  if (!isFarcasterMiniapp()) {
    return null
  }

  try {
    const provider = await getFarcasterEthereumProvider()
    const accounts = (await provider.request({ method: 'eth_accounts' })) as string[]
    return accounts && accounts.length > 0 ? accounts[0] : null
  } catch (error) {
    console.error('❌ Failed to get Farcaster address:', error)
    return null
  }
}

/**
 * Hook to initialize Farcaster SDK when running in a Farcaster miniapp
 * Should be called at the root level of the app to ensure sdk.actions.ready()
 * is called early, allowing all pages to load properly in Farcaster
 */
export function useFarcasterSDK() {
  useEffect(() => {
    const init = async () => {
      if (isFarcasterMiniapp()) {
        try {
          await initializeFarcasterSDK()
        } catch (error) {
          // Error is already logged in initializeFarcasterSDK
          // Just catch to prevent unhandled promise rejection
        }
      }
    }

    init()
  }, [])
}
