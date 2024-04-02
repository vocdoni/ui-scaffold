import { WarningIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import {
  ElectionDescription,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  OrganizationName,
} from '@vocdoni/chakra-components'
import { useClient, useElection, useOrganization } from '@vocdoni/react-providers'
import { ElectionStatus } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useReadMoreMarkdown } from '~components/Layout/use-read-more'
import { GoBack } from '~theme/icons'
import { ActionsMenu } from './ActionsMenu'
import { CreatedBy } from './CreatedBy'
import { ProcessDate } from './Date'
import { ShareModalButton } from '~components/Share'

const ProcessHeader = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const { organization, loaded } = useOrganization()
  const { account } = useClient()
  const { ReadMoreMarkdownWrapper, ReadMoreMarkdownButton } = useReadMoreMarkdown(
    'rgba(242, 242, 242, 0)',
    'rgba(242, 242, 242, 1)',
    600,
    20
  )
  const strategy = useStrategy()

  const showOrgInformation = !loaded || (loaded && organization?.account?.name)

  return (
    <Box mb={10}>
      {showOrgInformation && (
        <Button as={Link} to={`/organization/0x${election?.organizationId}`} variant='go-back' mt={5}>
          <GoBack />
          <OrganizationName as='span' />
        </Button>
      )}
      {election?.header && (
        <Box w='100%' mx='auto' maxH='300px' my='30px' overflow='hidden'>
          <Image src={election?.header} w='100%' h='auto' objectFit='cover' />
        </Box>
      )}
      <Flex direction={{ base: 'column', lg2: 'row' }} mb={7} gap={10}>
        <Box flexGrow={0} flexShrink={0} flexBasis={{ base: '100%', md: '60%', lg: '65%', lg2: '70%', xl2: '75%' }}>
          <ElectionTitle fontSize={{ base: '32px', md: '34px' }} textAlign='left' my={5} />
          <Flex flexDirection={{ base: 'column', xl: 'row' }} mb={4} justifyContent='space-between'>
            <Flex gap={4} flexDirection={{ base: 'column', xl: 'row' }} alignItems={{ base: 'start', xl: 'center' }}>
              <Flex gap={3} alignItems='center'>
                <Text as='span' color='process.label' fontSize='sm'>
                  {t('process.state')}
                </Text>
                <ElectionStatusBadge />
              </Flex>
              <Flex
                flexDirection={{ base: 'column', xl: 'row' }}
                alignItems={{ base: 'start', xl: 'center' }}
                gap={{ xl: 3 }}
              >
                <Text as='span' color='process.label' fontSize='sm'>
                  {t('process.schedule')}
                </Text>
                <ElectionSchedule textAlign='left' color='process.info_title' />
              </Flex>
            </Flex>
            <Box>
              <ShareModalButton caption={t('share.election_share_text')} text={t('share.election_share_btn_text')} />
            </Box>
          </Flex>
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
          position='relative'
          flexDirection={{ base: 'row', lg2: 'column' }}
          alignItems='start'
          flexWrap='wrap'
          justifyContent='start'
          gap={{ base: 4, sm: 6, md: 8, lg: 4 }}
          flexGrow={1}
          fontSize='sm'
          opacity={0.85}
          _hover={{
            opacity: 1,
          }}
        >
          <Box flexDir='row' display='flex' justifyContent='space-between' w={{ lg2: 'full' }}>
            {election?.status !== ElectionStatus.CANCELED ? (
              <ProcessDate />
            ) : (
              <Text color='process.canceled' fontWeight='bold'>
                {t('process.status.canceled')}
              </Text>
            )}
            <Box position='absolute' right={0} top={0}>
              <ActionsMenu />
            </Box>
          </Box>
          {election?.electionType.anonymous && (
            <Box>
              <Text fontWeight='bold'>{t('process.is_anonymous.title')}</Text>
              <Text>{t('process.is_anonymous.description')}</Text>
            </Box>
          )}
          <Box>
            <Text fontWeight='bold'>{t('process.census')}</Text>
            <Text>{t('process.people_in_census', { count: election?.maxCensusSize })}</Text>
          </Box>
          {election?.meta?.census && (
            <Box>
              <Text fontWeight='bold'>{t('process.strategy')}</Text>
              <Text>{strategy}</Text>
            </Box>
          )}

          {showOrgInformation && (
            <Box w={{ lg2: 'full' }}>
              <Text fontWeight='bold' mb={1}>
                {t('process.created_by')}
              </Text>
              <CreatedBy
                sx={{
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
            </Box>
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

const useStrategy = () => {
  const { t } = useTranslation()
  const { election } = useElection()
  const strategies: { [key: string]: string } = {
    spreadsheet: t('process.census_strategies.spreadsheet'),
    token: t('process.census_strategies.token', { token: election?.meta?.token }),
    web3: t('process.census_strategies.web3'),
    csp: t('process.census_strategies.csp'),
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
