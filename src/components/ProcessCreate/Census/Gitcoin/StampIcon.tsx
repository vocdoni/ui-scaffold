import ens from '/shared/gitcoin/ens.svg?react'
import { Icon } from '@chakra-ui/react'
import { FaStamp } from 'react-icons/fa'
import brightid from '/shared/gitcoin/brightid.svg?react'
import civic from '/shared/gitcoin/civic.svg?react'
import coinbase from '/shared/gitcoin/coinbase.svg?react'
import discord from '/shared/gitcoin/discord.svg?react'
import ethereum from '/shared/gitcoin/ethereum.svg?react'
import gitcoin from '/shared/gitcoin/gitcoin.svg?react'
import github from '/shared/gitcoin/github.svg?react'
import gnosisSafe from '/shared/gitcoin/gnosisSafe.svg?react'
import google from '/shared/gitcoin/google.svg?react'
import gtcStaking from '/shared/gitcoin/gtcStaking.svg?react'
import guild from '/shared/gitcoin/guild.svg?react'
import holonym from '/shared/gitcoin/holonym.svg?react'
import idena from '/shared/gitcoin/idena.svg?react'
import lens from '/shared/gitcoin/lens.svg?react'
import linkedin from '/shared/gitcoin/linkedin.svg?react'
import nft from '/shared/gitcoin/nft.svg?react'
//import passport from '/shared/gitcoin/passport.svg?react'
import phi from '/shared/gitcoin/phi.svg?react'
import poh from '/shared/gitcoin/poh.svg?react'
import snapshot from '/shared/gitcoin/snapshot.svg?react'
import trustaLabs from '/shared/gitcoin/trustaLabs.svg?react'
import twitter from '/shared/gitcoin/twitter.svg?react'
import zksync from '/shared/gitcoin/zksync.svg?react'

/**
 * StampId is a unique identifier for a stamp, uses the externalId from the token
 * Extracted using:
 * curl https://census3-dev.vocdoni.net/api/tokens?pageSize=-1 -s  | jq '.tokens | .[] | .externalID'
 */
export type StampId =
  | 'BrightID'
  | 'Civic'
  | 'Coinbase'
  | 'Discord'
  | 'Ens'
  | 'Ethereum'
  | 'GTC Staking'
  | 'Gitcoin'
  | 'Github'
  | 'Gnosis Safe'
  | 'Google'
  | 'Guild Membership and Roles'
  | 'Hololym'
  | 'Idena'
  | 'Lens'
  | 'LinkedIn'
  | 'NFT Holder'
  | 'PHI'
  | 'Proof of Humanity'
  | 'Snapshot'
  | 'Trusta Labs'
  | 'Twitter'
  | 'ZkSync'

export const StampIcon = ({ stampId }: { stampId: StampId }) => {
  const size = 5

  let iconData
  switch (stampId) {
    case 'BrightID':
      iconData = brightid
      break
    case 'Civic':
      iconData = civic
      break
    case 'Coinbase':
      iconData = coinbase
      break
    case 'Discord':
      iconData = discord
      break
    case 'Ens':
      iconData = ens
      break
    case 'Ethereum':
      iconData = ethereum
      break
    case 'GTC Staking':
      iconData = gtcStaking
      break
    case 'Gitcoin':
      iconData = gitcoin
      break
    case 'Github':
      iconData = github
      break
    case 'Gnosis Safe':
      iconData = gnosisSafe
      break
    case 'Google':
      iconData = google
      break
    case 'Guild Membership and Roles':
      iconData = guild
      break
    case 'Hololym':
      iconData = holonym
      break
    case 'Idena':
      iconData = idena
      break
    case 'Lens':
      iconData = lens
      break
    case 'LinkedIn':
      iconData = linkedin
      break
    case 'NFT Holder':
      iconData = nft
      break
    case 'PHI':
      iconData = phi
      break
    case 'Proof of Humanity':
      iconData = poh
      break
    case 'Snapshot':
      iconData = snapshot
      break
    case 'Trusta Labs':
      iconData = trustaLabs
      break
    case 'Twitter':
      iconData = twitter
      break
    case 'ZkSync':
      iconData = zksync
      break
    default:
      iconData = FaStamp
  }
  return <Icon as={iconData} mr={4} w={size} h={size} />
}
