import { Box, Flex, HStack } from '@chakra-ui/react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { ColorModeSwitcher } from '~components/shared/Layout/ColorModeSwitcher'
import { VocdoniLogo } from '~components/shared/Layout/Logo'
import { LanguagesMenu } from '~components/shared/Navbar/LanguagesList'
import Footer from '~shared/Layout/Footer'

const Layout = () => {
  const location = useLocation()

  return (
    <Flex position='relative' flexDirection='column' minH='100vh' mx='auto'>
      <HStack
        as='header'
        position='sticky'
        top={0}
        w='full'
        backdropFilter='blur(40px)'
        zIndex={30}
        px={{ base: 4, md: 6, xl: 10 }}
        py={3}
        maxW='navbar'
        mx='auto'
        justifyContent='space-between'
      >
        <VocdoniLogo h={10} />
        <Box display='flex' alignItems='center' gap={4}>
          <LanguagesMenu />
          <ColorModeSwitcher />
        </Box>
      </HStack>
      <ScrollRestoration />
      <Flex
        flexDirection='column'
        as='main'
        flexGrow={1}
        mt={{ base: 4, lg: 6, xl: 10 }}
        mb={{ base: 20, lg: 32 }}
        maxW='1600px'
        mx='auto'
        px={{
          base: '10px',
          sm: '20px',
          md: '80px',
        }}
        w='full'
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
