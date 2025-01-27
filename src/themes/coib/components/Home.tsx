import { AspectRatio, Box, Flex, Image, Link, ListItem, OrderedList, Spinner, Text } from '@chakra-ui/react'
import { ElectionProvider, useClient, useElection } from '@vocdoni/react-providers'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link as ReactRouterLink } from 'react-router-dom'
import { SpreadsheetAccess } from '~components/Process/SpreadsheetAccess'
import header from '/shared/votacions_cap.jpg'

const processes = [
  {
    //1
    title: 'Aprovació dels pressupostos 2025',
    pid: '0x6be21a5a9dc0692e163a34937bd757b9c913c8759a40707e3a25020400000000',
  },
  {
    //2
    title: 'Elecció Junta Directiva',
    pid: '0x6be21a5a9dc0692e163a34937bd757b9c913c8759a40707e3a25020400000001',
  },
  /*
  {
    //3
    title: 'Votació Coib3',
    pid: '6be21a5a9dc00bc6e9d8c567e84ab2221e5c2f9a4b21b66f020b020400000003',
  },
  */
]

const PlataformaWrapper = () => (
  <ElectionProvider id={processes[0].pid}>
    <Coib />
  </ElectionProvider>
)

const Coib = () => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  const { loading, loaded, election } = useElection()
  const { account, connected: aconnected } = useClient()

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
      <Flex flexDirection='column' gap={10} maxW='850px' mx='auto' p={5} style={{ marginTop: '100px' }}>
        <Box>
          <Text as='h1' fontWeight='bold' fontSize='36px' textAlign='center' style={{ marginTop: '-15px' }}>
            Assemblea General Ordinària
          </Text>
          <Text as='h2' fontSize='14px' textAlign='center'>
            Col·legi Oficial Infermeres i Infermers de Barcelona <i>(01/02/2025)</i>
          </Text>
        </Box>
      </Flex>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={10}
        maxW='1200px'
        mx='auto'
        style={{ marginTop: '-20px' }}
      >
        <Box>
          <Text>
            <Text as='h3' fontWeight='bold' fontSize='20px'>
              Ordre del dia de l'Assemblea General Ordinària
              <br />
              <br />
            </Text>
            <Text fontSize='18px'>
              <OrderedList ml='35px'>
                <ListItem>Benvinguda.</ListItem>
                <ListItem>Presentació Pressupost 2025.</ListItem>
                <div style={{ color: '#297b90' }}>Votació: `Aprovació dels pressupostos 2025`.</div>
                <ListItem>Presentació Candidatures.</ListItem>
                <div style={{ color: '#297b90' }}>Votació: `Elecció Junta Directiva`.</div>
                <ListItem>Torn obert de preguntes.</ListItem>
              </OrderedList>
            </Text>
          </Text>
          <Text fontSize='18px'>
            <Text style={{ marginTop: '30px' }}>
              - Enllaç a documentació externa:{' '}
              <a href='' target='_blank' style={{ textDecoration: 'underline', color: '#297b90' }}>
                Documentació 🔗
              </a>
              <br />- Enllaç a plataforma de precs i preguntes:{' '}
              <a href='' target='_blank' style={{ textDecoration: 'underline', color: '#297b90' }}>
                Precs i Preguntes 🔗
              </a>
            </Text>
          </Text>
        </Box>
        {canViewProcesses && (
          <Box>
            <Box ref={videoRef} />
            <Box
              ml={videoTop ? 'auto' : 'none'}
              position={{ lg: videoTop ? 'fixed' : 'initial' }}
              top={20}
              right={10}
              zIndex={100}
              w={{ base: '100%', lg: '500px' }}
            >
              <AspectRatio ratio={16 / 9}>
                <ReactPlayer
                  url='https://www.youtube.com/watch?v=0-ULTdNUtDo'
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
      <Box>{election && !isAdmin && <SpreadsheetAccess setConnected={setConnected} connected={connected} />}</Box>
      {canViewProcesses && (
        <Box w='90%'>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold' fontSize='22px' style={{ marginTop: '-30px' }}>
            Votacions:
          </Text>
          <Flex gap={5} flexDirection={{ base: 'column' }}>
            {processes.map((process, index) => (
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
                to={`/processes/${process.pid}/${window.location.hash}`}
                isExternal={!isAdmin}
              >
                <Box>
                  <Text fontSize='18px'>
                    {index + 1}: {process.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Flex>
        </Box>
      )}
      {canViewProcesses && (
        <Text style={{ marginTop: '50px', maxWidth: '800px', textAlign: 'center' }}>
          Pulseu sobre la votació i s'obrirà una finestra amb tota la informació per votar. Un cop votat, podeu tancar
          la pestanya per tornar a aquesta pàgina.
        </Text>
      )}
      {!canViewProcesses && (
        <Text style={{ marginBottom: '50px', textAlign: 'center' }}>
          Per poder accedir a la votació i veure el vídeo en temps real, heu de prémer sobre “Identificar-se”.
          <br />
          Us demanarem la vostre identificació. Posteriorment, podreu emetre el vostre vot de forma segura.
        </Text>
      )}
      <Text style={{ marginBottom: '150px', textAlign: 'center' }}>
        <i>
          <strong>
            En cas de dubte o dificultats tècniques ens pots contactar al telèfon <u>nº telefon</u> o al correu{' '}
            <u>info@coib.cat</u>
          </strong>
        </i>
      </Text>
    </Flex>
  )
}

export default PlataformaWrapper
