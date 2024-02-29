import ens from '/shared/gitcoin/ens.svg?react'
import { Icon } from '@chakra-ui/react'
import { FaStamp } from 'react-icons/fa'
// import brightid from '/shared/gitcoin/brightid.svg?react'
// import civic from '/shared/gitcoin/civic.svg?react'
// import coinbase from '/shared/gitcoin/coinbase.svg?react'
// import discord from '/shared/gitcoin/discord.svg?react'
// import ethereum from '/shared/gitcoin/ethereum.svg?react'
// import gitcoin from '/shared/gitcoin/gitcoin.svg?react'
// import github from '/shared/gitcoin/github.svg?react'
// import gnosisSafe from '/shared/gitcoin/gnosisSafe.svg?react'
// import google from '/shared/gitcoin/google.svg?react'
// import gtcStaking from '/shared/gitcoin/gtcStaking.svg?react'
// import guild from '/shared/gitcoin/guild.svg?react'
// import holonym from '/shared/gitcoin/holonym.svg?react'
// import idena from '/shared/gitcoin/idena.svg?react'
// import lens from '/shared/gitcoin/lens.svg?react'
// import linkedin from '/shared/gitcoin/linkedin.svg?react'
// import nft from '/shared/gitcoin/nft.svg?react'
// import passport from '/shared/gitcoin/passport.svg?react'
// import phi from '/shared/gitcoin/phi.svg?react'
// import poh from '/shared/gitcoin/poh.svg?react'
// import snapshot from '/shared/gitcoin/snapshot.svg?react'
// import trustaLabs from '/shared/gitcoin/trustaLabs.svg?react'
// import twitter from '/shared/gitcoin/twitter.svg?react'
// import zksync from '/shared/gitcoin/zksync.svg?react'

export const StampIcon = ({ stampId }: { stampId: string }) => {
  const size = 5

  let iconData
  switch (stampId) {
    case 'Ens':
      iconData = ens
      break
    default:
      iconData = FaStamp
  }
  return <Icon as={iconData} mr={4} w={size} h={size} />
}
