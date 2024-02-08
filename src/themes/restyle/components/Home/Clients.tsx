import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import barca from '/assets/barca.png'
import bellpuig from '/assets/bellpuig.svg.png'
import berga from '/assets/berga.svg.png'
import bisbal from '/assets/bisbal.svg'
import decidim from '/assets/decidim.png'
import omnium from '/assets/omnium.png'
import pirates from '/assets/pirates.svg'
const Clients = () => {
  return (
    <>
      <Text color='gray' textAlign='center' mb='24px' fontWeight='bold' fontSize='24px'>
        Clients
      </Text>
      <Grid
        as='section'
        className='site-wrapper'
        maxW={{ base: '100%', sm: '70%', sm2: '60%', lg: '640px' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='center'
        rowGap={{ lg: 5 }}
        mb={{ base: '60px', lg: '120px' }}
        gridTemplateColumns='repeat(4, 1fr)'
      >
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={berga}
            w={{ base: '17.5px', lg: '26.25px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={bellpuig}
            w={{ base: '25px', lg: '37.5px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={decidim}
            w={{ base: '75px', lg: '112.5px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={barca}
            w={{ base: '30px', lg: '45px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={omnium}
            w={{ base: '35px', lg: '52.5px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={pirates}
            w={{ base: '75px', lg: '112.5px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={bisbal}
            w={{ base: '23.5px', lg: '35.25px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
        <Flex justifyContent='center' alignItems='center'>
          <Image
            src={decidim}
            w={{ base: '75px', lg: '112.5px' }}
            filter='grayscale(100%)'
            _hover={{
              filter: 'none',
            }}
          />
        </Flex>
      </Grid>
    </>
  )
}
export default Clients
