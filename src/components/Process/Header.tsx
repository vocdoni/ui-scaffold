import { InfoIcon, WarningIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, Image, Text, Tooltip } from '@chakra-ui/react'
import { ElectionDescription, ElectionSchedule, ElectionStatusBadge, ElectionTitle } from '@vocdoni/chakra-components'
import { useClient, useElection, useOrganization } from '@vocdoni/react-providers'
import { CensusType, ElectionStatus, Strategy } from '@vocdoni/sdk'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useReadMoreMarkdown } from '~components/Layout/use-read-more'
import { StampIcon } from '~components/ProcessCreate/Census/Gitcoin/StampIcon'
import { ActionsMenu } from './ActionsMenu'
import { CreatedBy } from './CreatedBy'

import { ProcessDate } from './Date'

type CensusInfo = { size: number; weight: bigint; type: CensusType }

const ProcessHeader = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { organization, loaded } = useOrganization()
  const { account, client } = useClient()
  const { isConnected } = useAccount()

  const [censusInfo, setCensusInfo] = useState<CensusInfo>()
  const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(
    'rgba(242, 242, 242, 0)',
    'rgba(242, 242, 242, 1)',
    600,
    20
  )
  const strategy = useStrategy()

  // Get the census info to show the total size if the maxCensusSize is less than the total size
  useEffect(() => {
    ;(async () => {
      try {
        if (!election?.census?.censusId || !client) return
        const censusInfo: CensusInfo = await client.fetchCensusInfo(election.census.censusId)
        setCensusInfo(censusInfo)
      } catch (e) {
        // If the census info is not available, just ignore it
        setCensusInfo(undefined)
      }
    })()
  }, [election, client])

  const showOrgInformation = !loaded || (loaded && organization?.account?.name)
  const showTotalCensusSize = censusInfo?.size && election?.maxCensusSize && election.maxCensusSize < censusInfo.size

  return (
    <Box mb={10} mt={5}>
      {election?.header && (
        <Box w='100%' mx='auto' maxH='300px' my='30px' overflow='hidden'>
          <Image src={election?.header} w='100%' h='auto' objectFit='cover' />
        </Box>
      )}
      <Flex direction={{ base: 'column', lg2: 'row' }} alignItems='start' mb={7} gap={20}>
        <Box flexGrow={1} flexShrink={1}>
          <ElectionTitle fontSize={{ base: '32px', md: '34px' }} textAlign='left' my={5} />

          <Flex flexDirection='column'>
            {!election?.description?.default.length && (
              <Text textAlign='center' mt={5} color='process.no_description'>
                {t('process.no_description')}
              </Text>
            )}
            <Box className='md-sizes'>
              <ReadMoreMarkdownWrapper from='rgba(250, 250, 250, 0)' to='rgba(250, 250, 250, 1)'>
                <ElectionDescription mb={0} fontSize='lg' lineHeight={1.5} color='process.description' />
              </ReadMoreMarkdownWrapper>
            </Box>
            <ReadMoreMarkdownButton colorScheme='primary' alignSelf='center' />
          </Flex>
        </Box>

        <Flex
          boxShadow='var(--box-shadow-process)'
          p={8}
          mt={5}
          borderRadius='lg'
          width={{ lg2: '300px' }}
          minW={{ lg2: '300px' }}
          position='relative'
          flexDirection={{ base: 'row', lg2: 'column' }}
          alignItems='start'
          flexWrap='wrap'
          justifyContent='start'
          gap={{ base: 4, sm: 6, md: 8, lg: 4 }}
          fontSize='sm'
          opacity={0.8}
          bgColor='#ffffff75'
          _hover={{
            opacity: 1,
          }}
        >
          <Box position='absolute' right={0} top={0}>
            <ActionsMenu />
          </Box>
          <ElectionStatusBadge
            w={isConnected ? '92%' : '100%'}
            py={3}
            textTransform='uppercase'
            justifyContent='center'
            fontWeight='bold'
            mt={2}
            boxShadow='0px 5px 5px 1px lightgray'
            mb={4}
          />

          <Box>
            {election?.status !== ElectionStatus.CANCELED ? (
              <ProcessDate />
            ) : (
              <Text color='process.canceled' fontWeight='bold'>
                {t('process.status.canceled')}
              </Text>
            )}
            <ElectionSchedule textAlign='left' color='black' fontStyle='normal' fontWeight='normal' fontSize='sm' />
          </Box>
          {election?.electionType.anonymous && (
            <Flex gap={2}>
              <Text fontWeight='bold'>{t('process.is_anonymous.title')}</Text>
              <Text>{t('process.is_anonymous.description')}</Text>
            </Flex>
          )}
          <Flex cursor='help' gap={2}>
            <Text fontWeight='bold'>
              {t('process.census')} {showTotalCensusSize && <InfoIcon color='process_create.alert_info.color' ml={1} />}
            </Text>
            {showTotalCensusSize ? (
              <Tooltip
                hasArrow
                bg='primary.600'
                color='white'
                placement='top'
                label={t('process.total_census_size_tooltip', {
                  censusSize: censusInfo?.size,
                  maxCensusSize: election?.maxCensusSize,
                  percent:
                    censusInfo?.size && election?.maxCensusSize
                      ? Math.round((election?.maxCensusSize / censusInfo?.size) * 100)
                      : 0,
                })}
              >
                <Text>
                  {t('process.total_census_size', {
                    censusSize: censusInfo?.size,
                    maxCensusSize: election?.maxCensusSize,
                  })}
                </Text>
              </Tooltip>
            ) : (
              <Text>{t('process.people_in_census', { count: election?.maxCensusSize })}</Text>
            )}
          </Flex>
          {election?.meta?.census && (
            <Flex gap={2}>
              <Text fontWeight='bold'>{t('process.strategy')}</Text>
              <Text>{strategy}</Text>
            </Flex>
          )}
          {showOrgInformation && (
            <Flex w={{ lg2: 'full' }} alignItems='center' gap={2}>
              <Text fontWeight='bold' whiteSpace='nowrap'>
                {t('process.created_by')}
              </Text>
              <CreatedBy
                sx={{
                  '& span': {
                    maxW: '25px',
                    maxH: '25px',
                  },
                  '& p': {
                    minW: 0,
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  },
                  '& p strong': {
                    maxW: { base: '100%', md: '220px', md2: '250px' },
                    isTruncated: true,
                    mr: 1,
                    color: 'process.created_by',
                  },
                }}
              />
            </Flex>
          )}
          {election?.status === ElectionStatus.PAUSED && election?.organizationId !== account?.address && (
            <Flex
              color='process.paused'
              gap={2}
              alignItems='center'
              border='1px solid'
              borderColor='process.paused'
              borderRadius='lg'
              p={2}
            >
              <Icon as={WarningIcon} />
              <Box>
                <Text>{t('process.status.paused')}</Text>
                <Text>{t('process.status.paused_description')}</Text>
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

const GitcoinStrategyInfo = () => {
  const { t } = useTranslation()
  const { election } = useElection()

  if (!election || (election && !election?.meta?.strategy)) return
  const strategy: Strategy = election.get('strategy')

  const score = strategy.tokens['GPS'].minBalance
  const firstParenthesesMatch = strategy.predicate.match(/\(([^)]+)\)/)
  let unionTypeString: string | null = null
  if (firstParenthesesMatch) {
    // split by space and get the second element which should be the union type
    const [, unionType] = firstParenthesesMatch[1].split(' ')
    if (unionType === 'AND') {
      unionTypeString = t('process.gitcoin.all_of_them')
    } else if (unionType === 'OR') {
      unionTypeString = t('process.gitcoin.one_of_them')
    }
  }
  const tokens = Object.entries(strategy.tokens).filter(([key, token]) => key !== 'GPS')

  return (
    <>
      <Text>{t('process.gitcoin.gps_score', { score: score })}</Text>
      {unionTypeString && (
        <Flex direction={'column'} gap={2} mt={4}>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 0, lg: 1 }}>
            <Text fontWeight='bold'>{t('process.gitcoin.needed_stamps')}</Text>
            <Text>{unionTypeString}</Text>
          </Flex>
          <Flex direction={'row'} gap={1} flexWrap={'wrap'}>
            {Object.values(tokens).map(([, token], n) => {
              return (
                <StampIcon key={n} size={6} iconURI={token.iconURI} alt={token.externalID} tooltip={token.externalID} />
              )
            })}
          </Flex>
        </Flex>
      )}
    </>
  )
}

const useStrategy = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const strategies: { [key: string]: ReactNode } = {
    spreadsheet: t('process.census_strategies.spreadsheet'),
    token: t('process.census_strategies.token', { token: election?.meta?.token }),
    web3: t('process.census_strategies.web3'),
    csp: t('process.census_strategies.csp'),
    gitcoin: <GitcoinStrategyInfo />,
  }

  if (!election || (election && !election?.meta?.census)) return ''

  const type = election.get('census.type')

  if (typeof strategies[type] === 'undefined') {
    console.warn('unknown census type:', type)
    return ''
  }

  return strategies[type]
}

export default ProcessHeader
