import { AspectRatio, Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link as ReactRouterLink } from 'react-router-dom'
import header from '/assets/votacions_cap.jpg'

const processes = [
  {
    //1
    title: "Aprovació, si escau, de l'acta de l'anterior assemblea.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000000c',
  },
  {
    //2
    title: 'Aprovació, si escau, del Reglament electoral.',
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000000d',
  },
  {
    //3
    title: "Aprovació, si escau, del Reglament de l'Assemblea General Ordinària 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000000e',
  },
  {
    //4
    title: "Aprovació, si escau, del projecte d'activitats 2023.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c0000000f',
  },
  {
    //5
    title: "Aprovació, si escau, de l'estat de comptes 2023.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000010',
  },
  {
    //6
    title: "Aprovació, si escau, del Pla d'activitats 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000011',
  },
  {
    //7
    title: "Aprovació, si escau, del Pressupost de l'entitat 2024.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000012',
  },
  {
    //8
    title: "Ratificació de les incorporacions per substitució a l'Executiva 2024-2026.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000013',
  },
  {
    //9
    title: "Elecció de nous membres de l'Executiva 2024-2028.",
    pid: '1db268a2d13863ca71be6765bc582f254eb1c49cf9739bbf798e020c00000014',
  },
]

const PxLL = () => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoTop, setVideoTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return

      const rect = videoRef.current.getBoundingClientRect()
      if (rect.top <= 350) {
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

  return (
    <Flex flexDirection='column' gap={10} maxW='1200px' mx='auto' p={5} minH='100vh' style={{ marginTop: '0px' }}>
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
      <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={10} maxW='1200px' mx='auto' style={{ marginTop: '0px' }}>
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
                  <li>
                    <i>{index + 1}</i>: {process.title}
                  </li>
                ))}
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
        <Box
          maxW={{ base: videoTop ? '250px' : '800px', lg: videoTop ? '400px' : '0px' }}
          ml={videoTop ? 'auto' : 'none'}
          position='sticky'
          top={{ base: 0, lg2: 20 }}
          zIndex={100}
          style={{ display: 'none' }}
        >
          <AspectRatio ref={videoRef} ratio={16 / 9}>
            <ReactPlayer
              url='https://www.youtube.com/embed/cvkb7dPr5Uk?si=AUhsbtslqc7bfk2W'
              width='100%'
              height='100%'
              playing
              controls
            />
          </AspectRatio>
        </Box>
        <Box style={{ margin: '40px auto' }}>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/cvkb7dPr5Uk?si=AUhsbtslqc7bfk2W'
            title='YouTube video player'
          ></iframe>
        </Box>
      </Flex>
      <Box>
        <Text alignSelf='start' mb={10} as='h3' fontWeight='bold'>
          <br />
          Votacions:
        </Text>
        <Flex gap={5} flexDirection={{ base: 'column' }}>
          {processes.map((process, index) => (
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
              to={`/processes/${process.pid}`}
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
      <Text style={{ marginBottom: '50px' }}>
        Per poder accedir a la votació, heu de pulsar sobre “Identificar-se”. Us demanarem el vostre DNI/NIE i el codi
        de pas que heu rebut per correu electrònic. Posteriorment, podreu emetre el vostre vot de forma segura.
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

export default PxLL
