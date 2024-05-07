import { Box, Button, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VoteButton as CVoteButton, SpreadsheetAccess, VoteWeight } from '@vocdoni/chakra-components'
import { useElection } from '@vocdoni/react-providers'
import { dotobject, ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { CensusMeta } from '~components/ProcessCreate/Steps/Confirm'

const VoteButton = ({ ...props }) => {
  const { t } = useTranslation()

  const { election, connected, isAbleToVote, isInCensus } = useElection()
  const census: CensusMeta = dotobject(election?.meta || {}, 'census')
  const { isConnected } = useAccount()

  if (
    election?.status === ElectionStatus.CANCELED ||
    (isConnected && !isInCensus && !['spreadsheet', 'csp'].includes(census?.type))
  )
    return null

  const isWeighted = election?.census.weight !== election?.census.size

  return (
    <Flex
      direction={'column'}
      justifyContent='center'
      alignItems='center'
      background='process.vote_button.bg_div'
      pt={10}
      pb={5}
      {...props}
    >
      {census?.type !== 'spreadsheet' && !connected && (
        <ConnectButton.Custom>
          {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
            return (
              <Box
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
                w='full'
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button onClick={openConnectModal} w='full' minH='50px' mb={4} fontSize='lg'>
                        {t('menu.connect').toString()}
                      </Button>
                    )
                  }
                })()}
              </Box>
            )
          }}
        </ConnectButton.Custom>
      )}
      {census?.type === 'spreadsheet' && !connected && <SpreadsheetAccess />}
      {isAbleToVote && (
        <>
          <CVoteButton
            w='100%'
            fontSize='lg'
            height='50px'
            mb={4}
            sx={{
              '&::disabled': {
                opacity: '0.8',
              },
            }}
          />
          {isWeighted && <VoteWeight />}
        </>
      )}
    </Flex>
  )
}

export default VoteButton
