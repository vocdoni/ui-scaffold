import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Footer from '~components/Layout/Footer'
import Navbar from '~components/Navbar'

const Layout = () => {
  const location = useLocation()

  return (
    <Flex
      position='relative'
      flexDirection='column'
      minH='100vh'
      mx='auto'
      bgColor={'bg.light'}
      _dark={{ bgColor: 'bg.dark' }}
    >
      <HStack
        as='header'
        position='sticky'
        top={0}
        w='full'
        backdropFilter='blur(40px)'
        zIndex={30}
        px={{ base: 4, md: 6, xl: 10 }}
        maxW={'1920px'}
        mx={'auto'}
      >
        <Navbar />
      </HStack>
      <ScrollRestoration />
      <Flex
        flexDirection='column'
        as='main'
        flexGrow={1}
        mt={{ base: 4, lg: 6 }}
        maxW='1600px'
        mx='auto'
        px={{
          base: '10px',
          sm: '20px',
          md: '80px',
        }}
      >
        <Outlet />
      </Flex>
      <Box
        as='footer'
        bgColor={`${location.pathname.startsWith('/organization') ? 'footer.gray' : 'footer.white'}`}
        w='full'
        backdropFilter='blur(40px)'
        px={{ base: 4, md: 6, xl: 10 }}
        maxW={'1920px'}
        mx={'auto'}
      >
        <Footer />
      </Box>
    </Flex>
  )
}

export default Layout
