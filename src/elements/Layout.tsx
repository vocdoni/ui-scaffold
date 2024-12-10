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
      bgColor={'white'}
      _dark={{
        bgColor: '#0C0E12',
      }}
    >
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={30}>
        <Navbar />
      </HStack>
      <ScrollRestoration />
      <Flex flexDirection='column' as='main' flexGrow={1}>
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
