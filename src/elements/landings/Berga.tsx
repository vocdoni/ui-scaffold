import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import bergaImg from '/assets/berga.jpg'
import vocdoniIcon from '/assets/vocdoni.png'

const Berga = () => {
  return (
    <Flex flexDirection='column' gap={10} maxW='900px' mx='auto' p={5} minH='100vh'>
      <Image src={bergaImg} width='300px' alt='ajuntament berga escut' mx='auto' />
      <Box>
        <Text as='h1' fontWeight='bold' fontSize='24px' textAlign='center'>
          Pressupostos Participatius 2024
        </Text>
        <Text as='h2' fontSize='16px' textAlign='center'>
          Ajuntament de Berga
        </Text>
      </Box>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Text>
      <Box>
        <Text fontWeight='bold' alignSelf='start' mb={5}>
          Seleccioneu una opció depenent de la teva edat
        </Text>
        <Flex gap={5} flexDirection={{ base: 'column', lg: 'row' }}>
          <Link
            as={ReactRouterLink}
            flexGrow={1}
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
          >
            <Box h={{ base: '50px', lg: '200px' }} boxShadow='0px 0px 10px 2px lightgray' borderRadius='md' mb={5} />
            <Text>Juvenil</Text>
            <Text>14 - 18 anys</Text>
          </Link>
          <Link
            as={ReactRouterLink}
            flexGrow={1}
            color='black'
            textDecoration='none'
            textAlign='center'
            fontWeight='bold'
          >
            <Box h={{ base: '50px', lg: '200px' }} boxShadow='0px 0px 10px 2px lightgray' borderRadius='md' mb={5} />
            <Text>General</Text>
            <Text>+18 anys</Text>
          </Link>
        </Flex>
      </Box>
      <Text>
        Es demanarà el teu DNI + data de naixament un cop seleccionada una opció de pressupostos participatius
      </Text>
      <Flex justifyContent='center' mt='auto'>
        <Image src={vocdoniIcon} width='200px' alt='vocdoni logo' />
      </Flex>
    </Flex>
  )
}

export default Berga
