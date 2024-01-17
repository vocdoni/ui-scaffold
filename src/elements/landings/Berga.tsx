import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import bergaImg from '/assets/berga.jpg'
import vocdoniIcon from '/assets/vocdoni.png'

const Berga = () => {
  return (
    <Flex flexDirection='column' gap={10} maxW='900px' mx='auto' p={5} minH='100vh'>
      <Image src={bergaImg} width='300px' alt='ajuntament berga escut' mx='auto' />
      <Box>
        <Text as='h1' fontWeight='bold' fontSize='36px' textAlign='center'>
          Pressupostos Participatius 2024
        </Text>
        <Text as='h2' fontSize='16px' textAlign='center'>
          Ajuntament de Berga
        </Text>
      </Box>
      <Text>
        <Text as='h3' fontWeight='bold'>
          Pressupost Participatiu de Berga 2024
        </Text>
        <Text>
          El pressupost participatiu és una eina de participació ciutadana per a què els veïns i les veïnes puguin
          decidir a quins projectes o activitats es destina una part del pressupost públic municipal.
          <br />
          L'Ajuntament de Berga promou per cinquè any consecutiu el pressupost participatiu. Comptarà amb una partida de
          30.000€, els quals es podran destinar tant a propostes d'inversió (màxim de 20.000 €) com de programació
          cultural (màxim de 10.000€).
        </Text>
      </Text>
      <Text>
        <Text as='h3' fontWeight='bold'>
          Pressupost Participatiu Juvenil
        </Text>
        <Text>
          El consistori promou per tercer any el pressupost participatiu adreçat a joves de 12 a 15 anys que
          s'organitzarà a través dels centres educatius de la ciutat. Comptarà amb una partida de 5.000€ que es podran
          destinar tant a propostes d'inversió com de programació cultural.
          <br />
          En la segona edició (2023) va resultar guanyadora la realització d'una vetllada de concerts per a l'alumnat
          dels centres educatius de Berga, que es va dur a terme el dissabte, 16 de setembre.
        </Text>
      </Text>
      <Box>
        <Text alignSelf='start' mb={10}>
          <strong>Seleccioneu</strong> una opció depenent de la teva edat
        </Text>
        <Flex gap={5} flexDirection={{ base: 'column', md: 'row' }}>
          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px', md: '200px' }}
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
            to='/processes/0x96bec154619138d2bc91b89928f78cbab3e4b1949e28787ec7a3020800000011'
          >
            <Box>
              <Text fontSize='18px'>Accedeix a la votació Juvenil</Text>
              <Text>12 - 15 anys</Text>
            </Box>
          </Link>
          <Link
            as={ReactRouterLink}
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            h={{ base: '100px', md: '200px' }}
            borderRadius='md'
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
            boxShadow='0px 0px 10px 2px lightgray'
            mb={{ md: 50 }}
            _hover={{
              bgColor: 'lightgray',
            }}
            _active={{
              transform: 'scale(0.9)',
            }}
            to='/processes/0x96bec154619138d2bc91b89928f78cbab3e4b1949e28787ec7a3020800000010'
          >
            <Box>
              <Text fontSize='18px'>Accedeix a la votació General</Text>
              <Text>+16 anys</Text>
            </Box>
          </Link>
        </Flex>
      </Box>
      <Text>
        Per poder accedir a la votació, us demanarem el vostre número de DNI (Document Nacional d'Identitat) i data de
        naixement. Posteriorment, podreu seleccionar les vostres opcions i enviar el vot de forma segura.
      </Text>
      <Flex justifyContent='center' mt='auto'>
        <Image src={vocdoniIcon} width='200px' alt='vocdoni logo' />
      </Flex>
    </Flex>
  )
}

export default Berga
