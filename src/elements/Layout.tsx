import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import AnnouncementBanner from '~components/shared/Layout/AnnouncementBanner'
import { Routes } from '~routes'
import Footer from '~shared/Layout/Footer'
import LayoutContainer from '~shared/Layout/LayoutContainer'
import Navbar from '~shared/Navbar'

const Layout = () => {
  const location = useLocation()

  return (
    <Flex position='relative' flexDirection='column' minH='100vh' mx='auto'>
      <HStack as='header' position='sticky' top={0} w='full' backdropFilter='blur(40px)' zIndex={30}>
        <LayoutContainer variant='page'>
          <Navbar />
        </LayoutContainer>
      </HStack>
      <ScrollRestoration />
      {[Routes.root, Routes.plans].includes(location.pathname) && <AnnouncementBanner limited />}
      <LayoutContainer
        as={Flex}
        flexDirection='column'
        flexGrow={1}
        mt={{ base: 4, lg: 6, xl: 10 }}
        mb={{ base: 20, lg: 32 }}
      >
        <Outlet />
      </LayoutContainer>
      <Box
        as='footer'
        bgColor={`${location.pathname.startsWith('/organization') ? 'footer.gray' : 'footer.white'}`}
        w='full'
        backdropFilter='blur(40px)'
      >
        <LayoutContainer variant='page'>
          <Footer />
        </LayoutContainer>
      </Box>
    </Flex>
  )
}

export default Layout
