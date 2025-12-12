import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { ElectionTitle } from '@vocdoni/chakra-components'
import { ElectionProvider, useClient, useElection } from '@vocdoni/react-providers'
import { InvalidElection } from '@vocdoni/sdk'
import { useTranslation } from 'react-i18next'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ActionsMenu } from '~components/Process/ActionsMenu'
import { CensusConnectButton } from '~components/Process/Aside'
import LogoutButton from '~components/Process/LogoutButton'

const parseProcessIds = (value: string | undefined) =>
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
      <SharedCensusHomeContent />
    </ElectionProvider>
  )
}

const SharedCensusHomeContent = () => {
  const { t } = useTranslation()
  const { loading, loaded, election, connected } = useElection()
  const { account, connected: aconnected } = useClient()

  if (!election || election instanceof InvalidElection) {
    return null
  }

  if (loading && !loaded) {
    return <Spinner />
  }

  const isAdmin = aconnected && account?.address === election?.organizationId
  const canViewProcesses = connected || isAdmin

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
      <Box>{election && !isAdmin && <CensusConnectButton />}</Box>
      {canViewProcesses && (
        <Box w='90%'>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold' fontSize='22px' style={{ marginTop: '-30px' }}>
            {t('sharedCensus.sectionTitle', { defaultValue: 'Elections' })}
          </Text>
          <Flex gap={5} flexDirection={{ base: 'column' }}>
            {processIds.map((processId, index) => (
              <ElectionProvider id={processId}>
                <Flex>
                  <Link
                    key={index}
                    as={ReactRouterLink}
                    flexGrow={1}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexWrap='wrap'
                    h={{ base: '100px' }}
                    borderRadius='md'
                    color='black'
                    textDecoration='none'
                    textAlign='center'
                    fontWeight='bold'
                    boxShadow='0px 0px 10px 2px lightgray'
                    _hover={{
                      bgColor: 'lightgray',
                    }}
                    _active={{
                      transform: 'scale(0.9)',
                    }}
                    to={`/processes/${processId}/${window.location.hash}`}
                    isExternal={!isAdmin}
                  >
                    <Box>
                      <Text fontSize='18px' display='flex' alignItems='center'>
                        <Box as='span' mr={2}>
                          {index + 1}:
                        </Box>
                        <ElectionTitle fontSize='18px' mb={0} />
                      </Text>
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
          {t('sharedCensus.instructions.vote', {
            defaultValue:
              'Select the election to open a new window with the voting instructions. Once your vote is submitted, close the window to return here.',
          })}
        </Text>
      )}
      {!canViewProcesses && (
        <Text style={{ marginBottom: '50px', textAlign: 'center' }}>
          {t('sharedCensus.instructions.login', {
            defaultValue: 'To access the election press "Identify".',
          })}
          <br />
          {t('sharedCensus.instructions.identification', {
            defaultValue: 'We will ask for your identification. Afterwards, you can cast your vote securely.',
          })}
        </Text>
      )}
    </Flex>
  )
}

export default SharedCensus
