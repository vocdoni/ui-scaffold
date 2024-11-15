import { Box, Flex } from '@chakra-ui/react'
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
      bgColor={'process_view.bg_light'}
      _dark={{
        bgColor: 'process_view.bg_dark',
      }}
    >
      <Box
        as='header'
        position='sticky'
        zIndex={30}
        top={0}
        bgColor={'navbar.bg_light'}
        _dark={{ bgColor: 'navbar.bg_dark' }}
      >
        <Navbar />
      </Box>
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
