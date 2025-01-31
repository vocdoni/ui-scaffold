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
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={30}>
        <Navbar />
      </HStack>
      <ScrollRestoration />
      <Flex flexDirection='column' as='main' flexGrow={1} mt={{ base: 4, lg: 6 }}>
        <Outlet />
      </Flex>
      <Box
        as='footer'
        mt='auto'
        bgColor={`${location.pathname.startsWith('/organization') ? 'footer.gray' : 'footer.white'}`}
      >
        <Footer />
      </Box>
    </Flex>
  )
}

export default Layout
