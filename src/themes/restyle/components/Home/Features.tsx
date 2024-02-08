import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { FaFingerprint } from 'react-icons/fa'
import { MdDesignServices } from 'react-icons/md'
import advFeature from '/assets/vocdoni.jpeg'

const Features = () => {
  return (
    <Flex
      as='section'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: 0 }}
      bgColor={{ base: '#eff1f2', lg: 'white' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Flex
        justifyContent={{ base: 'center', lg: 'end' }}
        flex='1 1 50%'
        bgColor={{ lg: '#0B163F' }}
        position='relative'
      >
        <Box bgColor='white' position='absolute' h='100%' w='100px' />
        <Box maxW={{ base: 'full', lg: '560px' }} px={{ base: '30px', lg: 0 }} pl={{ lg: '37px', xl3: 0 }}>
          <Image
            src={advFeature}
            w='535px'
            position='relative'
            top={{ lg: '50%' }}
            transform={{ lg: 'translateY(-50%)' }}
            borderRadius='lg'
          />
        </Box>
      </Flex>
      <Flex
        flex='1 1 50%'
        justifyContent={{ base: 'center', lg: 'start' }}
        display={{ lg: 'flex' }}
        alignItems='center'
        py={{ lg: '60px', xl: '120px' }}
      >
        <Flex
          flexDirection='column'
          gap='24px'
          maxW={{ base: 'full', lg: '560px' }}
          px={{ base: '30px', lg: 0 }}
          pr={{ lg: '37px', xl3: 0 }}
        >
          <Box>
            <Text color='#175CFF' fontWeight='bold' fontSize='20px' lineHeight='24px' mb='6px'>
              Advanced Features
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              Contact us and we can work together
            </Text>
          </Box>
          <Flex gap='24px'>
            <Flex justifyContent='center' alignItems='center' bgColor='#175CFF' borderRadius='lg' minW='45px' h='45px'>
              <MdDesignServices size={25} color='white' />
            </Flex>
            <Box>
              <Text fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
                We offer custom solutions
              </Text>
              <Text color='gray'>
                Progressivly foster enterprise-wide systems whereas equity invested web-readiness harness installed.
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex justifyContent='center' alignItems='center' bgColor='#F25767' borderRadius='lg' minW='45px' h='45px'>
              <FaFingerprint size={25} color='white' />
            </Flex>
            <Box>
              <Text fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
                Our experts accompany you throughout the entire process
              </Text>
              <Text color='gray'>
                Dramatically administrate progressive metrics without error-free globally simplify standarized.
              </Text>
            </Box>
          </Flex>
          <Button bgColor='#0B163F' w={{ base: 'full', sm: 'fit-content', lg: 'full' }} mx='auto'>
            Contact us
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Features
