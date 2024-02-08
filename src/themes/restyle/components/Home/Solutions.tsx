import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { FaFingerprint } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdDesignServices } from 'react-icons/md'
import solutions from '/assets/solutions.png'

const Solutions = () => {
  return (
    <Flex
      as='section'
      className='site-wrapper'
      flexDirection={{ base: 'column', lg: 'row' }}
      py={{ base: '60px', lg: '120px' }}
      gap={{ base: '40px', lg: '60px' }}
    >
      <Flex flex='1 1 50%' justifyContent='center' alignItems='center'>
        <Flex flexDirection='column' gap='24px'>
          <Box mb='40px'>
            <Text color='#175CFF' fontWeight='bold' fontSize='20px' lineHeight='24px' mb='6px'>
              Embrace Change with Vocdoni
            </Text>
            <Text fontWeight='bold' fontSize='40px' lineHeight='48px' mb='10px'>
              Our solution fits your needs
            </Text>
            <Text color='gray' fontSize='16px' lineHeight='28px'>
              Quickly incubate functional channels with multidisciplinary architectures.
            </Text>
            <Text color='gray' fontSize='16px' lineHeight='28px'>
              Authoritatively fabricat formulate exceptional innovation.
            </Text>
          </Box>
          <Flex gap='24px'>
            <Flex justifyContent='center' alignItems='center' bgColor='#175CFF' borderRadius='lg' minW='45px' h='45px'>
              <MdDesignServices size={25} color='white' />
            </Flex>
            <Box>
              <Text fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
                Customize with your branding
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
                Multiple authentification methods
              </Text>
              <Text color='gray'>
                We support custom data, integration with CRMs, SMS auth, Social Auth, Wallet auth and Sybil-resistant
                solutions.
              </Text>
            </Box>
          </Flex>
          <Flex gap='24px'>
            <Flex justifyContent='center' alignItems='center' bgColor='#0B163F' borderRadius='lg' minW='45px' h='45px'>
              <IoSettingsSharp size={25} color='white' />
            </Flex>
            <Box>
              <Text fontWeight='bold' mb='6px' fontSize='20px' lineHeight='24px'>
                Secure, Private & Auditable
              </Text>
              <Text color='gray'>
                GDPR compilant, because your data matters. Each vote is blockchain transaction, offering unparalleled
                transparency and verifiability to every stakeholder.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box flex='1 1 50%' position='relative'>
        <Box maxW={{ base: '250px', lg: '115%', xl: '100%' }} mx='auto' borderRadius='xl' overflow='hidden'>
          <Image src={solutions} />
        </Box>
        <Flex
          flexDirection='column'
          gap={3}
          position='absolute'
          bottom={{ base: 10, lg2: '100px' }}
          ml='50%'
          transform={{
            base: 'translateX(-60%)',
            lg: 'translateX(-80%)',
            lg2: 'translateX(-90%)',
            xl: 'translateX(-100%)',
          }}
          w={{ base: '85%', sm: 'fit-content' }}
        >
          <Flex
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>
            <Text as='span'>Organizations</Text>
          </Flex>
          <Flex
            alignItems='center'
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>

            <Text as='span'>Communities</Text>
          </Flex>
          <Flex
            alignItems={{ base: 'start', sm: 'center' }}
            gap={2}
            borderRadius='md'
            boxShadow='rgba(12, 8, 0, 0.03) 0px 2px 4.8px -1px, rgba(12, 8, 0, 0.06) 0px 4.4px 12px -1px'
            p={3}
            bgColor='white'
            fontWeight='bold'
          >
            <Box minW='25px'>
              <FaCircleCheck color='#175CFF' size={25} />
            </Box>
            <Text as='span' whiteSpace={{ sm: 'nowrap' }}>
              Goverments and public institutions
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Solutions
