import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export const StretchPublicContentsLayout = () => (
  <Flex
    flexDirection='column'
    gap={5}
    width='full'
    mx='auto'
    maxW='1100px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
    mt={6}
  >
    <Outlet />
  </Flex>
)

export const PublicContentsLayout = () => (
  <Flex
    flexDirection='column'
    gap={5}
    width='full'
    mx='auto'
    maxW='1920px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
    mt={6}
  >
    <Outlet />
  </Flex>
)

export const PlansLayout = () => (
  <Flex
    flexDirection='column'
    gap={{ base: '60px', lg: '100px' }}
    mt={{ base: 10, lg: 14 }}
    width='full'
    mx='auto'
    maxW='1400px'
    px={{
      base: '10px',
      sm: '20px',
      md: '80px',
    }}
    mb={44}
  >
    <Outlet />
  </Flex>
)
