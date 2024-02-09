import { enforceHexPrefix, useClient } from '@vocdoni/react-providers'
import { AddressManager } from '../AddressManager'

export const CensusWeb3Addresses = () => {
  const { account } = useClient()

  return (
    <>
      <AddressManager type='web3' initialUsers={[{ address: enforceHexPrefix(account?.address) }]} />
    </>
  )
}
