import { AspectRatio, Box, Flex, Image, Link, Spinner, Text } from '@chakra-ui/react'
import { ElectionTitle } from '@vocdoni/chakra-components'
import {
  ElectionProvider,
  OrganizationProvider,
  useClient,
  useElection,
  useOrganization,
} from '@vocdoni/react-providers'
import { InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { Link as ReactRouterLink, useOutletContext } from 'react-router-dom'
import Editor from '~components/Editor'
import { ActionsMenu } from '~components/Process/ActionsMenu'
import { CensusConnectButton } from '~components/Process/Aside'
import LogoutButton from '~components/Process/LogoutButton'
import { SimpleLayoutOutletContext } from '~elements/SimpleLayout'

export const parseProcessIds = (value: string | undefined) =>
  (value || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)

const processIds = parseProcessIds(import.meta.env.PROCESS_IDS)

const SharedCensus = () => {
  if (processIds.length === 0) {
    return null
  }

  return (
    <ElectionProvider id={processIds[0]}>
      <SharedCensusOrganizationBoundary>
        <SharedCensusHomeContent />
      </SharedCensusOrganizationBoundary>
    </ElectionProvider>
  )
}

const SharedCensusOrganizationBoundary = ({ children }: { children: ReactNode }) => {
  const { election } = useElection()
  const organizationId = (election as PublishedElection | undefined)?.organizationId

  if (!organizationId) {
    return <>{children}</>
  }

  return (
    <OrganizationProvider id={organizationId}>
      <SharedCensusLogo />
      {children}
    </OrganizationProvider>
  )
}

const SharedCensusLogo = () => {
  const { organization } = useOrganization()
  const { setLogo } = useOutletContext<SimpleLayoutOutletContext>()

  useEffect(() => {
    const logoUrl = organization?.account?.avatar

    if (logoUrl) {
      const name = organization?.account?.name?.default || organization?.address || 'Organization'
      setLogo(<Image src={logoUrl} alt={`${name} logo`} h={14} />)
      return () => setLogo(undefined)
    }

    return () => setLogo(undefined)
  }, [organization, setLogo])

  return null
}

const SharedCensusHomeContent = () => {
  const { t, i18n } = useTranslation()
  const { loading, loaded, election, connected } = useElection()
  const { account, connected: aconnected } = useClient()

  const isAdmin = aconnected && account?.address === (election as PublishedElection)?.organizationId
  const canViewProcesses = connected || isAdmin
  const parseLanguageSlice = (value: Record<string, string> | string) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Record<string, string>
      } catch {
        return {}
      }
    }
    return value
  }

  const languagesSlice = parseLanguageSlice(import.meta.env.LANGUAGES as Record<string, string> | string)
  const defaultLanguage = Object.keys(languagesSlice)[0] || 'en'

  const getLocalizedMarkdown = (content?: Record<string, string>) => {
    if (!content) {
      return ''
    }

    const resolvedLanguage = i18n.resolvedLanguage || i18n.language
    const baseLanguage = resolvedLanguage.split('-')[0]

    return content[resolvedLanguage] ?? content[baseLanguage] ?? content[defaultLanguage] ?? ''
  }

  const parseSharedCensusCopy = (value?: Record<string, string> | string) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as Record<string, string>
      } catch {
        return undefined
      }
    }
    return value
  }

  const sharedCensusAlways = parseSharedCensusCopy(import.meta.env.SHARED_CENSUS_ALWAYS_VISIBLE_TEXT)
  const sharedCensusDisconnected = parseSharedCensusCopy(import.meta.env.SHARED_CENSUS_DISCONNECTED_TEXT)
  const sharedCensusConnected = parseSharedCensusCopy(import.meta.env.SHARED_CENSUS_CONNECTED_TEXT)
  const alwaysMarkdown = getLocalizedMarkdown(sharedCensusAlways)
  const disconnectedMarkdown = getLocalizedMarkdown(sharedCensusDisconnected)
  const connectedMarkdown = getLocalizedMarkdown(sharedCensusConnected)
  const streamUrl = typeof import.meta.env.STREAM_URL === 'string' ? import.meta.env.STREAM_URL : undefined
  const showStream = canViewProcesses && !!streamUrl
  const showAlways = !!alwaysMarkdown
  const showDisconnected = !!disconnectedMarkdown && !canViewProcesses
  const showConnected = !!connectedMarkdown && canViewProcesses
  const showTopContent = showAlways || showDisconnected || showConnected || showStream
  const pretextContent = [
    alwaysMarkdown,
    showDisconnected ? disconnectedMarkdown : '',
    showConnected ? connectedMarkdown : '',
  ]
    .filter(Boolean)
    .join('\n\n')

  if (!election || election instanceof InvalidElection) {
    return null
  }

  if (loading && !loaded) {
    return <Spinner />
  }

  return (
    <Flex
      position='sticky'
      top={0}
      flexDirection='column'
      gap={10}
      maxW='1200px'
      mx='auto'
      p={5}
      minH='100vh'
      alignItems='center'
    >
      {showTopContent && (
        <Box w='90%' display='flex' flexDirection='column' gap={4}>
          {(showAlways || showDisconnected || showConnected) && (
            <Box data-testid='shared-census-pretext'>
              <Editor key={pretextContent} isDisabled defaultValue={pretextContent} />
            </Box>
          )}
          {showStream && (
            <Box data-testid='shared-census-stream' maxW='600px' alignSelf='center' w='100%'>
              <AspectRatio ratio={16 / 9}>
                <ReactPlayer src={streamUrl} width='100%' height='100%' controls={true} />
              </AspectRatio>
            </Box>
          )}
        </Box>
      )}
      <Box>{election && !isAdmin && <CensusConnectButton />}</Box>
      {canViewProcesses && (
        <Box w='90%'>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold' fontSize='22px' style={{ marginTop: '-30px' }}>
            {t('shared_census.section_title', { defaultValue: 'Elections' })}
          </Text>
          <Flex gap={5} flexDirection={{ base: 'column' }}>
            {processIds.map((processId, index) => (
              <ElectionProvider id={processId} key={processId}>
                <Flex>
                  <Link
                    as={ReactRouterLink}
                    flexGrow={1}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexWrap='wrap'
                    h={{ base: '100px' }}
                    borderRadius='md'
                    color='texts.primary'
                    textDecoration='none'
                    textAlign='center'
                    fontWeight='bold'
                    boxShadow='lg'
                    _dark={{
                      boxShadow: '0 10px 15px -3px #343434,0 4px 6px -2px #444',
                    }}
                    _hover={{
                      bgColor: 'gray.500',
                    }}
                    _active={{
                      transform: 'scale(0.9)',
                    }}
                    to={`/processes/${processId}/${window.location.hash}`}
                    isExternal={!isAdmin}
                  >
                    <Box>
                      <Box fontSize='18px' display='flex' alignItems='center'>
                        <Box as='span' mr={2}>
                          {index + 1}:
                        </Box>
                        <ElectionTitle fontSize='18px' mb={0} />
                      </Box>
                    </Box>
                  </Link>
                  {isAdmin && <ActionsMenu />}
                </Flex>
              </ElectionProvider>
            ))}
          </Flex>
        </Box>
      )}
      <LogoutButton />
      {canViewProcesses && (
        <Text style={{ marginTop: '50px', maxWidth: '800px', textAlign: 'center' }}>
          {t('shared_census.instructions.vote', {
            defaultValue:
              'Select the election to open a new window with the voting instructions. Once your vote is submitted, close the window to return here.',
          })}
        </Text>
      )}
      {!canViewProcesses && (
        <Text style={{ marginBottom: '50px', textAlign: 'center' }}>
          {t('shared_census.instructions.login', {
            defaultValue: 'To access the election press "Identify".',
          })}
          <br />
          {t('shared_census.instructions.identification', {
            defaultValue: 'We will ask for your identification. Afterwards, you can cast your vote securely.',
          })}
        </Text>
      )}
    </Flex>
  )
}

export default SharedCensus
