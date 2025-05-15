import { AspectRatio, Box, Button, Flex, Heading, Link, ListItem, OrderedList, Spinner, Text } from '@chakra-ui/react'
import { ElectionProvider, useClient, useElection } from '@vocdoni/react-providers'
import { InvalidElection } from '@vocdoni/sdk'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ActionsMenu } from '~components/Process/ActionsMenu'
import { CspAuth } from '~components/Process/CSP/CSPAuthModal'
import Error from './Error'

// const processes = import.meta.env.PROCESS_IDS
const processes = ["6be21a5a9dc0f7be137b346a86ca830f9028e5116ea746137bbf020400000000"]

const AlhoraWrapper = () => (
  <ElectionProvider id={processes[0]}>
    <Alhora />
  </ElectionProvider>
)

const Alhora = () => {
  const { loading, loaded, election, connected, clearClient } = useElection()
  const { account, connected: aconnected } = useClient()
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return

      const rect = videoRef.current.getBoundingClientRect()
      if (rect.top <= 10) {
        setVideoTop(true)
      } else {
        setVideoTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (loading && !loaded) {
    return <Spinner />
  }

  if (election instanceof InvalidElection) {
    return <Error />
  }

  const isAdmin = aconnected && account?.address === election?.organizationId
  const canViewProcesses = connected || isAdmin
  const isEnabled = true

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
      <Flex flexDirection='column' gap={10} maxW='850px' mx='auto' p={5}>
        <Box>
          <Heading as='h1' fontWeight='bold' fontSize='32px' textAlign='center'>
            Assemblea General Ordinària
          </Heading>
          <Text as='h2' fontSize='16px' textAlign='center'>
            Alhora
          </Text>
        </Box>
      </Flex>
      <Flex gap={5}>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={10}
          maxW='850px'
          mx='auto'
          style={{ marginTop: '0px' }}
        >
          <Box>
            <Text as='h3' fontWeight='bold' fontSize='20px'>
              Ordre del dia de l'Assemblea General Ordinària
              <br />
              <br />
            </Text>
            <OrderedList ml='35px' fontSize='18px'>
              <ListItem>Benvinguda.</ListItem>
              <ListItem>Aprovació memòria d'activitats 2024.</ListItem>
              <ListItem>Aprovació estat de comptes i la liquidació de l'exerici 2024.</ListItem>
              <ListItem>Aprovació del pressupost 2025.</ListItem>
              <ListItem>Torn obert de preguntes.</ListItem>
            </OrderedList>
            <Box fontSize='18px'>
              <Text style={{ marginTop: '30px' }}>
                - Enllaç a la documentació externa:{' '}
                <Link
                  href='https://alhora.cat'
                  isExternal
                >
                  Memòria Alhora 🔗
                </Link>
              </Text>
            </Box>
          </Box>
          {connected && (
            <Box>
              <Box ref={videoRef} />
              <Box
                ml={videoTop ? 'auto' : 'none'}
                position={{ lg: videoTop ? 'fixed' : 'initial' }}
                top={20}
                right={10}
                zIndex={100}
                w={{ base: 'full', lg: '400px' }}
              >
                <AspectRatio ratio={16 / 9}>
                  <ReactPlayer
                    url='https://www.youtube.com/watch?v=ydYDqZQpim8'
                    width='100%'
                    height='100%'
                    playing
                    controls
                  />
                </AspectRatio>
              </Box>
            </Box>
          )}
        </Flex>
      </Flex>
      <Box w='50%' mx='auto'>
        {election && !isAdmin && !connected && <CspAuth />}
      </Box>
      {canViewProcesses && (
        <Box w='90%'>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold' fontSize='22px' style={{ marginTop: '-30px' }}>
            Votacions:
          </Text>
          <Flex gap={5} flexDirection={{ base: 'column' }}>
            {processes.map((process, index) => (
              <Flex key={index}>
                <ElectionProvider id={process}>
                  <Link
                    as={ReactRouterLink}
                    flexGrow={1}
                    isExternal
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
                    to={`/processes/${process}/${window.location.hash}`}
                  >
                    <Box>
                      <Text fontSize='18px'>
                        {index + 1}: <ElectionDetail />
                      </Text>
                    </Box>
                  </Link>
                  {isAdmin && <ActionsMenu />}
                </ElectionProvider>
              </Flex>
            ))}
          </Flex>
        </Box>
      )}
      {election && !isAdmin && connected && (
        <Button variant='link' onClick={clearClient}>
          Tanca la sessió
        </Button>
      )}
      {canViewProcesses && (
        <Text style={{ marginTop: '50px', maxWidth: '800px', textAlign: 'center' }}>
          Pulseu sobre la votació i s'obrirà una finestra amb tota la informació per votar. Un cop votat, podeu tancar
          la pestanya per tornar a aquesta pàgina.
        </Text>
      )}
      {isEnabled && !canViewProcesses && (
        <Text style={{ marginBottom: '50px', textAlign: 'center' }}>
          Per poder accedir a la votació heu de prémer sobre “Identificar-se”.
          <br />
          Us demanarem la vostre identificació. Posteriorment, podreu emetre el vostre vot de forma segura.
        </Text>
      )}
      <Text style={{ marginBottom: '150px', textAlign: 'center' }}>
        <i>
          <strong>
            En cas de dubte o dificultats tècniques ens pots contactar al telèfon <u>XXXXXXXX</u> o al correu{' '}
            <u>info@alhora.cat</u>
          </strong>
        </i>
      </Text>
    </Flex>
  )
}

const ElectionDetail = () => {
  const { election } = useElection()

  if (!election || election instanceof InvalidElection) return null

  return <>{election.title.default}</>
}

export default AlhoraWrapper
