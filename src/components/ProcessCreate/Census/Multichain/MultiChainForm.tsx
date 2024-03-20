import { ICensus3SupportedChain } from '@vocdoni/sdk'

interface IMultiChainFormProps {
  supportedChains: ICensus3SupportedChain[]
}

export const MultiChainForm = ({ supportedChains }: IMultiChainFormProps) => {
  return supportedChains.map((chain) => {
    return (
      <div key={chain.chainID}>
        {chain.shortName} - {chain.name}
      </div>
    )
  })
}
