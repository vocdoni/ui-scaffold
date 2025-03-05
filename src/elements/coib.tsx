import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react'
import { ElectionProvider, useClient, useElection } from '@vocdoni/react-providers'
import { InvalidElection } from '@vocdoni/sdk'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { ActionsMenu } from '~components/Process/ActionsMenu'
import { CspAuth } from '~components/Process/CSP/CSPAuthModal'
import Error from './Error'

const processes = [
  {
    //1
    title: "Aprovació memòria d'activitats 2024",
    pid: '6be21a5a9dc0419e93eb5d77170b4fbc42c599cd7b0e33c43c98030000000002',
  },
]

const CoibWrapper = () => (
  <ElectionProvider id={processes[0].pid}>
    <Coib />
  </ElectionProvider>
)

const Coib = () => {
  const { loading, loaded, election, connected } = useElection()
  const { account, connected: aconnected } = useClient()

  // Crisp config
  useEffect(() => {
    if (!connected) return

    Crisp.configure('855c1c0c-673c-4cf2-bc92-1471d743b8d2')
  }, [connected])

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
      <Flex flexDirection='column' gap={10} maxW='850px' mx='auto' p={5} style={{ marginTop: '100px' }}>
        <Box>
          <Text as='h1' fontWeight='bold' fontSize='32px' textAlign='center' style={{ marginTop: '-15px' }}>
            Participa a la prova pilot de vot telemàtic del COIB!
          </Text>
          <Text as='h2' fontSize='16px' textAlign='center'>
            Col·legi Oficial Infermeres i Infermers de Barcelona
          </Text>
        </Box>
      </Flex>
      <Flex flexDirection={{ base: 'column' }} gap={10} maxW='850px' mx='auto' style={{ marginTop: '0px' }}>
        <Box>
          <Box>
            <Text as='h3' fontSize='20px'>
              El COIB vol modernitzar els seus processos i adaptar-se a les noves necessitats tecnològiques, oferint als
              col·legiats eines més àgils, segures i accessibles. Per això, consolidar el vot en remot en els processos
              participatius del Col·legi és una prioritat.
              <br />
              <br />
              Per assegurar l’èxit de la iniciativa, agrairem comptar amb la teva participació en aquesta prova pilot.
              La prova estarà oberta de 17 h a 19 h. i disponible per a totes les col·legiades.
              <br />
              <br />
              Recorda: és important comptar amb les dades personals actualitzades al COIB
              <br />
              <br />
            </Text>
          </Box>
        </Box>
        <Text fontWeight='bold' mb={10} textAlign='center' fontSize='24px'>
          La prova pilot estarà oberta de 17h. a 19h. del Dijous, 06 de Març del 2025.
        </Text>
      </Flex>
      <Box>{election && !isAdmin && !connected && <CspAuth />}</Box>
      {canViewProcesses && (
        <Box w='90%'>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold' fontSize='22px' style={{ marginTop: '-30px' }}>
            Votacions:
          </Text>
          <Flex gap={5} flexDirection={{ base: 'column' }}>
            {processes.map((process, index) => (
              <Flex key={index}>
                <Link
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
                >
                  <Box>
                    <Text fontSize='18px'>
                      {index + 1}: {process.title}
                    </Text>
                  </Box>
                </Link>
                {isAdmin && (
                  <ElectionProvider id={process.pid}>
                    <ActionsMenu />
                  </ElectionProvider>
                )}
              </Flex>
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
      {isEnabled && !canViewProcesses && (
        <Text style={{ marginBottom: '50px', textAlign: 'center' }}>
          Per poder accedir a la votació i veure el vídeo en temps real, heu de prémer sobre “Identificar-se”.
          <br />
          Us demanarem la vostre identificació. Posteriorment, podreu emetre el vostre vot de forma segura.
        </Text>
      )}
      <Text style={{ marginBottom: '150px', textAlign: 'center' }}>
        <i>
          <strong>
            En cas de dubte o dificultats tècniques ens pots contactar al telèfon <u>900 705 705</u> o al correu{' '}
            <u>info@coib.cat</u>
          </strong>
        </i>
      </Text>
    </Flex>
  )
}

export default CoibWrapper
