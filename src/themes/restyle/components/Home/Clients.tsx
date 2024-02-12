import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import decidim from '/assets/decidim.jpg'
import omnium from '/assets/omnium.png'
import pirates from '/assets/pirates.svg'

const Clients = () => {
  const { t } = useTranslation()

  return (
    <>
      <Text color='#666' textAlign='center' mb='24px' fontWeight='bold' fontSize='16px'>
        {t('home.clients_title')}
      </Text>
      <Grid
        as='section'
        className='site-wrapper'
        maxW={{ base: '100%', sm: '70%', sm2: '60%', lg: '640px' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='center'
        mb={{ base: '60px', lg: '100px' }}
        gridTemplateColumns='repeat(4, 1fr)'
      >
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={berga} w={{ base: '17.4px', lg: '26px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Ajuntament Berga
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={bellpuig} w={{ base: '24px', lg: '36px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Ajuntament Bellpuig
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={decidim} w={{ base: '30px', lg: '45px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Decidim
            </Text>
          </Box>
        </Flex>

        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={barca} w={{ base: '30px', lg: '45px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Futbol Club Barcelona
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={omnium} w={{ base: '30px', lg: '45px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Omnium Cultural
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image
            src={pirates}
            w={{ base: '72px', lg: '108px' }}
            filter='grayscale(100%)'
            _hover={{
              lg: {
                '& img': {
                  filter: 'none',
                },
                '& span': {
                  display: 'block',
                },
              },
            }}
            mb='10px'
          />
          <Box display={{ base: 'none', lg: 'block' }} h='35px' justifyContent='center' alignItems='center'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Partit Pirata
            </Text>
          </Box>
        </Flex>
        <Flex
          flexDirection='column'
          justifyContent='start'
          alignItems='center'
          _hover={{
            lg: {
              '& img': {
                filter: 'none',
              },
              '& span': {
                display: 'block',
              },
            },
          }}
        >
          <Image src={bisbal} w={{ base: '22px', lg: '33px' }} mb='10px' filter='grayscale(100%)' />
          <Box display={{ base: 'none', lg: 'block' }} h='35px' justifyContent='center' alignItems='center'>
            <Text as='span' display='none' textAlign='center' fontSize='12px' fontWeight='bold' color='#666'>
              Ajuntament de la Bisbal
            </Text>
          </Box>
        </Flex>
      </Grid>
    </>
  )
}
export default Clients
