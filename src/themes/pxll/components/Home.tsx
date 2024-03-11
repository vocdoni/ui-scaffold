import { AspectRatio, Box, Flex, Image, Link, Spinner, Text } from '@chakra-ui/react'
import { ElectionProvider, useClient, useElection } from '@vocdoni/react-providers'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link as ReactRouterLink } from 'react-router-dom'
import { SpreadsheetAccess } from '~components/Process/SpreadsheetAccess'
import header from '/shared/votacions_cap.jpg'

const processes = [
  {
    //1
    title: "Aprovació, si escau, de l'acta de l'anterior assemblea.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000017',
  },
  {
    //2
    title: 'Aprovació, si escau, del Reglament electoral.',
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000018',
  },
  {
    //3
    title: "Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000019',
  },
  {
    //4
    title: "Aprovació, si escau, del projecte d'activitats 2023.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001a',
  },
  {
    //5
    title: "Aprovació, si escau, de l'estat de comptes 2023.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001b',
  },
  {
    //6
    title: "Aprovació, si escau, del Pla d'activitats 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001c',
  },
  {
    //7
    title: "Aprovació, si escau, del Pressupost de l'entitat 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001d',
  },
  {
    //8
    title: "Ratificació de les incorporacions per substitució a l'Executiva 2024-2026.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001e',
  },
  {
    //9
    title: "Elecció de nous membres de l'Executiva 2024-2028.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000001f',
  },
]

const PlataformaWrapper = () => {
  const [logged, setLogged] = useState<boolean>(false)

  return (
    <ElectionProvider id={processes[0].pid}>
      <PxLL />
    </ElectionProvider>
  )
}

const PxLL = () => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  const { loading, loaded, election, errors } = useElection()
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
      style={{ marginTop: '-30px' }}
    >
      <Flex flexDirection='column' gap={10} maxW='850px' mx='auto' p={5} style={{ marginTop: '0px' }}>
        <Image src={header} alt='Assemblea General de socis' mx='auto' />
        <Box>
          <Text as='h1' fontWeight='bold' fontSize='32px' textAlign='center' style={{ marginTop: '-15px' }}>
            Assemblea General Ordinària
          </Text>
          <Text as='h2' fontSize='14px' textAlign='center'>
            Associació Plataforma per la Llengua - Col·lectiu l’Esbarzer <i>(16/03/2024)</i>
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
            <Text as='h3' fontWeight='bold'>
              Ordre del dia de l’Assemblea General Ordinària
              <br />
              <br />
            </Text>
            <Text fontSize='18px'>
              <ul style={{ marginLeft: '15px' }}>
                {processes.map((process, index) => (
                  <li key={index}>
                    <i>{index + 1}</i>: {process.title}
                  </li>
                ))}
                <div>
                  <i> - Presentació de candidatures.</i>
                  <br />
                  <i> - Votacions.</i>
                </div>
                <li>
                  <i>10</i>: Torn obert de preguntes.
                </li>
              </ul>
            </Text>
          </Text>
          <Text fontSize='18px'>
            <Text style={{ marginTop: '30px' }}>
              - Enllaç a documentació externa:{' '}
              <a
                href='https://www.plataforma-llengua.cat/ago-2024-documentacio/'
                target='_blank'
                style={{ textDecoration: 'underline', color: '#e40800' }}
              >
                Documentació 🔗
              </a>
              <br />- Enllaç a plataforma de precs i preguntes:{' '}
              <a
                href='https://www.plataforma-llengua.cat/ago-2024-precs-i-preguntes/'
                target='_blank'
                style={{ textDecoration: 'underline', color: '#e40800' }}
              >
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
              w={{ base: '100%', lg: '400px' }}
            >
              <AspectRatio ratio={16 / 9}>
                <ReactPlayer
                  url='https://www.youtube.com/embed/cvkb7dPr5Uk?si=AUhsbtslqc7bfk2W'
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
      {election && !isAdmin && <SpreadsheetAccess setConnected={setConnected} connected={connected} />}
      {canViewProcesses && (
        <Box>
          <Text alignSelf='start' mb={10} as='h3' fontWeight='bold'>
            <br />
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
                isExternal
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
      <Text style={{ marginBottom: '50px' }}>
        Per poder accedir a la votació i veure el vídeo en temps real, heu de pulsar sobre “Identificar-se”. Us
        demanarem el vostre DNI/NIE i el codi de pas que heu rebut per correu electrònic. Posteriorment, podreu emetre
        el vostre vot de forma segura.
      </Text>
      <Text style={{ marginBottom: '150px' }}>
        <i>
          <strong>
            En cas de dubte / dificultats tècniques ens pots contactar al telèfon <u>933 211 803</u> o al correu{' '}
            <u>socis@plataforma-llengua.cat</u>
          </strong>
        </i>
      </Text>
    </Flex>
  )
}

export default PlataformaWrapper
